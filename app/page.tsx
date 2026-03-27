"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useSiteMode } from "@/lib/site-mode";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { Destination, SpinPhase } from "@/lib/types";
import { useSavedDestinations } from "@/lib/hooks/use-saved-destinations";
import { useShare } from "@/lib/hooks/use-share";
import { toast } from "sonner";

// Waitlist components (existing)
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { EmotionalSell } from "@/components/landing/emotional-sell";
import { ProductPreview } from "@/components/landing/product-preview";
import { SocialProof } from "@/components/landing/social-proof";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

// Live components (new)
import { HeroSectionLive } from "@/components/landing/hero-section-live";
import { DestinationReveal } from "@/components/landing/destination-reveal";
import { TripBuilder } from "@/components/landing/trip-builder";
import { HowItWorksCompact } from "@/components/landing/how-it-works-compact";
import { RecentSpinsGallery } from "@/components/landing/recent-spins-gallery";
import { PremiumTeaser } from "@/components/landing/premium-teaser";
import { FooterExpanded } from "@/components/landing/footer-expanded";
import { StickyActionBar } from "@/components/landing/sticky-action-bar";

export default function LandingPage() {
  const { mode, isLoaded } = useSiteMode();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [phase, setPhase] = useState<SpinPhase>("idle");
  const { toggleSave, isSaved } = useSavedDestinations();
  const { share } = useShare();

  const handleDestinationRevealed = useCallback((dest: Destination) => {
    setDestination(dest);
    // Save to localStorage for returning user experience
    localStorage.setItem("lastSpinDestinationId", dest.id);
    localStorage.setItem("lastSpinTimestamp", new Date().toISOString());
  }, []);

  const handleSpinAgain = useCallback(() => {
    setPhase("idle");
    setDestination(null);
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBookTrip = useCallback(() => {
    document
      .getElementById("trip-builder")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSave = useCallback(() => {
    if (destination) {
      const wasSaved = isSaved(destination.id);
      toggleSave(destination.id);
      toast.success(
        wasSaved
          ? `Removed ${destination.name} from saved`
          : `Saved ${destination.name} for later`
      );
    }
  }, [destination, isSaved, toggleSave]);

  const handleShare = useCallback(async () => {
    if (!destination) return;
    const result = await share(destination);
    if (result === "copied") {
      toast.success("Link copied to clipboard!");
    } else if (result === "failed") {
      toast.error("Couldn't share. Try copying the URL.");
    }
  }, [destination, share]);

  // Auth dialog state
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<"sign-in" | "sign-up">("sign-in");

  const openSignIn = useCallback(() => {
    setAuthDialogMode("sign-in");
    setAuthDialogOpen(true);
  }, []);

  const openSignUp = useCallback(() => {
    setAuthDialogMode("sign-up");
    setAuthDialogOpen(true);
  }, []);

  // Don't render until mode is loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  // ──── Waitlist Mode ────
  if (mode === "waitlist") {
    return (
      <div className="flex flex-col min-h-screen">
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md animate-nav-slide-down" style={{ animationDelay: "0.1s" }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
            <span className="text-lg font-bold tracking-tight">Spin</span>
            <Button
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
                onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
              >
                Join the Waitlist
              </Button>
          </div>
        </nav>

        <main>
          <HeroSection />
          <HowItWorks />
          <EmotionalSell />
          <ProductPreview />
          <SocialProof />
          <FaqSection />
          <FinalCta />
        </main>

        <Footer />
      </div>
    );
  }

  // ──── Live Mode ────
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <span className="text-lg font-bold tracking-tight">Spin</span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white hover:bg-white/10"
              onClick={openSignIn}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-white text-black hover:bg-white/90"
              onClick={openSignUp}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero with Globe */}
        <HeroSectionLive
          onDestinationRevealed={handleDestinationRevealed}
          onSpinAgain={handleSpinAgain}
          phase={phase}
          setPhase={setPhase}
        />

        {/* Destination Reveal (shown after spin) */}
        {destination && (
          <>
            <DestinationReveal
              destination={destination}
              isSaved={isSaved(destination.id)}
              onBookTrip={handleBookTrip}
              onSpinAgain={handleSpinAgain}
              onSave={handleSave}
              onShare={handleShare}
            />

            {/* Trip Builder */}
            <TripBuilder destination={destination} />
          </>
        )}

        {/* How It Works (compact) */}
        <HowItWorksCompact />

        {/* Social Proof */}
        <RecentSpinsGallery />

        {/* Premium Teaser */}
        <PremiumTeaser />
      </main>

      {/* Footer */}
      <FooterExpanded />

      {/* Mobile Sticky Bar */}
      {destination && phase === "revealed" && (
        <StickyActionBar
          onBookTrip={handleBookTrip}
          onSpinAgain={handleSpinAgain}
          onSave={handleSave}
          isSaved={isSaved(destination.id)}
        />
      )}

      {/* Auth Dialog */}
      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        defaultMode={authDialogMode}
      />
    </div>
  );
}
