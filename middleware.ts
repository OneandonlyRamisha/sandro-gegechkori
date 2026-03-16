import { NextRequest, NextResponse } from "next/server";

// Middleware runs on Edge Runtime — jsonwebtoken is Node.js only.
// We check cookie presence here; full JWT verification happens in each API route.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get("admin_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
