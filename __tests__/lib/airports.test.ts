import { describe, it, expect } from "vitest";
import {
  findNearestAirport,
  searchAirports,
  getAirportByCode,
  distanceBetween,
} from "@/lib/airports";

// ─── findNearestAirport ─────────────────────────────────────────

describe("findNearestAirport", () => {
  it("returns JFK for Manhattan coordinates", () => {
    const airport = findNearestAirport(40.758, -73.9855);
    expect(airport.code).toBe("JFK");
  });

  it("returns LHR for central London", () => {
    const airport = findNearestAirport(51.5074, -0.1278);
    expect(airport.code).toBe("LHR");
  });

  it("returns SYD for Sydney CBD", () => {
    const airport = findNearestAirport(-33.8688, 151.2093);
    expect(airport.code).toBe("SYD");
  });

  it("returns CDG for central Paris", () => {
    const airport = findNearestAirport(48.8566, 2.3522);
    expect(airport.code).toBe("CDG");
  });

  it("returns an Airport object with expected properties", () => {
    const airport = findNearestAirport(0, 0);
    expect(airport).toHaveProperty("code");
    expect(airport).toHaveProperty("name");
    expect(airport).toHaveProperty("city");
    expect(airport).toHaveProperty("lat");
    expect(airport).toHaveProperty("lng");
  });
});

// ─── searchAirports ─────────────────────────────────────────────

describe("searchAirports", () => {
  it("returns empty array for empty string", () => {
    expect(searchAirports("")).toEqual([]);
  });

  it("returns empty array for whitespace-only string", () => {
    expect(searchAirports("   ")).toEqual([]);
  });

  it("finds by exact airport code", () => {
    const results = searchAirports("JFK");
    expect(results.some((a) => a.code === "JFK")).toBe(true);
  });

  it("finds by partial code, case-insensitive", () => {
    const results = searchAirports("jf");
    expect(results.some((a) => a.code === "JFK")).toBe(true);
  });

  it("finds by city name", () => {
    const results = searchAirports("London");
    expect(results.some((a) => a.code === "LHR")).toBe(true);
  });

  it("finds by airport name", () => {
    const results = searchAirports("Heathrow");
    expect(results.some((a) => a.code === "LHR")).toBe(true);
  });

  it("is case-insensitive", () => {
    const upper = searchAirports("TOKYO");
    const lower = searchAirports("tokyo");
    expect(upper.map((a) => a.code).sort()).toEqual(
      lower.map((a) => a.code).sort()
    );
  });

  it("returns at most 8 results", () => {
    // "International" matches many airports
    const results = searchAirports("International");
    expect(results.length).toBeLessThanOrEqual(8);
  });
});

// ─── getAirportByCode ───────────────────────────────────────────

describe("getAirportByCode", () => {
  it("returns Airport for valid code", () => {
    const airport = getAirportByCode("LAX");
    expect(airport).toBeDefined();
    expect(airport!.code).toBe("LAX");
    expect(airport!.city).toBe("Los Angeles");
  });

  it("returns undefined for invalid code", () => {
    expect(getAirportByCode("ZZZ")).toBeUndefined();
  });

  it("is case-sensitive (lowercase returns undefined)", () => {
    expect(getAirportByCode("lax")).toBeUndefined();
  });
});

// ─── distanceBetween ────────────────────────────────────────────

describe("distanceBetween", () => {
  it("returns 0 for identical coordinates", () => {
    expect(distanceBetween(40, -74, 40, -74)).toBe(0);
  });

  it("calculates ~5,570 km for JFK to LHR", () => {
    const dist = distanceBetween(40.6413, -73.7781, 51.47, -0.4543);
    expect(dist).toBeGreaterThan(5400);
    expect(dist).toBeLessThan(5700);
  });

  it("is symmetric", () => {
    const ab = distanceBetween(40.6413, -73.7781, 51.47, -0.4543);
    const ba = distanceBetween(51.47, -0.4543, 40.6413, -73.7781);
    expect(ab).toBeCloseTo(ba, 5);
  });

  it("calculates long-haul distance (SYD to LAX)", () => {
    const dist = distanceBetween(-33.9461, 151.1772, 33.9425, -118.4081);
    expect(dist).toBeGreaterThan(11000);
    expect(dist).toBeLessThan(13000);
  });
});
