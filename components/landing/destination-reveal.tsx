"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Destination, DestinationDetails } from "@/lib/types";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import DestinationHeroImage from "@/components/destination-hero-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDown,
  RotateCcw,
  Heart,
  Share2,
  Calendar,
  DollarSign,
  FileText,
} from "lucide-react";
import { CountryFlag } from "@/components/country-flag";

interface DestinationRevealProps {
  destination: Destination;
  isSaved: boolean;
  onBookTrip: () => void;
  onSpinAgain: () => void;
  onSave: () => void;
  onShare: () => void;
}

export function DestinationReveal({
  destination,
  isSaved,
  onBookTrip,
  onSpinAgain,
  onSave,
  onShare,
}: DestinationRevealProps) {
  const details: DestinationDetails | undefined =
    DESTINATION_DETAILS[destination.id];
  const confettiFired = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Fire confetti on mount
  useEffect(() => {
    if (confettiFired.current) return;
    confettiFired.current = true;

    // Scroll into view
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    // Fire confetti burst
    setTimeout(() => {
      const colors = ["#f59e0b", "#06b6d4", "#f43f5e", "#a855f7", "#22c55e"];
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors,
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
          disableForReducedMotion: true,
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
          disableForReducedMotion: true,
        });
      }, 200);
    }, 300);
  }, []);

  const flag = destination.country;

  return (
    <section
      ref={sectionRef}
      id="destination-reveal"
      className="relative min-h-[80vh] flex flex-col"
    >
      {/* Hero Image Background */}
      {details && (
        <DestinationHeroImage
          unsplashPhotoId={details.unsplash_photo_id}
          destinationName={destination.name}
          region={destination.region}
          className="absolute inset-0"
        />
      )}

      {/* Content overlay */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
        {/* Tagline */}
        <p
          className="text-sm sm:text-base text-white/60 uppercase tracking-[0.25em] font-light animate-reveal-text-up"
          style={{ animationDelay: "0.2s" }}
        >
          Your next adventure
        </p>

        {/* Destination name */}
        <h2
          className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-white mt-3 tracking-tighter leading-[0.85] animate-reveal-text-up"
          style={{ animationDelay: "0.4s" }}
        >
          {destination.name}
        </h2>

        {/* Country + flag + region */}
        <div
          className="flex items-center gap-3 mt-4 animate-reveal-text-up"
          style={{ animationDelay: "0.6s" }}
        >
          <CountryFlag country={flag} size={28} />
          <span className="text-xl sm:text-2xl text-white/80 font-light">
            {destination.country}
          </span>
          <Badge
            variant="secondary"
            className="text-xs bg-white/10 text-white/70 border-white/20"
          >
            {destination.region}
          </Badge>
        </div>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-white/50 mt-4 max-w-lg leading-relaxed font-light animate-reveal-text-up"
          style={{ animationDelay: "0.8s" }}
        >
          {destination.description}
        </p>

        {/* Quick Stats */}
        {details && (
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 w-full max-w-2xl animate-reveal-text-up"
            style={{ animationDelay: "1s" }}
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Best Time
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    {details.best_time_to_visit}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <DollarSign className="h-4 w-4 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Daily Budget
                  </p>
                  <p className="text-xs text-white/80 mt-0.5">
                    {details.budget_range.currency} {details.budget_range.low}–
                    {details.budget_range.high}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="py-3 px-4 flex items-center gap-3">
                <FileText className="h-4 w-4 text-cyan-400 shrink-0" />
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Visa
                  </p>
                  <p className="text-xs text-white/80 mt-0.5 line-clamp-2">
                    {details.visa_info}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Action Buttons */}
        <div
          className="mt-8 flex flex-col items-center gap-3 animate-reveal-stagger-in"
          style={{ animationDelay: "1.2s" }}
        >
          <Button
            size="lg"
            onClick={onBookTrip}
            className="h-13 px-8 text-base font-bold rounded-full bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            <ArrowDown className="mr-2 h-5 w-5" />
            Book This Trip
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              onClick={onSpinAgain}
              className="rounded-full h-11 px-5 bg-white/10 hover:bg-white/20 text-white border-white/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Spin Again
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onSave}
              className={`rounded-full h-11 w-11 text-white hover:text-white hover:bg-white/15 ${
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
              className="rounded-full h-11 w-11 text-white hover:text-white hover:bg-white/15"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
