import { NextResponse, type NextRequest } from "next/server";

// DIAGNOSTIC build: bare middleware with zero dependencies, to isolate
// Vercel's MIDDLEWARE_INVOCATION_FAILED. Admin stays safe regardless —
// every server action calls requireAdmin() and all data access is
// RLS-enforced; middleware is only the redirect UX layer.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.startsWith("sb-") && c.value);
    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
