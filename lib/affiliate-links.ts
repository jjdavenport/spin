// Affiliate link configuration and URL builders
// Swap env vars with real affiliate IDs when partnerships are live

export const AFFILIATE_CONFIG = {
  skyscanner: {
    name: "Skyscanner",
    affiliateId:
      process.env.NEXT_PUBLIC_SKYSCANNER_AFFILIATE_ID ??
      "spin_skyscanner_placeholder",
    paramKey: "associateId",
  },
  booking: {
    name: "Booking.com",
    affiliateId:
      process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID ??
      "spin_booking_placeholder",
    paramKey: "aid",
  },
  viator: {
    name: "Viator",
    affiliateId:
      process.env.NEXT_PUBLIC_VIATOR_AFFILIATE_ID ??
      "spin_viator_placeholder",
    paramKey: "pid",
  },
} as const;

export type AffiliatePartner = keyof typeof AFFILIATE_CONFIG;

export function getSkyscannerLink(destinationAirport: string): string {
  const { affiliateId, paramKey } = AFFILIATE_CONFIG.skyscanner;
  const base = `https://www.skyscanner.com/transport/flights/NEAR/${destinationAirport.toLowerCase()}/`;
  return `${base}?${paramKey}=${affiliateId}`;
}

export function getBookingLink(
  destinationName: string,
  country: string
): string {
  const { affiliateId, paramKey } = AFFILIATE_CONFIG.booking;
  const query = encodeURIComponent(`${destinationName}, ${country}`);
  return `https://www.booking.com/searchresults.html?ss=${query}&${paramKey}=${affiliateId}`;
}

export function getViatorLink(destinationName: string): string {
  const { affiliateId, paramKey } = AFFILIATE_CONFIG.viator;
  const query = encodeURIComponent(destinationName);
  return `https://www.viator.com/searchResults/all?text=${query}&${paramKey}=${affiliateId}`;
}

// Fire-and-forget click tracking — never blocks navigation
export function trackAffiliateClick(
  partner: AffiliatePartner,
  destination: string,
  context?: string
): void {
  const payload = JSON.stringify({
    partner,
    destination,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== "undefined" ? window.location.href : "",
  });

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/affiliate-click",
      new Blob([payload], { type: "application/json" })
    );
  } else {
    fetch("/api/affiliate-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }
}
