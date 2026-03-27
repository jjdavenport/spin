"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, Compass, Star } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const destination = {
  name: "Bali",
  country: "Indonesia",
  region: "Asia",
  unsplash_photo_id: "1537996194471-e657df975ab4",
  budget: "$40–150 / day",
  highlights: [
    "Watch sunrise from Mount Batur",
    "Explore Ubud's rice terraces",
    "Surf at Uluwatu",
  ],
};

const bookingOptions = [
  { icon: Plane, label: "Flights", partner: "Skyscanner", color: "text-blue-400" },
  { icon: Hotel, label: "Hotels", partner: "Booking.com", color: "text-emerald-400" },
  { icon: Compass, label: "Experiences", partner: "Viator", color: "text-amber-400" },
];

export function ProductPreview() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="px-4 py-24 sm:py-32" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-12 sm:mb-16 ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            What You&apos;ll Get
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            A taste of what&apos;s coming
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Every spin reveals a curated destination card with everything you
            need to turn it into a real trip.
          </p>
        </div>

        {/* Preview card — 3D tilt-up reveal */}
        <div className="max-w-lg mx-auto" style={{ perspective: "1000px" }}>
          <Card
            className={`overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm ${
              isVisible ? "animate-reveal-tilt-up" : "opacity-0"
            }`}
            style={isVisible ? { animationDelay: "0.3s" } : undefined}
          >
            {/* Hero image */}
            <div className="relative h-48 sm:h-56">
              <Image
                src={`https://images.unsplash.com/photo-${destination.unsplash_photo_id}?w=800&q=80&auto=format`}
                alt={destination.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="text-xs">
                  {destination.region}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6 space-y-5">
              {/* Title & budget */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {destination.country}
                  </p>
                </div>
                <span className="text-sm font-mono text-muted-foreground">
                  {destination.budget}
                </span>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                {destination.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2 text-sm">
                    <Star className="h-3.5 w-3.5 mt-0.5 text-amber-400 shrink-0" />
                    <span className="text-muted-foreground">{h}</span>
                  </div>
                ))}
              </div>

              {/* Booking buttons — stagger in after card lands */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {bookingOptions.map((opt, i) => (
                  <div
                    key={opt.label}
                    className={`flex flex-col items-center gap-1.5 rounded-lg border border-border/50 py-3 px-2 ${
                      isVisible ? "animate-reveal-slide-up" : "opacity-0"
                    }`}
                    style={
                      isVisible
                        ? { animationDelay: `${0.8 + i * 0.15}s` }
                        : undefined
                    }
                  >
                    <opt.icon className={`h-5 w-5 ${opt.color}`} />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {opt.partner}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
