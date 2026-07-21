import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the Willo-Hill Baptist Church website.",
};

export default function TermsPage() {
  return (
    <main>
      <PageHero title="Terms of" accent="Service" />
      <section className="mx-auto max-w-3xl space-y-5 px-4 py-14 leading-relaxed text-primary/85">
        <p>
          Welcome to the Willo-Hill Baptist Church website. By using this
          site, you agree to these simple terms.
        </p>
        <p>
          The content on this site — including sermons, articles, and images —
          is provided for personal, non-commercial use. Sermon videos are
          hosted on YouTube and subject to YouTube&apos;s terms.
        </p>
        <p>
          Information submitted through our forms must be accurate and
          submitted by you. Please don&apos;t misuse the forms or attempt to
          disrupt the site.
        </p>
        <p>
          This site links to third-party services (YouTube, Zeffy, app
          stores). We&apos;re not responsible for their content or policies.
        </p>
        <p>
          Questions? Contact the church office at (440) 488-4024.
        </p>
      </section>
    </main>
  );
}
