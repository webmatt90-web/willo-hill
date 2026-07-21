import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "Get connected at Willo-Hill Baptist Church — announcements, sermons, events, prayer, serving opportunities, giving, and more.",
};

const CARDS = [
  {
    title: "Weekly Announcements",
    text: "See what's happening this week. Contact the church office for the weekly bulletin.",
    href: "/events",
    emoji: "📋",
  },
  { title: "Sermons", text: "Watch past messages or catch up on a series.", href: "/sermons", emoji: "🎤" },
  { title: "Events", text: "Bible studies, AWANA, youth group, and gatherings.", href: "/events", emoji: "📅" },
  { title: "Prayer", text: "Share a request — our pastors pray over every one.", href: "/connect/prayer", emoji: "🙏" },
  { title: "Get Involved", text: "Find a team and use your gifts to serve.", href: "/teams", emoji: "🤝" },
  { title: "Guest", text: "New here? Plan a visit and we'll roll out the welcome mat.", href: "/visit", emoji: "👋" },
  { title: "Give", text: "Give online — 100% goes directly to the church.", href: "/give", emoji: "💛" },
  { title: "Service Times", text: "Sundays 9:30 & 10:45am · Wednesdays (Sept–May).", href: "/new", emoji: "⏰" },
  { title: "Contact Us", text: "Questions? Call, text, or send us a message.", href: "/contact", emoji: "✉️" },
];

export default function ConnectPage() {
  return (
    <main>
      <PageHero
        title="Connect"
        subtitle="Church is more than a Sunday service — it's a family. Here's how to plug in."
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          {CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="w-full rounded-sm border border-primary/10 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <span className="text-3xl" aria-hidden="true">
                {card.emoji}
              </span>
              <h2 className="mt-3 text-xl font-semibold uppercase text-primary">
                {card.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-primary/70">{card.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
