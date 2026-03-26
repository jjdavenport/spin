"use client";

import { Button } from "@/components/ui/button";

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSpinning: boolean;
  credits: number;
}

export default function SpinButton({
  onClick,
  disabled,
  isSpinning,
  credits,
}: SpinButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isSpinning || credits <= 0}
      size="lg"
      className="h-14 px-8 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
    >
      {isSpinning ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Spinning...
        </span>
      ) : credits <= 0 ? (
        "No Credits"
      ) : (
        `Spin the Globe (1 credit)`
      )}
    </Button>
  );
}
