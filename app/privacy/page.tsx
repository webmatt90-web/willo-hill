import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Willo-Hill Baptist Church website.",
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero title="Privacy" accent="Policy" />
      <section className="prose-p:leading-relaxed mx-auto max-w-3xl space-y-5 px-4 py-14 text-primary/85">
        <p>
          Willo-Hill Baptist Church respects your privacy. This site collects
          personal information only when you choose to share it — for example
          when you plan a visit, submit a prayer request, or contact us.
        </p>
        <p>
          <strong className="text-primary">What we collect:</strong> the
          details you enter in our forms (such as your name, email, phone
          number, and the information needed to serve your family during a
          visit).
        </p>
        <p>
          <strong className="text-primary">How we use it:</strong> only to
          respond to you, prepare for your visit, and pray for you. We never
          sell or share your information with third parties for marketing.
        </p>
        <p>
          <strong className="text-primary">Online giving</strong> is processed
          by Zeffy; your payment details are handled on their secure platform
          and never touch our servers.
        </p>
        <p>
          To have your information removed, contact the church office at
          (440) 488-4024 or through the <a href="/contact" className="font-semibold text-primary underline underline-offset-2 hover:text-accent">contact page</a>.
        </p>
      </section>
    </main>
  );
}
