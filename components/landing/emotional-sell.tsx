"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

export function EmotionalSell() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 sm:py-40 px-4"
    >
      {/* Background image — Ken Burns settle on reveal */}
      <div
        className={`absolute inset-0 ${
          isVisible ? "animate-ken-burns-settle" : ""
        }`}
        style={!isVisible ? { transform: "scale(1.1)" } : undefined}
      >
        <Image
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=80&auto=format"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Content — clip-path wipe reveal */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          <span
            className={`inline-block ${
              isVisible ? "animate-text-reveal-line" : "opacity-0"
            }`}
            style={isVisible ? { animationDelay: "0.3s" } : undefined}
          >
            Stop scrolling.
          </span>
          <br />
          <span
            className={`inline-block ${
              isVisible ? "animate-text-reveal-line" : "opacity-0"
            }`}
            style={isVisible ? { animationDelay: "0.6s" } : undefined}
          >
            Start exploring.
          </span>
        </p>
        <p
          className={`mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
          style={isVisible ? { animationDelay: "0.9s" } : undefined}
        >
          Let the globe decide and we&apos;ll handle the rest. Your next story
          starts with a single spin.
        </p>
      </div>
    </section>
  );
}
