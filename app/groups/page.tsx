import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "LifeGroups",
  description:
    "LifeGroups at Willo-Hill Baptist Church — midweek community groups where believers gather to fellowship and grow in God's Word.",
};

export default function GroupsPage() {
  return (
    <main>
      <PageHero
        title="Life"
        accent="Groups"
        subtitle="Fellowship doesn't just happen on Sundays!"
      />

      <section className="mx-auto max-w-3xl px-4 py-14 text-center">
        <p className="leading-relaxed text-primary/85">
          Connect with fellow believers throughout the week at one of our
          LifeGroups as we gather to fellowship and grow as we draw from the
          truth of God&apos;s Word. Groups meet in homes and at the church —
          there&apos;s a seat for you at the table.
        </p>
        <p className="mt-4 leading-relaxed text-primary/85">
          Our midweek rhythms also include{" "}
          <strong>Wednesday Morning Bible Study (10:00am)</strong> and the{" "}
          <strong>Evening Bible Study (7:00pm)</strong>, September through May.
        </p>
        <div className="mt-8">
          <Button href="/contact" size="lg">
            Find A Group
          </Button>
        </div>
      </section>
    </main>
  );
}
