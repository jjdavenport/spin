"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";
import { Globe as GlobeIcon, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegionFilter from "@/components/region-filter";
import { Destination, SpinPhase } from "@/lib/types";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import { getUnsplashUrl } from "@/components/destination-hero-image";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { toast } from "sonner";
import { ReturningUserBanner } from "./returning-user-banner";
import type { HeroGlobeHandle } from "./hero-globe-interactive";

const HeroGlobeInteractive = dynamic(
  () =>
    import("./hero-globe-interactive").then((mod) => ({
      default: mod.HeroGlobeInteractive,
    })),
  { ssr: false }
);

interface HeroSectionLiveProps {
  onDestinationRevealed: (destination: Destination) => void;
  onSpinAgain: () => void;
  phase: SpinPhase;
  setPhase: (phase: SpinPhase) => void;
}

export function HeroSectionLive({
  onDestinationRevealed,
  onSpinAgain,
  phase,
  setPhase,
}: HeroSectionLiveProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    "All Regions"
  );
  const globeRef = useRef<HeroGlobeHandle>(null);

  const { playWhoosh, playImpact, playChime } = useSoundEffects();

  // Reset globe when returning to idle
  useEffect(() => {
    if (phase === "idle" && globeRef.current) {
      globeRef.current.reset();
    }
  }, [phase]);

  const handleSpin = async () => {
    setPhase("spinning");
    playWhoosh();

    try {
      const res = await fetch("/api/spin/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: selectedRegion }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (data.requiresAuth) {
          toast.error("Sign up for unlimited spins!");
        } else {
          toast.error(data.error || "Spin failed");
        }
        setPhase("idle");
        return;
      }

      const data = await res.json();
      const dest: Destination = data.destination;

      // Preload hero image
      const details = DESTINATION_DETAILS[dest.id];
      if (details) {
        const img = new Image();
        img.src = getUnsplashUrl(details.unsplash_photo_id);
      }

      // Start physical globe spin toward destination coordinates
      globeRef.current?.spin(dest.latitude, dest.longitude);

      // Phase transitions aligned with globe deceleration
      setTimeout(() => {
        setPhase("revealing");
        playImpact();
      }, 2000);

      setTimeout(() => {
        setPhase("revealed");
        playChime();
        onDestinationRevealed(dest);
      }, 3200);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setPhase("idle");
    }
  };

  const isSpinning = phase === "spinning";
  const isActive = phase !== "idle";

  return (
    <section className="relative min-h-dvh flex flex-col">
      {/* R3F Globe fills the entire hero */}
      <div className="absolute inset-0">
        <HeroGlobeInteractive ref={globeRef} />
      </div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-black/60 via-transparent to-black/70" />

      {/* Top controls */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-18 sm:pt-20">
        <div className="pointer-events-auto">
          <RegionFilter
            value={selectedRegion}
            onChange={setSelectedRegion}
            disabled={isActive}
          />
        </div>
      </div>

      {/* Center content — headline + spin */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pointer-events-none px-4">
        {/* Returning user banner */}
        {phase === "idle" && (
          <div className="pointer-events-auto mb-2">
            <ReturningUserBanner />
          </div>
        )}

        {/* Only show headline when idle or spinning */}
        <div
          className={`text-center transition-all duration-700 ${
            phase === "revealing" || phase === "revealed"
              ? "opacity-0 -translate-y-8"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9]">
            Spin the Globe.
            <br />
            <span className="text-muted-foreground/80">Book the Trip.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground/70 max-w-md mx-auto mt-4 font-light">
            A random destination generator that turns spontaneity into
            adventure. Spin, discover, and book — all in one place.
          </p>

          {/* Spin Button */}
          <div className="pointer-events-auto mt-8">
            <Button
              onClick={handleSpin}
              disabled={isActive}
              size="lg"
              className="h-14 px-10 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              {isSpinning ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Spinning...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Spin the Globe
                </span>
              )}
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 mt-8 text-sm text-muted-foreground/60">
            <div className="flex items-center gap-2">
              <GlobeIcon className="h-4 w-4" />
              57 Destinations
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              7 Regions
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Free to Spin
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator at bottom (idle only) */}
      {phase === "idle" && (
        <div className="relative z-10 flex justify-center pb-6 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-white/40 animate-fade-in-up" />
          </div>
        </div>
      )}
    </section>
  );
}
