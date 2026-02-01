import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Kita set jadi 10MB (Default cuma 1MB)
    },
  },
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
      },
      // --- TAMBAHAN BARU (Supaya Tools Muncul) ---
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net", // Wajib buat Icon Devicon (Canva, React, dll)
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // Wajib buat Icon CapCut
      }
    ],
  },
};

export default nextConfig;