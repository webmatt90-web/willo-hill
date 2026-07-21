"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import { TextField } from "@/components/forms/fields";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error: authError } = await createClient().auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Incorrect email or password. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-sm space-y-6 rounded-sm border border-primary/10 bg-white p-8 shadow-sm"
    >
      <div className="text-center">
        <Image
          src="/images/logo-color.svg"
          alt="Willo-Hill Baptist Church"
          width={162}
          height={70}
          unoptimized
          className="mx-auto h-16 w-auto"
        />
        <h1 className="mt-4 text-2xl font-semibold uppercase text-primary">
          Admin Sign In
        </h1>
      </div>

      <TextField
        id="login-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
      />
      <div>
        <label
          htmlFor="login-password"
          className="mb-1 block text-sm font-semibold text-primary"
        >
          Password<span className="text-accent"> *</span>
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full rounded-sm border border-primary/20 px-4 py-2.5 text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
