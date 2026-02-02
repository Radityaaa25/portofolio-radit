"use client";

import { updateCertificate } from "@/actions/certificates";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Certificate } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";

export default function EditCertificateForm({ data }: { data: Certificate }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    // Masukkan data ID dan URL gambar lama secara manual ke FormData (jika diperlukan oleh action)
    formData.append("imageUrl", data.imageUrl);
    
    const res = await updateCertificate(data.id, formData);
    setIsLoading(false);

    if (res.error) {
       toast({ title: "Gagal", description: res.error, variant: "destructive" });
    } else {
       toast({ title: "Berhasil!", description: "Sertifikat diupdate.", className: "bg-green-500 text-white" });
       router.push("/admin/certificates");
       router.refresh();
    }
  };

  // Convert Date to YYYY-MM-DD for Input Date
  const dateStr = new Date(data.issuedAt).toISOString().split('T')[0];

  return (
    <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
        <form action={handleSubmit} className="space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul Sertifikat</label>
            <input name="title" required defaultValue={data.title} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Penerbit (Issuer)</label>
              <input name="issuer" required defaultValue={data.issuer} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Terbit</label>
              <input type="date" name="issuedAt" required defaultValue={dateStr} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bukti Gambar (Opsional jika tidak ingin ubah)</label>
            <input type="file" name="image" accept="image/*" className="w-full p-2 border border-border rounded-lg bg-secondary/20" />
            <p className="text-xs text-muted-foreground">Biarkan kosong jika tetap menggunakan gambar lama.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Link Kredensial (Opsional)</label>
            <input name="credentialUrl" defaultValue={data.credentialUrl || ""} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isLoading} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Update Sertifikat
            </button>
          </div>
        </form>
      </div>
  );
}