"use client";

import { SlidersHorizontal } from "lucide-react";

interface FiltersButtonProps {
  onClick: () => void;
  activeCount: number;
  disabled?: boolean;
}

export function FiltersButton({
  onClick,
  activeCount,
  disabled,
}: FiltersButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        relative inline-flex items-center gap-2 px-5 py-2.5
        rounded-full text-sm font-medium
        bg-white/[0.06] backdrop-blur-sm
        border border-white/[0.1]
        text-white/70 hover:text-white hover:bg-white/[0.1] hover:border-white/[0.18]
        transition-all duration-300
        disabled:opacity-40 disabled:pointer-events-none
        cursor-pointer select-none
      "
    >
      <SlidersHorizontal className="h-4 w-4" />
      Filters
      {activeCount > 0 && (
        <span className="flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold">
          {activeCount}
        </span>
      )}
    </button>
  );
}
