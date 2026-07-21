import {
  detailRow,
  detailTable,
  emailLayout,
  escapeHtml,
} from "@/lib/email-templates/layout";

type ContactNotificationInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function contactNotificationEmail(
  input: ContactNotificationInput
): string {
  const rows = [
    detailRow("From", input.name),
    detailRow("Email", input.email),
    input.phone ? detailRow("Phone", input.phone) : "",
  ].join("");

  return emailLayout(
    "New Contact Form Message",
    `
    ${detailTable(rows)}
    <p style="margin:16px 0 4px;color:#1B2A4A;font-weight:bold;">Message:</p>
    <p style="color:#333;line-height:1.8;white-space:pre-wrap;background-color:#f8f8f8;border-radius:4px;padding:16px;">${escapeHtml(input.message)}</p>
    <p style="color:#333;line-height:1.6;">Reply directly to this email to respond.</p>
    `
  );
}
