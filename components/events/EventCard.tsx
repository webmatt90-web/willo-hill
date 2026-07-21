import { MapPin, Clock } from "lucide-react";
import { formatEventDate } from "@/lib/format-date";
import { cn } from "@/lib/utils";
import type { ChurchEvent } from "@/lib/database.types";

export default function EventCard({ event }: { event: ChurchEvent }) {
  const { month, day } = formatEventDate(event.event_date);

  return (
    <article
      className={cn(
        "flex gap-6 rounded-sm border p-6",
        event.is_featured
          ? "border-accent bg-primary text-white"
          : "border-primary/10 bg-white text-primary"
      )}
    >
      <div className="w-16 shrink-0 text-center">
        <span className="block font-heading text-sm font-semibold uppercase text-accent">
          {month}
        </span>
        <span className="block font-heading text-4xl font-bold leading-none">
          {day}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="text-xl font-semibold">
          {event.title}
          {event.is_featured && (
            <span className="ml-3 rounded-sm bg-accent px-2 py-0.5 align-middle font-heading text-xs font-semibold uppercase text-primary">
              Featured
            </span>
          )}
        </h3>
        <div
          className={cn(
            "mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm",
            event.is_featured ? "text-white/80" : "text-primary/70"
          )}
        >
          {event.event_time && (
            <span className="inline-flex items-center gap-1">
              <Clock size={14} aria-hidden="true" /> {event.event_time}
            </span>
          )}
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" /> {event.location}
            </span>
          )}
        </div>
        {event.description && (
          <p
            className={cn(
              "mt-3 leading-relaxed",
              event.is_featured ? "text-white/90" : "text-primary/80"
            )}
          >
            {event.description}
          </p>
        )}
      </div>
    </article>
  );
}
