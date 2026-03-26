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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

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
      className={`flex flex-col sm:flex-row gap-3 w-full max-w-md ${className}`}
    >
      <Input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-11 flex-1 bg-background/50 backdrop-blur-sm border-border/50"
        aria-label="Email address"
      />
      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="h-11 px-6 rounded-lg whitespace-nowrap"
      >
        {status === "submitting" ? "Joining..." : buttonText}
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive sm:absolute sm:top-full sm:mt-1">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
