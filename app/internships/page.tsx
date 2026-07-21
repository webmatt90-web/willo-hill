import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Internships",
  description:
    "Pastoral internships at Willo-Hill Baptist Church — volunteer, part-time, and full-time training for men pursuing pastoral ministry.",
};

export default function InternshipsPage() {
  return (
    <main>
      <PageHero
        title="Pastoral"
        accent="Internships"
        subtitle="Training the next generation of pastors."
      />

      <section className="mx-auto max-w-3xl px-4 py-14">
        <p className="leading-relaxed text-primary/85">
          Willo-Hill offers volunteer, part-time, and full-time pastoral
          internships for men interested in training for pastoral ministry.
          Interns develop competencies in preaching, leading discussion
          groups, administering ministry programming, and discipling others —
          all under the mentorship of an overseeing pastor, working alongside
          our pastoral team.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-6 text-primary/85">
          <li>Skill development in preaching and group leadership</li>
          <li>Hands-on ministry administration experience</li>
          <li>One-on-one discipleship</li>
          <li>Regular evaluation and growth feedback</li>
          <li>Typically scheduled for the summer</li>
        </ul>
        <div className="mt-10 text-center">
          <Button href="/contact" size="lg">
            Ask About Interning
          </Button>
        </div>
      </section>
    </main>
  );
}
