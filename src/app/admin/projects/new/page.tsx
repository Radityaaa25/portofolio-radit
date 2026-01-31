import prisma from "@/lib/prisma";
import ProjectForm from "./ProjectForm"; // Kita pisah formnya biar rapi

export default async function NewProjectPage() {
  // Ambil kategori buat dropdown (Web, UI/UX, dll)
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Tambah Project Baru</h1>
      <ProjectForm categories={categories} />
    </div>
  );
}