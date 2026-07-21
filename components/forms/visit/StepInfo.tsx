"use client";

import { TextField } from "@/components/forms/fields";
import type { StepProps } from "@/components/forms/visit/types";

export default function StepInfo({ data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold uppercase text-primary">
        Your Info
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="first-name"
          label="First Name"
          value={data.firstName}
          onChange={(firstName) => update({ firstName })}
          required
          autoComplete="given-name"
        />
        <TextField
          id="last-name"
          label="Last Name"
          value={data.lastName}
          onChange={(lastName) => update({ lastName })}
          required
          autoComplete="family-name"
        />
      </div>
      <TextField
        id="email"
        label="Email"
        type="email"
        value={data.email}
        onChange={(email) => update({ email })}
        required
        autoComplete="email"
      />
      <TextField
        id="phone"
        label="Phone"
        type="tel"
        value={data.phone}
        onChange={(phone) => update({ phone })}
        autoComplete="tel"
      />
    </div>
  );
}
