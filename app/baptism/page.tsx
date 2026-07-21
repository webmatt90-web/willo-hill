import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Baptism",
  description:
    "Baptism at Willo-Hill Baptist Church — a picture of what God has done for you spiritually, by immersion, following salvation.",
};

export default function BaptismPage() {
  return (
    <main>
      <PageHero
        title="Baptism"
        subtitle="An outer representation of an inner change that has taken place. “The old has passed away; behold, the new has come.” (2 Corinthians 5:17)"
      />

      <section className="mx-auto max-w-3xl px-4 py-14 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold uppercase text-primary">
            Baptism Is A <span className="text-accent">Picture</span>
          </h2>
          <p className="mt-3 leading-relaxed text-primary/85">
            Baptism shows others physically what God has done for you
            spiritually. You identify with Christ in his death and burial by
            going under the water, and resurrection and life when you come
            back out. At Willo-Hill, we baptize by immersion — just as we see
            in the New Testament.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold uppercase text-primary">
            Baptism Is A <span className="text-accent">Command</span>
          </h2>
          <p className="mt-3 leading-relaxed text-primary/85">
            Baptism doesn&apos;t save you — salvation is by faith in Jesus
            alone. But baptism is commanded in Scripture and follows salvation
            in the book of Acts. It&apos;s a step of joyful obedience for
            everyone who has trusted Christ.
          </p>
        </div>
      </section>

      <section className="bg-primary px-4 py-14 text-center">
        <h2 className="text-2xl font-semibold uppercase text-white">
          Ready to take the <span className="text-accent">next step?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/90">
          If you&apos;ve accepted Jesus as Lord of your life, baptism is a
          picture of the putting off of your old self and being made new and
          alive in Christ. Want to know more? We&apos;d love to speak with you
          — whether you recently accepted Christ, have been a believer but
          never baptized, or were baptized before and want to be baptized
          again.
        </p>
        <div className="mt-6">
          <Button href="/contact" size="lg">
            Contact Us About Baptism
          </Button>
        </div>
      </section>
    </main>
  );
}
