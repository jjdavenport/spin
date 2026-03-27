"use client";

import { AtSign, Mail, Globe, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";

const PRODUCT_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Adventure Pass", href: "#premium" },
  { label: "FAQ", href: "#faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Affiliate Disclosure", href: "#" },
];

const CONNECT_LINKS = [
  { label: "Instagram", href: "#", icon: AtSign },
  { label: "Email Us", href: "mailto:hello@spintheglobe.com", icon: Mail },
  { label: "Partner With Us", href: "#", icon: ExternalLink },
];

export function FooterExpanded() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <footer ref={ref} className="border-t border-border/30 bg-muted/5 py-12 sm:py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
        >
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-amber-400" />
              <span className="font-bold text-lg">Spin</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover destinations, one spin at a time. Let randomness lead you
              somewhere amazing.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">
              Product
            </h4>
            <ul className="space-y-2">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">
              Legal
            </h4>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">
              Connect
            </h4>
            <ul className="space-y-2">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <link.icon className="h-3.5 w-3.5" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/50">
          <p>&copy; {new Date().getFullYear()} Spin. All rights reserved.</p>
          <p>
            Booking links may contain affiliate partnerships. We earn a small
            commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
