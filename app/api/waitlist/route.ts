import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendWaitlistEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // Insert into waitlist (upsert to handle duplicates)
    const { error: insertError } = await supabase
      .from("waitlist")
      .upsert({ email }, { onConflict: "email" });

    if (insertError) {
      console.error("Waitlist insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }

    // Get total waitlist count
    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = (count ?? 0) + 2847; // Base count offset

    sendWaitlistEmail(email, position).catch(() => {});

    return NextResponse.json({ success: true, position });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
