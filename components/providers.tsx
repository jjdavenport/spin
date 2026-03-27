"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";
import { SiteModeProvider } from "@/lib/site-mode";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteModeProvider>
      {children}
      <Toaster position="bottom-center" theme="dark" />
    </SiteModeProvider>
  );
}
