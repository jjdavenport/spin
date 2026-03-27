"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, RotateCcw, Heart } from "lucide-react";

interface StickyActionBarProps {
  onBookTrip: () => void;
  onSpinAgain: () => void;
  onSave: () => void;
  isSaved: boolean;
}

export function StickyActionBar({
  onBookTrip,
  onSpinAgain,
  onSave,
  isSaved,
}: StickyActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-background/95 backdrop-blur-md border-t border-border/50 p-3 flex items-center gap-2">
      <Button
        className="flex-1 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-bold"
        onClick={onBookTrip}
      >
        <ArrowDown className="mr-2 h-4 w-4" />
        Book Trip
      </Button>
      <Button
        variant="secondary"
        className="rounded-full"
        onClick={onSpinAgain}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        className={`rounded-full ${isSaved ? "text-rose-400" : ""}`}
        onClick={onSave}
      >
        <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
      </Button>
    </div>
  );
}
