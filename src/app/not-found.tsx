"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center text-center px-4">
      {/* Animasi Angka 404 */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h1 className="text-9xl font-extrabold text-primary/10 select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-500">
            Oops!
          </span>
        </div>
      </motion.div>

      {/* Pesan Error */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 max-w-md mx-auto space-y-4"
      >
        <h2 className="text-2xl font-bold text-foreground">
          Halaman tidak ditemukan
        </h2>
        <p className="text-muted-foreground">
          Waduh, sepertinya kamu tersesat di antah berantah. Halaman yang kamu cari mungkin sudah dihapus, dipindahkan, atau link-nya salah ketik.
        </p>
      </motion.div>

      {/* Tombol Aksi */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 flex gap-4"
      >
        <Link href="/">
          <Button variant="default" size="lg" className="gap-2">
            <Home className="w-4 h-4" />
            Ke Beranda
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="lg" 
          className="gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Balik Aja
        </Button>
      </motion.div>
    </div>
  );
}