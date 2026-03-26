"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/nav";

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState(3);

  useEffect(() => {
    fetch("/api/spin/balance")
      .then((r) => r.json())
      .then((data) => setCredits(data.balance))
      .catch(() => {});
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav credits={credits} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
