import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
}

export function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <Card className="bg-card/50 border-border">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight">{value}</div>
        {change !== undefined && (
          <p
            className={cn(
              "text-xs mt-1 font-medium",
              change >= 0 ? "text-emerald-400" : "text-red-400"
            )}
          >
            {change >= 0 ? "+" : ""}
            {change}% from last week
          </p>
        )}
      </CardContent>
    </Card>
  );
}
