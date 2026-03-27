import { describe, it, expect } from "vitest";
import {
  REGIONS,
  SPIN_COST,
  FREE_CREDITS,
} from "@/lib/constants";

describe("REGIONS", () => {
  it("has 8 entries", () => {
    expect(REGIONS).toHaveLength(8);
  });

  it("starts with 'All Regions'", () => {
    expect(REGIONS[0]).toBe("All Regions");
  });

  it("contains expected regions", () => {
    expect(REGIONS).toContain("Europe");
    expect(REGIONS).toContain("Asia");
    expect(REGIONS).toContain("Africa");
    expect(REGIONS).toContain("Oceania");
    expect(REGIONS).toContain("Middle East");
  });
});

describe("SPIN_COST and FREE_CREDITS", () => {
  it("SPIN_COST is 1", () => {
    expect(SPIN_COST).toBe(1);
  });

  it("FREE_CREDITS is 3", () => {
    expect(FREE_CREDITS).toBe(3);
  });
});
