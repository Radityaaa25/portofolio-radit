"use client";

import { createProject, updateProject } from "@/actions/projects"; // Import updateProject
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Category, Project } from "@prisma/client";
import { supabase } from "@/lib/supabase";

// Props bisa menerima project (untuk edit)
interface ProjectFormProps {
  categories: Category[];
  project?: Project | null; // Data awal jika mode edit
}

export default function ProjectForm({ categories, project }: ProjectFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  // Jika edit, pakai gambar lama sebagai preview awal
  const [preview, setPreview] = useState(project?.imageUrl || "");
  // State untuk menyimpan URL gambar (baik lama maupun baru)
  const [currentImageUrl, setCurrentImageUrl] = useState(project?.imageUrl || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      // Reset currentImageUrl karena user memilih file baru yang perlu diupload
      setCurrentImageUrl(""); 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const imageFile = formData.get("image") as File;
      let finalImageUrl = currentImageUrl; // Default pakai URL lama

      // 1. Jika ada file baru dipilih, Upload ke Supabase
      if (imageFile && imageFile.size > 0) {
        if (imageFile.size > 5 * 1024 * 1024) throw new Error("Max file size 5MB");

        const fileName = `project-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        const { error: uploadError } = await supabase.storage
          .from("portofolio")
          .upload(fileName, imageFile, { upsert: false });

        if (uploadError) throw new Error("Gagal upload gambar: " + uploadError.message);

        const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);
        finalImageUrl = data.publicUrl;
      }

      // 2. Set imageUrl final ke formData
      formData.set("imageUrl", finalImageUrl); 
      formData.delete("image"); // Hapus file mentah

      // 3. Tentukan Action: Create atau Update?
      let result;
      if (project?.id) {
        // MODE EDIT
        result = await updateProject(project.id, null, formData);
      } else {
        // MODE CREATE
        result = await createProject(null, formData);
      }

      if (result?.error) {
        toast({ title: "Gagal", description: result.error, variant: "destructive" });
      } else {
        toast({ 
          title: "Berhasil!", 
          description: project?.id ? "Project diupdate." : "Project dibuat.", 
          className: "bg-green-500 text-white" 
        });
        router.push("/admin/projects");
        router.refresh();
      }

    } catch (error) {
      console.error(error);
      toast({ 
        title: "Error", 
        description: error instanceof Error ? error.message : "Terjadi kesalahan", 
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
              accept="image/*" 
              onChange={handleImageChange} 
              // Required hanya jika create baru dan belum ada preview
              required={!project?.id && !preview}
              className="absolute inset-0 opacity-0 cursor-pointer" 
            />
          </div>
          <div className="text-xs text-muted-foreground">
            {project?.id ? "Biarkan kosong jika tidak ingin mengubah gambar." : "Klik kotak untuk upload."}
            <br/>Format: JPG/PNG (Max 5MB)
          </div>
        </div>
      </div>

      {/* Info Utama */}
      <div className="space-y-2">
        <Label>Judul Project</Label>
        <Input name="title" required defaultValue={project?.title} placeholder="Contoh: Website Desa Digital" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Kategori</Label>
          <select 
            name="categoryId" 
            required 
            defaultValue={project?.categoryId}
            className="w-full p-2 rounded-md border border-input bg-background text-sm"
          >
            <option value="">Pilih Kategori...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Tech Stack (Pisahkan Koma)</Label>
          <Input name="techStack" defaultValue={project?.techStack.join(", ")} placeholder="Next.js, Tailwind, Prisma" required />
        </div>
      </div>

      {/* Deskripsi Dual Bahasa */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-blue-500">Deskripsi (Indo)</Label>
          <Textarea name="descriptionId" defaultValue={project?.descriptionId} required rows={4} />
        </div>
        <div className="space-y-2">
          <Label className="text-orange-500">Description (English)</Label>
          <Textarea name="descriptionEn" defaultValue={project?.descriptionEn} required rows={4} />
        </div>
      </div>

      {/* Link */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Link Demo (Opsional)</Label>
          <Input name="demoUrl" defaultValue={project?.demoUrl || ""} placeholder="https://..." />
        </div>
        <div className="space-y-2">
          <Label>Repository URL (Opsional)</Label>
          <Input name="repoUrl" defaultValue={project?.repoUrl || ""} placeholder="https://github.com/..." />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {loading ? "Menyimpan..." : (project?.id ? "Update Project" : "Simpan Project")}
      </Button>
    </form>
  );
}