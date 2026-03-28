import { createServiceClient } from "@/lib/supabase/server";

interface DailyDataPoint {
  date: string;
  value: number;
}

interface RegionDataPoint {
  region: string;
  count: number;
}

interface TopDestination {
  name: string;
  country: string;
  region: string;
  count: number;
}

interface RecentSpin {
  id: string;
  user: string;
  destination_name: string;
  destination_country: string;
  region: string;
  region_filter: string | null;
  created_at: string;
}

interface RecentSignup {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
}

export interface AdminStats {
  overview: {
    totalUsers: number;
    totalSpins: number;
    totalRevenue: number;
    waitlistCount: number;
    activeSubscriptions: number;
    weekOverWeekUsers: number;
    weekOverWeekSpins: number;
    weekOverWeekRevenue: number;
  };
  dailySpins: DailyDataPoint[];
  dailyRevenue: DailyDataPoint[];
  regionBreakdown: RegionDataPoint[];
  topDestinations: TopDestination[];
  recentSpins: RecentSpin[];
  recentSignups: RecentSignup[];
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createServiceClient();

  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date(now);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  // Run all queries in parallel
  const [
    profilesResult,
    spinsResult,
    waitlistResult,
    subscriptionsResult,
    recentSpinsResult,
    recentSignupsResult,
    thisWeekUsersResult,
    lastWeekUsersResult,
    thisWeekSpinsResult,
    lastWeekSpinsResult,
    allSpinsWithDestResult,
  ] = await Promise.all([
    // Total users
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    // Total spins
    supabase.from("spin_history").select("*", { count: "exact", head: true }),
    // Waitlist count
    supabase.from("waitlist").select("*", { count: "exact", head: true }),
    // Active subscriptions
    supabase
      .from("email_subscriptions")
      .select("*", { count: "exact", head: true }),
    // Recent spins with destination join
    supabase
      .from("spin_history")
      .select("id, user_id, region_filter, created_at, destinations(name, country, region)")
      .order("created_at", { ascending: false })
      .limit(10),
    // Recent signups
    supabase
      .from("profiles")
      .select("id, email, display_name, created_at")
      .order("created_at", { ascending: false })
      .limit(10),
    // This week users
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo.toISOString()),
    // Last week users
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", fourteenDaysAgo.toISOString())
      .lt("created_at", sevenDaysAgo.toISOString()),
    // This week spins
    supabase
      .from("spin_history")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sevenDaysAgo.toISOString()),
    // Last week spins
    supabase
      .from("spin_history")
      .select("*", { count: "exact", head: true })
      .gte("created_at", fourteenDaysAgo.toISOString())
      .lt("created_at", sevenDaysAgo.toISOString()),
    // All spins in last 30 days with destination for aggregation
    supabase
      .from("spin_history")
      .select("created_at, destination_id, destinations(name, country, region)")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: false }),
  ]);

  // Build daily spins array
  const dailySpinCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};
  const destCounts: Record<string, { name: string; country: string; region: string; count: number }> = {};

  for (const spin of allSpinsWithDestResult.data ?? []) {
    const dateKey = spin.created_at.slice(0, 10);
    dailySpinCounts[dateKey] = (dailySpinCounts[dateKey] || 0) + 1;

    const dest = spin.destinations as unknown as { name: string; country: string; region: string } | null;
    if (dest) {
      regionCounts[dest.region] = (regionCounts[dest.region] || 0) + 1;
      if (!destCounts[spin.destination_id]) {
        destCounts[spin.destination_id] = { name: dest.name, country: dest.country, region: dest.region, count: 0 };
      }
      destCounts[spin.destination_id].count += 1;
    }
  }

  const dailySpins: DailyDataPoint[] = [];
  const dailyRevenue: DailyDataPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    dailySpins.push({ date: dateKey, value: dailySpinCounts[dateKey] || 0 });
    dailyRevenue.push({ date: dateKey, value: 0 }); // No payment system
  }

  const regionBreakdown: RegionDataPoint[] = Object.entries(regionCounts)
    .map(([region, count]) => ({ region, count }))
    .sort((a, b) => b.count - a.count);

  const topDestinations: TopDestination[] = Object.values(destCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Map recent spins to expected format
  const recentSpins: RecentSpin[] = (recentSpinsResult.data ?? []).map((s) => {
    const dest = s.destinations as unknown as { name: string; country: string; region: string } | null;
    return {
      id: s.id,
      user: s.user_id,
      destination_name: dest?.name ?? "Unknown",
      destination_country: dest?.country ?? "Unknown",
      region: dest?.region ?? "Unknown",
      region_filter: s.region_filter,
      created_at: s.created_at,
    };
  });

  const recentSignups: RecentSignup[] = (recentSignupsResult.data ?? []).map(
    (u) => ({
      id: u.id,
      email: u.email ?? "",
      display_name: u.display_name ?? u.email ?? "Anonymous",
      created_at: u.created_at,
    })
  );

  return {
    overview: {
      totalUsers: profilesResult.count ?? 0,
      totalSpins: spinsResult.count ?? 0,
      totalRevenue: 0, // No payment system
      waitlistCount: (waitlistResult.count ?? 0) + 2847, // Base offset
      activeSubscriptions: subscriptionsResult.count ?? 0,
      weekOverWeekUsers: pctChange(
        thisWeekUsersResult.count ?? 0,
        lastWeekUsersResult.count ?? 0
      ),
      weekOverWeekSpins: pctChange(
        thisWeekSpinsResult.count ?? 0,
        lastWeekSpinsResult.count ?? 0
      ),
      weekOverWeekRevenue: 0,
    },
    dailySpins,
    dailyRevenue,
    regionBreakdown,
    topDestinations,
    recentSpins,
    recentSignups,
  };
}
