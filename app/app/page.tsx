import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Church App",
  description:
    "Download the Willo-Hill Church app — sermons, events, and giving in your pocket, on iOS and Android.",
};

const APP_STORE_URL = "https://apps.apple.com/us/app/willo-hill-church/id6737986028";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.willohillbaptist.app";

export default function ChurchAppPage() {
  return (
    <main>
      <PageHero
        title="The Willo-Hill"
        accent="App"
        subtitle="Your go-to hub for everything happening at Willo-Hill Baptist Church — designed to keep you connected and inspired, wherever life takes you."
      />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <ul className="mx-auto flex max-w-xl flex-wrap justify-center gap-3 text-sm text-primary/85">
          {["Watch sermons", "Stay updated on events", "Give on the go"].map(
            (feature) => (
              <li
                key={feature}
                className="rounded-sm border border-primary/10 bg-white px-4 py-2"
              >
                {feature}
              </li>
            )
          )}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-primary px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary/90"
          >
             Download on the App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-primary px-6 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary/90"
          >
            ▶ Get it on Google Play
          </a>
        </div>

        <div className="mt-12">
          <Button href="/connect" variant="outline">
            More Ways To Connect
          </Button>
        </div>
      </section>
    </main>
  );
}
