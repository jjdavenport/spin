"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Globe from "@/components/globe";
import SpinButton from "@/components/spin-button";
import RegionFilter from "@/components/region-filter";
import CreditBalance from "@/components/credit-balance";
import RevealOverlay from "@/components/reveal-overlay";
import { Destination, SpinPhase } from "@/lib/types";
import { DESTINATIONS } from "@/lib/mock-data";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import { getUnsplashUrl } from "@/components/destination-hero-image";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { useShare } from "@/lib/hooks/use-share";
import { useSavedDestinations } from "@/lib/hooks/use-saved-destinations";
import { toast } from "sonner";

export default function SpinPage() {
  const router = useRouter();
  const [credits, setCredits] = useState(3);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(
    "All Regions"
  );
  const [phase, setPhase] = useState<SpinPhase>("idle");
  const [spinTarget, setSpinTarget] = useState<Destination | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);

  const { playWhoosh, playImpact, playChime } = useSoundEffects();
  const { share } = useShare();
  const { toggleSave, isSaved } = useSavedDestinations();

  useEffect(() => {
    fetch("/api/spin/balance")
      .then((r) => r.json())
      .then((data) => setCredits(data.balance))
      .catch(() => {});
  }, []);

  const handleSpin = async () => {
    setPhase("spinning");
    playWhoosh();

    try {
      const res = await fetch("/api/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: selectedRegion }),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || "Spin failed");
        setPhase("idle");
        return;
      }

      const data = await res.json();
      setDestination(data.destination);
      setSpinTarget(data.destination);
      setCredits(data.remainingCredits);

      // Preload hero image
      const details = DESTINATION_DETAILS[data.destination.id];
      if (details) {
        const img = new Image();
        img.src = getUnsplashUrl(details.unsplash_photo_id);
      }

      // Dispatch event for nav to pick up
      window.dispatchEvent(
        new CustomEvent("credits-updated", {
          detail: data.remainingCredits,
        })
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
      setPhase("idle");
    }
  };

  const handlePhaseChange = useCallback(
    (newPhase: SpinPhase) => {
      setPhase(newPhase);
      if (newPhase === "revealing") {
        playImpact();
      } else if (newPhase === "revealed") {
        playChime();
      }
    },
    [playImpact, playChime]
  );

  const handleSpinAgain = () => {
    setPhase("idle");
    setSpinTarget(null);
    setDestination(null);
    // Small delay before allowing next spin so globe resets
    setTimeout(() => {
      if (credits > 0) handleSpin();
    }, 300);
  };

  const handleViewDetails = () => {
    if (destination) {
      router.push(`/destination/${destination.id}`);
    }
  };

  const handleSave = () => {
    if (destination) {
      const wasSaved = isSaved(destination.id);
      toggleSave(destination.id);
      toast.success(
        wasSaved
          ? `Removed ${destination.name} from saved`
          : `Saved ${destination.name} for later`
      );
    }
  };

  const handleShare = async () => {
    if (!destination) return;
    const result = await share(destination);
    if (result === "copied") {
      toast.success("Link copied to clipboard!");
    } else if (result === "failed") {
      toast.error("Couldn't share. Try copying the URL.");
    }
  };

  const handleDismiss = () => {
    setPhase("idle");
    setSpinTarget(null);
    setDestination(null);
  };

  const isSpinning = phase === "spinning";
  const showControls = phase === "idle" || phase === "spinning";
  const showOverlay = phase === "revealing" || phase === "revealed";

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100dvh-3.5rem)]">
      {/* Globe fills the background */}
      <div className="absolute inset-0">
        <Globe
          destinations={DESTINATIONS}
          selectedRegion={selectedRegion}
          spinTarget={spinTarget}
          phase={phase}
          onPhaseChange={handlePhaseChange}
        />
      </div>

      {/* Floating controls overlay */}
      {showControls && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full py-4 sm:py-6 pointer-events-none">
          {/* Top: region filter */}
          <div className="pointer-events-auto flex items-center gap-3">
            <RegionFilter
              value={selectedRegion}
              onChange={setSelectedRegion}
              disabled={isSpinning}
            />
            <CreditBalance credits={credits} />
          </div>

          {/* Center spacer */}
          <div />

          {/* Bottom: spin button */}
          <div className="pointer-events-auto flex flex-col items-center gap-3">
            {credits <= 0 && !isSpinning && (
              <a
                href="/credits"
                className="text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4"
              >
                Buy more credits to keep spinning
              </a>
            )}
            <SpinButton
              onClick={handleSpin}
              disabled={isSpinning}
              isSpinning={isSpinning}
              credits={credits}
            />
          </div>
        </div>
      )}

      {/* Reveal overlay */}
      {showOverlay && destination && (
        <RevealOverlay
          destination={destination}
          phase={phase}
          isSaved={isSaved(destination.id)}
          onViewDetails={handleViewDetails}
          onSpinAgain={handleSpinAgain}
          onSave={handleSave}
          onShare={handleShare}
        />
      )}
    </div>
  );
}
