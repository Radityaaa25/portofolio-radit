"use client";

import { createCertificate } from "@/actions/certificates";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCertificatePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const res = await createCertificate(formData);
    setIsLoading(false);

    if (res.error) {
      alert("Gagal: " + res.error);
    } else {
      alert("Sertifikat berhasil ditambahkan!");
      router.push("/admin/certificates");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/certificates" className="p-2 hover:bg-secondary rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold">Tambah Sertifikat</h1>
      </div>

      <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
        <form action={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul Sertifikat</label>
            <input name="title" required className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Contoh: Belajar Dasar Pemrograman Web" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Penerbit (Issuer)</label>
              <input name="issuer" required className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Contoh: Dicoding Indonesia" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Terbit</label>
              <input type="date" name="issuedAt" required className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bukti Gambar (Wajib)</label>
            <input type="file" name="image" accept="image/*" required className="w-full p-2 border border-border rounded-lg bg-secondary/20" />
            <p className="text-xs text-muted-foreground">Upload foto atau screenshot sertifikat.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Link Kredensial (Opsional)</label>
            <input name="credentialUrl" className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://www.dicoding.com/certificates/..." />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isLoading} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Sertifikat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}