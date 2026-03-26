"use client";

import { useCallback } from "react";
import { Destination } from "@/lib/types";

export function useShare() {
  const canNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  const share = useCallback(async (destination: Destination): Promise<"shared" | "copied" | "failed"> => {
    const url = `${window.location.origin}/destination/${destination.id}`;
    const text = `My next adventure: ${destination.name}, ${destination.country}! 🌍`;
    const title = `Spin the Globe — ${destination.name}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return "shared";
      } catch (e: any) {
        if (e.name === "AbortError") return "failed";
        // Fall through to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      return "copied";
    } catch {
      return "failed";
    }
  }, []);

  return { share, canNativeShare };
}
