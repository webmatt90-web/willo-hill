import EventsManager from "@/components/admin/EventsManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Manage Events" };

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: true });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold uppercase text-primary">
        Manage Events
      </h1>
      <EventsManager events={events ?? []} />
    </main>
  );
}
