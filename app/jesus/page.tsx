import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export const metadata: Metadata = {
  title: "Meet Jesus",
  description:
    "Meet Jesus at Willo-Hill Baptist Church. No matter what path you've taken to get here, Jesus is waiting with open arms — learn what it means to be saved.",
};

export default function MeetJesusPage() {
  return (
    <main>
      <PageHero
        title="Meet"
        accent="Jesus"
        subtitle="No matter what path you've taken to get here, Jesus is waiting with open arms. We are a church full of flawed people who recognize that life with Him is infinitely better than life without."
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-2xl font-semibold uppercase text-primary">
          The Good <span className="text-accent">News</span>
        </h2>
        <p className="mt-4 leading-relaxed text-primary/85">
          All of us have sinned and fallen short of God&apos;s standard — and
          sin separates us from a holy God. But God loved us so much that He
          sent His Son. Jesus lived the perfect life we couldn&apos;t, died on
          the cross as a substitutionary sacrifice for our sins, and rose from
          the grave — conquering both sin and death.
        </p>
        <blockquote className="mt-6 border-l-4 border-accent bg-slate-50 p-6 italic leading-relaxed text-primary/85">
          &ldquo;If you confess with your mouth that Jesus is Lord and believe
          in your heart that God raised him from the dead, you will be
          saved.&rdquo;
          <span className="mt-2 block not-italic text-sm font-semibold text-primary">
            — Romans 10:9
          </span>
        </blockquote>
      </section>

      <section className="relative overflow-hidden bg-primary px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold uppercase text-white">
            A Prayer of <span className="text-accent">Salvation</span>
          </h2>
          <p className="mt-4 leading-relaxed text-white/90">
            There are no magic words — God looks at your heart. If you&apos;re
            ready to call on Jesus, you can pray something like this:
          </p>
          <p className="mx-auto mt-6 max-w-xl rounded-sm bg-white/10 p-6 italic leading-relaxed text-white">
            &ldquo;Lord, I know that I have broken your law and deserve death.
            I ask that you forgive me for breaking your law and accept your
            Son&apos;s sacrifice for my sin. I believe Jesus died, was buried,
            and rose from the grave for me. I call on the name of Jesus for
            salvation. Amen!&rdquo;
          </p>
        </div>
        <SectionDivider />
      </section>

      <section className="px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold uppercase text-primary">
          What&apos;s <span className="text-accent">Next?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-primary/80">
          If you just prayed that prayer — welcome to the family! We&apos;d
          love to celebrate with you and help you take your next step.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button href="/baptism">Learn About Baptism</Button>
          <Button href="/contact" variant="outline">
            Talk To A Pastor
          </Button>
        </div>
      </section>
    </main>
  );
}
