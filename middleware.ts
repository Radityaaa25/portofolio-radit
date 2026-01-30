import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnLogin = req.nextUrl.pathname.startsWith("/admin/login");

  // 1. Jika di halaman Admin tapi belum Login -> Tendang ke Login
  if (isOnAdmin && !isOnLogin && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // 2. Jika sudah Login tapi buka halaman Login -> Arahkan ke Dashboard
  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

// Konfigurasi rute mana saja yang dicek middleware
export const config = {
  matcher: ["/admin/:path*"],
};