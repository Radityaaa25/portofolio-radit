"use client";

import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { supabase } from "@/lib/supabase"; // Pastikan ini terimport

export default function ProjectForm({ categories }: { categories: Category[] }) {
  const { toast } = useToast();
  const router = useRouter();
  
  // State Manual (Kita tidak pakai useActionState agar bisa handle upload dulu)
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // HANDLER SUBMIT BARU (CLIENT-SIDE UPLOAD)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const imageFile = formData.get("image") as File;

      // 1. Upload Gambar ke Supabase (Langsung dari Browser)
      let finalImageUrl = "";
      
      if (imageFile && imageFile.size > 0) {
        const fileName = `project-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
        
        // Upload ke bucket 'portofolio'
        const { error: uploadError } = await supabase.storage
          .from("portofolio")
          .upload(fileName, imageFile, { upsert: false });

        if (uploadError) throw new Error("Gagal upload gambar ke Supabase: " + uploadError.message);

        // Ambil Public URL
        const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);
        finalImageUrl = data.publicUrl;
      }

      // 2. Update FormData: Ganti File dengan URL String
      formData.set("imageUrl", finalImageUrl); 
      formData.delete("image"); // Hapus file fisik biar payload ringan

      // 3. Kirim Data Teks ke Server Action
      const result = await createProject(null, formData);

      if (result?.error) {
        toast({ title: "Gagal", description: result.error, variant: "destructive" });
      } else {
        toast({ title: "Berhasil!", description: "Project berhasil dibuat.", className: "bg-green-500 text-white" });
        router.push("/admin/projects");
      }

    } catch (error) {
      console.error(error);
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Terjadi kesalahan upload", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-background p-6 rounded-xl border border-border shadow-sm">
      
      {/* Gambar */}
      <div className="space-y-2">
        <Label>Thumbnail Project</Label>
        <div className="flex items-center gap-4">
          <div className="relative w-32 h-24 bg-secondary rounded-lg overflow-hidden border border-dashed border-muted-foreground/50 flex items-center justify-center group">
            {preview ? (
              <Image src={preview} alt="Preview" fill className="object-cover" />
            ) : (
              <UploadCloud className="w-8 h-8 text-muted-foreground" />
            )}
            <input 
              type="file" 
              name="image" 
              required 
              accept="image/*" 
              onChange={handleImageChange} 
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
          </div>
          <div className="text-xs text-muted-foreground">
            Klik kotak untuk upload.<br/>Format: JPG/PNG
          </div>
        </div>
      </div>

      {/* Info Utama */}
      <div className="space-y-2">
        <Label>Judul Project</Label>
        <Input name="title" required placeholder="Contoh: Website Desa Digital" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <select name="categoryId" required className="w-full p-2 rounded-md border border-input bg-background text-sm">
            <option value="">Pilih Kategori...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Tech Stack (Pisahkan Koma)</Label>
          <Input name="techStack" placeholder="Next.js, Tailwind, Prisma" required />
        </div>
      </div>

      {/* Deskripsi Dual Bahasa */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-blue-500">Deskripsi (Indo)</Label>
          <Textarea name="descriptionId" required placeholder="Jelaskan project ini..." rows={4} />
        </div>
        <div className="space-y-2">
          <Label className="text-orange-500">Description (English)</Label>
          <Textarea name="descriptionEn" required placeholder="Explain this project..." rows={4} />
        </div>
      </div>

      {/* Link */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Link Demo (Opsional)</Label>
          <Input name="demoUrl" placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label>Repository URL (Opsional)</Label>
          <Input name="repoUrl" placeholder="https://github.com/..." />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {loading ? "Mengupload & Menyimpan..." : "Simpan Project"}
      </Button>
    </form>
  );
}