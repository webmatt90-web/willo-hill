"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Toast, { type ToastState } from "@/components/admin/Toast";
import { TextField } from "@/components/forms/fields";
import { deleteStaff, saveStaff } from "@/app/admin/staff/actions";
import { STAFF_CATEGORIES, type StaffCategory } from "@/lib/queries/staff";
import type { StaffMember } from "@/lib/database.types";

type Draft = {
  id?: string;
  name: string;
  title: string;
  role_category: StaffCategory;
  photo_url: string;
  email: string;
  sort_order: number;
};

const EMPTY_DRAFT: Draft = {
  name: "",
  title: "",
  role_category: "Staff",
  photo_url: "",
  email: "",
  sort_order: 0,
};

export default function StaffManager({ staff }: { staff: StaffMember[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [busy, setBusy] = useState(false);

  const patch = (p: Partial<Draft>) => setDraft((d) => d && { ...d, ...p });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setBusy(true);
    const result = await saveStaff(draft);
    setBusy(false);
    if (result.ok) {
      setToast({ kind: "success", text: draft.id ? "Updated" : "Added" });
      setDraft(null);
      router.refresh();
    } else {
      setToast({ kind: "error", text: result.error ?? "Failed to save" });
    }
  };

  const remove = async (member: StaffMember) => {
    if (!window.confirm(`Remove ${member.name} (${member.role_category})?`)) return;
    const result = await deleteStaff(member.id);
    setToast(
      result.ok
        ? { kind: "success", text: "Removed" }
        : { kind: "error", text: result.error ?? "Failed to delete" }
    );
    if (result.ok) router.refresh();
  };

  return (
    <div>
      {!draft && (
        <Button onClick={() => setDraft({ ...EMPTY_DRAFT })}>
          Add New Staff Member
        </Button>
      )}

      {draft && (
        <form
          onSubmit={submit}
          className="space-y-4 rounded-sm border border-primary/15 bg-white p-6"
        >
          <h2 className="text-xl font-semibold uppercase text-primary">
            {draft.id ? "Edit Person" : "New Person"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="st-name" label="Name" value={draft.name} onChange={(name) => patch({ name })} required />
            <TextField id="st-title" label="Title / Role" value={draft.title} onChange={(title) => patch({ title })} required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="st-category" className="mb-1 block text-sm font-semibold text-primary">
                Category<span className="text-accent"> *</span>
              </label>
              <select
                id="st-category"
                value={draft.role_category}
                onChange={(e) => patch({ role_category: e.target.value as StaffCategory })}
                className="w-full rounded-sm border border-primary/20 px-4 py-2.5 text-primary focus:border-accent focus:outline-none"
              >
                {STAFF_CATEGORIES.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="st-order" className="mb-1 block text-sm font-semibold text-primary">
                Sort Order
              </label>
              <input
                id="st-order"
                type="number"
                min={0}
                value={draft.sort_order}
                onChange={(e) => patch({ sort_order: Number(e.target.value) || 0 })}
                className="w-full rounded-sm border border-primary/20 px-4 py-2.5 text-primary focus:border-accent focus:outline-none"
              />
            </div>
          </div>
          <TextField id="st-photo" label="Photo URL (optional)" value={draft.photo_url} onChange={(photo_url) => patch({ photo_url })} placeholder="/images/… or https://…" />
          <TextField id="st-email" label="Email (optional)" type="email" value={draft.email} onChange={(email) => patch({ email })} />
          <div className="flex gap-3">
            <Button type="submit" disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </Button>
            <Button variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {STAFF_CATEGORIES.map((category) => {
        const members = staff.filter((m) => m.role_category === category);
        if (members.length === 0) return null;
        return (
          <section key={category} className="mt-8">
            <h2 className="mb-3 text-xl font-semibold uppercase text-primary">
              {category}
            </h2>
            <div className="overflow-x-auto rounded-sm border border-primary/10 bg-white">
              <table className="w-full min-w-[480px] text-left text-sm">
                <tbody className="divide-y divide-primary/10 text-primary">
                  {members.map((member) => (
                    <tr key={member.id}>
                      <td className="px-4 py-3 font-semibold">{member.name}</td>
                      <td className="px-4 py-3">{member.title}</td>
                      <td className="px-4 py-3 text-primary/60">{member.email ?? ""}</td>
                      <td className="px-4 py-3 text-primary/60">#{member.sort_order}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            aria-label={`Edit ${member.name}`}
                            onClick={() =>
                              setDraft({
                                id: member.id,
                                name: member.name,
                                title: member.title,
                                role_category: member.role_category as StaffCategory,
                                photo_url: member.photo_url ?? "",
                                email: member.email ?? "",
                                sort_order: member.sort_order,
                              })
                            }
                            className="text-primary/60 hover:text-primary"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Delete ${member.name}`}
                            onClick={() => remove(member)}
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
          </section>
        );
      })}

      <Toast toast={toast} onClear={() => setToast(null)} />
    </div>
  );
}
