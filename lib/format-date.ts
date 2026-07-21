const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Formats a `date` column value ("YYYY-MM-DD") without timezone drift —
 * `new Date("2026-09-02")` parses as UTC midnight and can render as the
 * previous day in US timezones.
 */
export function formatEventDate(isoDate: string): {
  month: string;
  day: number;
  year: number;
} {
  const [year, month, day] = isoDate.split("-").map(Number);
  return { month: MONTHS[month - 1] ?? "", day, year };
}

export function formatFullDate(isoDate: string): string {
  const { month, day, year } = formatEventDate(isoDate);
  return `${month} ${day}, ${year}`;
}
