import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProjectForm from "@/app/admin/projects/new/ProjectForm"; // Pastikan path ini benar
import { notFound } from "next/navigation";

// Perhatikan tipe Props di Next.js 15: params adalah Promise
export default async function EditProjectPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Await params dulu sebelum akses properti id
  const { id } = await params;

  // 2. Fetch project pakai id yang sudah di-await
  const project = await prisma.project.findUnique({
    where: { id },
  });

  const categories = await prisma.category.findMany();

  if (!project) return notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/projects"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Project</h1>
      </div>

      {/* Kirim data project ke form untuk diedit */}
      <ProjectForm categories={categories} project={project} />
    </div>
  );
}