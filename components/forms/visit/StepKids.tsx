"use client";

import { Plus, Trash2 } from "lucide-react";
import { TextField, YesNoField } from "@/components/forms/fields";
import type { StepProps } from "@/components/forms/visit/types";
import type { Child } from "@/lib/database.types";

const EMPTY_CHILD: Child = { name: "", age: "", allergies: "" };

export default function StepKids({ data, update }: StepProps) {
  const setChild = (index: number, patch: Partial<Child>) => {
    const childList = data.childList.map((child, i) =>
      i === index ? { ...child, ...patch } : child
    );
    update({ childList });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold uppercase text-primary">Kids</h2>
      <YesNoField
        label="Are you bringing kids?"
        name="bringing-kids"
        value={data.bringingKids}
        onChange={(bringingKids) =>
          update({
            bringingKids,
            childList:
              bringingKids && data.childList.length === 0
                ? [{ ...EMPTY_CHILD }]
                : data.childList,
          })
        }
      />

      {data.bringingKids && (
        <>
          <TextField
            id="other-adult"
            label="Name of another adult allowed to pick up your kids (optional)"
            value={data.otherAdultName}
            onChange={(otherAdultName) => update({ otherAdultName })}
          />

          <div className="space-y-4">
            {data.childList.map((child, i) => (
              <div
                key={i}
                className="rounded-sm border border-primary/15 p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold uppercase text-primary">
                    Child {i + 1}
                  </h3>
                  {data.childList.length > 1 && (
                    <button
                      type="button"
                      aria-label={`Remove child ${i + 1}`}
                      onClick={() =>
                        update({
                          childList: data.childList.filter((_, j) => j !== i),
                        })
                      }
                      className="text-primary/50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <TextField
                    id={`child-name-${i}`}
                    label="Name"
                    value={child.name}
                    onChange={(name) => setChild(i, { name })}
                    required
                  />
                  <TextField
                    id={`child-age-${i}`}
                    label="Age / Grade"
                    value={child.age}
                    onChange={(age) => setChild(i, { age })}
                  />
                  <TextField
                    id={`child-allergies-${i}`}
                    label="Allergies"
                    value={child.allergies}
                    onChange={(allergies) => setChild(i, { allergies })}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({ childList: [...data.childList, { ...EMPTY_CHILD }] })
              }
              className="inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase text-primary hover:text-accent"
            >
              <Plus size={16} /> Add another child
            </button>
          </div>
        </>
      )}
    </div>
  );
}
