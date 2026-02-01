"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

// Definisi tipe return
type ActionState = {
  success?: boolean;
  message?: string;
  error?: string;
} | null;

export async function getProfile() {
  const profile = await prisma.profile.findFirst();
  return profile;
}

export async function updateProfile(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const name = formData.get("name") as string;
    const roleId = formData.get("roleId") as string;
    const roleEn = formData.get("roleEn") as string;
    const typewriterId = formData.get("typewriterId") as string;
    const typewriterEn = formData.get("typewriterEn") as string;
    const aboutId = formData.get("aboutId") as string;
    const aboutEn = formData.get("aboutEn") as string;
    const isOpenToWork = formData.get("isOpenToWork") === "on";

    const photoFile = formData.get("photo") as File;
    const cvFile = formData.get("cv") as File;

    const existingProfile = await prisma.profile.findFirst();

    let photoUrl = existingProfile?.photoUrl || "";
    let cvUrl = existingProfile?.cvUrl || "";

    // Upload Foto
    if (photoFile && photoFile.size > 0) {
      const fileName = `profile-${Date.now()}`; 
      
      const { error } = await supabase.storage 
        .from("portofolio") 
        .upload(fileName, photoFile, { upsert: false });

      if (error) throw new Error("Gagal upload foto: " + error.message);
      
      const publicUrl = supabase.storage.from("portofolio").getPublicUrl(fileName).data.publicUrl;
      photoUrl = publicUrl;
    }

    // Upload CV
    if (cvFile && cvFile.size > 0) {
      const fileName = `cv-${Date.now()}`;
      
      const { error } = await supabase.storage
        .from("portofolio")
        .upload(fileName, cvFile, { upsert: false });

      if (error) throw new Error("Gagal upload CV: " + error.message);
      
      const publicUrl = supabase.storage.from("portofolio").getPublicUrl(fileName).data.publicUrl;
      cvUrl = publicUrl;
    }

    // Simpan Database
    if (existingProfile) {
      await prisma.profile.update({
        where: { id: existingProfile.id },
        data: {
          name, roleId, roleEn, typewriterId, typewriterEn, aboutId, aboutEn,
          isOpenToWork, photoUrl, cvUrl
        }
      });
    } else {
      await prisma.profile.create({
        data: {
          name, roleId, roleEn, typewriterId, typewriterEn, aboutId, aboutEn,
          isOpenToWork, photoUrl, cvUrl
        }
      });
    }

    revalidatePath("/", "layout"); 
    revalidatePath("/admin/profile");
    
    return { success: true, message: "Profile berhasil disimpan!" };

  } catch (error) {
    console.error("Update Error:", error);
    let message = "Gagal menyimpan profile";
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
}