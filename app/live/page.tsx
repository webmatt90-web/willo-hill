import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch Live",
  description:
    "Join Willo-Hill Baptist Church live online every Sunday at 10:45am — worship with us from anywhere.",
};

// TODO: Replace PLACEHOLDER_CHANNEL_ID with the church's YouTube channel ID
// (YouTube Studio → Settings → Channel → Advanced settings → Channel ID).
const LIVE_EMBED_URL =
  "https://www.youtube.com/embed/live_stream?channel=PLACEHOLDER_CHANNEL_ID";

export default function LivePage() {
  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          Watch <span className="text-accent">Live</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Join us live every Sunday at 10:45am
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="aspect-video overflow-hidden rounded-sm bg-primary">
          <iframe
            src={LIVE_EMBED_URL}
            title="Willo-Hill Baptist Church live stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>

        <div className="mt-8 rounded-sm border border-primary/10 bg-white p-6 text-center">
          <h2 className="text-2xl font-semibold uppercase text-primary">
            Service Times
          </h2>
          <p className="mt-3 text-primary/80">
            <strong>Sundays:</strong> 9:30 am Sunday School &amp; Adult Classes
            {" · "}10:45 am Worship Service
          </p>
          <p className="mt-1 text-primary/80">
            4200 State Route 306, Willoughby, OH 44094
          </p>
        </div>
      </section>
    </main>
  );
}
