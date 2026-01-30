"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type ActionResponse = {
  success?: boolean;
  error?: string;
};

// --- CREATE CERTIFICATE ---
export async function createCertificate(formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    
    // DB minta 'date' (String), bukan 'issuedAt'
    const date = formData.get("issuedAt") as string; 
    
    const credentialUrl = formData.get("credentialUrl") as string;
    const imageFile = formData.get("image") as File;

    let finalImage = "";

    // 1. Upload Gambar
    if (imageFile && imageFile.size > 0) {
      const fileName = `cert-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
      const { error } = await supabase.storage.from("portfolio").upload(fileName, imageFile, { upsert: false });
      
      if (error) throw new Error("Gagal upload gambar: " + error.message);
      
      const { data } = supabase.storage.from("portfolio").getPublicUrl(fileName);
      finalImage = data.publicUrl;
    } else {
        return { error: "Gambar sertifikat wajib diisi" };
    }

    // 2. Simpan ke Database (Sesuaikan nama kolom DB)
    await prisma.certificate.create({
      data: {
        title,
        issuer,
        date,           // FIX: Pakai 'date' (String)
        credentialUrl: credentialUrl || "",
        image: finalImage, // FIX: Pakai 'image'
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/certificates");
    return { success: true };

  } catch (error: unknown) {
    console.error("Create Certificate Error:", error);
    let message = "Gagal menyimpan sertifikat";
    if (error instanceof Error) message = error.message;
    return { error: message };
  }
}

// --- DELETE CERTIFICATE ---
export async function deleteCertificate(id: string): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/certificates");
    return { success: true };
  } catch {
    return { error: "Gagal menghapus sertifikat" };
  }
}