"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useSiteMode } from "@/lib/site-mode";

export function AdminHeader() {
  const { mode, setMode, isLoaded } = useSiteMode();
  const isLive = mode === "live";

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-3">
          <Link href="/spin" className="text-lg font-bold tracking-tight">
            Spin
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm font-medium text-muted-foreground">
            Admin Dashboard
          </span>
          <Badge
            variant="outline"
            className="text-[10px] py-0 text-amber-400 border-amber-400/30"
          >
            Mock Data
          </Badge>
        </div>

        <div className="flex items-center gap-4">
          {/* Mode Toggle */}
          {isLoaded && (
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground">Waitlist</span>
              <Switch
                checked={isLive}
                onCheckedChange={(checked) =>
                  setMode(checked ? "live" : "waitlist")
                }
              />
              <span className="text-xs text-muted-foreground">Live</span>
              <Badge
                variant={isLive ? "default" : "secondary"}
                className={`text-[10px] py-0 ${
                  isLive
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-400/30"
                    : ""
                }`}
              >
                {isLive ? "Live" : "Waitlist"}
              </Badge>
            </div>
          )}

          <Separator orientation="vertical" className="h-5" />

          <Link
            href="/spin"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to App
          </Link>
        </div>
      </div>
    </header>
  );
}
