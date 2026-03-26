import { AtSign, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <span className="font-bold text-foreground text-base">Spin</span>
            <span className="hidden sm:inline text-border">|</span>
            <span className="hidden sm:inline">
              Discover destinations, one spin at a time.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-foreground transition-colors"
            >
              <AtSign className="h-4 w-4" />
            </a>
            <a
              href="mailto:hello@spintheglobe.com"
              aria-label="Email"
              className="hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground/60 mt-8">
          &copy; {new Date().getFullYear()} Spin. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
