import StaffManager from "@/components/admin/StaffManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Manage Staff" };

export default async function AdminStaffPage() {
  const supabase = await createClient();
  const { data: staff } = await supabase
    .from("staff")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold uppercase text-primary">
        Manage Staff
      </h1>
      <StaffManager staff={staff ?? []} />
    </main>
  );
}
