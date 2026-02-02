"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLanguage(formData: FormData) {
  try {
    const language = formData.get("language") as string;
    const levelId = formData.get("levelId") as string;
    const levelEn = formData.get("levelEn") as string;
    const flag = formData.get("flag") as string;

    await prisma.languageSkill.create({
      data: { language, levelId, levelEn, flag },
    });

    revalidatePath("/admin/languages");
    return { success: true };
  } catch (error) {
    console.error("Create Language Error:", error); // FIX: Gunakan variabel error
    return { error: "Gagal menyimpan bahasa." };
  }
}

export async function updateLanguage(id: string, formData: FormData) {
  try {
    const language = formData.get("language") as string;
    const levelId = formData.get("levelId") as string;
    const levelEn = formData.get("levelEn") as string;
    const flag = formData.get("flag") as string;

    await prisma.languageSkill.update({
      where: { id },
      data: { language, levelId, levelEn, flag },
    });

    revalidatePath("/admin/languages");
    return { success: true };
  } catch (error) {
    console.error("Update Language Error:", error); // FIX: Gunakan variabel error
    return { error: "Gagal update bahasa." };
  }
}

export async function deleteLanguage(id: string) {
  try {
    await prisma.languageSkill.delete({ where: { id } });
    revalidatePath("/admin/languages");
    return { success: true };
  } catch (error) {
    console.error("Delete Language Error:", error); // FIX: Gunakan variabel error
    return { error: "Gagal menghapus bahasa." };
  }
}