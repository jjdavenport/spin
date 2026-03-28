"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
}

export function WaitlistForm({
  className,
  buttonText = "Join the Waitlist",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState(false);

  function validateEmail(value: string): string {
    if (!value.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "Please enter a valid email address.";
    return "";
  }

  function handleBlur() {
    setTouched(true);
    const error = validateEmail(email);
    if (error) {
      setStatus("error");
      setErrorMessage(error);
    } else if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const error = validateEmail(email);
    if (error) {
      setStatus("error");
      setErrorMessage(error);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-2 text-sm text-emerald-400 ${className}`}
      >
        <CheckCircle2 className="h-5 w-5" />
        <span>You&apos;re in! We&apos;ll be in touch soon.</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-1.5 w-full max-w-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <label htmlFor="waitlist-email" className="text-xs font-medium text-muted-foreground">
          Email address
        </label>
        {status === "error" && touched && (
          <p className="text-xs text-destructive">{errorMessage}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
      <Input
        id="waitlist-email"
        type="text"
        inputMode="email"
        autoComplete="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (touched) {
            const err = validateEmail(e.target.value);
            if (err) {
              setStatus("error");
              setErrorMessage(err);
            } else {
              setStatus("idle");
              setErrorMessage("");
            }
          }
        }}
        onBlur={handleBlur}
        className={`h-11 flex-1 bg-background/50 backdrop-blur-sm border-border/50 ${
          status === "error" && touched ? "border-destructive" : ""
        }`}
        aria-invalid={status === "error" && touched}
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="h-11 px-6 rounded-lg whitespace-nowrap"
      >
        {status === "submitting" ? "Joining..." : buttonText}
      </Button>
      </div>
    </form>
  );
}
