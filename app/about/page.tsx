import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import BeliefsList from "@/components/ui/BeliefsList";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Willo-Hill Baptist Church — Following Christ Together in Willoughby, Ohio. Our heart, what we believe, and who leads us.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About"
        accent="Willo-Hill"
        subtitle="Following Christ Together"
      />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold uppercase text-primary">
          Our <span className="text-accent">Heart</span>
        </h2>
        <p className="mt-4 leading-relaxed text-primary/85">
          Willo-Hill Baptist Church is a church family in Willoughby, Ohio,
          committed to following Christ together. We gather around
          Gospel-centered teaching that is Biblically authoritative and
          radically applicable, worship that magnifies God across every
          generation, and ministries that help families discover God&apos;s
          purposes for their lives and walk in them.
        </p>
        <p className="mt-4 leading-relaxed text-primary/85">
          Whether you&apos;ve walked with Jesus for decades or you&apos;re
          just beginning to ask questions, there&apos;s a place for you here.
        </p>
      </section>

      <section className="relative overflow-hidden bg-primary px-4 py-14">
        <h2 className="text-center text-3xl font-semibold uppercase text-white">
          What We <span className="text-accent">Believe</span>
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-5">
          <BeliefsListDark />
        </div>
        <SectionDivider />
      </section>

      <section className="px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold uppercase text-primary">
          Our <span className="text-accent">Leadership</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-primary/80">
          Meet the pastors, staff, ministry leaders, elders, and deacons who
          serve our church family.
        </p>
        <div className="mt-6">
          <Button href="/leadership">Meet Our Leaders</Button>
        </div>
      </section>
    </main>
  );
}

function BeliefsListDark() {
  return (
    <div className="[&_p]:!text-white/85">
      <BeliefsList />
    </div>
  );
}
