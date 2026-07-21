import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Kids",
  description:
    "Kids ministry at Willo-Hill Baptist Church — nursery, Sunday School, Children's Church, and AWANA clubs for ages 3 through 6th grade.",
};

const AWANA_CLUBS = [
  "Puggles (toddlers)",
  "Cubbies (pre-K)",
  "Sparks (K–2nd grade)",
  "T&T Girls (3rd–6th grade)",
  "T&T Boys (3rd–6th grade)",
];

export default function KidsPage() {
  return (
    <main>
      <PageHero
        title="Kids"
        accent="Ministry"
        subtitle="Kids are an important part of the ministries at Willo-Hill. We help children build a solid foundation of faith — and have a blast doing it."
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-2xl font-semibold uppercase text-primary">
          <span className="text-accent">Nursery</span>
        </h2>
        <p className="mt-3 leading-relaxed text-primary/85">
          Our nursery volunteers will care for your infants and toddlers with
          great care and compassion — available during both the 9:30am hour
          and the 10:45am worship service.
        </p>

        <h2 className="mt-10 text-2xl font-semibold uppercase text-primary">
          Sunday <span className="text-accent">Mornings</span>
        </h2>
        <ul className="mt-3 space-y-3 leading-relaxed text-primary/85">
          <li>
            <strong>Sunday School (Bible Hour), 9:30am</strong> — classes
            divided by age (under five) and grade (K–6th).
          </li>
          <li>
            <strong>Children&apos;s Church, 11:00am</strong> — ages 3 through
            6th grade. Kids begin with their parents in the main service, then
            are dismissed to a worship service and lesson time geared to
            younger children.
          </li>
        </ul>
      </section>

      <section className="relative overflow-hidden bg-primary px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold uppercase text-white">
            <span className="text-accent">AWANA</span> Clubs
          </h2>
          <p className="mt-3 leading-relaxed text-white/90">
            Wednesday evenings at 6:45pm, September through May, kids ages 3
            through 6th grade experience games, crafts, Scripture memory, and
            Bible lessons.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {AWANA_CLUBS.map((club) => (
              <li
                key={club}
                className="rounded-sm bg-white/10 px-3 py-1.5 text-sm text-white/90"
              >
                {club}
              </li>
            ))}
          </ul>
        </div>
        <SectionDivider />
      </section>

      <section className="px-4 py-14 text-center">
        <p className="text-primary/80">
          Questions? Contact <strong>Jason Maynard</strong>, Sunday Morning
          Children&apos;s Director, or <strong>Bruce Waller</strong>, AWANA
          Commander — (440) 488-4024.
        </p>
        <div className="mt-6">
          <Button href="/visit">Pre-Register Your Kids For A Visit</Button>
        </div>
      </section>
    </main>
  );
}
