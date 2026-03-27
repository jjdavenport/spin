"use client";

import { useState, useEffect } from "react";
import { Destination } from "@/lib/types";
import { DESTINATIONS } from "@/lib/mock-data";
import { getMockSavedDestinations } from "@/lib/mock-data";

interface ReturningUserState {
  isReturning: boolean;
  lastDestination: Destination | null;
  savedCount: number;
  dismissed: boolean;
  dismiss: () => void;
}

export function useReturningUser(): ReturningUserState {
  const [isReturning, setIsReturning] = useState(false);
  const [lastDestination, setLastDestination] = useState<Destination | null>(
    null
  );
  const [savedCount, setSavedCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const lastId = localStorage.getItem("lastSpinDestinationId");
    const lastTimestamp = localStorage.getItem("lastSpinTimestamp");
    const wasDismissed = sessionStorage.getItem("returning-user-dismissed");

    if (wasDismissed) {
      setDismissed(true);
    }

    if (lastId && lastTimestamp) {
      const dest = DESTINATIONS.find((d) => d.id === lastId);
      if (dest) {
        setIsReturning(true);
        setLastDestination(dest);
      }
    }

    setSavedCount(getMockSavedDestinations().length);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("returning-user-dismissed", "true");
  };

  return { isReturning, lastDestination, savedCount, dismissed, dismiss };
}
