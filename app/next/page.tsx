import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Next Steps",
  description:
    "Take your next step at Willo-Hill Baptist Church — know God, find freedom, discover purpose, and make a difference through Jesus, baptism, LifeGroups, and serving.",
};

const PILLARS = [
  { title: "Know God", text: "Your journey begins with a relationship with Jesus Christ." },
  { title: "Find Freedom", text: "Walk out of what holds you back through community and God's Word." },
  { title: "Discover Purpose", text: "God made you on purpose, for a purpose." },
  { title: "Make a Difference", text: "Use your gifts to serve others — here and around the world." },
];

const STEPS = [
  {
    title: "Meet Jesus",
    href: "/jesus",
    text: "No matter what path you've taken to get here, Jesus is waiting with open arms. We are a church full of flawed people who recognize that life with Him is infinitely better than life without.",
  },
  {
    title: "Baptism",
    href: "/baptism",
    text: "This step in your walk with Jesus is an outer representation of an inner change that has taken place. “The old has passed away; behold, the new has come.” (2 Corinthians 5:17)",
  },
  {
    title: "Find a Group",
    href: "/groups",
    text: "Fellowship doesn't just happen on Sundays! Connect with fellow believers throughout the week at one of our LifeGroups as we gather to fellowship and grow as we draw from the truth of God's Word.",
  },
  {
    title: "Join a Team",
    href: "/teams",
    text: "No matter what your gifts are, we've got a place for you to serve and help build up the body of Christ! Not sure where to start? Check out our existing opportunities.",
  },
];

export default function NextStepsPage() {
  return (
    <main>
      <PageHero
        title="Next"
        accent="Steps"
        subtitle="Wherever you are in your walk with God, there's a next step for you."
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className="w-full rounded-sm border border-primary/10 p-6 text-center sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
            >
              <span className="font-heading text-3xl font-bold text-accent" aria-hidden="true">
                {i + 1}
              </span>
              <h2 className="mt-1 text-xl font-semibold uppercase text-primary">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-primary/75">{pillar.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary px-4 py-14">
        <div className="mx-auto max-w-4xl space-y-8">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-sm bg-white/5 p-8 md:flex md:items-center md:justify-between md:gap-8"
            >
              <div>
                <h2 className="text-2xl font-semibold uppercase text-accent">
                  {step.title}
                </h2>
                <p className="mt-3 leading-relaxed text-white/90">{step.text}</p>
              </div>
              <div className="mt-6 shrink-0 md:mt-0">
                <Button href={step.href}>Learn More</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold uppercase text-primary">
          Want to go <span className="text-accent">further?</span>
        </h2>
        <p className="mt-4 leading-relaxed text-primary/80">
          Explore <Link href="/missions" className="font-semibold text-primary underline underline-offset-4 hover:text-accent">missions</Link> opportunities
          overseas and at home, or our <Link href="/internships" className="font-semibold text-primary underline underline-offset-4 hover:text-accent">pastoral internships</Link> for
          those pursuing ministry.
        </p>
      </section>
    </main>
  );
}
