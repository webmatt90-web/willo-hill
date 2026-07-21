import type { Metadata } from "next";
import EventsList from "@/components/events/EventsList";
import { getUpcomingEvents } from "@/lib/queries/events";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events at Willo-Hill Baptist Church in Willoughby, OH — Bible studies, AWANA, youth group, and church family gatherings.",
};

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <main>
      <section className="bg-primary px-4 py-16 text-center">
        <h1 className="text-4xl font-bold uppercase text-white md:text-5xl">
          Upcoming <span className="text-accent">Events</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/90">
          There&apos;s always something happening at Willo-Hill. Join us!
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <EventsList events={events} />
      </section>
    </main>
  );
}
