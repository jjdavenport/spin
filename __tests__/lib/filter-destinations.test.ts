import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Destination, DestinationDetails, SpinFilters } from "@/lib/types";

// Mock airports module
vi.mock("@/lib/airports", () => ({
  getAirportByCode: vi.fn(),
  distanceBetween: vi.fn(),
}));

// Mock climate map with controlled data
vi.mock("@/lib/climate-map", () => ({
  CLIMATE_MAP: {
    "1": ["temperate"],
    "2": ["mediterranean"],
    "3": ["tropical"],
    "4": ["arid"],
    "5": ["cold", "temperate"], // multi-climate like Kathmandu
    "6": ["mediterranean"],
  } as Record<string, string[]>,
}));

import {
  filterDestinations,
  getDefaultFilters,
  getActiveFilterCount,
} from "@/lib/filter-destinations";
import { getAirportByCode, distanceBetween } from "@/lib/airports";

// --- Fixtures ---

const destinations: Destination[] = [
  { id: "1", name: "Paris", country: "France", region: "Europe", latitude: 48.85, longitude: 2.35, description: "", image_url: null },
  { id: "2", name: "Barcelona", country: "Spain", region: "Europe", latitude: 41.38, longitude: 2.17, description: "", image_url: null },
  { id: "3", name: "Bali", country: "Indonesia", region: "Asia", latitude: -8.34, longitude: 115.09, description: "", image_url: null },
  { id: "4", name: "Marrakech", country: "Morocco", region: "Africa", latitude: 31.63, longitude: -7.98, description: "", image_url: null },
  { id: "5", name: "Kathmandu", country: "Nepal", region: "Asia", latitude: 27.7, longitude: 85.32, description: "", image_url: null },
  { id: "6", name: "Petra", country: "Jordan", region: "Middle East", latitude: 30.32, longitude: 35.44, description: "", image_url: null },
];

const details: Record<string, DestinationDetails> = {
  "1": { unsplash_photo_id: "", airport_code: "CDG", best_time_to_visit: "", visa_info: "Schengen zone – visa-free for 90 days", budget_range: { low: 100, high: 300, currency: "EUR" }, highlights: [], itinerary: [] },
  "2": { unsplash_photo_id: "", airport_code: "BCN", best_time_to_visit: "", visa_info: "Schengen zone – visa-free for 90 days", budget_range: { low: 80, high: 200, currency: "EUR" }, highlights: [], itinerary: [] },
  "3": { unsplash_photo_id: "", airport_code: "DPS", best_time_to_visit: "", visa_info: "Visa on arrival for 30 days", budget_range: { low: 30, high: 80, currency: "USD" }, highlights: [], itinerary: [] },
  "4": { unsplash_photo_id: "", airport_code: "RAK", best_time_to_visit: "", visa_info: "E-visa required", budget_range: { low: 40, high: 100, currency: "USD" }, highlights: [], itinerary: [] },
  "5": { unsplash_photo_id: "", airport_code: "KTM", best_time_to_visit: "", visa_info: "Tourist card required", budget_range: { low: 20, high: 50, currency: "USD" }, highlights: [], itinerary: [] },
  "6": { unsplash_photo_id: "", airport_code: "AMM", best_time_to_visit: "", visa_info: "Jordan Pass includes visa", budget_range: { low: 60, high: 150, currency: "USD" }, highlights: [], itinerary: [] },
};

function makeFilters(overrides: Partial<SpinFilters> = {}): SpinFilters {
  return { ...getDefaultFilters(), ...overrides };
}

beforeEach(() => {
  vi.clearAllMocks();
  // Default: all airports "found", distance within range
  (getAirportByCode as any).mockReturnValue({ code: "JFK", lat: 40.64, lng: -73.78 });
  (distanceBetween as any).mockReturnValue(3000);
});

// ─── filterDestinations ─────────────────────────────────────────

describe("filterDestinations", () => {
  // Region filter
  describe("region filter", () => {
    it("returns all IDs when regions is empty", () => {
      const result = filterDestinations(destinations, details, makeFilters());
      expect(result).toEqual(["1", "2", "3", "4", "5", "6"]);
    });

    it("returns only matching region", () => {
      const result = filterDestinations(destinations, details, makeFilters({ regions: ["Europe"] }));
      expect(result).toEqual(["1", "2"]);
    });

    it("returns destinations matching any of multiple regions", () => {
      const result = filterDestinations(destinations, details, makeFilters({ regions: ["Europe", "Asia"] }));
      expect(result).toEqual(["1", "2", "3", "5"]);
    });

    it("returns empty when no destinations match region", () => {
      const result = filterDestinations(destinations, details, makeFilters({ regions: ["Oceania"] }));
      expect(result).toEqual([]);
    });
  });

  // Climate filter
  describe("climate filter", () => {
    it("returns all when climates is empty", () => {
      const result = filterDestinations(destinations, details, makeFilters());
      expect(result).toHaveLength(6);
    });

    it("filters to destinations with matching climate", () => {
      const result = filterDestinations(destinations, details, makeFilters({ climates: ["tropical"] }));
      expect(result).toEqual(["3"]);
    });

    it("includes destination if any of its climates match", () => {
      // ID 5 has ["cold", "temperate"]
      const result = filterDestinations(destinations, details, makeFilters({ climates: ["cold"] }));
      expect(result).toContain("5");
    });

    it("matches multiple climate types", () => {
      const result = filterDestinations(destinations, details, makeFilters({ climates: ["temperate", "arid"] }));
      expect(result).toEqual(expect.arrayContaining(["1", "4", "5"]));
    });

    it("returns empty when no climates match", () => {
      // No destinations mapped to a climate not in our mock
      const result = filterDestinations(
        [{ id: "99", name: "X", country: "X", region: "X", latitude: 0, longitude: 0, description: "", image_url: null }],
        details,
        makeFilters({ climates: ["tropical"] })
      );
      expect(result).toEqual([]);
    });
  });

  // Visa filter
  describe("visa filter", () => {
    it("returns all when visaFreeOnly is false", () => {
      const result = filterDestinations(destinations, details, makeFilters({ visaFreeOnly: false }));
      expect(result).toHaveLength(6);
    });

    it("includes Schengen zone destinations", () => {
      const result = filterDestinations(destinations, details, makeFilters({ visaFreeOnly: true }));
      expect(result).toContain("1"); // Paris – Schengen
      expect(result).toContain("2"); // Barcelona – Schengen
    });

    it("includes visa on arrival destinations", () => {
      const result = filterDestinations(destinations, details, makeFilters({ visaFreeOnly: true }));
      expect(result).toContain("3"); // Bali – visa on arrival
    });

    it("includes Jordan Pass destinations", () => {
      const result = filterDestinations(destinations, details, makeFilters({ visaFreeOnly: true }));
      expect(result).toContain("6"); // Petra – Jordan Pass
    });

    it("excludes e-visa required destinations", () => {
      const result = filterDestinations(destinations, details, makeFilters({ visaFreeOnly: true }));
      expect(result).not.toContain("4"); // Marrakech – e-visa required
    });

    it("excludes tourist card required destinations", () => {
      const result = filterDestinations(destinations, details, makeFilters({ visaFreeOnly: true }));
      expect(result).not.toContain("5"); // Kathmandu – tourist card required
    });

    it("excludes ESTA required even if visa-free is mentioned", () => {
      const customDetails = {
        ...details,
        "1": { ...details["1"], visa_info: "Visa-free via ESTA required" },
      };
      const result = filterDestinations(destinations, customDetails, makeFilters({ visaFreeOnly: true }));
      expect(result).not.toContain("1");
    });

    it("includes visa-free for 6 months (UK-style)", () => {
      const customDetails = {
        ...details,
        "1": { ...details["1"], visa_info: "Visa-free for 6 months" },
      };
      const result = filterDestinations(destinations, customDetails, makeFilters({ visaFreeOnly: true }));
      expect(result).toContain("1");
    });

    it("skips visa check when details missing for a destination", () => {
      const sparseDetails: Record<string, DestinationDetails> = { "1": details["1"] };
      // ID "2" has no details — should be included (line 76: destDetails is falsy, skips filter)
      const result = filterDestinations(
        [destinations[0], destinations[1]],
        sparseDetails,
        makeFilters({ visaFreeOnly: true })
      );
      expect(result).toContain("2");
    });
  });

  // Direct flights filter
  describe("direct flights filter", () => {
    it("returns all when directFlightsOnly is false", () => {
      const result = filterDestinations(destinations, details, makeFilters({ directFlightsOnly: false }));
      expect(result).toHaveLength(6);
    });

    it("returns all when homeAirport is null even if directFlightsOnly is true", () => {
      const result = filterDestinations(destinations, details, makeFilters({ directFlightsOnly: true, homeAirport: null }));
      expect(result).toHaveLength(6);
    });

    it("includes destinations within 6000km", () => {
      (distanceBetween as any).mockReturnValue(5000);
      const result = filterDestinations(destinations, details, makeFilters({ directFlightsOnly: true, homeAirport: "JFK" }));
      expect(result).toHaveLength(6);
    });

    it("excludes destinations beyond 6000km", () => {
      (distanceBetween as any).mockImplementation(
        (_lat1: number, _lng1: number, lat2: number) => (lat2 < 0 ? 12000 : 3000)
      );
      const result = filterDestinations(destinations, details, makeFilters({ directFlightsOnly: true, homeAirport: "JFK" }));
      // Bali (lat -8.34) should be excluded
      expect(result).not.toContain("3");
      expect(result).toContain("1");
    });

    it("includes destination when airport code is unknown", () => {
      (getAirportByCode as any).mockReturnValue(undefined);
      const result = filterDestinations(destinations, details, makeFilters({ directFlightsOnly: true, homeAirport: "ZZZ" }));
      expect(result).toHaveLength(6);
    });
  });

  // Combined filters
  describe("combined filters", () => {
    it("region AND climate narrow together", () => {
      const result = filterDestinations(destinations, details, makeFilters({
        regions: ["Europe"],
        climates: ["mediterranean"],
      }));
      expect(result).toEqual(["2"]); // Barcelona
    });

    it("returns empty when combined filters eliminate everything", () => {
      const result = filterDestinations(destinations, details, makeFilters({
        regions: ["Africa"],
        climates: ["tropical"],
      }));
      expect(result).toEqual([]); // Marrakech is arid, not tropical
    });
  });

  // Return type
  it("returns an array of string IDs", () => {
    const result = filterDestinations(destinations, details, makeFilters());
    result.forEach((id) => expect(typeof id).toBe("string"));
  });
});

// ─── getDefaultFilters ──────────────────────────────────────────

describe("getDefaultFilters", () => {
  it("returns correct default shape", () => {
    const defaults = getDefaultFilters();
    expect(defaults).toEqual({
      regions: [],
      climates: [],
      homeAirport: null,
      visaFreeOnly: false,
      directFlightsOnly: false,
    });
  });
});

// ─── getActiveFilterCount ───────────────────────────────────────

describe("getActiveFilterCount", () => {
  it("returns 0 for default filters", () => {
    expect(getActiveFilterCount(getDefaultFilters())).toBe(0);
  });

  it("returns 1 when only regions set", () => {
    expect(getActiveFilterCount(makeFilters({ regions: ["Europe", "Asia"] }))).toBe(1);
  });

  it("returns 1 when only climates set", () => {
    expect(getActiveFilterCount(makeFilters({ climates: ["tropical"] }))).toBe(1);
  });

  it("returns 1 when only visaFreeOnly set", () => {
    expect(getActiveFilterCount(makeFilters({ visaFreeOnly: true }))).toBe(1);
  });

  it("returns 1 when only directFlightsOnly set", () => {
    expect(getActiveFilterCount(makeFilters({ directFlightsOnly: true }))).toBe(1);
  });

  it("returns 1 when only homeAirport set", () => {
    expect(getActiveFilterCount(makeFilters({ homeAirport: "JFK" }))).toBe(1);
  });

  it("returns 5 when all filters active", () => {
    expect(getActiveFilterCount({
      regions: ["Europe"],
      climates: ["tropical"],
      homeAirport: "JFK",
      visaFreeOnly: true,
      directFlightsOnly: true,
    })).toBe(5);
  });
});
