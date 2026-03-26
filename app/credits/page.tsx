"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { CREDIT_PACKS } from "@/lib/constants";
import { addMockCredits } from "@/lib/mock-data";

function CreditsContent() {
  const searchParams = useSearchParams();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/spin/balance")
      .then((r) => r.json())
      .then((data) => setCredits(data.balance))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const success = searchParams.get("success");
    const creditsAdded = searchParams.get("credits");
    if (success === "true" && creditsAdded) {
      setSuccessMessage(`${creditsAdded} credits added to your account!`);
      fetch("/api/spin/balance")
        .then((r) => r.json())
        .then((data) => setCredits(data.balance))
        .catch(() => {});
    }
  }, [searchParams]);

  const handlePurchase = async (packId: string) => {
    setLoading(packId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        const pack = CREDIT_PACKS.find((p) => p.id === packId);
        if (pack) {
          addMockCredits(pack.credits);
          setCredits((prev) => prev + pack.credits);
          setSuccessMessage(`${pack.credits} credits added! (Demo mode)`);
          window.dispatchEvent(
            new CustomEvent("credits-updated", {
              detail: credits + pack.credits,
            })
          );
        }
      }
    } catch {
      const pack = CREDIT_PACKS.find((p) => p.id === packId);
      if (pack) {
        addMockCredits(pack.credits);
        setCredits((prev) => prev + pack.credits);
        setSuccessMessage(`${pack.credits} credits added! (Demo mode)`);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
        <p className="text-muted-foreground mt-1">
          Purchase credits to spin the globe and discover new destinations.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="flex items-center justify-between py-6">
          <div>
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <p className="text-4xl font-bold font-mono">{credits}</p>
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
              <p className="text-3xl font-bold">{pack.priceLabel}</p>
              <p className="text-xs text-muted-foreground">
                ${((pack.price / 100) / pack.credits).toFixed(2)} per spin
              </p>
              <Button
                className="w-full"
                onClick={() => handlePurchase(pack.id)}
                disabled={loading !== null}
              >
                {loading === pack.id ? "Processing..." : "Buy Now"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center mt-6">
        Payments processed securely by Stripe. Credits are non-refundable.
      </p>
    </div>
  );
}

export default function CreditsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto p-6 space-y-6">
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
