import { DESTINATIONS } from "./mock-data";
import { REGIONS, CREDIT_PACKS } from "./constants";

// Seeded PRNG for deterministic data
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

const rand = seededRandom(42);

function randomInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function daysAgo(n: number): Date {
  const d = new Date("2026-03-26T12:00:00Z");
  d.setDate(d.getDate() - n);
  d.setHours(randomInt(6, 23), randomInt(0, 59), randomInt(0, 59));
  return d;
}

// --- Generate mock users ---
const FIRST_NAMES = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "Logan", "Mia", "Lucas", "Charlotte", "James", "Amelia",
  "Benjamin", "Harper", "Elijah", "Evelyn", "Alexander", "Luna", "Daniel",
  "Chloe", "Henry", "Layla", "Sebastian", "Ella", "Jack", "Aria", "Owen",
  "Riley", "Leo", "Zoey", "Caleb", "Nora", "Ryan", "Lily", "Nathan",
  "Eleanor", "Isaac", "Hannah", "Gabriel", "Stella", "Julian", "Violet",
  "Adrian", "Scarlett", "Wyatt", "Grace", "Dylan",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
  "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark",
  "Ramirez", "Lewis", "Robinson",
];

interface MockUser {
  id: string;
  email: string;
  display_name: string;
  created_at: string;
}

interface MockSpin {
  id: string;
  user: string;
  destination_name: string;
  destination_country: string;
  region: string;
  region_filter: string | null;
  created_at: string;
}

interface MockTransaction {
  id: string;
  user: string;
  amount: number;
  pack_label: string;
  created_at: string;
}

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
  recentSpins: MockSpin[];
  recentSignups: MockUser[];
}

function generateMockData(): AdminStats {
  // Generate users
  const users: MockUser[] = [];
  for (let i = 0; i < 156; i++) {
    const first = randomItem(FIRST_NAMES);
    const last = randomItem(LAST_NAMES);
    const day = Math.floor((i / 156) * 30);
    users.push({
      id: `user-${i}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
      display_name: `${first} ${last}`,
      created_at: daysAgo(30 - day).toISOString(),
    });
  }

  // Generate spins
  const spins: MockSpin[] = [];
  const destCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};
  const dailySpinCounts: Record<string, number> = {};
  const regions = REGIONS.filter((r) => r !== "All Regions");

  for (let i = 0; i < 487; i++) {
    const user = randomItem(users);
    const dest = randomItem(DESTINATIONS);
    const day = randomInt(0, 29);
    const date = daysAgo(day);
    const dateKey = date.toISOString().slice(0, 10);
    const useFilter = rand() > 0.6;

    spins.push({
      id: `spin-${i}`,
      user: user.display_name,
      destination_name: dest.name,
      destination_country: dest.country,
      region: dest.region,
      region_filter: useFilter ? dest.region : null,
      created_at: date.toISOString(),
    });

    destCounts[dest.id] = (destCounts[dest.id] || 0) + 1;
    regionCounts[dest.region] = (regionCounts[dest.region] || 0) + 1;
    dailySpinCounts[dateKey] = (dailySpinCounts[dateKey] || 0) + 1;
  }

  // Sort spins by date descending
  spins.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // Generate transactions
  const transactions: MockTransaction[] = [];
  const dailyRevenueCounts: Record<string, number> = {};
  let totalRevenue = 0;

  for (let i = 0; i < 43; i++) {
    const user = randomItem(users);
    const pack = randomItem(CREDIT_PACKS);
    const day = randomInt(0, 29);
    const date = daysAgo(day);
    const dateKey = date.toISOString().slice(0, 10);
    const price = pack.price / 100;

    transactions.push({
      id: `txn-${i}`,
      user: user.display_name,
      amount: price,
      pack_label: pack.label,
      created_at: date.toISOString(),
    });

    dailyRevenueCounts[dateKey] = (dailyRevenueCounts[dateKey] || 0) + price;
    totalRevenue += price;
  }

  // Build daily arrays for last 30 days
  const dailySpins: DailyDataPoint[] = [];
  const dailyRevenue: DailyDataPoint[] = [];
  for (let i = 29; i >= 0; i--) {
    const dateKey = daysAgo(i).toISOString().slice(0, 10);
    dailySpins.push({ date: dateKey, value: dailySpinCounts[dateKey] || 0 });
    dailyRevenue.push({
      date: dateKey,
      value: Math.round((dailyRevenueCounts[dateKey] || 0) * 100) / 100,
    });
  }

  // Region breakdown
  const regionBreakdown: RegionDataPoint[] = regions
    .map((r) => ({ region: r, count: regionCounts[r] || 0 }))
    .sort((a, b) => b.count - a.count);

  // Top destinations
  const topDestinations: TopDestination[] = Object.entries(destCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([id, count]) => {
      const dest = DESTINATIONS.find((d) => d.id === id)!;
      return {
        name: dest.name,
        country: dest.country,
        region: dest.region,
        count,
      };
    });

  // Week-over-week changes
  const thisWeekSpins = dailySpins.slice(-7).reduce((s, d) => s + d.value, 0);
  const lastWeekSpins = dailySpins.slice(-14, -7).reduce((s, d) => s + d.value, 0);
  const thisWeekRevenue = dailyRevenue.slice(-7).reduce((s, d) => s + d.value, 0);
  const lastWeekRevenue = dailyRevenue.slice(-14, -7).reduce((s, d) => s + d.value, 0);
  const thisWeekUsers = users.filter((u) => {
    const d = new Date(u.created_at);
    return d >= daysAgo(7);
  }).length;
  const lastWeekUsers = users.filter((u) => {
    const d = new Date(u.created_at);
    return d >= daysAgo(14) && d < daysAgo(7);
  }).length;

  const pctChange = (current: number, previous: number) =>
    previous === 0 ? 100 : Math.round(((current - previous) / previous) * 100);

  return {
    overview: {
      totalUsers: users.length,
      totalSpins: spins.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      waitlistCount: 2847 + 83,
      activeSubscriptions: 34,
      weekOverWeekUsers: pctChange(thisWeekUsers, lastWeekUsers),
      weekOverWeekSpins: pctChange(thisWeekSpins, lastWeekSpins),
      weekOverWeekRevenue: pctChange(thisWeekRevenue, lastWeekRevenue),
    },
    dailySpins,
    dailyRevenue,
    regionBreakdown,
    topDestinations,
    recentSpins: spins.slice(0, 10),
    recentSignups: users
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 10),
  };
}

// Cache the result so it's deterministic within a session
let cached: AdminStats | null = null;

export function getAdminStats(): AdminStats {
  if (!cached) {
    cached = generateMockData();
  }
  return cached;
}
