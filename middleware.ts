import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdminPanel = req.nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = req.nextUrl.pathname.startsWith("/admin/login");

  // 1. Jika User di panel Admin tapi BELUM Login -> Tendang ke Login
  if (isOnAdminPanel && !isOnLoginPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  // 2. Jika User SUDAH Login tapi buka halaman Login -> Tendang ke Dashboard
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
});

// Tentukan route mana saja yang dijaga Middleware
export const config = {
  matcher: ["/admin/:path*"],
};