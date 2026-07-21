"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  HoneypotField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";

export default function PrayerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          request: request.trim(),
          is_public: isPublic,
          website,
        }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-sm border border-accent bg-white p-10 text-center">
        <h2 className="text-2xl font-bold uppercase text-primary">
          Thank you for <span className="text-accent">sharing</span>
        </h2>
        <p className="mt-4 text-primary/80">
          Our pastoral team will be praying for you.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative space-y-6 rounded-sm border border-primary/10 bg-white p-6 md:p-10"
    >
      <TextField id="prayer-name" label="Name" value={name} onChange={setName} required />
      <TextField
        id="prayer-email"
        label="Email (optional)"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <TextAreaField
        id="prayer-request"
        label="Prayer Request"
        value={request}
        onChange={setRequest}
        required
        rows={6}
      />
      <label className="flex cursor-pointer items-start gap-3 text-sm text-primary/80">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#F5A623]"
        />
        It&apos;s okay to share this request publicly with the church family
      </label>
      <HoneypotField value={website} onChange={setWebsite} />

      {error && (
        <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send Prayer Request"}
      </Button>
    </form>
  );
}
