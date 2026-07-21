import Link from "next/link";
import { getActiveAnnouncement } from "@/lib/queries/announcements";

export default async function AnnouncementBar() {
  const announcement = await getActiveAnnouncement();
  if (!announcement) return null;

  const label = announcement.link_text
    ? `${announcement.title} — ${announcement.link_text}`
    : announcement.title;

  return (
    <div className="bg-accent">
      <Link
        href={announcement.link_url || "#"}
        className="mx-auto block max-w-6xl px-4 py-2 text-center text-sm font-semibold text-primary hover:underline"
      >
        {label}
      </Link>
    </div>
  );
}
