import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import SermonGrid from "@/components/sermons/SermonGrid";
import { getAllSermons } from "@/lib/queries/sermons";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch past sermons from Willo-Hill Baptist Church — expository preaching through God's Word, available every week on YouTube.",
};

export default async function SermonsPage() {
  const sermons = await getAllSermons();

  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          <span className="text-accent">Sermons</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Miss a week? Want to hear a message again? Watch anytime.
        </p>
        <div className="mt-6">
          <Button href="/live">Listen Live</Button>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <SermonGrid sermons={sermons} />
      </section>
    </main>
  );
}
