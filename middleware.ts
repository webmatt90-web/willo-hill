import { type NextRequest } from "next/server";
// Relative import on purpose: Vercel's edge bundler leaves the "@/" alias
// unresolved in middleware and fails the deploy ("referencing unsupported
// modules").
import { updateSession } from "./lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  // Node runtime (stable in Next 15.5, runs on Vercel Fluid Compute):
  // the edge runtime kept failing with MIDDLEWARE_INVOCATION_FAILED.
  runtime: "nodejs",
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
