import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Missions",
  description:
    "Missions at Willo-Hill Baptist Church — supporting missionaries around the globe and serving locally in the name of Jesus.",
};

const MISSIONARIES = [
  "Kent & Belen Albright — Baptist Mid-Missions",
  "Tom & Connie Chapman — Evangelical Missions to Uruguay",
  "Ed & Sylvia Christy — Baptist Mid-Missions",
  "Bob & Brenda Himes — Bill Rice Ranch Missions",
  "Ken & Lynne Moon — Baptist Mid-Missions",
  "Mike & Alicia Nicholes — Word of Life",
  "Steve & Cheryl Winget — ABWE",
  "Anna Curby — ABWE",
  "Tina Curby — ABWE",
  "Traci Delibasich — Word of Life",
  "Jackie Hopkins — Baptist Mid-Missions",
  "Unnamed Servants — ABWE",
];

export default function MissionsPage() {
  return (
    <main>
      <PageHero
        title="Missions"
        subtitle="Taking the Great Commission seriously — around the globe and around the corner."
      />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-center text-2xl font-semibold uppercase text-primary">
          Missionaries We <span className="text-accent">Support</span>
        </h2>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {MISSIONARIES.map((missionary) => (
            <li
              key={missionary}
              className="rounded-sm border border-primary/10 bg-white px-4 py-2 text-sm text-primary/85"
            >
              {missionary}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-primary px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold uppercase text-white">
          Help us spread the gospel <span className="text-accent">around the globe</span>
        </h2>
        <div className="mt-6">
          <Button href="/give" size="lg">
            Give Toward Missions
          </Button>
        </div>
      </section>
    </main>
  );
}
