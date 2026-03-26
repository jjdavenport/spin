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
  Hr,
} from "@react-email/components";

interface DestinationSubscriptionProps {
  destinationName: string;
  country: string;
  description: string;
  imageUrl: string | null;
}

export default function DestinationSubscription({
  destinationName = "Santorini",
  country = "Greece",
  description = "Stunning sunsets, white-washed buildings, and volcanic beaches.",
  imageUrl = "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=560&h=200&fit=crop",
}: DestinationSubscriptionProps) {
  return (
    <Html>
      <Head />
      <Preview>You're subscribed to {destinationName} updates</Preview>
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
                height="200"
                style={heroImage}
              />
            )}
            <Section style={cardBody}>
              <Heading as="h1" style={heading}>
                You're subscribed to {destinationName}
              </Heading>
              <Text style={subtitle}>
                {destinationName}, {country}
              </Text>
              <Text style={text}>{description}</Text>
              <Hr style={divider} />
              <Text style={muted}>
                We'll send you updates about deals, travel tips, and new
                experiences for {destinationName}.
              </Text>
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

const heading = {
  color: "#fafafa",
  fontSize: "22px",
  fontWeight: "600" as const,
  margin: "0 0 8px",
};

const subtitle = {
  color: "#a1a1aa",
  fontSize: "14px",
  margin: "0 0 16px",
};

const text = {
  color: "#d4d4d8",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const divider = {
  borderColor: "#2a2a2a",
  margin: "20px 0",
};

const muted = {
  color: "#a1a1aa",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0",
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
