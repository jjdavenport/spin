import { resend } from "./resend";
import { FROM_EMAIL } from "./constants";
import WaitlistWelcome from "@/emails/waitlist-welcome";
import DestinationSubscription from "@/emails/destination-subscription";
import SpinResult from "@/emails/spin-result";

export async function sendWaitlistEmail(email: string, position: number) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping waitlist email to", email);
    return null;
  }
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Welcome to the Spin waitlist!",
    react: WaitlistWelcome({ position }),
  });
}

export async function sendSubscriptionEmail(
  email: string,
  destination: {
    destinationName: string;
    country: string;
    description: string;
    imageUrl: string | null;
  }
) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping subscription email");
    return null;
  }
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `You're subscribed to ${destination.destinationName} updates`,
    react: DestinationSubscription(destination),
  });
}

export async function sendSpinResultEmail(
  email: string,
  props: {
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
  }
) {
  if (!resend) {
    console.log("[Email] Resend not configured, skipping spin result email");
    return null;
  }
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your Spin landed on ${props.destinationName}!`,
    react: SpinResult(props),
  });
}
