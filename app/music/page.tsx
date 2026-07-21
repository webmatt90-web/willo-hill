import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Music",
  description:
    "Worship at Willo-Hill Baptist Church — music that reflects the diversity of our church body while magnifying the God who created each of its members.",
};

export default function MusicPage() {
  return (
    <main>
      <PageHero
        title="Music &"
        accent="Worship"
        subtitle="Worshiping God is a joy and a privilege — for every generation."
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <p className="leading-relaxed text-primary/85">
          Regardless of what generation you represent, worshiping God is a joy
          and privilege; our music reflects the diversity of our church body
          while magnifying the same God who created each of its members.
          Expect to hear a variety of songs that will direct your heart toward
          the One who holds it in His capable hands.
        </p>

        <div className="mt-10 rounded-sm border border-primary/10 bg-slate-50 p-6 text-center">
          <p className="text-primary/80">
            Interested in serving on the worship team? Contact{" "}
            <strong>Matt Buchanan</strong>, Director of Worship Ministry, at
            (440) 488-4024.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button href="/sermons">Watch A Service</Button>
          <Button href="/teams" variant="outline">
            Join A Team
          </Button>
        </div>
      </section>
    </main>
  );
}
