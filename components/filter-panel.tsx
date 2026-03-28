"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MapPin,
  Locate,
  Loader2,
  Plane,
  ShieldCheck,
  X,
} from "lucide-react";
import { SpinFilters, ClimateType } from "@/lib/types";
import { CLIMATE_OPTIONS } from "@/lib/climate-map";
import { REGIONS } from "@/lib/constants";
import { searchAirports, findNearestAirport, getAirportByCode } from "@/lib/airports";
import { useGeolocation } from "@/lib/hooks/use-geolocation";

interface FilterPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: SpinFilters;
  onFiltersChange: (filters: SpinFilters) => void;
  matchCount: number;
}

const REGION_OPTIONS = REGIONS.filter((r) => r !== "All Regions");

export function FilterPanel({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  matchCount,
}: FilterPanelProps) {
  const [airportQuery, setAirportQuery] = useState("");
  const [airportResults, setAirportResults] = useState<
    { code: string; city: string; name: string }[]
  >([]);
  const [showAirportDropdown, setShowAirportDropdown] = useState(false);
  const airportInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const geo = useGeolocation();

  // Auto-detect airport from geolocation
  useEffect(() => {
    if (geo.coords) {
      const nearest = findNearestAirport(geo.coords.lat, geo.coords.lng);
      onFiltersChange({ ...filters, homeAirport: nearest.code });
      setAirportQuery(`${nearest.code} — ${nearest.city}`);
      setShowAirportDropdown(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geo.coords]);

  // Airport search
  useEffect(() => {
    if (airportQuery.length >= 2 && !airportQuery.includes("—")) {
      const results = searchAirports(airportQuery);
      setAirportResults(results);
      setShowAirportDropdown(results.length > 0);
    } else {
      setAirportResults([]);
      setShowAirportDropdown(false);
    }
  }, [airportQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        airportInputRef.current &&
        !airportInputRef.current.contains(e.target as Node)
      ) {
        setShowAirportDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Sync airport input display when filters change externally
  useEffect(() => {
    if (filters.homeAirport) {
      const airport = getAirportByCode(filters.homeAirport);
      if (airport) {
        setAirportQuery(`${airport.code} — ${airport.city}`);
      }
    } else {
      setAirportQuery("");
    }
  }, [filters.homeAirport]);

  const toggleClimate = useCallback(
    (climate: ClimateType) => {
      const next = filters.climates.includes(climate)
        ? filters.climates.filter((c) => c !== climate)
        : [...filters.climates, climate];
      onFiltersChange({ ...filters, climates: next });
    },
    [filters, onFiltersChange]
  );

  const toggleRegion = useCallback(
    (region: string) => {
      const next = filters.regions.includes(region)
        ? filters.regions.filter((r) => r !== region)
        : [...filters.regions, region];
      onFiltersChange({ ...filters, regions: next });
    },
    [filters, onFiltersChange]
  );

  const selectAirport = useCallback(
    (code: string, city: string) => {
      onFiltersChange({ ...filters, homeAirport: code });
      setAirportQuery(`${code} — ${city}`);
      setShowAirportDropdown(false);
    },
    [filters, onFiltersChange]
  );

  const clearAirport = useCallback(() => {
    onFiltersChange({
      ...filters,
      homeAirport: null,
      directFlightsOnly: false,
    });
    setAirportQuery("");
  }, [filters, onFiltersChange]);

  const clearAll = useCallback(() => {
    onFiltersChange({
      regions: [],
      climates: [],
      homeAirport: null,
      visaFreeOnly: false,
      directFlightsOnly: false,
    });
    setAirportQuery("");
  }, [onFiltersChange]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-zinc-950/[0.97] backdrop-blur-2xl border-white/10 max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-white text-lg font-bold tracking-tight">
            Filter Destinations
          </DrawerTitle>
          <DrawerDescription className="text-white/50 text-sm">
            Narrow down your next adventure
          </DrawerDescription>
        </DrawerHeader>

        <ScrollArea className="flex-1 overflow-auto px-4">
          <div className="space-y-6 pb-4">
            {/* Climate */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Climate
              </h3>
              <div className="flex flex-wrap gap-2">
                {CLIMATE_OPTIONS.map((opt) => {
                  const active = filters.climates.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleClimate(opt.value)}
                      className={`
                        inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                        transition-all duration-200 cursor-pointer select-none
                        ${
                          active
                            ? "bg-white text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.07] text-white/70 hover:bg-white/[0.13] hover:text-white"
                        }
                      `}
                    >
                      <span className="text-base">{opt.icon}</span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Regions */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Region
              </h3>
              <div className="flex flex-wrap gap-2">
                {REGION_OPTIONS.map((region) => {
                  const active = filters.regions.includes(region);
                  return (
                    <button
                      key={region}
                      onClick={() => toggleRegion(region)}
                      className={`
                        inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium
                        transition-all duration-200 cursor-pointer select-none
                        ${
                          active
                            ? "bg-white text-zinc-950 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.07] text-white/70 hover:bg-white/[0.13] hover:text-white"
                        }
                      `}
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      {region}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Home Airport */}
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Home Airport
              </h3>
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                    <Input
                      ref={airportInputRef}
                      value={airportQuery}
                      onChange={(e) => setAirportQuery(e.target.value)}
                      onFocus={() => {
                        if (airportResults.length > 0) setShowAirportDropdown(true);
                      }}
                      placeholder="Search airport code or city..."
                      className="pl-10 pr-8 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:ring-white/10 h-11"
                    />
                    {filters.homeAirport && (
                      <button
                        onClick={clearAirport}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 cursor-pointer"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={geo.detect}
                    disabled={geo.loading}
                    className="h-11 w-11 shrink-0 bg-white/[0.07] border-white/10 text-white/60 hover:bg-white/[0.13] hover:text-white cursor-pointer"
                    title="Detect my location"
                  >
                    {geo.loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Locate className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {geo.error && (
                  <p className="text-red-400/80 text-xs mt-1.5">{geo.error}</p>
                )}

                {/* Airport dropdown */}
                {showAirportDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-50 top-full mt-1 w-full bg-zinc-900 border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                  >
                    {airportResults.map((a) => (
                      <button
                        key={a.code}
                        onClick={() => selectAirport(a.code, a.city)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/80 hover:bg-white/[0.08] hover:text-white transition-colors text-left cursor-pointer"
                      >
                        <span className="font-mono font-bold text-white/90">
                          {a.code}
                        </span>
                        <span className="text-white/50 truncate">
                          {a.city} — {a.name}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-white/30 text-xs mt-2">
                Used for direct flight estimates
              </p>
            </section>

            {/* Toggles */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-white/40" />
                  <span className="text-sm text-white/70">
                    Visa-friendly destinations
                  </span>
                </div>
                <Switch
                  checked={filters.visaFreeOnly}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, visaFreeOnly: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Plane className="h-4 w-4 text-white/40" />
                  <span className="text-sm text-white/70">
                    Direct flights likely
                  </span>
                </div>
                <Switch
                  checked={filters.directFlightsOnly}
                  disabled={!filters.homeAirport}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, directFlightsOnly: checked })
                  }
                />
              </div>
              {!filters.homeAirport && filters.directFlightsOnly === false && (
                <p className="text-white/25 text-xs pl-6.5">
                  Set a home airport to enable
                </p>
              )}
            </section>
          </div>
        </ScrollArea>

        <DrawerFooter className="flex-row items-center border-t border-white/[0.06] pt-4">
          <button
            onClick={clearAll}
            className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          >
            Clear all
          </button>
          <div className="flex-1" />
          <Button
            onClick={() => onOpenChange(false)}
            className="h-11 px-6 bg-white text-zinc-950 hover:bg-white/90 font-semibold rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Show {matchCount} destination{matchCount !== 1 ? "s" : ""}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
