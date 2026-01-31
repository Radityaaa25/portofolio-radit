"use client";

import { createProject } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client"; // FIX: Import tipe Category dari Prisma

// FIX: Gunakan tipe Category[] di props
export default function ProjectForm({ categories }: { categories: Category[] }) {
  const [state, formAction, isPending] = useActionState(createProject, null);
  const { toast } = useToast();
  const router = useRouter();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (state?.success) {
      toast({ title: "Berhasil!", description: "Project berhasil dibuat.", className: "bg-green-500 text-white" });
      router.push("/admin/projects");
    } else if (state?.error) {
      toast({ title: "Gagal", description: state.error, variant: "destructive" });
    }
  }, [state, toast, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form action={formAction} className="space-y-6 bg-background p-6 rounded-xl border border-border shadow-sm">
      
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
            <input type="file" name="image" required accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <div className="text-xs text-muted-foreground">
            Klik kotak untuk upload.<br/>Format: JPG/PNG (Max 2MB)
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

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {isPending ? "Menyimpan..." : "Simpan Project"}
      </Button>
    </form>
  );
}