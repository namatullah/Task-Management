import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("🔥 MIDDLEWARE RUNNING:", request.nextUrl.pathname);
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = ["/auth", "/api/auth"];

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // If no token, redirect to auth
  if (!token) {
    const loginUrl = new URL("/auth", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Protect everything except auth & public files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|auth).*)"],
};
