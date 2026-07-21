"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Toast, { type ToastState } from "@/components/admin/Toast";
import { TextAreaField, TextField } from "@/components/forms/fields";
import { deleteEvent, saveEvent } from "@/app/admin/events/actions";
import { formatFullDate } from "@/lib/format-date";
import type { ChurchEvent } from "@/lib/database.types";

type Draft = {
  id?: string;
  title: string;
  event_date: string;
  event_time: string;
  description: string;
  location: string;
  is_featured: boolean;
};

const EMPTY_DRAFT: Draft = {
  title: "",
  event_date: "",
  event_time: "",
  description: "",
  location: "",
  is_featured: false,
};

export default function EventsManager({ events }: { events: ChurchEvent[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [busy, setBusy] = useState(false);

  const patch = (p: Partial<Draft>) => setDraft((d) => d && { ...d, ...p });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setBusy(true);
    const result = await saveEvent(draft);
    setBusy(false);
    if (result.ok) {
      setToast({ kind: "success", text: draft.id ? "Event updated" : "Event added" });
      setDraft(null);
      router.refresh();
    } else {
      setToast({ kind: "error", text: result.error ?? "Failed to save" });
    }
  };

  const remove = async (event: ChurchEvent) => {
    if (!window.confirm(`Delete "${event.title}"? This can't be undone.`)) return;
    const result = await deleteEvent(event.id);
    setToast(
      result.ok
        ? { kind: "success", text: "Event deleted" }
        : { kind: "error", text: result.error ?? "Failed to delete" }
    );
    if (result.ok) router.refresh();
  };

  return (
    <div>
      {!draft && (
        <Button onClick={() => setDraft({ ...EMPTY_DRAFT })}>Add New Event</Button>
      )}

      {draft && (
        <form
          onSubmit={submit}
          className="space-y-4 rounded-sm border border-primary/15 bg-white p-6"
        >
          <h2 className="text-xl font-semibold uppercase text-primary">
            {draft.id ? "Edit Event" : "New Event"}
          </h2>
          <TextField id="ev-title" label="Title" value={draft.title} onChange={(title) => patch({ title })} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="ev-date" label="Date" type="date" value={draft.event_date} onChange={(event_date) => patch({ event_date })} required />
            <TextField id="ev-time" label="Time" value={draft.event_time} onChange={(event_time) => patch({ event_time })} placeholder="e.g. 6:45 PM" />
          </div>
          <TextField id="ev-location" label="Location" value={draft.location} onChange={(location) => patch({ location })} />
          <TextAreaField id="ev-desc" label="Description" value={draft.description} onChange={(description) => patch({ description })} rows={3} />
          <label className="flex cursor-pointer items-center gap-2 text-sm text-primary">
            <input
              type="checkbox"
              checked={draft.is_featured}
              onChange={(e) => patch({ is_featured: e.target.checked })}
              className="h-4 w-4 accent-[#F5A623]"
            />
            Featured event (highlighted on the Events page)
          </label>
          <div className="flex gap-3">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save Event"}
            </Button>
            <Button variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-x-auto rounded-sm border border-primary/10 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="px-4 py-3 font-heading uppercase">Title</th>
              <th className="px-4 py-3 font-heading uppercase">Date</th>
              <th className="px-4 py-3 font-heading uppercase">Time</th>
              <th className="px-4 py-3 font-heading uppercase">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10 text-primary">
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-primary/60">
                  No events yet — add your first one above.
                </td>
              </tr>
            )}
            {events.map((event) => (
              <tr key={event.id}>
                <td className="px-4 py-3 font-semibold">{event.title}</td>
                <td className="px-4 py-3">{formatFullDate(event.event_date)}</td>
                <td className="px-4 py-3">{event.event_time ?? "—"}</td>
                <td className="px-4 py-3">{event.is_featured ? "⭐" : ""}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      aria-label={`Edit ${event.title}`}
                      onClick={() =>
                        setDraft({
                          id: event.id,
                          title: event.title,
                          event_date: event.event_date,
                          event_time: event.event_time ?? "",
                          description: event.description ?? "",
                          location: event.location ?? "",
                          is_featured: event.is_featured,
                        })
                      }
                      className="text-primary/60 hover:text-primary"
                    >
                      <Pencil size={17} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${event.title}`}
                      onClick={() => remove(event)}
                      className="text-primary/60 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Toast toast={toast} onClear={() => setToast(null)} />
    </div>
  );
}
