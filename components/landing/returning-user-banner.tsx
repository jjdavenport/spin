"use client";

import { useState, useRef, useEffect } from "react";
import { X, MapPin, Heart } from "lucide-react";
import { useReturningUser } from "@/lib/hooks/use-returning-user";

export function ReturningUserBanner() {
  const { isReturning, lastDestination, savedCount, dismissed, dismiss } =
    useReturningUser();
  const [phase, setPhase] = useState<"visible" | "fading" | "collapsing" | "done">(
    "visible"
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  if (!isReturning || !lastDestination) return null;
  if (dismissed || phase === "done") return <div className="h-0 w-0" />;

  const handleDismiss = () => {
    // Phase 1: fade out (opacity only, no layout shift)
    setPhase("fading");
  };

  const handleFadeEnd = () => {
    if (phase !== "fading") return;
    // Phase 2: collapse height smoothly
    const el = wrapperRef.current;
    if (el) {
      // Set explicit height so transition works
      el.style.height = el.offsetHeight + "px";
      el.style.marginBottom = "16px";
      // Force reflow then collapse
      el.offsetHeight;
      el.style.height = "0px";
      el.style.marginBottom = "0px";
    }
    setPhase("collapsing");
  };

  const handleCollapseEnd = () => {
    if (phase === "collapsing") {
      setPhase("done");
      dismiss();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden transition-[height,margin-bottom] duration-300 ease-out"
      style={phase === "visible" ? { marginBottom: 16 } : undefined}
      onTransitionEnd={handleCollapseEnd}
    >
      <div
        className={`relative w-full max-w-lg mx-auto rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-opacity duration-200 ease-out ${
          phase === "fading" || phase === "collapsing"
            ? "opacity-0"
            : "opacity-100 animate-fade-in-up"
        }`}
        onTransitionEnd={(e) => {
          e.stopPropagation();
          if (e.propertyName === "opacity") handleFadeEnd();
        }}
      >
        <div className="px-4 py-3">
          <button
            onClick={handleDismiss}
            className="absolute top-2.5 right-2.5 p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white/70 transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-3 pr-6">
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
      </div>
    </div>
  );
}
