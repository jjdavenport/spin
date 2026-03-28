import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { sendVerificationEmail } from "@/lib/send-email";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    const { data, error } = await supabase.auth.admin.generateLink({
      type: "signup",
      email,
      password,
      options: {
        redirectTo: `${new URL(request.url).origin}/callback`,
      },
    });

    if (error) {
      console.error("[Auth Verify] Failed to generate link:", error.message);
      return NextResponse.json({ error: "Failed to generate verification link" }, { status: 500 });
    }

    // Build our own callback URL with token_hash so we can use verifyOtp
    // instead of PKCE (which requires a client-side code verifier)
    const origin = new URL(request.url).origin;
    const hashedToken = data.properties.hashed_token;
    const confirmUrl = `${origin}/callback?token_hash=${hashedToken}&type=signup`;

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
