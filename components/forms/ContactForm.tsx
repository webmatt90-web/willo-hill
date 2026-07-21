"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import {
  HoneypotField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
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
          Message <span className="text-accent">sent!</span>
        </h2>
        <p className="mt-4 text-primary/80">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="relative space-y-6 rounded-sm border border-primary/10 bg-white p-6 md:p-10"
    >
      <TextField id="contact-name" label="Name" value={name} onChange={setName} required />
      <TextField
        id="contact-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
      />
      <TextField
        id="contact-phone"
        label="Phone (optional)"
        type="tel"
        value={phone}
        onChange={setPhone}
      />
      <TextAreaField
        id="contact-message"
        label="Message"
        value={message}
        onChange={setMessage}
        required
        rows={6}
      />
      <HoneypotField value={website} onChange={setWebsite} />

      {error && (
        <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
