"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { HoneypotField } from "@/components/forms/fields";
import StepDate from "@/components/forms/visit/StepDate";
import StepInfo from "@/components/forms/visit/StepInfo";
import StepKids from "@/components/forms/visit/StepKids";
import StepFinish from "@/components/forms/visit/StepFinish";
import {
  describeVisitDate,
  EMPTY_VISIT_DATA,
  type VisitFormData,
} from "@/components/forms/visit/types";

const STEPS = ["Date", "Your Info", "Kids", "Finish"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stepError(step: number, data: VisitFormData): string | null {
  if (step === 0 && data.visitChoice === "another" && !data.customDate) {
    return "Please pick a date for your visit.";
  }
  if (step === 1) {
    if (!data.firstName.trim() || !data.lastName.trim()) {
      return "Please enter your first and last name.";
    }
    if (!EMAIL_PATTERN.test(data.email)) {
      return "Please enter a valid email address.";
    }
  }
  if (step === 2 && data.bringingKids === null) {
    return "Please let us know if you're bringing kids.";
  }
  if (
    step === 2 &&
    data.bringingKids &&
    data.childList.some((child) => !child.name.trim())
  ) {
    return "Please enter each child's name.";
  }
  if (step === 3 && data.needsRide && !data.pickupAddress.trim()) {
    return "Please enter a pickup address.";
  }
  return null;
}

export default function VisitForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<VisitFormData>(EMPTY_VISIT_DATA);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (patch: Partial<VisitFormData>) => {
    setData((d) => ({ ...d, ...patch }));
    setError(null);
  };

  const goNext = () => {
    const message = stepError(step, data);
    if (message) return setError(message);
    setStep((s) => s + 1);
  };

  const submit = async () => {
    const message = stepError(3, data);
    if (message) return setError(message);

    setSubmitting(true);
    setError(null);
    try {
      const response = await fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visit_date: describeVisitDate(data),
          first_name: data.firstName.trim(),
          last_name: data.lastName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          bringing_kids: data.bringingKids === true,
          other_adult_name: data.otherAdultName.trim(),
          needs_ride: data.needsRide === true,
          pickup_address: data.pickupAddress.trim(),
          wants_host: data.wantsHost === true,
          coffee_order: data.coffeeOrder.trim(),
          children: data.bringingKids ? data.childList : [],
          website: data.website,
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
        <h2 className="text-3xl font-bold uppercase text-primary">
          We can&apos;t wait to <span className="text-accent">meet you!</span>
        </h2>
        <p className="mt-4 text-primary/80">
          You&apos;re all set for <strong>{describeVisitDate(data)}</strong>.
          Check your email for details — see you Sunday!
        </p>
      </div>
    );
  }

  const steps = [StepDate, StepInfo, StepKids, StepFinish];
  const CurrentStep = steps[step];

  return (
    <div className="relative rounded-sm border border-primary/10 bg-white p-6 md:p-10">
      {/* Progress indicator */}
      <ol className="mb-8 flex items-center gap-2" aria-label="Form progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={`h-1.5 w-full rounded-full ${
                i <= step ? "bg-accent" : "bg-primary/10"
              }`}
              aria-hidden="true"
            />
            <span
              className={`font-heading text-xs font-semibold uppercase ${
                i === step ? "text-primary" : "text-primary/40"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      <CurrentStep data={data} update={update} />
      <HoneypotField value={data.website} onChange={(website) => update({ website })} />

      {error && (
        <p role="alert" className="mt-4 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8 flex justify-between">
        {step > 0 ? (
          <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button onClick={goNext}>Continue</Button>
        ) : (
          <Button onClick={submit} disabled={submitting} size="lg">
            {submitting ? "Sending…" : "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
}
