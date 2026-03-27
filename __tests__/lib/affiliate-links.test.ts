import { describe, it, expect } from "vitest";
import {
  getSkyscannerLink,
  getBookingLink,
  getViatorLink,
  AFFILIATE_CONFIG,
} from "@/lib/affiliate-links";

describe("getSkyscannerLink", () => {
  it("returns correct base URL with lowercased airport code", () => {
    expect(getSkyscannerLink("CDG")).toContain(
      "https://www.skyscanner.com/transport/flights/NEAR/cdg/"
    );
  });

  it("handles already lowercase airport code", () => {
    expect(getSkyscannerLink("jfk")).toContain(
      "https://www.skyscanner.com/transport/flights/NEAR/jfk/"
    );
  });

  it("includes affiliate ID from config", () => {
    const url = getSkyscannerLink("CDG");
    expect(url).toContain(
      `associateId=${AFFILIATE_CONFIG.skyscanner.affiliateId}`
    );
  });
});

describe("getBookingLink", () => {
  it("encodes destination and country", () => {
    const url = getBookingLink("Paris", "France");
    expect(url).toContain(
      `ss=${encodeURIComponent("Paris, France")}`
    );
  });

  it("handles special characters in destination name", () => {
    const url = getBookingLink("Salar de Uyuni", "Bolivia");
    expect(url).toContain(encodeURIComponent("Salar de Uyuni, Bolivia"));
  });

  it("includes affiliate ID from config", () => {
    const url = getBookingLink("Tokyo", "Japan");
    expect(url).toContain(
      `aid=${AFFILIATE_CONFIG.booking.affiliateId}`
    );
  });
});

describe("getViatorLink", () => {
  it("encodes destination name", () => {
    const url = getViatorLink("Machu Picchu");
    expect(url).toContain(
      `text=${encodeURIComponent("Machu Picchu")}`
    );
  });

  it("includes affiliate ID from config", () => {
    const url = getViatorLink("Bali");
    expect(url).toContain(
      `pid=${AFFILIATE_CONFIG.viator.affiliateId}`
    );
  });
});
