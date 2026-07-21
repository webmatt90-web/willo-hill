"use client";

import { TextField } from "@/components/forms/fields";
import { describeVisitDate, type StepProps, type VisitChoice } from "@/components/forms/visit/types";

const CHOICES: { value: VisitChoice; label: string }[] = [
  { value: "this-weekend", label: "This Weekend" },
  { value: "next-weekend", label: "Next Weekend" },
  { value: "another", label: "Another Date" },
];

export default function StepDate({ data, update }: StepProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold uppercase text-primary">
        Choose a Date
      </h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        {CHOICES.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => update({ visitChoice: choice.value })}
            aria-pressed={data.visitChoice === choice.value}
            className={`flex-1 rounded-sm border-2 px-4 py-4 font-heading font-semibold uppercase transition-colors ${
              data.visitChoice === choice.value
                ? "border-accent bg-accent text-primary"
                : "border-primary/20 text-primary hover:border-accent"
            }`}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {data.visitChoice === "another" ? (
        <TextField
          id="custom-date"
          label="Pick a Sunday"
          type="date"
          value={data.customDate}
          onChange={(customDate) => update({ customDate })}
          required
        />
      ) : (
        <p className="text-primary/80">
          Great — we&apos;ll look for you on{" "}
          <strong>{describeVisitDate(data)}</strong> at the 10:45am service.
        </p>
      )}
    </div>
  );
}
