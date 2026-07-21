import type { Metadata } from "next";
import PrayerForm from "@/components/forms/PrayerForm";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Share a prayer request with the pastoral team at Willo-Hill Baptist Church. We would be honored to pray for you.",
};

export default function PrayerPage() {
  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          Prayer <span className="text-accent">Requests</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          Whatever you&apos;re walking through, you don&apos;t have to walk
          through it alone. Our pastors pray over every request.
        </p>
      </section>
      <section className="mx-auto max-w-2xl px-4 py-12 md:py-16">
        <PrayerForm />
      </section>
    </main>
  );
}
