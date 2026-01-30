"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type ActionResponse = {
  success?: boolean;
  error?: string;
};

export async function updateProfile(formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const name = formData.get("name") as string;
    const roleId = formData.get("roleId") as string;
    const roleEn = formData.get("roleEn") as string;
    const cvUrl = formData.get("cvUrl") as string;
    const isOpenToWork = formData.get("isOpenToWork") === "on";
    
    // TANGKAP DATA BARU
    const typewriterId = formData.get("typewriterId") as string;
    const typewriterEn = formData.get("typewriterEn") as string;

    const existingProfile = await prisma.profile.findFirst();

    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: { 
            name, roleId, roleEn, cvUrl, isOpenToWork,
            typewriterId, typewriterEn // Update kolom baru
        },
      });
    } else {
      await prisma.profile.create({
        data: { 
            name, roleId, roleEn, cvUrl, isOpenToWork,
            typewriterId, typewriterEn 
        }
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/profile");

    return { success: true };
  } catch (error) {
    console.error("Update profile error:", error);
    return { error: "Gagal menyimpan data." };
  }
}