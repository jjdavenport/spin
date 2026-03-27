"use client";

import { X, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReturningUser } from "@/lib/hooks/use-returning-user";

export function ReturningUserBanner() {
  const { isReturning, lastDestination, savedCount, dismissed, dismiss } =
    useReturningUser();

  if (!isReturning || !lastDestination || dismissed) return null;

  return (
    <div className="relative w-full max-w-lg mx-auto mb-4 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md animate-fade-in-up">
      <button
        onClick={dismiss}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center">
          <MapPin className="h-4 w-4 text-amber-400" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-white/80">
            Last time you landed on{" "}
            <span className="font-bold text-white">
              {lastDestination.name}
            </span>
            . Ready for somewhere new?
          </p>
          {savedCount > 0 && (
            <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {savedCount} saved destination{savedCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
