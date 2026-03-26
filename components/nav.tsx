"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CreditBalance from "./credit-balance";
import { cn } from "@/lib/utils";

interface NavProps {
  credits: number;
}

const links = [
  { href: "/spin", label: "Spin" },
  { href: "/history", label: "History" },
  { href: "/credits", label: "Credits" },
  { href: "/admin", label: "Admin" },
];

export default function Nav({ credits }: NavProps) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/spin"
            className="text-lg font-bold tracking-tight"
          >
            Spin
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-sm rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CreditBalance credits={credits} />
        </div>
      </div>
    </nav>
  );
}
