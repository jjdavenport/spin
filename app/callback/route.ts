import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "signup" | "email" | "magiclink" | undefined;
  const next = searchParams.get("next") ?? "/";

  const supabase = await createClient();
  let error = null;

  if (token_hash && type) {
    // Token hash flow (from custom Resend verification email)
    ({ error } = await supabase.auth.verifyOtp({ token_hash, type }));
  } else if (code) {
    // PKCE flow (from OAuth or default Supabase emails)
    ({ error } = await supabase.auth.exchangeCodeForSession(code));
  } else {
    return NextResponse.redirect(`${origin}/admin?error=auth`);
  }

  if (!error) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase())) {
      return NextResponse.redirect(`${origin}/admin`);
    }

    return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(`${origin}/admin?error=auth`);
}
