"use client";

import { useEffect, useState, useCallback } from "react";
import { Users, Plane, Hotel, Compass } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const partners = [
  { icon: Plane, name: "Skyscanner" },
  { icon: Hotel, name: "Booking.com" },
  { icon: Compass, name: "Viator" },
];

const TARGET = 2800;
const DURATION = 1500;

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target, duration]);

  useEffect(() => {
    if (start) animate();
  }, [start, animate]);

  return count;
}

export function SocialProof() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const count = useCountUp(TARGET, DURATION, isVisible);

  return (
    <section ref={ref} className="px-4 py-24 sm:py-32 border-y border-border/50">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Waitlist counter */}
        <div className="space-y-3">
          <div
            className={`inline-flex items-center gap-2 text-sm text-muted-foreground ${
              isVisible ? "animate-reveal-slide-up" : "opacity-0"
            }`}
          >
            <Users className="h-4 w-4" />
            Growing community
          </div>
          <p
            className={`text-4xl sm:text-5xl font-bold tracking-tight ${
              isVisible ? "animate-count-up-blur" : "opacity-0"
            }`}
            style={isVisible ? { animationDelay: "0.2s" } : undefined}
          >
            {isVisible ? `${count.toLocaleString()}+` : "0+"}
          </p>
          <p
            className={`text-muted-foreground ${
              isVisible ? "animate-reveal-slide-up" : "opacity-0"
            }`}
            style={isVisible ? { animationDelay: "0.4s" } : undefined}
          >
            future adventurers on the waitlist
          </p>
        </div>

        {/* Partners */}
        <div className="space-y-4">
          <p
            className={`text-sm text-muted-foreground uppercase tracking-widest ${
              isVisible ? "animate-reveal-slide-up" : "opacity-0"
            }`}
            style={isVisible ? { animationDelay: "0.5s" } : undefined}
          >
            Book through partners you trust
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {partners.map((p, i) => (
              <div
                key={p.name}
                className={`flex items-center gap-2 text-muted-foreground ${
                  isVisible ? "animate-reveal-slide-up" : "opacity-0"
                }`}
                style={
                  isVisible
                    ? { animationDelay: `${0.6 + i * 0.1}s` }
                    : undefined
                }
              >
                <p.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
