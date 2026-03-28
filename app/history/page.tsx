"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SpinHistoryEntry, Destination } from "@/lib/types";

export default function HistoryPage() {
  const [history, setHistory] = useState<
    (SpinHistoryEntry & { destination: Destination })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/spin/history")
      .then((r) => r.json())
      .then((data) => setHistory(data.history))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">Spin History</h1>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-lg" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No spins yet. Go spin the globe!
            </p>
            <a
              href="/"
              className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4 mt-2 inline-block"
            >
              Start spinning
            </a>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry, i) => (
            <Card key={entry.id}>
              <CardContent className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between py-4">
                <div className="space-y-1">
                  <p className="font-semibold text-lg">
                    {entry.destination.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.destination.country}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{entry.destination.region}</Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {new Date(entry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
