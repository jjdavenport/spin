import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { DESTINATION_DETAILS } from "@/lib/destination-details";
import { sendSubscriptionEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { email, destinationId } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!destinationId) {
      return NextResponse.json(
        { error: "Destination is required." },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // Insert subscription (upsert to handle duplicates)
    const { data: subscription, error: insertError } = await supabase
      .from("email_subscriptions")
      .upsert(
        { email, destination_id: destinationId },
        { onConflict: "email,destination_id" }
      )
      .select()
      .single();

    if (insertError) {
      console.error("Subscription insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    // Get destination details for email
    const { data: dest } = await supabase
      .from("destinations")
      .select("*")
      .eq("id", destinationId)
      .single();

    if (dest) {
      const details = DESTINATION_DETAILS[destinationId];
      const photoId = details?.unsplash_photo_id;
      sendSubscriptionEmail(email, {
        destinationName: dest.name,
        country: dest.country,
        description: dest.description,
        imageUrl: photoId
          ? `https://images.unsplash.com/photo-${photoId}?w=560&h=200&fit=crop`
          : null,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, subscription });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
