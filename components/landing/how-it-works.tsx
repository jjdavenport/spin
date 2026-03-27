"use client";

import { RotateCcw, Map, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const steps = [
  {
    icon: RotateCcw,
    title: "Spin",
    description:
      "Spin an interactive 3D globe and let chance pick your next destination.",
  },
  {
    icon: Map,
    title: "Discover",
    description:
      "Land on a random destination with curated info, photos, and itineraries.",
  },
  {
    icon: Plane,
    title: "Book",
    description:
      "Flights, hotels, and experiences — ready to book through our travel partners.",
  },
];

export function HowItWorks() {
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
            How It Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Three steps to your next adventure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, i) => (
            <Card
              key={step.title}
              className={`relative border-border/50 bg-card/50 backdrop-blur-sm ${
                isVisible ? "animate-reveal-card-flip" : "opacity-0"
              }`}
              style={
                isVisible ? { animationDelay: `${0.2 + i * 0.2}s` } : undefined
              }
            >
              <CardContent className="pt-8 pb-6 px-6 text-center">
                <Badge
                  variant="secondary"
                  className="absolute top-4 left-4 font-mono text-xs"
                >
                  {String(i + 1).padStart(2, "0")}
                </Badge>
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 ${
                    isVisible ? "animate-icon-spin-in" : "opacity-0"
                  }`}
                  style={
                    isVisible
                      ? { animationDelay: `${0.4 + i * 0.2}s` }
                      : undefined
                  }
                >
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
