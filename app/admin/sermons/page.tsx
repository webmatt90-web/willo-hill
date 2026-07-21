import SermonsManager from "@/components/admin/SermonsManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Manage Sermons" };

export default async function AdminSermonsPage() {
  const supabase = await createClient();
  const { data: sermons } = await supabase
    .from("sermons")
    .select("*")
    .order("sermon_date", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold uppercase text-primary">
        Manage Sermons
      </h1>
      <SermonsManager sermons={sermons ?? []} />
    </main>
  );
}
