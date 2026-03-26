import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Preview,
  Img,
  Button,
  Hr,
} from "@react-email/components";

interface SpinResultProps {
  destinationId: string;
  destinationName: string;
  country: string;
  region: string;
  description: string;
  imageUrl: string | null;
  airportCode: string;
  bestTimeToVisit: string;
  highlights: string[];
  budgetRange: { low: number; high: number; currency: string };
  appUrl?: string;
}

export default function SpinResult({
  destinationId = "1",
  destinationName = "Paris",
  country = "France",
  region = "Europe",
  description = "The City of Light, home to the Eiffel Tower, Louvre Museum, and world-class cuisine.",
  imageUrl = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=560&h=240&fit=crop",
  airportCode = "CDG",
  bestTimeToVisit = "April to June, September to October",
  highlights = [
    "Climb the Eiffel Tower at sunset",
    "Explore the Louvre and Musee d'Orsay",
    "Stroll through Montmartre",
    "Cruise the Seine at night",
  ],
  budgetRange = { low: 100, high: 250, currency: "EUR" },
  appUrl = "https://spin.travel",
}: SpinResultProps) {
  const skyscannerUrl = `https://www.skyscanner.com/transport/flights/NEAR/${airportCode.toLowerCase()}/`;
  const bookingQuery = encodeURIComponent(`${destinationName}, ${country}`);
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${bookingQuery}`;
  const viatorQuery = encodeURIComponent(destinationName);
  const viatorUrl = `https://www.viator.com/searchResults/all?text=${viatorQuery}`;

  return (
    <Html>
      <Head />
      <Preview>
        Your Spin landed on {destinationName}, {country}!
      </Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>Spin</Heading>
          </Section>

          <Section style={card}>
            {imageUrl && (
              <Img
                src={imageUrl}
                alt={destinationName}
                width="100%"
                height="240"
                style={heroImage}
              />
            )}
            <Section style={cardBody}>
              <Text style={regionBadge}>{region}</Text>
              <Heading as="h1" style={heading}>
                {destinationName}, {country}
              </Heading>
              <Text style={text}>{description}</Text>

              <Hr style={divider} />

              <Section style={detailsGrid}>
                <Text style={detailLabel}>Best time to visit</Text>
                <Text style={detailValue}>{bestTimeToVisit}</Text>
                <Text style={detailLabel}>Airport</Text>
                <Text style={detailValue}>{airportCode}</Text>
                <Text style={detailLabel}>Daily budget</Text>
                <Text style={detailValue}>
                  {budgetRange.currency} {budgetRange.low}&ndash;
                  {budgetRange.high}
                </Text>
              </Section>

              {highlights.length > 0 && (
                <>
                  <Hr style={divider} />
                  <Text style={detailLabel}>Highlights</Text>
                  {highlights.slice(0, 4).map((h, i) => (
                    <Text key={i} style={highlightItem}>
                      &bull; {h}
                    </Text>
                  ))}
                </>
              )}

              <Hr style={divider} />

              <Section style={buttonGroup}>
                <Button href={skyscannerUrl} style={ctaButton}>
                  Book Flights
                </Button>
                <Button href={bookingUrl} style={ctaButtonOutline}>
                  Find Hotels
                </Button>
                <Button href={viatorUrl} style={ctaButtonOutline}>
                  Experiences
                </Button>
              </Section>

              <Section style={{ textAlign: "center" as const, marginTop: "16px" }}>
                <Button
                  href={`${appUrl}/destination/${destinationId}`}
                  style={linkButton}
                >
                  View Full Details &rarr;
                </Button>
              </Section>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Spin. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  margin: "0",
  padding: "0",
};

const container = {
  maxWidth: "560px",
  margin: "0 auto",
  padding: "40px 20px",
};

const header = {
  textAlign: "center" as const,
  paddingBottom: "24px",
};

const logo = {
  color: "#fafafa",
  fontSize: "28px",
  fontWeight: "700" as const,
  letterSpacing: "-0.5px",
  margin: "0",
};

const card = {
  backgroundColor: "#171717",
  borderRadius: "12px",
  overflow: "hidden" as const,
};

const heroImage = {
  objectFit: "cover" as const,
  display: "block" as const,
};

const cardBody = {
  padding: "24px",
};

const regionBadge = {
  color: "#3b82f6",
  fontSize: "12px",
  fontWeight: "600" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 8px",
};

const heading = {
  color: "#fafafa",
  fontSize: "24px",
  fontWeight: "600" as const,
  margin: "0 0 12px",
};

const text = {
  color: "#d4d4d8",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0",
};

const divider = {
  borderColor: "#2a2a2a",
  margin: "20px 0",
};

const detailsGrid = {
  margin: "0",
};

const detailLabel = {
  color: "#a1a1aa",
  fontSize: "12px",
  fontWeight: "600" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const detailValue = {
  color: "#fafafa",
  fontSize: "14px",
  margin: "0 0 12px",
};

const highlightItem = {
  color: "#d4d4d8",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 4px",
  paddingLeft: "4px",
};

const buttonGroup = {
  textAlign: "center" as const,
};

const ctaButton = {
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600" as const,
  borderRadius: "8px",
  padding: "10px 20px",
  textDecoration: "none",
  display: "inline-block" as const,
  margin: "4px",
};

const ctaButtonOutline = {
  backgroundColor: "transparent",
  color: "#3b82f6",
  fontSize: "14px",
  fontWeight: "600" as const,
  borderRadius: "8px",
  border: "1px solid #3b82f6",
  padding: "10px 20px",
  textDecoration: "none",
  display: "inline-block" as const,
  margin: "4px",
};

const linkButton = {
  color: "#a1a1aa",
  fontSize: "13px",
  textDecoration: "underline",
  backgroundColor: "transparent",
};

const footer = {
  textAlign: "center" as const,
  paddingTop: "24px",
};

const footerText = {
  color: "#52525b",
  fontSize: "12px",
  margin: "0",
};
