"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type ActionResponse = {
  success?: boolean;
  error?: string;
} | null;

// ==========================================
// 1. READ FUNCTIONS
// ==========================================

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
    },
  });
}

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

// ==========================================
// 2. PROJECT WRITE FUNCTIONS
// ==========================================

export async function createProject(prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const descriptionId = formData.get("descriptionId") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map((t) => t.trim()).filter(t => t);

    const demoUrl = formData.get("demoUrl") as string;
    const repoUrl = formData.get("repoUrl") as string;
    const categoryId = formData.get("categoryId") as string;
    
    // PERUBAHAN DI SINI: Kita ambil URL string, bukan File object
    const imageUrl = formData.get("imageUrl") as string; 

    await prisma.project.create({
      data: {
        title,
        descriptionId,
        descriptionEn,
        techStack,     
        imageUrl, // URL sudah dikirim dari frontend     
        demoUrl,       
        repoUrl,       
        categoryId,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };

  } catch (error) {
    console.error("Error creating project:", error);
    const message = error instanceof Error ? error.message : "Gagal membuat project";
    return { error: message };
  }
}

export async function deleteProject(id: string): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };
  try {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch {
    return { error: "Gagal hapus project" };
  }
}

// ==========================================
// 3. CATEGORY WRITE FUNCTIONS
// ==========================================

export async function createCategory(prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const name = formData.get("name") as string;
    if (!name) return { error: "Nama kategori wajib diisi" };

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) return { error: "Kategori sudah ada!" };

    await prisma.category.create({ data: { name } });

    revalidatePath("/admin/projects");
    revalidatePath("/admin/projects/new");
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal membuat kategori";
    return { error: message };
  }
}

export async function deleteCategory(id: string): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const count = await prisma.project.count({ where: { categoryId: id } });
    if (count > 0) return { error: "Gagal: Masih ada project di kategori ini!" };

    await prisma.category.delete({ where: { id } });
    
    revalidatePath("/admin/projects");
    revalidatePath("/admin/projects/new");
    return { success: true };
  } catch {
    return { error: "Gagal menghapus kategori" };
  }
}

// ... (Kode sebelumnya biarkan saja)

// ==========================================
// 4. UPDATE PROJECT FUNCTION (BARU ✨)
// ==========================================

export async function updateProject(id: string, prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const descriptionId = formData.get("descriptionId") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map((t) => t.trim()).filter(t => t);

    const demoUrl = formData.get("demoUrl") as string;
    const repoUrl = formData.get("repoUrl") as string;
    const categoryId = formData.get("categoryId") as string;
    
    // Cek apakah ada gambar baru yang dikirim?
    // ProjectForm nanti akan mengirim string URL jika tidak ada perubahan,
    // ATAU mengirim URL baru jika ada upload di client side.
    const imageUrl = formData.get("imageUrl") as string; 

    await prisma.project.update({
      where: { id },
      data: {
        title,
        descriptionId,
        descriptionEn,
        techStack,     
        imageUrl, // Update URL gambar
        demoUrl,       
        repoUrl,       
        categoryId,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };

  } catch (error) {
    console.error("Error updating project:", error);
    const message = error instanceof Error ? error.message : "Gagal update project";
    return { error: message };
  }
}

export async function updateCategory(id: string, prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };
  
  try {
    const name = formData.get("name") as string;
    await prisma.category.update({ where: { id }, data: { name } });
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) { // Hapus unused error atau gunakan
    console.error(error); 
    return { error: "Gagal update kategori" };
  }
}