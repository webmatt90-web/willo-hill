import type { Metadata } from "next";
import VisitForm from "@/components/forms/VisitForm";

export const metadata: Metadata = {
  title: "Plan A Visit",
  description:
    "Plan your visit to Willo-Hill Baptist Church in Willoughby, OH. Let us know you're coming and we'll roll out the welcome mat — kids pre-registration, parking, and more.",
};

export default function PlanAVisitPage() {
  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          Plan A <span className="text-accent">Visit</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Let us know you&apos;re coming and we&apos;ll make your first Sunday
          simple — from parking to kids check-in.
        </p>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <VisitForm />
      </section>
    </main>
  );
}
