import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin Dashboard" };

const CARDS = [
  { href: "/admin/events", emoji: "📅", label: "Manage Events" },
  { href: "/admin/sermons", emoji: "🎤", label: "Manage Sermons" },
  { href: "/admin/staff", emoji: "👥", label: "Manage Staff" },
  { href: "/admin/announcements", emoji: "📢", label: "Manage Announcements" },
];

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const today = new Date().toISOString().slice(0, 10);
  const [events, sermons, staff] = await Promise.all([
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .gte("event_date", today),
    supabase.from("sermons").select("id", { count: "exact", head: true }),
    supabase.from("staff").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "upcoming events", count: events.count ?? 0 },
    { label: "sermons", count: sermons.count ?? 0 },
    { label: "staff members", count: staff.count ?? 0 },
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold uppercase text-primary">
        Welcome{user?.email ? `, ${user.email}` : ""}!
      </h1>
      <p className="mt-2 text-primary/70">
        Manage the website&apos;s content below — changes appear on the public
        site within a minute.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-sm border border-primary/10 bg-white px-5 py-3"
          >
            <span className="font-heading text-2xl font-bold text-accent">
              {stat.count}
            </span>{" "}
            <span className="text-sm uppercase text-primary/70">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-sm border border-primary/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
          >
            <span className="text-4xl" aria-hidden="true">
              {card.emoji}
            </span>
            <span className="mt-3 block font-heading text-xl font-semibold uppercase text-primary">
              {card.label}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
