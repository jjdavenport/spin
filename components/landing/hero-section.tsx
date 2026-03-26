"use client";

import dynamic from "next/dynamic";
import { Globe, MapPin, Coins } from "lucide-react";
import { WaitlistForm } from "./waitlist-form";

const HeroGlobe = dynamic(
  () => import("./hero-globe").then((mod) => ({ default: mod.HeroGlobe })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-20">
      {/* 3D Globe background */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroGlobe />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter">
          Spin the Globe.
          <br />
          <span className="text-muted-foreground">Book the Trip.</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-lg mx-auto">
          A random destination generator that turns spontaneity into real trips.
          Spin, discover, and book — all in one place.
        </p>

        <div className="flex justify-center pt-2">
          <WaitlistForm />
        </div>

        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 pt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            57 Destinations
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            7 Regions
          </div>
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            From $2.99
          </div>
        </div>
      </div>
    </section>
  );
}
