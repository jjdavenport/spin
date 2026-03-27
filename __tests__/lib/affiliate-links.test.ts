import { describe, it, expect } from "vitest";
import {
  getSkyscannerLink,
  getBookingLink,
  getViatorLink,
} from "@/lib/affiliate-links";

describe("getSkyscannerLink", () => {
  it("returns correct base URL with lowercased airport code", () => {
    expect(getSkyscannerLink("CDG")).toBe(
      "https://www.skyscanner.com/transport/flights/NEAR/cdg/"
    );
  });

  it("handles already lowercase airport code", () => {
    expect(getSkyscannerLink("jfk")).toBe(
      "https://www.skyscanner.com/transport/flights/NEAR/jfk/"
    );
  });

  it("appends affiliateTag when provided", () => {
    expect(getSkyscannerLink("CDG", "myTag")).toBe(
      "https://www.skyscanner.com/transport/flights/NEAR/cdg/?associateId=myTag"
    );
  });

  it("omits affiliateTag query param when not provided", () => {
    const url = getSkyscannerLink("LAX");
    expect(url).not.toContain("associateId");
  });
});

describe("getBookingLink", () => {
  it("encodes destination and country", () => {
    const url = getBookingLink("Paris", "France");
    expect(url).toBe(
      `https://www.booking.com/searchresults.html?ss=${encodeURIComponent("Paris, France")}`
    );
  });

  it("handles special characters in destination name", () => {
    const url = getBookingLink("Salar de Uyuni", "Bolivia");
    expect(url).toContain(encodeURIComponent("Salar de Uyuni, Bolivia"));
  });

  it("appends affiliate tag", () => {
    const url = getBookingLink("Tokyo", "Japan", "aid123");
    expect(url).toContain("&aid=aid123");
  });

  it("omits affiliate tag when not provided", () => {
    const url = getBookingLink("Tokyo", "Japan");
    expect(url).not.toContain("&aid=");
  });
});

describe("getViatorLink", () => {
  it("encodes destination name", () => {
    const url = getViatorLink("Machu Picchu");
    expect(url).toBe(
      `https://www.viator.com/searchResults/all?text=${encodeURIComponent("Machu Picchu")}`
    );
  });

  it("appends affiliate tag", () => {
    const url = getViatorLink("Bali", "pid456");
    expect(url).toContain("&pid=pid456");
  });

  it("omits affiliate tag when not provided", () => {
    const url = getViatorLink("Bali");
    expect(url).not.toContain("&pid=");
  });
});
