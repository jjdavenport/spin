"use client";

import { Badge } from "@/components/ui/badge";

interface CreditBalanceProps {
  credits: number;
}

export default function CreditBalance({ credits }: CreditBalanceProps) {
  return (
    <Badge
      variant={credits > 0 ? "default" : "destructive"}
      className="text-sm px-3 py-1 font-mono"
    >
      {credits} {credits === 1 ? "credit" : "credits"}
    </Badge>
  );
}
