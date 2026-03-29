import { describe, it, expect } from "vitest";
import { getCountryCode, getCountryFlagUrl } from "@/lib/country-flags";

// ─── getCountryCode ─────────────────────────────────────────────

describe("getCountryCode", () => {
  it("returns 'fr' for France", () => {
    expect(getCountryCode("France")).toBe("fr");
  });

  it("returns 'jp' for Japan", () => {
    expect(getCountryCode("Japan")).toBe("jp");
  });

  it("returns 'ae' for UAE", () => {
    expect(getCountryCode("UAE")).toBe("ae");
  });

  it("returns 'gb-sct' for Scotland (multi-part code)", () => {
    expect(getCountryCode("Scotland")).toBe("gb-sct");
  });

  it("returns empty string for unknown country", () => {
    expect(getCountryCode("Narnia")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(getCountryCode("")).toBe("");
  });
});

// ─── getCountryFlagUrl ──────────────────────────────────────────

describe("getCountryFlagUrl", () => {
  it("returns correct CDN URL for known country", () => {
    expect(getCountryFlagUrl("France")).toBe("https://flagcdn.com/20x15/fr.png");
  });

  it("returns correct URL for multi-part code", () => {
    expect(getCountryFlagUrl("Scotland")).toBe("https://flagcdn.com/20x15/gb-sct.png");
  });

  it("returns empty string for unknown country", () => {
    expect(getCountryFlagUrl("Narnia")).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(getCountryFlagUrl("")).toBe("");
  });
});
