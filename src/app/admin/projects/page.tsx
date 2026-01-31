import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { deleteProject } from "@/actions/projects";
import CategoryManager from "@/components/admin/CategoryManager"; // Import komponen baru

export default async function AdminProjectsPage() {
  // Ambil data projects DAN categories
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Manager</h1>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Project
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: LIST PROJECT (Lebih Lebar) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Daftar Project</h2>
          {projects.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-secondary/10">
              Belum ada project.
            </div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project) => (
                <div key={project.id} className="flex gap-4 p-4 border rounded-xl bg-card items-center">
                  {/* Gambar Kecil */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-secondary">
                    {project.imageUrl && (
                      <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold truncate">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.category.name}</p>
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      {project.demoUrl && <a href={project.demoUrl} target="_blank" className="hover:text-primary flex items-center gap-1"><ExternalLink className="w-3 h-3"/> Demo</a>}
                    </div>
                  </div>

                  {/* Tombol Delete */}
                  <form action={async () => {
                    "use server";
                    await deleteProject(project.id);
                  }}>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* KOLOM KANAN: CATEGORY MANAGER (Lebih Kecil) */}
        <div className="lg:col-span-1">
           {/* Komponen Category Manager dipasang di sini */}
           <CategoryManager initialCategories={categories} />
        </div>

      </div>
    </div>
  );
}