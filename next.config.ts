import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // FIX: Menggunakan remotePatterns (Pengganti domains yang deprecated)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Mengizinkan semua subdomain Supabase
      },
      // (Opsional) Jika nanti ada gambar dari Google/sumber lain, tambah disini
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;