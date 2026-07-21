import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give online to Willo-Hill Baptist Church — 100% of your donation goes directly to the church, with no processing fees.",
};

// TODO: Replace PLACEHOLDER_ID with the actual Zeffy form ID once the church
// creates their free nonprofit account at zeffy.com.
const ZEFFY_EMBED_URL =
  "https://www.zeffy.com/en-US/embed/donation-form/PLACEHOLDER_ID";

export default function GivePage() {
  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          <span className="text-accent">Give</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/90">
          As a church family, we consider it a privilege to give back to the
          One who has given us everything. Your generosity fuels ministry at
          Willo-Hill and beyond.
        </p>
      </section>

      <section className="mx-auto max-w-[800px] px-4 py-12 md:py-16">
        <div className="overflow-hidden rounded-sm border border-primary/10 bg-white shadow-sm">
          <iframe
            src={ZEFFY_EMBED_URL}
            title="Give online to Willo-Hill Baptist Church"
            allow="payment"
            className="min-h-[600px] w-full border-0"
          />
        </div>
        <p className="mt-6 text-center text-sm leading-relaxed text-primary/70">
          Online giving is powered by Zeffy, a free platform for nonprofits —
          <strong> 100% of your donation goes directly to Willo-Hill</strong>,
          with no processing fees.
        </p>
      </section>
    </main>
  );
}
