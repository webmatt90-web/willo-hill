import AnnouncementManager from "@/components/admin/AnnouncementManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Manage Announcements" };

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data: current } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold uppercase text-primary">
        Manage Announcements
      </h1>
      <AnnouncementManager current={current ?? null} />
    </main>
  );
}
