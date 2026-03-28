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
  Button,
} from "@react-email/components";

interface VerifyEmailProps {
  confirmUrl: string;
}

export default function VerifyEmail({
  confirmUrl = "https://spin.travel/callback",
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Confirm your Spin account</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={logo}>Spin</Heading>
          </Section>

          <Section style={content}>
            <Heading as="h1" style={heading}>
              Confirm your email
            </Heading>
            <Text style={text}>
              Thanks for signing up for Spin! Click the button below to confirm
              your email address and start discovering your next adventure.
            </Text>
            <Section style={buttonContainer}>
              <Button style={button} href={confirmUrl}>
                Confirm my account
              </Button>
            </Section>
            <Hr style={divider} />
            <Text style={muted}>
              If you didn&apos;t create an account with Spin, you can safely
              ignore this email.
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
  margin: "0 0 24px",
};

const buttonContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#fafafa",
  borderRadius: "8px",
  color: "#0a0a0a",
  fontSize: "16px",
  fontWeight: "600" as const,
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 32px",
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
