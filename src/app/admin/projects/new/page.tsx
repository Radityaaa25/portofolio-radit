"use client";

import { createProject } from "@/actions/projects";
import { Save, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPortfolioData } from "@/actions/portofolio"; 
import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";

export default function NewProjectPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getPortfolioData().then(data => setCategories(data.categories));
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const res = await createProject(formData);
    setIsLoading(false);

    if (res.error) {
      alert("Gagal: " + res.error);
    } else {
      alert("Project berhasil dibuat!");
      router.push("/admin/projects");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 hover:bg-secondary rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold">Tambah Project Baru</h1>
      </div>

      <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
        <form action={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Judul Project</label>
              <input name="title" required className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Contoh: Website Sekolah" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select name="categoryId" className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail Gambar</label>
            <input type="file" name="image" accept="image/*" required className="w-full p-2 border border-border rounded-lg bg-secondary/20" />
            <p className="text-xs text-muted-foreground">Format: JPG, PNG, WEBP. Max 2MB.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-sm font-medium">Deskripsi (Indonesia)</label>
                <textarea name="descriptionId" required rows={4} className="w-full px-4 py-2 rounded-lg bg-background border border-border resize-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="Jelaskan fitur project ini..." />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-medium">Description (English)</label>
                <textarea name="descriptionEn" required rows={4} className="w-full px-4 py-2 rounded-lg bg-background border border-border resize-none outline-none focus:ring-2 focus:ring-primary/20" placeholder="Explain the project features..." />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-sm font-medium">Tech Stack (Pisahkan dengan koma)</label>
             <input name="techStack" required className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Next.js, Tailwind CSS, Supabase" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Demo (Opsional)</label>
              <input name="demoUrl" className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Repository (Opsional)</label>
              <input name="repoUrl" className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://github.com/..." />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button type="submit" disabled={isLoading} className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}