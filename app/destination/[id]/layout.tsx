"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/nav";

export default function DestinationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [credits, setCredits] = useState(3);

  useEffect(() => {
    fetch("/api/spin/balance")
      .then((r) => r.json())
      .then((data) => setCredits(data.balance))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: CustomEvent) => setCredits(e.detail);
    window.addEventListener("credits-updated" as any, handler);
    return () =>
      window.removeEventListener("credits-updated" as any, handler);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav credits={credits} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
