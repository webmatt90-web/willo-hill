import {
  detailRow,
  detailTable,
  emailLayout,
  escapeHtml,
} from "@/lib/email-templates/layout";
import type { Child } from "@/lib/database.types";

type VisitNotificationInput = {
  visitDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  bringingKids: boolean;
  otherAdultName?: string;
  childList: Child[];
  wantsHost: boolean;
  needsRide: boolean;
  pickupAddress?: string;
  coffeeOrder?: string;
};

export function visitNotificationEmail(input: VisitNotificationInput): string {
  const rows = [
    detailRow("Visit date", input.visitDate),
    detailRow("Name", `${input.firstName} ${input.lastName}`),
    detailRow("Email", input.email),
    input.phone ? detailRow("Phone", input.phone) : "",
    detailRow("Bringing kids", input.bringingKids ? "Yes" : "No"),
    input.otherAdultName
      ? detailRow("Other pickup adult", input.otherAdultName)
      : "",
    detailRow("Wants a host", input.wantsHost ? "Yes" : "No"),
    detailRow("Needs a ride", input.needsRide ? "Yes" : "No"),
    input.pickupAddress ? detailRow("Pickup address", input.pickupAddress) : "",
    input.coffeeOrder ? detailRow("Coffee order", input.coffeeOrder) : "",
  ].join("");

  const kidsRows = input.childList
    .map((child) =>
      detailRow(
        child.name || "Child",
        `Age/grade: ${child.age || "—"} · Allergies: ${child.allergies || "none listed"}`
      )
    )
    .join("");

  const kidsBlock = input.childList.length
    ? `<h2 style="color:#1B2A4A;font-size:18px;margin:24px 0 8px;">Kids</h2>${detailTable(kidsRows)}`
    : "";

  return emailLayout(
    `New Visit Registration — ${escapeHtml(input.firstName)} ${escapeHtml(input.lastName)}`,
    `
    <p style="color:#333;line-height:1.6;">A new visit was just planned on the
    website. Details:</p>
    ${detailTable(rows)}
    ${kidsBlock}
    <p style="color:#333;line-height:1.6;">Reply directly to this email to
    reach the visitor.</p>
    `
  );
}
