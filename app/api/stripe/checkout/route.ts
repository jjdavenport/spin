import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CREDIT_PACKS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { packId } = await request.json();

    const pack = CREDIT_PACKS.find((p) => p.id === packId);
    if (!pack) {
      return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
    }

    if (!stripe) {
      // Stripe not configured — return null url so client falls back to demo mode
      return NextResponse.json({ url: null });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Spin Credits — ${pack.label}`,
              description: `${pack.credits} credits for spinning the globe`,
            },
            unit_amount: pack.price,
          },
          quantity: 1,
        },
      ],
      metadata: {
        credits: pack.credits.toString(),
        pack_id: pack.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits?success=true&credits=${pack.credits}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/credits?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
