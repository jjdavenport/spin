import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendVerificationEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    const { data, error } = await supabase.auth.admin.generateLink({
      type: "signup",
      email,
      options: {
        redirectTo: `${new URL(request.url).origin}/callback`,
      },
    });

    if (error) {
      console.error("[Auth Verify] Failed to generate link:", error.message);
      return NextResponse.json({ error: "Failed to generate verification link" }, { status: 500 });
    }

    const confirmUrl = data.properties.action_link;

    const emailResult = await sendVerificationEmail(email, confirmUrl);

    if (!emailResult) {
      console.error("[Auth Verify] Resend not configured");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Auth Verify] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
