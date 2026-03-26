import { getAdminStats } from "@/lib/mock-admin-data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/admin/stat-card";
import { MiniBarChart } from "@/components/admin/mini-bar-chart";
import { RegionBars } from "@/components/admin/region-bars";
import { RecentSpinsTable, RecentSignupsTable } from "@/components/admin/recent-table";
import { TopDestinations } from "@/components/admin/top-destinations";
import Link from "next/link";

function UsersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function DollarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function AdminPage() {
  const stats = getAdminStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            <Link href="/spin" className="text-lg font-bold tracking-tight">
              Spin
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm font-medium text-muted-foreground">
              Admin Dashboard
            </span>
            <Badge variant="outline" className="text-[10px] py-0 text-amber-400 border-amber-400/30">
              Mock Data
            </Badge>
          </div>
          <Link
            href="/spin"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to App
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <StatCard
            label="Total Users"
            value={stats.overview.totalUsers.toLocaleString()}
            change={stats.overview.weekOverWeekUsers}
            icon={<UsersIcon />}
          />
          <StatCard
            label="Total Spins"
            value={stats.overview.totalSpins.toLocaleString()}
            change={stats.overview.weekOverWeekSpins}
            icon={<GlobeIcon />}
          />
          <StatCard
            label="Revenue"
            value={`$${stats.overview.totalRevenue.toLocaleString()}`}
            change={stats.overview.weekOverWeekRevenue}
            icon={<DollarIcon />}
          />
          <StatCard
            label="Waitlist"
            value={stats.overview.waitlistCount.toLocaleString()}
            icon={<ListIcon />}
          />
          <StatCard
            label="Subscriptions"
            value={stats.overview.activeSubscriptions.toLocaleString()}
            icon={<MailIcon />}
          />
        </div>

        {/* Spins Over Time - Full Width */}
        <MiniBarChart
          title="Spins Over Time (30 days)"
          data={stats.dailySpins}
          suffix=" spins"
          color="rgb(99, 102, 241)"
        />

        {/* Revenue + Region - 2 Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <MiniBarChart
            title="Revenue Over Time (30 days)"
            data={stats.dailyRevenue}
            format="currency"
            color="rgb(16, 185, 129)"
          />
          <RegionBars data={stats.regionBreakdown} />
        </div>

        {/* Top Destinations + Recent Spins - 2 Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <TopDestinations destinations={stats.topDestinations} />
          <RecentSpinsTable spins={stats.recentSpins} />
        </div>

        {/* Recent Signups */}
        <RecentSignupsTable signups={stats.recentSignups} />
      </main>
    </div>
  );
}
