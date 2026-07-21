import EventCard from "@/components/events/EventCard";
import type { ChurchEvent } from "@/lib/database.types";

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function groupByMonth(events: ChurchEvent[]): [string, ChurchEvent[]][] {
  const groups = new Map<string, ChurchEvent[]>();
  for (const event of events) {
    const [year, month] = event.event_date.split("-").map(Number);
    const label = `${FULL_MONTHS[month - 1]} ${year}`;
    const list = groups.get(label) ?? [];
    list.push(event);
    groups.set(label, list);
  }
  return [...groups.entries()];
}

export default function EventsList({ events }: { events: ChurchEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="py-12 text-center text-lg text-primary/70">
        No upcoming events. Check back soon!
      </p>
    );
  }

  return (
    <div className="space-y-12">
      {groupByMonth(events).map(([label, monthEvents]) => (
        <section key={label} aria-label={label}>
          <h2 className="border-b-2 border-accent pb-2 text-2xl font-semibold uppercase text-primary">
            {label}
          </h2>
          <div className="mt-6 space-y-4">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
