"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type ActionResponse = {
  success?: boolean;
  error?: string;
};

export async function createProject(formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const descriptionId = formData.get("descriptionId") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    
    const techStackString = formData.get("techStack") as string;
    const techStack = techStackString.split(",").map((t) => t.trim());

    const demoUrl = formData.get("demoUrl") as string;
    const repoUrl = formData.get("repoUrl") as string;
    const categoryId = formData.get("categoryId") as string;
    const imageFile = formData.get("image") as File;

    let imageUrl = ""; 

    if (imageFile && imageFile.size > 0) {
      const fileName = `${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
      const { error } = await supabase.storage.from("portfolio").upload(fileName, imageFile, { upsert: false });
      
      if (error) throw new Error(error.message);
      
      const { data } = supabase.storage.from("portfolio").getPublicUrl(fileName);
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

  } catch (error: unknown) {
    console.error("Error creating project:", error);
    let message = "Gagal membuat project";
    if (error instanceof Error) {
        message = error.message;
    }
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
  } catch { // FIX: Hapus '(error)' disini agar tidak kena warning 'unused variable'
    return { error: "Gagal hapus project" };
  }
}