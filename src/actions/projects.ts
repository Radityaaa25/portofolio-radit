"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
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
    const imageFile = formData.get("image") as File;

    let imageUrl = ""; 

    if (imageFile && imageFile.size > 0) {
      const fileName = `project-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
      
      const { error } = await supabase.storage
        .from("portofolio") 
        .upload(fileName, imageFile, { upsert: false });
      
      if (error) throw new Error("Gagal upload gambar: " + error.message);
      
      const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    await prisma.project.create({
      data: {
        title,
        descriptionId,
        descriptionEn,
        techStack,     
        imageUrl,      
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
// 3. CATEGORY WRITE FUNCTIONS (BARU! ✨)
// ==========================================

export async function createCategory(prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const name = formData.get("name") as string;
    if (!name) return { error: "Nama kategori wajib diisi" };

    // Cek duplikat
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
    // Cek apakah kategori dipakai project?
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