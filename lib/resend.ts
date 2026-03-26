import { Resend } from "resend";

function getResendInstance() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return null;
  }
  return new Resend(key);
}

export const resend = getResendInstance();
