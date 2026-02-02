"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

type ActionResponse = {
  success?: boolean;
  error?: string;
};

export async function createCertificate(formData: FormData): Promise<ActionResponse> {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    
    // Ambil string tanggal dari form
    const issuedAtString = formData.get("issuedAt") as string; 
    
    const credentialUrl = formData.get("credentialUrl") as string;
    const imageFile = formData.get("image") as File;

    let finalImageUrl = "";

    if (imageFile && imageFile.size > 0) {
      const fileName = `cert-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
      const { error } = await supabase.storage.from("portfolio").upload(fileName, imageFile, { upsert: false });
      
      if (error) throw new Error("Gagal upload gambar: " + error.message);
      
      const { data } = supabase.storage.from("portfolio").getPublicUrl(fileName);
      finalImageUrl = data.publicUrl;
    } else {
        return { error: "Gambar sertifikat wajib diisi" };
    }

    // SIMPAN KE DB (Sesuai Error Log Anda: issuedAt & imageUrl)
    await prisma.certificate.create({
      data: {
        title,
        issuer,
        issuedAt: new Date(issuedAtString), // Konversi string ke Date Object
        credentialUrl: credentialUrl || "",
        imageUrl: finalImageUrl,            // Nama kolom: imageUrl
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

// ... (Kode lama biarkan)

export async function updateCertificate(id: string, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    const issuedAtString = formData.get("issuedAt") as string;
    const credentialUrl = formData.get("credentialUrl") as string;
    const imageFile = formData.get("image") as File;
    const imageUrl = formData.get("imageUrl") as string; // URL Lama

    let finalImageUrl = imageUrl;

    if (imageFile && imageFile.size > 0) {
       const fileName = `cert-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
       const { error } = await supabase.storage.from("portfolio").upload(fileName, imageFile, { upsert: false });
       if (error) throw new Error(error.message);
       const { data } = supabase.storage.from("portfolio").getPublicUrl(fileName);
       finalImageUrl = data.publicUrl;
    }

    await prisma.certificate.update({
      where: { id },
      data: {
        title, issuer, credentialUrl,
        issuedAt: new Date(issuedAtString),
        imageUrl: finalImageUrl,
      }
    });

    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (error) {
    console.error(error); 
    const message = error instanceof Error ? error.message : "Gagal update certificate";
    return { error: message };
  }
}