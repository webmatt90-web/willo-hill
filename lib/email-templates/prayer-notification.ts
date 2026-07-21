import {
  detailRow,
  detailTable,
  emailLayout,
  escapeHtml,
} from "@/lib/email-templates/layout";

type PrayerNotificationInput = {
  name: string;
  email?: string;
  request: string;
  isPublic: boolean;
};

export function prayerNotificationEmail(
  input: PrayerNotificationInput
): string {
  const rows = [
    detailRow("From", input.name),
    input.email ? detailRow("Email", input.email) : "",
    detailRow("OK to share publicly", input.isPublic ? "Yes" : "No"),
  ].join("");

  return emailLayout(
    "New Prayer Request",
    `
    ${detailTable(rows)}
    <p style="margin:16px 0 4px;color:#1B2A4A;font-weight:bold;">Request:</p>
    <p style="color:#333;line-height:1.8;white-space:pre-wrap;background-color:#f8f8f8;border-radius:4px;padding:16px;">${escapeHtml(input.request)}</p>
    `
  );
}
