const NAVY = "#1B2A4A";
const YELLOW = "#F5A623";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Brand email shell. Inline styles only — email clients strip CSS classes. */
export function emailLayout(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:4px;overflow:hidden;">
        <tr>
          <td style="background-color:${NAVY};padding:24px;text-align:center;">
            <span style="color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:2px;">WILLO-HILL</span>
            <span style="color:${YELLOW};font-size:22px;font-weight:bold;letter-spacing:2px;"> CHURCH</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 24px;">
            <h1 style="margin:0 0 16px;color:${NAVY};font-size:24px;">${title}</h1>
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="background-color:${NAVY};padding:16px 24px;text-align:center;">
            <p style="margin:0;color:#ffffff;font-size:12px;line-height:1.6;">
              Willo-Hill Baptist Church · 4200 State Route 306, Willoughby, OH 44094<br>
              (440) 488-4024 (Call or Text)
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px;font-weight:bold;color:${NAVY};white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 12px;color:#333333;">${escapeHtml(value)}</td>
  </tr>`;
}

export function detailTable(rows: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;background-color:#f8f8f8;border-radius:4px;margin:8px 0;">${rows}</table>`;
}

export const BRAND = { NAVY, YELLOW };
