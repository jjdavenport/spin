"use client";

import { WaitlistForm } from "./waitlist-form";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function FinalCta() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="px-4 py-24 sm:py-32" ref={ref}>
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2
          className={`text-3xl sm:text-4xl font-bold tracking-tight ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
        >
          Ready to let the globe decide?
        </h2>
        <p
          className={`text-muted-foreground ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
          style={isVisible ? { animationDelay: "0.15s" } : undefined}
        >
          Join thousands of future adventurers. No spam, just your ticket to
          somewhere new.
        </p>
        <div
          className={`flex justify-center pt-2 ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
          style={isVisible ? { animationDelay: "0.3s" } : undefined}
        >
          <WaitlistForm
            buttonText="Count Me In"
            className={isVisible ? "[&_button]:animate-glow-pulse" : ""}
          />
        </div>
      </div>
    </section>
  );
}
