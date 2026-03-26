import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Preview,
  Hr,
} from "@react-email/components";

interface WaitlistWelcomeProps {
  position: number;
}

export default function WaitlistWelcome({ position = 2848 }: WaitlistWelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>You're #{position.toLocaleString()} on the Spin waitlist</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>Spin</Heading>
          </Section>

          <Section style={content}>
            <Heading as="h1" style={heading}>
              You're on the list!
            </Heading>
            <Text style={text}>
              You're <strong>#{position.toLocaleString()}</strong> in line. We'll
              let you know as soon as it's your turn to spin.
            </Text>
            <Hr style={divider} />
            <Text style={muted}>
              Spin the globe. Discover your next adventure. Every spin reveals a
              handpicked destination with curated itineraries, budget guides, and
              one-click booking.
            </Text>
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

const content = {
  backgroundColor: "#171717",
  borderRadius: "12px",
  padding: "32px 24px",
};

const heading = {
  color: "#fafafa",
  fontSize: "24px",
  fontWeight: "600" as const,
  margin: "0 0 16px",
};

const text = {
  color: "#fafafa",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const divider = {
  borderColor: "#2a2a2a",
  margin: "24px 0",
};

const muted = {
  color: "#a1a1aa",
  fontSize: "14px",
  lineHeight: "22px",
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
