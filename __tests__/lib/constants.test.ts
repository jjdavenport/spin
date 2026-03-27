import { describe, it, expect } from "vitest";
import {
  REGIONS,
  SPIN_COST,
  FREE_CREDITS,
  CREDIT_PACKS,
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

describe("CREDIT_PACKS", () => {
  it("has 3 packs", () => {
    expect(CREDIT_PACKS).toHaveLength(3);
  });

  it("each pack has required fields", () => {
    for (const pack of CREDIT_PACKS) {
      expect(pack).toHaveProperty("id");
      expect(pack).toHaveProperty("credits");
      expect(pack).toHaveProperty("price");
      expect(pack).toHaveProperty("label");
      expect(pack).toHaveProperty("priceLabel");
      expect(typeof pack.credits).toBe("number");
      expect(typeof pack.price).toBe("number");
    }
  });

  it("packs are in ascending order of credits", () => {
    expect(CREDIT_PACKS[0].credits).toBeLessThan(CREDIT_PACKS[1].credits);
    expect(CREDIT_PACKS[1].credits).toBeLessThan(CREDIT_PACKS[2].credits);
  });

  it("has correct pack IDs", () => {
    expect(CREDIT_PACKS.map((p) => p.id)).toEqual([
      "pack_5",
      "pack_20",
      "pack_50",
    ]);
  });
});
