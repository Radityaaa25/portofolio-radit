"use server";

import prisma from "@/lib/prisma"; // HAPUS KURUNG KURAWAL {}
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createExperience(formData: FormData) {
  const type = formData.get("type") as string;
  const roleEn = formData.get("roleEn") as string;
  const roleId = formData.get("roleId") as string;
  const place = formData.get("place") as string;
  const period = formData.get("period") as string;
  const descriptionEn = formData.get("descriptionEn") as string;
  const descriptionId = formData.get("descriptionId") as string;

  await prisma.experience.create({
    data: {
      type,
      roleEn,
      roleId,
      place,
      period,
      descriptionEn,
      descriptionId,
    },
  });

  revalidatePath("/admin/experiences");
  redirect("/admin/experiences");
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({ where: { id } });
  revalidatePath("/admin/experiences");
}