"use client";

import { Suspense, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const CREDIT_PACKS = [
  { id: "pack_5", credits: 5, label: "5 Credits" },
  { id: "pack_20", credits: 20, label: "20 Credits" },
  { id: "pack_50", credits: 50, label: "50 Credits" },
] as const;

function CreditsContent() {
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/spin/balance")
      .then((r) => r.json())
      .then((data) => setCredits(data.balance))
      .catch(() => {});
  }, []);

  const handleAdd = async (packId: string) => {
    setLoading(packId);
    const pack = CREDIT_PACKS.find((p) => p.id === packId);
    if (pack) {
      try {
        const res = await fetch("/api/spin/credits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credits: pack.credits }),
        });
        const data = await res.json();
        if (data.success) {
          setCredits(data.balance);
          setSuccessMessage(`${pack.credits} credits added!`);
          window.dispatchEvent(
            new CustomEvent("credits-updated", {
              detail: data.balance,
            })
          );
        }
      } catch {
        // Silently fail
      }
    }
    setLoading(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Credits</h1>
        <p className="text-muted-foreground mt-1">
          Add credits to spin the globe and discover new destinations.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between py-6">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-3xl sm:text-4xl font-bold font-mono">{credits}</p>
          </div>
          <Badge
            variant={credits > 0 ? "default" : "destructive"}
            className="text-base px-4 py-2"
          >
            {credits === 0
              ? "No credits"
              : `${credits} spin${credits !== 1 ? "s" : ""} remaining`}
          </Badge>
        </CardContent>
      </Card>

      {successMessage && (
        <Card className="mb-6 border-green-500/30 bg-green-500/5">
          <CardContent className="py-4 text-center text-green-400">
            {successMessage}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {CREDIT_PACKS.map((pack) => (
          <Card
            key={pack.id}
            className="relative overflow-hidden transition-colors hover:border-primary/50"
          >
            {pack.id === "pack_20" && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-blue-500 text-white text-xs">
                  Popular
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl font-mono">
                {pack.credits}
              </CardTitle>
              <CardDescription>credits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                onClick={() => handleAdd(pack.id)}
                disabled={loading !== null}
              >
                {loading === pack.id ? "Adding..." : `Add ${pack.credits} Credits`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CreditsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-24 w-full" />
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        </div>
      }
    >
      <CreditsContent />
    </Suspense>
  );
}
