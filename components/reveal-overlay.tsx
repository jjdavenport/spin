"use client";

import { Destination, SpinPhase, DestinationDetails } from "@/lib/types";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import DestinationHeroImage from "@/components/destination-hero-image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, ArrowRight, RotateCcw } from "lucide-react";
import { CountryFlag } from "@/components/country-flag";

interface RevealOverlayProps {
  destination: Destination;
  phase: SpinPhase;
  isSaved: boolean;
  onViewDetails: () => void;
  onSpinAgain: () => void;
  onSave: () => void;
  onShare: () => void;
}

export default function RevealOverlay({
  destination,
  phase,
  isSaved,
  onViewDetails,
  onSpinAgain,
  onSave,
  onShare,
}: RevealOverlayProps) {
  const details: DestinationDetails | undefined =
    DESTINATION_DETAILS[destination.id];
  const isRevealing = phase === "revealing";
  const isRevealed = phase === "revealed";

  if (!isRevealing && !isRevealed) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-reveal-backdrop"
      />

      {/* Hero image background */}
      {details && (
        <DestinationHeroImage
          unsplashPhotoId={details.unsplash_photo_id}
          destinationName={destination.name}
          region={destination.region}
          className="absolute inset-0 animate-reveal-image"
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-5 pb-8 sm:pb-12 flex flex-col items-center text-center">
        {/* Tagline */}
        <p
          className="text-sm sm:text-base text-white/70 uppercase tracking-widest font-medium animate-reveal-text-up"
          style={{ animationDelay: "0.3s" }}
        >
          Your next adventure
        </p>

        {/* Destination name */}
        <h1
          className="text-5xl sm:text-7xl font-bold text-white mt-2 animate-reveal-text-up"
          style={{ animationDelay: "0.5s" }}
        >
          {destination.name}
        </h1>

        {/* Country + region */}
        <div
          className="flex items-center gap-3 mt-3 animate-reveal-text-up"
          style={{ animationDelay: "0.7s" }}
        >
          <span className="text-xl sm:text-2xl text-white/80 inline-flex items-center gap-2">
            <CountryFlag country={destination.country} size={24} /> {destination.country}
          </span>
          <Badge variant="secondary" className="text-xs">
            {destination.region}
          </Badge>
        </div>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-white/60 mt-4 max-w-md leading-relaxed animate-reveal-text-up"
          style={{ animationDelay: "0.9s" }}
        >
          {destination.description}
        </p>

        {/* Action buttons */}
        {isRevealed && (
          <div className="mt-8 w-full flex flex-col items-center gap-3">
            {/* Primary CTA */}
            <Button
              size="lg"
              onClick={onViewDetails}
              className="w-full max-w-xs h-12 sm:h-14 text-base sm:text-lg font-bold rounded-full animate-reveal-stagger-in"
              style={{ animationDelay: "0.1s" }}
            >
              Explore & Book
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            {/* Secondary actions */}
            <div
              className="flex items-center gap-3 animate-reveal-stagger-in"
              style={{ animationDelay: "0.25s" }}
            >
              <Button
                variant="secondary"
                size="lg"
                onClick={onSpinAgain}
                className="rounded-full h-11 px-5"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Spin Again
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onSave}
                className={`rounded-full h-11 w-11 text-white hover:text-white hover:bg-white/20 ${
                  isSaved ? "text-rose-400 hover:text-rose-400" : ""
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isSaved ? "currentColor" : "none"}
                />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={onShare}
                className="rounded-full h-11 w-11 text-white hover:text-white hover:bg-white/20"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
