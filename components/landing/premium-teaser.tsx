"use client";

import { Button } from "@/components/ui/button";
import {
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  BookOpen,
  History,
  Zap,
} from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const FEATURES = [
  {
    icon: RotateCcw,
    title: "Unlimited Spins",
    desc: "Spin as many times as you want, no limits",
  },
  {
    icon: SlidersHorizontal,
    title: "All Filters Unlocked",
    desc: "Budget, climate, visa-free, and more",
  },
  {
    icon: BookOpen,
    title: "Curated Itineraries",
    desc: "Expert-built trip plans for every destination",
  },
  {
    icon: History,
    title: "Trip History & Saves",
    desc: "Never lose a destination you loved",
  },
];

export function PremiumTeaser() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Card with gradient border */}
        <div
          className={`relative rounded-2xl p-[1px] bg-gradient-to-br from-amber-400/50 via-cyan-400/30 to-purple-400/50 ${
            isVisible ? "animate-reveal-tilt-up" : "opacity-0"
          }`}
          style={{ perspective: "1000px" }}
        >
          <div className="rounded-2xl bg-background/95 backdrop-blur-sm p-8 sm:p-12">
            <div
              className={`text-center ${
                isVisible ? "animate-reveal-slide-up" : "opacity-0"
              }`}
              style={isVisible ? { animationDelay: "0.2s" } : undefined}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-medium mb-4">
                <Zap className="h-3 w-3" />
                Coming Soon
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Adventure Pass
              </h2>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Unlock the full Spin experience. One subscription, unlimited
                adventures.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {FEATURES.map((feature, i) => (
                <div
                  key={feature.title}
                  className={`flex items-start gap-3 p-3 rounded-lg ${
                    isVisible ? "animate-reveal-stagger-in" : "opacity-0"
                  }`}
                  style={
                    isVisible ? { animationDelay: `${0.4 + i * 0.1}s` } : undefined
                  }
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`text-center mt-8 ${
                isVisible ? "animate-reveal-slide-up" : "opacity-0"
              }`}
              style={isVisible ? { animationDelay: "0.8s" } : undefined}
            >
              <Button
                size="lg"
                className={`rounded-full px-8 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-bold shadow-[0_0_30px_rgba(245,158,11,0.2)] ${
                  isVisible ? "animate-glow-pulse" : ""
                }`}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Join the Waitlist
              </Button>
              <p className="text-xs text-muted-foreground/50 mt-3">
                Be the first to know when Adventure Pass launches
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
