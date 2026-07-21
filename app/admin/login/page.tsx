import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/keys";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) redirect("/admin");
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <LoginForm />
    </main>
  );
}
