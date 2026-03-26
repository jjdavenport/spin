// Affiliate link URL builders
// All accept an optional affiliateTag for future monetization

export function getSkyscannerLink(
  destinationAirport: string,
  affiliateTag?: string
): string {
  const base = `https://www.skyscanner.com/transport/flights/NEAR/${destinationAirport.toLowerCase()}/`;
  return affiliateTag ? `${base}?associateId=${affiliateTag}` : base;
}

export function getBookingLink(
  destinationName: string,
  country: string,
  affiliateTag?: string
): string {
  const query = encodeURIComponent(`${destinationName}, ${country}`);
  const base = `https://www.booking.com/searchresults.html?ss=${query}`;
  return affiliateTag ? `${base}&aid=${affiliateTag}` : base;
}

export function getViatorLink(
  destinationName: string,
  affiliateTag?: string
): string {
  const query = encodeURIComponent(destinationName);
  const base = `https://www.viator.com/searchResults/all?text=${query}`;
  return affiliateTag ? `${base}&pid=${affiliateTag}` : base;
}
