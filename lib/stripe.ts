import Stripe from "stripe";

function getStripeInstance() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return null;
  }
  return new Stripe(key, { typescript: true });
}

export const stripe = getStripeInstance();
