import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Family Ministries",
  description:
    "Family ministries at Willo-Hill Baptist Church — kids, youth, young adults, and a 6,000-item church library for the whole family.",
};

const MINISTRIES = [
  {
    title: "Kids",
    href: "/kids",
    text: "Kids are an important part of the ministries at Willo-Hill. We strengthen families and support faith development at home with programs that give children a solid foundation of faith.",
  },
  {
    title: "Youth",
    href: "/youth",
    text: "Our youth program walks with teenagers navigating a modern world — helping them gain independence while discovering who God created them to be.",
  },
  {
    title: "Young Adults",
    href: "/groups",
    text: "For those transitioning into adulthood: keep your faith at the center as you explore life beyond your childhood years and become a person of faith who influences the world for Jesus.",
  },
  {
    title: "LifeGroups",
    href: "/groups",
    text: "Fellowship doesn't just happen on Sundays — connect with other families midweek to grow together in God's Word.",
  },
];

export default function FamilyPage() {
  return (
    <main>
      <PageHero
        title="Family"
        accent="Ministries"
        subtitle="Helping families discover God's purposes for their lives and walk in them."
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          {MINISTRIES.map((ministry) => (
            <Link
              key={ministry.title}
              href={ministry.href}
              className="w-full rounded-sm border border-primary/10 bg-white p-8 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md sm:w-[calc(50%-12px)]"
            >
              <h2 className="text-2xl font-semibold uppercase text-primary">
                {ministry.title}
              </h2>
              <p className="mt-3 leading-relaxed text-primary/75">{ministry.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold uppercase text-white">
            Church <span className="text-accent">Library</span>
          </h2>
          <p className="mt-4 leading-relaxed text-white/90">
            Over 6,000 items — fiction and nonfiction books, audiovisuals,
            CDs, DVDs, puzzles, and an extensive children&apos;s collection.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            Open Sundays 9:00–9:30am and after the morning service until
            12:30pm · Tuesday &amp; Wednesday 10am–noon by appointment ·
            Family Library Day the first Tuesday of each month (school year),
            10–11am.
          </p>
        </div>
      </section>
    </main>
  );
}
