"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Toast, { type ToastState } from "@/components/admin/Toast";
import { TextAreaField, TextField } from "@/components/forms/fields";
import {
  clearAnnouncement,
  saveAnnouncement,
} from "@/app/admin/announcements/actions";
import type { Announcement } from "@/lib/database.types";

export default function AnnouncementManager({
  current,
}: {
  current: Announcement | null;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(current?.title ?? "");
  const [content, setContent] = useState(current?.content ?? "");
  const [linkUrl, setLinkUrl] = useState(current?.link_url ?? "");
  const [linkText, setLinkText] = useState(current?.link_text ?? "");
  const [weekOf, setWeekOf] = useState(current?.week_of ?? "");
  const [toast, setToast] = useState<ToastState>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const result = await saveAnnouncement({
      title,
      content,
      link_url: linkUrl,
      link_text: linkText,
      week_of: weekOf,
      is_active: true,
    });
    setBusy(false);
    setToast(
      result.ok
        ? { kind: "success", text: "Announcement published" }
        : { kind: "error", text: result.error ?? "Failed to save" }
    );
    if (result.ok) router.refresh();
  };

  const clear = async () => {
    if (!window.confirm("Remove the current announcement from the site?")) return;
    setBusy(true);
    const result = await clearAnnouncement();
    setBusy(false);
    setToast(
      result.ok
        ? { kind: "success", text: "Announcement cleared" }
        : { kind: "error", text: result.error ?? "Failed to clear" }
    );
    if (result.ok) router.refresh();
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6 rounded-sm border border-primary/10 bg-white p-4 text-sm text-primary/80">
        {current ? (
          <>
            <span className="font-semibold text-primary">Currently showing: </span>
            &ldquo;{current.title}&rdquo;
          </>
        ) : (
          "No announcement is currently showing on the site."
        )}
      </div>

      <form
        onSubmit={submit}
        className="space-y-4 rounded-sm border border-primary/15 bg-white p-6"
      >
        <h2 className="text-xl font-semibold uppercase text-primary">
          Publish Announcement
        </h2>
        <p className="text-sm text-primary/60">
          The announcement appears as a yellow bar at the top of every page.
          Publishing a new one replaces the current one.
        </p>
        <TextField id="an-title" label="Title" value={title} onChange={setTitle} required placeholder="e.g. Register for the Parenting Conference!" />
        <TextAreaField id="an-content" label="Details (optional, not shown in the bar)" value={content} onChange={setContent} rows={3} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="an-link" label="Link URL (optional)" value={linkUrl} onChange={setLinkUrl} placeholder="/events or https://…" />
          <TextField id="an-link-text" label="Link Text (optional)" value={linkText} onChange={setLinkText} placeholder="e.g. Register" />
        </div>
        <TextField id="an-week" label="Week Of (optional)" type="date" value={weekOf} onChange={setWeekOf} />
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Publish"}
          </Button>
          <Button variant="outline" onClick={clear} disabled={busy || !current}>
            Clear Announcement
          </Button>
        </div>
      </form>

      <Toast toast={toast} onClear={() => setToast(null)} />
    </div>
  );
}
