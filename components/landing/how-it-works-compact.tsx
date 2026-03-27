"use client";

import { Globe, MapPin, Plane, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const STEPS = [
  {
    icon: Globe,
    title: "Spin",
    desc: "Hit the button and watch the globe decide your fate",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: MapPin,
    title: "Discover",
    desc: "Land on a random destination with everything you need to know",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Plane,
    title: "Book",
    desc: "Flights, hotels, and experiences — all through our affiliate partners",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

export function HowItWorksCompact() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 bg-muted/10 border-y border-border/30">
      <div className="max-w-4xl mx-auto">
        <div
          className={`text-center mb-2 ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-2">
            How it works
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Three steps to your next adventure
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mt-10">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex items-center gap-4 sm:gap-0">
              <div
                className={`flex flex-col items-center text-center max-w-[180px] ${
                  isVisible ? "animate-reveal-card-flip" : "opacity-0"
                }`}
                style={
                  isVisible ? { animationDelay: `${0.2 + i * 0.2}s` } : undefined
                }
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-3 ${
                    isVisible ? "animate-icon-spin-in" : "opacity-0"
                  }`}
                  style={
                    isVisible ? { animationDelay: `${0.4 + i * 0.2}s` } : undefined
                  }
                >
                  <step.icon className={`h-6 w-6 ${step.color}`} />
                </div>
                <h3 className="font-bold text-base">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Arrow connector (not after last step) */}
              {i < STEPS.length - 1 && (
                <div className="hidden sm:flex items-center px-6">
                  <ArrowRight className="h-5 w-5 text-muted-foreground/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
