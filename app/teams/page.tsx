import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Serve at Willo-Hill Baptist Church — no matter what your gifts are, we've got a place for you to serve and help build up the body of Christ.",
};

export default function TeamsPage() {
  return (
    <main>
      <PageHero
        title="Join A"
        accent="Team"
        subtitle="No matter what your gifts are, we've got a place for you to serve and help build up the body of Christ!"
      />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <p className="leading-relaxed text-primary/85">
          From greeting at the door to teaching kids, running sound, leading
          worship, and serving behind the scenes — every team helps our church
          family follow Christ together. More details on specific team
          openings are coming soon.
        </p>
        <p className="mt-4 leading-relaxed text-primary/85">
          Not sure where you fit? We&apos;ll help you find the right spot.
        </p>
        <div className="mt-8">
          <Button href="/contact" size="lg">
            I Want To Serve
          </Button>
        </div>
      </section>
    </main>
  );
}
