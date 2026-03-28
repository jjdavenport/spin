"use client";

import { RECENT_SPINS } from "@/lib/mock-social-data";
import { getUnsplashUrl } from "@/components/destination-hero-image";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import { CountryFlag } from "@/components/country-flag";

export function RecentSpinsGallery() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  // Double the array for seamless marquee loop
  const spins = [...RECENT_SPINS, ...RECENT_SPINS];

  return (
    <section ref={ref} className="py-16 sm:py-20 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div
          className={isVisible ? "animate-reveal-slide-up" : "opacity-0"}
        >
          <p className="text-center text-sm uppercase tracking-[0.2em] text-muted-foreground/60 font-medium mb-2">
            Where people are landing
          </p>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight">
            Recent spins from the community
          </h2>
        </div>
      </div>

      {/* Marquee container */}
      <div
        className={`relative transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "0.3s" }}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
          {spins.map((spin, i) => (
            <div
              key={`${spin.destinationId}-${i}`}
              className="shrink-0 w-[200px] sm:w-[240px] rounded-xl overflow-hidden border border-border/30 bg-card/50 backdrop-blur-sm group"
            >
              {/* Image */}
              <div className="relative h-28 sm:h-32 overflow-hidden">
                {spin.unsplashPhotoId ? (
                  <img
                    src={getUnsplashUrl(spin.unsplashPhotoId, 480, 320)}
                    alt={spin.destinationName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <p className="text-white font-bold text-sm">
                    {spin.destinationName}
                  </p>
                  <p className="text-white/60 text-xs flex items-center gap-1"><CountryFlag country={spin.country} size={14} /> {spin.country}</p>
                </div>
              </div>

              {/* Caption */}
              <div className="px-3 py-2.5">
                <p className="text-xs text-muted-foreground">
                  <span className="text-foreground font-medium">
                    {spin.name}
                  </span>{" "}
                  landed on {spin.destinationName}
                </p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                  {spin.timeAgo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
