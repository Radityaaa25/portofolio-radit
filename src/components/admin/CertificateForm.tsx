"use client";

import { createCertificate, updateCertificate } from "@/actions/certificates";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Certificate } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

// Props opsional: data (untuk mode edit)
export default function CertificateForm({ data }: { data?: Certificate }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);

    let res;
    if (data) {
      // MODE EDIT
      // Kirim URL lama biar gak hilang kalau user gak upload gambar baru
      formData.append("imageUrl", data.imageUrl); 
      res = await updateCertificate(data.id, formData);
    } else {
      // MODE CREATE
      res = await createCertificate(formData);
    }

    setIsLoading(false);

    if (res.error) {
      // Ganti alert jadi toast biar konsisten (atau mau alert juga boleh)
      // Tapi karena delete button udah pake toast, mending ini pake toast juga.
      // Kalau mau alert: alert("Gagal: " + res.error);
       toast({ title: "Gagal", description: res.error, variant: "destructive" });
    } else {
       toast({ title: "Berhasil!", description: data ? "Sertifikat diupdate." : "Sertifikat ditambahkan.", className: "bg-green-500 text-white" });
       router.push("/admin/certificates");
       router.refresh();
    }
  };

  // Format tanggal untuk input type="date"
  const dateStr = data ? new Date(data.issuedAt).toISOString().split('T')[0] : "";

  return (
    <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
      <form action={handleSubmit} className="space-y-6">
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Judul Sertifikat</label>
          <input name="title" required defaultValue={data?.title} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Contoh: Belajar Dasar Pemrograman Web" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Penerbit (Issuer)</label>
            <input name="issuer" required defaultValue={data?.issuer} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Contoh: Dicoding Indonesia" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tanggal Terbit</label>
            <input type="date" name="issuedAt" required defaultValue={dateStr} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Bukti Gambar {data ? "(Opsional)" : "(Wajib)"}</label>
          <input type="file" name="image" accept="image/*" required={!data} className="w-full p-2 border border-border rounded-lg bg-secondary/20" />
          <p className="text-xs text-muted-foreground">{data ? "Biarkan kosong jika tidak ingin mengubah gambar." : "Upload foto atau screenshot sertifikat."}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Link Kredensial (Opsional)</label>
          <input name="credentialUrl" defaultValue={data?.credentialUrl || ""} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://www.dicoding.com/certificates/..." />
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isLoading} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {data ? "Update Sertifikat" : "Simpan Sertifikat"}
          </button>
        </div>
      </form>
    </div>
  );
}