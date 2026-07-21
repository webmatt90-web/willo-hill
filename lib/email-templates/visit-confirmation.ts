import { emailLayout, escapeHtml, BRAND } from "@/lib/email-templates/layout";
import type { Child } from "@/lib/database.types";

type VisitConfirmationInput = {
  firstName: string;
  visitDate: string;
  bringingKids: boolean;
  childCount: number;
};

export function visitConfirmationEmail({
  firstName,
  visitDate,
  bringingKids,
  childCount,
}: VisitConfirmationInput): string {
  const kidsBlock = bringingKids
    ? `<p style="color:#333;line-height:1.6;">We've pre-registered
        ${childCount === 1 ? "your child" : `your ${childCount} kids`} —
        check-in will be quick and easy when you arrive. Our nursery and
        children's classes are safe, fun, and staffed by screened volunteers.</p>`
    : "";

  return emailLayout(
    `We can't wait to meet you, ${escapeHtml(firstName)}!`,
    `
    <p style="color:#333;line-height:1.6;">Thanks for planning your visit to
    Willo-Hill Baptist Church for <strong>${escapeHtml(visitDate)}</strong>.
    Here's everything you need to know:</p>

    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background-color:#f8f8f8;border-radius:4px;margin:16px 0;">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0 0 8px;color:${BRAND.NAVY};font-weight:bold;">Service Times (Sundays)</p>
        <p style="margin:0;color:#333;line-height:1.8;">
          9:30 am — Youth Sunday School &amp; Adult Classes<br>
          10:45 am — Worship Service<br>
          <em>Nursery provided for both</em>
        </p>
      </td></tr>
    </table>

    <p style="color:#333;line-height:1.6;"><strong>Where:</strong>
    4200 State Route 306, Willoughby, OH 44094. Free parking is available
    right by the main entrance — look for the greeters at the front door.</p>

    ${kidsBlock}

    <p style="color:#333;line-height:1.6;">Questions before Sunday? Just call
    or text us at (440) 488-4024 — or reply to this email.</p>

    <p style="color:#333;line-height:1.6;">See you soon!<br>
    <strong>The Willo-Hill Church Family</strong></p>
    `
  );
}

export type { Child };
