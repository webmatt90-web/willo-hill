"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Toast, { type ToastState } from "@/components/admin/Toast";
import { TextField } from "@/components/forms/fields";
import { deleteSermon, saveSermon } from "@/app/admin/sermons/actions";
import { formatFullDate } from "@/lib/format-date";
import type { Sermon } from "@/lib/database.types";

type Draft = {
  id?: string;
  title: string;
  sermon_date: string;
  pastor: string;
  series_name: string;
  youtube_url: string;
};

const EMPTY_DRAFT: Draft = {
  title: "",
  sermon_date: "",
  pastor: "",
  series_name: "",
  youtube_url: "",
};

export default function SermonsManager({ sermons }: { sermons: Sermon[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [busy, setBusy] = useState(false);

  const patch = (p: Partial<Draft>) => setDraft((d) => d && { ...d, ...p });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setBusy(true);
    const result = await saveSermon(draft);
    setBusy(false);
    if (result.ok) {
      setToast({ kind: "success", text: draft.id ? "Sermon updated" : "Sermon added" });
      setDraft(null);
      router.refresh();
    } else {
      setToast({ kind: "error", text: result.error ?? "Failed to save" });
    }
  };

  const remove = async (sermon: Sermon) => {
    if (!window.confirm(`Delete "${sermon.title}"?`)) return;
    const result = await deleteSermon(sermon.id);
    setToast(
      result.ok
        ? { kind: "success", text: "Sermon deleted" }
        : { kind: "error", text: result.error ?? "Failed to delete" }
    );
    if (result.ok) router.refresh();
  };

  return (
    <div>
      {!draft && (
        <Button onClick={() => setDraft({ ...EMPTY_DRAFT })}>Add New Sermon</Button>
      )}

      {draft && (
        <form
          onSubmit={submit}
          className="space-y-4 rounded-sm border border-primary/15 bg-white p-6"
        >
          <h2 className="text-xl font-semibold uppercase text-primary">
            {draft.id ? "Edit Sermon" : "New Sermon"}
          </h2>
          <TextField id="s-title" label="Title" value={draft.title} onChange={(title) => patch({ title })} required />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="s-date" label="Date" type="date" value={draft.sermon_date} onChange={(sermon_date) => patch({ sermon_date })} required />
            <TextField id="s-pastor" label="Pastor" value={draft.pastor} onChange={(pastor) => patch({ pastor })} placeholder="e.g. Pastor Dave Hackney" />
          </div>
          <TextField id="s-series" label="Series Name" value={draft.series_name} onChange={(series_name) => patch({ series_name })} />
          <TextField id="s-youtube" label="YouTube URL" value={draft.youtube_url} onChange={(youtube_url) => patch({ youtube_url })} placeholder="https://www.youtube.com/watch?v=…" />
          <p className="text-xs text-primary/60">
            The thumbnail is generated automatically from the YouTube link.
          </p>
          <div className="flex gap-3">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save Sermon"}
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
              <th className="px-4 py-3 font-heading uppercase">Pastor</th>
              <th className="px-4 py-3 font-heading uppercase">Series</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10 text-primary">
            {sermons.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-primary/60">
                  No sermons yet — add your first one above.
                </td>
              </tr>
            )}
            {sermons.map((sermon) => (
              <tr key={sermon.id}>
                <td className="px-4 py-3 font-semibold">{sermon.title}</td>
                <td className="px-4 py-3">{formatFullDate(sermon.sermon_date)}</td>
                <td className="px-4 py-3">{sermon.pastor ?? "—"}</td>
                <td className="px-4 py-3">{sermon.series_name ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      aria-label={`Edit ${sermon.title}`}
                      onClick={() =>
                        setDraft({
                          id: sermon.id,
                          title: sermon.title,
                          sermon_date: sermon.sermon_date,
                          pastor: sermon.pastor ?? "",
                          series_name: sermon.series_name ?? "",
                          youtube_url: sermon.youtube_url ?? "",
                        })
                      }
                      className="text-primary/60 hover:text-primary"
                    >
                      <Pencil size={17} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${sermon.title}`}
                      onClick={() => remove(sermon)}
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
