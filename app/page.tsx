import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { EmotionalSell } from "@/components/landing/emotional-sell";
import { ProductPreview } from "@/components/landing/product-preview";
import { SocialProof } from "@/components/landing/social-proof";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
          <span className="text-lg font-bold tracking-tight">Spin</span>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
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
