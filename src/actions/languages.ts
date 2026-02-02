"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Standarisasi Return Type
type ActionResponse = { success?: boolean; error?: string };

export async function createLanguage(formData: FormData) {
  const language = formData.get("language") as string;
  const levelId = formData.get("levelId") as string;
  const levelEn = formData.get("levelEn") as string;
  const flag = formData.get("flag") as string;

  await prisma.languageSkill.create({
    data: { language, levelId, levelEn, flag },
  });

  revalidatePath("/admin/languages");
  redirect("/admin/languages");
}

export async function updateLanguage(id: string, formData: FormData) {
  const language = formData.get("language") as string;
  const levelId = formData.get("levelId") as string;
  const levelEn = formData.get("levelEn") as string;
  const flag = formData.get("flag") as string;

  await prisma.languageSkill.update({
    where: { id },
    data: { language, levelId, levelEn, flag },
  });

  revalidatePath("/admin/languages");
  redirect("/admin/languages");
}

export async function deleteLanguage(id: string): Promise<ActionResponse> {
  try {
    await prisma.languageSkill.delete({ where: { id } });
    revalidatePath("/admin/languages");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Gagal menghapus bahasa" };
  }
}