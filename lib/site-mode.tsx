"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type SiteMode = "waitlist" | "live";

interface SiteModeContextValue {
  mode: SiteMode;
  setMode: (mode: SiteMode) => void;
  isLoaded: boolean;
}

const SiteModeContext = createContext<SiteModeContextValue>({
  mode: "waitlist",
  setMode: () => {},
  isLoaded: false,
});

const STORAGE_KEY = "spin-page-mode";

export function SiteModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<SiteMode>("waitlist");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "live" || stored === "waitlist") {
      setModeState(stored);
    }
    setIsLoaded(true);
  }, []);

  const setMode = (newMode: SiteMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  return (
    <SiteModeContext.Provider value={{ mode, setMode, isLoaded }}>
      {children}
    </SiteModeContext.Provider>
  );
}

export function useSiteMode() {
  return useContext(SiteModeContext);
}
