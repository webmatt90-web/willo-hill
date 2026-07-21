import { type NextRequest } from "next/server";
// Relative import on purpose: Vercel's edge bundler leaves the "@/" alias
// unresolved in middleware and fails the deploy ("referencing unsupported
// modules").
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
