import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Youth",
  description:
    "Youth ministry at Willo-Hill Baptist Church — Wednesday night Youth Group and Sunday School for middle and high school students.",
};

export default function YouthPage() {
  return (
    <main>
      <PageHero
        title="Youth"
        subtitle="Helping teenagers gain independence while discovering who God created them to be."
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-2xl font-semibold uppercase text-primary">
          Youth <span className="text-accent">Group</span>
        </h2>
        <p className="mt-3 leading-relaxed text-primary/85">
          <strong>Wednesdays at 6:45pm</strong> — middle and high school
          students gather for games, worship, and real conversations about
          faith in a modern world. Bring a friend!
        </p>

        <h2 className="mt-10 text-2xl font-semibold uppercase text-primary">
          Sunday <span className="text-accent">School</span>
        </h2>
        <p className="mt-3 leading-relaxed text-primary/85">
          <strong>Sundays at 9:30am</strong> — youth dig into God&apos;s Word
          together before the morning worship service.
        </p>

        <div className="mt-10 rounded-sm border border-primary/10 bg-slate-50 p-6">
          <p className="text-primary/80">
            Questions? Contact <strong>Pastor Joe Mieden</strong>, Youth &amp;
            Young Adult Pastor —{" "}
            <a
              href="mailto:pastorjoe@willohill.com"
              className="font-semibold text-primary underline underline-offset-2 hover:text-accent"
            >
              pastorjoe@willohill.com
            </a>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button href="/visit">Plan A Visit</Button>
        </div>
      </section>
    </main>
  );
}
