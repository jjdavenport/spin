import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TopDestination {
  name: string;
  country: string;
  region: string;
  count: number;
}

interface TopDestinationsProps {
  destinations: TopDestination[];
}

export function TopDestinations({ destinations }: TopDestinationsProps) {
  const max = Math.max(...destinations.map((d) => d.count), 1);

  return (
    <Card className="bg-card/50 border-border">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Top Destinations
        </h3>
        <div className="space-y-3">
          {destinations.map((dest, i) => (
            <div key={dest.name} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-mono w-5 text-right">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {dest.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {dest.country}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/50 mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-500/70"
                    style={{ width: `${(dest.count / max) * 100}%` }}
                  />
                </div>
              </div>
              <Badge variant="outline" className="text-[10px] py-0 shrink-0">
                {dest.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
