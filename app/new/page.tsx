import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";
import BeliefsList from "@/components/ui/BeliefsList";

export const metadata: Metadata = {
  title: "New Here?",
  description:
    "New to Willo-Hill Baptist Church? Learn what to expect — Gospel-centered teaching, worship for every generation, ministries for the whole family, and what we believe.",
};

const PASTORS = [
  {
    name: "Pastor Dave Hackney",
    title: "Teaching & Executive Pastor",
    photo: "/images/pastor-dave.jpg",
  },
  {
    name: "Pastor Joe Mieden",
    title: "Youth & Young Adult Pastor",
    photo: "/images/pastor-joe.jpg",
  },
  {
    name: "Pastor Rob Mieden",
    title: "Discipleship and Assimilation",
    photo: "/images/pastor-rob.jpg",
  },
];

export default function NewHerePage() {
  return (
    <main>
      <PageHero
        title="New"
        accent="Here?"
        subtitle="Looking for a new church home? Not sure where to start? Just come by! Join us for a Sunday morning or weeknight LifeGroup; we would love to meet you!"
      />

      {/* Sermons */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold uppercase text-primary">
          <span className="text-accent">Sermons</span>
        </h2>
        <p className="mt-4 leading-relaxed text-primary/85">
          Each week, expect to hear a Gospel-centered teaching that will help
          your faith to grow. Our sermons are Biblically authoritative and
          radically applicable, designed to speak life and fruitfulness into
          hearers in every phase of their walks, from unfamiliar with the faith
          to seasoned believers.
        </p>
        <div className="mt-6">
          <Button href="/sermons" variant="outline">
            Watch Sermons
          </Button>
        </div>
      </section>

      {/* Music */}
      <section className="relative overflow-hidden bg-primary px-4 py-14 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-semibold uppercase text-white">
            <span className="text-accent">Music</span>
          </h2>
          <p className="mt-4 leading-relaxed text-white/90">
            Regardless of what generation you represent, worshiping God is a
            joy and privilege; our music reflects the diversity of our church
            body while magnifying the same God who created each of its members.
            Expect to hear a variety of songs that will direct your heart
            toward the One who holds it in His capable hands.
          </p>
          <div className="relative z-10 mt-6">
            <Button href="/music">Learn More</Button>
          </div>
        </div>
        <SectionDivider />
      </section>

      {/* Families */}
      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold uppercase text-primary">
          <span className="text-accent">Families</span>
        </h2>
        <p className="mt-4 leading-relaxed text-primary/85">
          At Willo-Hill, we seek to help families discover God&apos;s purposes
          for their lives and walk in them. With various ministries to serve
          children and families of all ages, you&apos;re certain to find where
          you fit in.
        </p>
        <div className="mt-6">
          <Button href="/family" variant="outline">
            Family Ministries
          </Button>
        </div>
      </section>

      {/* Our Team */}
      <section className="relative overflow-hidden bg-primary px-4 py-14">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold uppercase text-white">
            Our <span className="text-accent">Team</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-10">
            {PASTORS.map((pastor) => (
              <div key={pastor.name} className="w-full sm:w-56">
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src={pastor.photo}
                    alt={`Photo of ${pastor.name}`}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {pastor.name}
                </h3>
                <p className="text-sm text-white/70">{pastor.title}</p>
              </div>
            ))}
          </div>
          <div className="relative z-10 mt-8">
            <Button href="/leadership">Meet All Our Leaders</Button>
          </div>
        </div>
        <SectionDivider />
      </section>

      {/* What We Believe */}
      <section className="px-4 py-14">
        <h2 className="text-center text-3xl font-semibold uppercase text-primary">
          What We <span className="text-accent">Believe</span>
        </h2>
        <div className="mt-8">
          <BeliefsList />
        </div>
      </section>

      {/* Plan A Visit CTA */}
      <section className="bg-primary px-4 py-14 text-center">
        <h2 className="text-3xl font-semibold uppercase text-white">
          Come See For <span className="text-accent">Yourself</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Join us Sundays at 9:30am for classes and 10:45am for worship.
          Let us know you&apos;re coming and we&apos;ll be looking for you.
        </p>
        <div className="mt-6">
          <Button href="/visit" size="lg">
            Plan A Visit
          </Button>
        </div>
      </section>
    </main>
  );
}
