import { createClient } from "@/lib/supabase/server";

/**
 * For server actions: returns an RLS-enforced client bound to the signed-in
 * admin's session, or throws. Server actions are publicly invokable
 * endpoints — every mutation must call this first.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("You must be signed in.");
  return supabase;
}
