import { Resend } from "resend";

const FALLBACK_FROM = "Willo-Hill Baptist Church <onboarding@resend.dev>";

export function getNotificationEmail(): string {
  return process.env.CHURCH_NOTIFICATION_EMAIL ?? "pastordave@willohill.com";
}

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Sends via Resend. Returns false (and logs) instead of throwing so a mail
 * outage never breaks a form submission that already saved to the database.
 */
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`RESEND_API_KEY not set — skipped email "${subject}" to ${to}`);
    return false;
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL ?? FALLBACK_FROM;

  const { error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) {
    console.error(`Resend error sending "${subject}":`, error.message);
    return false;
  }
  return true;
}
