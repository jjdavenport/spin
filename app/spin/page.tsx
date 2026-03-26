"use client";

import { useState, useCallback, useEffect } from "react";
import Globe from "@/components/globe";
import SpinButton from "@/components/spin-button";
import DestinationCard from "@/components/destination-card";
import RegionFilter from "@/components/region-filter";
import CreditBalance from "@/components/credit-balance";
import { Destination } from "@/lib/types";
import { DESTINATIONS } from "@/lib/mock-data";

export default function SpinPage() {
  const [credits, setCredits] = useState(3);
  const [selectedRegion, setSelectedRegion] = useState<string | null>("All Regions");
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinTarget, setSpinTarget] = useState<Destination | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [lastDestination, setLastDestination] = useState<Destination | null>(null);

  useEffect(() => {
    fetch("/api/spin/balance")
      .then((r) => r.json())
      .then((data) => setCredits(data.balance))
      .catch(() => {});
  }, []);

  const handleSpin = async () => {
    setShowResult(false);
    setIsSpinning(true);

    try {
      const res = await fetch("/api/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ region: selectedRegion }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Spin failed");
        setIsSpinning(false);
        return;
      }

      const data = await res.json();
      setSpinTarget(data.destination);
      setLastDestination(data.destination);
      setCredits(data.remainingCredits);

      // Dispatch event for nav to pick up
      window.dispatchEvent(
        new CustomEvent("credits-updated", { detail: data.remainingCredits })
      );
    } catch {
      alert("Something went wrong. Please try again.");
      setIsSpinning(false);
    }
  };

  const handleSpinComplete = useCallback(() => {
    setIsSpinning(false);
    setShowResult(true);
  }, []);

  return (
    <div className="relative flex-1 flex flex-col h-[calc(100dvh-3.5rem)]">
      {/* Globe fills the background */}
      <div className="absolute inset-0">
        <Globe
          destinations={DESTINATIONS}
          selectedRegion={selectedRegion}
          spinTarget={spinTarget}
          isSpinning={isSpinning}
          onSpinComplete={handleSpinComplete}
        />
      </div>

      {/* Floating controls overlay */}
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

        {/* Center: destination result */}
        <div className="pointer-events-auto">
          {lastDestination && (
            <DestinationCard destination={lastDestination} show={showResult} />
          )}
        </div>

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
    </div>
  );
}
