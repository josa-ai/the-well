import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for login page, login API, and logout API
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/admin/login") ||
    pathname.startsWith("/api/admin/logout")
  ) {
    return NextResponse.next();
  }

  // Allow public GET requests to event API routes
  if (pathname.startsWith("/api/events") && request.method === "GET") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;

  let isValid = false;
  if (token) {
    try {
      isValid = await verifySessionToken(token);
    } catch {
      // ADMIN_SECRET not set or token verification failed
      isValid = false;
    }
  }

  if (!isValid) {
    // For API routes, return 401 instead of redirect
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/events/:path*", "/api/upload/:path*"],
};
