"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createExperience(formData: FormData) {
  try {
    const type = formData.get("type") as string;
    const roleEn = formData.get("roleEn") as string;
    const roleId = formData.get("roleId") as string;
    const place = formData.get("place") as string;
    const period = formData.get("period") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const descriptionId = formData.get("descriptionId") as string;

    await prisma.experience.create({
      data: { type, roleEn, roleId, place, period, descriptionEn, descriptionId },
    });

    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    console.error("Create Experience Error:", error); // FIX: Gunakan variabel error
    return { error: "Gagal membuat experience." };
  }
}

export async function updateExperience(id: string, formData: FormData) {
  try {
    const type = formData.get("type") as string;
    const roleEn = formData.get("roleEn") as string;
    const roleId = formData.get("roleId") as string;
    const place = formData.get("place") as string;
    const period = formData.get("period") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const descriptionId = formData.get("descriptionId") as string;

    await prisma.experience.update({
      where: { id },
      data: { type, roleEn, roleId, place, period, descriptionEn, descriptionId },
    });

    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    console.error("Update Experience Error:", error); // FIX: Gunakan variabel error
    return { error: "Gagal update experience." };
  }
}

export async function deleteExperience(id: string) {
  try {
    await prisma.experience.delete({ where: { id } });
    revalidatePath("/admin/experiences");
    return { success: true };
  } catch (error) {
    console.error("Delete Experience Error:", error); // FIX: Gunakan variabel error
    return { error: "Gagal menghapus experience." };
  }
}