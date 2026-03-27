"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/* ── Animated section wrapper using IntersectionObserver ── */
function RevealSection({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? "animate-reveal-slide-up" : "opacity-0"}
      style={isVisible ? { animationDelay: `${0.08 + index * 0.06}s` } : undefined}
    >
      {children}
    </div>
  );
}

/* ── Back link ── */
function BackLink() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
      Back
    </Link>
  );
}

/* ── Main layout ── */
export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<Element[]>([]);

  /* Reveal header on mount */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Collect direct section children for staggered reveal */
  useEffect(() => {
    if (!sectionsRef.current) return;
    const sectionEls = Array.from(
      sectionsRef.current.querySelectorAll(":scope > div")
    );
    setSections(sectionEls);
  }, []);

  return (
    <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* Decorative accent line */}
      <div
        className={`absolute left-4 sm:left-6 top-16 sm:top-24 w-px bg-gradient-to-b from-foreground/20 via-foreground/5 to-transparent transition-all duration-1000 ease-out ${
          headerVisible ? "h-32 opacity-100" : "h-0 opacity-0"
        }`}
        aria-hidden
      />

      {/* Back button */}
      <div
        className={`pl-6 sm:pl-8 mb-6 ${
          headerVisible ? "animate-hero-text-rise" : "opacity-0"
        }`}
        style={headerVisible ? { animationDelay: "0.05s" } : undefined}
      >
        <BackLink />
      </div>

      {/* Header */}
      <div ref={headerRef} className="mb-14 sm:mb-20 pl-6 sm:pl-8">
        <p
          className={`text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4 ${
            headerVisible ? "animate-hero-text-rise" : "opacity-0"
          }`}
          style={headerVisible ? { animationDelay: "0.1s" } : undefined}
        >
          Legal
        </p>

        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1] ${
            headerVisible ? "animate-hero-text-rise" : "opacity-0"
          }`}
          style={headerVisible ? { animationDelay: "0.2s" } : undefined}
        >
          {title}
        </h1>

        <div
          className={`mt-5 flex items-center gap-3 ${
            headerVisible ? "animate-hero-text-rise" : "opacity-0"
          }`}
          style={headerVisible ? { animationDelay: "0.35s" } : undefined}
        >
          <span className="inline-block h-px w-8 bg-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">{lastUpdated}</p>
        </div>
      </div>

      {/* Sections — each child <section> gets wrapped in RevealSection */}
      <div
        ref={sectionsRef}
        className="space-y-12 text-muted-foreground leading-relaxed pl-6 sm:pl-8 border-l border-border/30"
      >
        {children}
      </div>
    </main>
  );
}

/* Re-export RevealSection for use in page files */
export { RevealSection };
