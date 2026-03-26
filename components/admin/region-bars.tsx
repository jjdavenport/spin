import { Card, CardContent } from "@/components/ui/card";

interface RegionDataPoint {
  region: string;
  count: number;
}

interface RegionBarsProps {
  data: RegionDataPoint[];
}

const REGION_COLORS: Record<string, string> = {
  Europe: "bg-indigo-500",
  Asia: "bg-amber-500",
  Africa: "bg-emerald-500",
  "North America": "bg-sky-500",
  "South America": "bg-rose-500",
  Oceania: "bg-teal-500",
  "Middle East": "bg-violet-500",
};

export function RegionBars({ data }: RegionBarsProps) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <Card className="bg-card/50 border-border">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Spins by Region
        </h3>
        <div className="space-y-3">
          {data.map((d) => (
            <div key={d.region}>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-foreground font-medium">{d.region}</span>
                <span className="text-muted-foreground font-mono">{d.count}</span>
              </div>
              <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                <div
                  className={`h-full rounded-full ${REGION_COLORS[d.region] || "bg-zinc-500"}`}
                  style={{ width: `${(d.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
