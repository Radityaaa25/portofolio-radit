import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { deleteProject } from "@/actions/projects";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Projects</h1>
        <Link href="/admin/projects/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex gap-2 font-medium hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Tambah Project
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="p-4 font-semibold">Thumbnail</th>
              <th className="p-4 font-semibold">Judul</th>
              <th className="p-4 font-semibold">Kategori</th>
              <th className="p-4 font-semibold">Tech Stack</th>
              <th className="p-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-secondary/20 transition-colors">
                <td className="p-4">
                  <div className="w-16 h-12 relative bg-secondary rounded overflow-hidden">
                    {project.imageUrl ? (
                      <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
                    ) : (
                        <span className="text-xs flex items-center justify-center h-full text-muted-foreground">No Img</span>
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium">{project.title}</td>
                <td className="p-4">
                    {/* FIX: Hapus 'as any'. Akses langsung properti name. 
                        Jika di DB namanya 'name', pakai .name. Jika 'nameId', pakai .nameId */}
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs border border-primary/20">
                        {project.category.name} 
                    </span>
                </td>
                <td className="p-4 text-muted-foreground truncate max-w-36">
                  {project.techStack.join(", ")}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end">
                    <form action={async () => { "use server"; await deleteProject(project.id); }}>
                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            
            {projects.length === 0 && (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        Belum ada project.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}