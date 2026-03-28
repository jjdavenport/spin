"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Loader2, Mail, Eye, EyeOff } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "sign-in" | "sign-up";
  onModeChange?: (mode: "sign-in" | "sign-up") => void;
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

export function AuthDialog({ open, onOpenChange, defaultMode = "sign-in", onModeChange }: AuthDialogProps) {
  const [mode, setMode] = useState(defaultMode);
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  function validateEmail(value: string): string {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address.";
    return "";
  }

  function validatePassword(value: string, currentMode: string): string {
    if (!value) return "Password is required.";
    if (currentMode === "sign-up" && value.length < 6)
      return "Password must be at least 6 characters.";
    return "";
  }

  useEffect(() => {
    setMode(defaultMode);
  }, [defaultMode]);

  // Reset form state when dialog opens/closes or mode changes
  useEffect(() => {
    setEmail("");
    setPassword("");
    setError(null);
    setMessage(null);
    setShowPassword(false);
    setEmailError("");
    setPasswordError("");
    setEmailTouched(false);
    setPasswordTouched(false);
  }, [open, mode]);

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback`,
      },
    });
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    const eErr = validateEmail(email);
    const pErr = validatePassword(password, mode);
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;

    setEmailLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (mode === "sign-up") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage("Check your email for a confirmation link to complete sign up.");
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
      } else {
        window.location.href = "/spin";
      }
    }

    setEmailLoading(false);
  };

  const isSignIn = mode === "sign-in";
  const isLoading = loading || emailLoading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[420px] border-white/[0.08] bg-[oklch(0.16_0_0)] shadow-[0_0_80px_rgba(255,255,255,0.03)]"
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
          {/* Google OAuth button */}
          <Button
            onClick={handleGoogleAuth}
            disabled={isLoading}
            variant="outline"
            className="h-11 w-full gap-3 border-white/[0.1] bg-white/[0.04] text-[0.95rem] text-white/90 transition-all hover:border-white/[0.18] hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(255,255,255,0.04)]"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </Button>

          {/* Divider with "or" */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[oklch(0.16_0_0)] px-3 text-white/30 uppercase tracking-widest">
                or
              </span>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="auth-email" className="text-xs font-medium text-white/50">
                  Email address
                </Label>
                {emailError && emailTouched && (
                  <p className="text-xs text-red-400/90">{emailError}</p>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="auth-email"
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailTouched) {
                      const err = validateEmail(e.target.value);
                      setEmailError(err);
                    }
                  }}
                  onBlur={() => {
                    setEmailTouched(true);
                    setEmailError(validateEmail(email));
                  }}
                  disabled={isLoading}
                  aria-invalid={!!emailError && emailTouched}
                  className={`h-11 pl-10 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-white/[0.2] focus-visible:ring-white/10 ${
                    emailError && emailTouched ? "border-red-400/50" : ""
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="auth-password" className="text-xs font-medium text-white/50">
                  Password
                </Label>
                {passwordError && passwordTouched && (
                  <p className="text-xs text-red-400/90">{passwordError}</p>
                )}
              </div>
              <div className="relative">
                <Input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  placeholder={isSignIn ? "Enter your password" : "Create a password (min 6 chars)"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordTouched) {
                      setPasswordError(validatePassword(e.target.value, mode));
                    }
                  }}
                  onBlur={() => {
                    setPasswordTouched(true);
                    setPasswordError(validatePassword(password, mode));
                  }}
                  disabled={isLoading}
                  aria-invalid={!!passwordError && passwordTouched}
                  className={`h-11 pr-10 border-white/[0.1] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-white/[0.2] focus-visible:ring-white/10 ${
                    passwordError && passwordTouched ? "border-red-400/50" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-sm text-red-400/90 bg-red-400/[0.08] border border-red-400/[0.12] rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Success message */}
            {message && (
              <p className="text-sm text-emerald-400/90 bg-emerald-400/[0.08] border border-emerald-400/[0.12] rounded-lg px-3 py-2">
                {message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full gap-2 bg-white text-black font-semibold hover:bg-white/90 transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.08)]"
            >
              {emailLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              {isSignIn ? "Sign in with Email" : "Sign up with Email"}
            </Button>
          </form>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

          {/* Mode toggle */}
          <p className="text-center text-sm text-white/40">
            {isSignIn ? "Don\u2019t have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                const newMode = isSignIn ? "sign-up" : "sign-in";
                if (onModeChange) {
                  onModeChange(newMode);
                } else {
                  setMode(newMode);
                }
              }}
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
