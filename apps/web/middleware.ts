import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/studio", "/space", "/billing", "/settings"];

export function middleware(request: NextRequest) {
  const isProtected = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!isProtected) return NextResponse.next();

  const userCookie = request.cookies.get("station-dev-user");
  if (!userCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*", "/space/:path*", "/billing/:path*", "/settings/:path*"],
};
