"use client";

import { createCertificate, updateCertificate } from "@/actions/certificates";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Certificate } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

// Pakai initialData
export default function CertificateForm({ initialData }: { initialData?: Certificate }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    let res;

    // Masukkan URL gambar lama jika update
    if (initialData) {
      formData.append("imageUrl", initialData.imageUrl); 
      res = await updateCertificate(initialData.id, formData);
    } else {
      res = await createCertificate(formData);
    }

    if (res?.error) {
       toast({ title: "Gagal", description: res.error, variant: "destructive" });
       setIsLoading(false);
    } else {
       toast({ 
         title: "Berhasil!", 
         description: initialData ? "Sertifikat berhasil diupdate." : "Sertifikat berhasil disimpan.", 
         className: "bg-green-500 text-white" 
       });
       router.push("/admin/certificates");
       router.refresh();
    }
  };

  const dateStr = initialData ? new Date(initialData.issuedAt).toISOString().split('T')[0] : "";

  return (
    <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Judul Sertifikat</label>
          <input 
            name="title" 
            required 
            defaultValue={initialData?.title} 
            className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" 
            placeholder="Contoh: Belajar Dasar Pemrograman Web" 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Penerbit (Issuer)</label>
            <input 
                name="issuer" 
                required 
                defaultValue={initialData?.issuer} 
                className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" 
                placeholder="Contoh: Dicoding Indonesia" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Terbit</label>
            <input 
                type="date" 
                name="issuedAt" 
                required 
                defaultValue={dateStr} 
                className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bukti Gambar {initialData ? "(Opsional)" : "(Wajib)"}</label>
          <input type="file" name="image" accept="image/*" required={!initialData} className="w-full p-2 border border-border rounded-lg bg-secondary/20" />
          <p className="text-xs text-muted-foreground">{initialData ? "Biarkan kosong jika tidak ingin ganti." : "Upload foto atau screenshot sertifikat."}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Link Kredensial (Opsional)</label>
          <input 
            name="credentialUrl" 
            defaultValue={initialData?.credentialUrl || ""} 
            className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" 
            placeholder="https://www.dicoding.com/certificates/..." 
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isLoading ? "Menyimpan..." : (initialData ? "Update Sertifikat" : "Simpan Sertifikat")}
          </button>
        </div>
      </form>
    </div>
  );
}