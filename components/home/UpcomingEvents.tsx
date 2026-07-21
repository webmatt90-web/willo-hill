import Link from "next/link";
import { getUpcomingEvents } from "@/lib/queries/events";
import { formatEventDate } from "@/lib/format-date";

export default async function UpcomingEvents() {
  const events = await getUpcomingEvents(6);

  return (
    <section className="bg-white px-4 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-bold uppercase text-primary md:text-4xl">
          Upcoming <span className="text-accent">Events</span>
        </h2>

        {events.length === 0 ? (
          <p className="mt-8 text-center text-primary/70">
            No upcoming events. Check back soon!
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-primary/10">
            {events.map((event) => {
              const { month, day } = formatEventDate(event.event_date);
              return (
                <li key={event.id} className="flex items-center gap-6 py-4">
                  <div className="w-14 shrink-0 text-center">
                    <span className="block font-heading text-sm font-semibold uppercase text-accent">
                      {month}
                    </span>
                    <span className="block font-heading text-3xl font-bold leading-none text-primary">
                      {day}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">
                      {event.title}
                    </h3>
                    {event.event_time && (
                      <p className="text-sm text-primary/70">
                        {event.event_time}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/events"
            className="font-heading font-semibold uppercase tracking-wide text-primary underline-offset-4 hover:text-accent hover:underline"
          >
            All Events &gt;
          </Link>
        </div>
      </div>
    </section>
  );
}
