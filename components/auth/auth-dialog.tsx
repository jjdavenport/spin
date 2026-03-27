"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "sign-in" | "sign-up";
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthDialog({ open, onOpenChange, defaultMode = "sign-in" }: AuthDialogProps) {
  const [mode, setMode] = useState(defaultMode);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
  };

  const isSignIn = mode === "sign-in";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[400px] border-white/[0.08] bg-[oklch(0.16_0_0)] shadow-[0_0_80px_rgba(255,255,255,0.03)]"
        showCloseButton
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <DialogHeader className="items-center pt-2 pb-1">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/[0.08]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-white/80"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            {isSignIn ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-center text-white/50">
            {isSignIn
              ? "Sign in to continue spinning the globe"
              : "Sign up and get 3 free spins to discover your next destination"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Google OAuth button */}
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            variant="outline"
            className="h-12 w-full gap-3 border-white/[0.1] bg-white/[0.04] text-[0.95rem] text-white/90 transition-all hover:border-white/[0.18] hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </Button>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Mode toggle */}
          <p className="text-center text-sm text-white/40">
            {isSignIn ? "Don\u2019t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isSignIn ? "sign-up" : "sign-in")}
              className="font-medium text-white/70 underline underline-offset-4 transition-colors hover:text-white"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
