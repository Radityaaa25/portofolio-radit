"use server";

import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function createCertificate(formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    const issuedAtString = formData.get("issuedAt") as string;
    const credentialUrl = formData.get("credentialUrl") as string;
    const imageFile = formData.get("image") as File;

    let finalImageUrl = "";
    if (imageFile && imageFile.size > 0) {
      const fileName = `cert-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
      const { error } = await supabase.storage.from("portofolio").upload(fileName, imageFile, { upsert: false });
      if (error) throw new Error("Gagal upload gambar: " + error.message);
      const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);
      finalImageUrl = data.publicUrl;
    } else {
        return { error: "Gambar sertifikat wajib diisi" };
    }

    await prisma.certificate.create({
      data: {
        title, issuer, issuedAt: new Date(issuedAtString),
        credentialUrl: credentialUrl || "", imageUrl: finalImageUrl,
      },
    });

    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (error: unknown) {
    // FIX: Handle tipe 'unknown' dengan aman
    const message = error instanceof Error ? error.message : "Gagal menyimpan sertifikat";
    return { error: message };
  }
}

export async function updateCertificate(id: string, formData: FormData) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  try {
    const title = formData.get("title") as string;
    const issuer = formData.get("issuer") as string;
    const issuedAtString = formData.get("issuedAt") as string;
    const credentialUrl = formData.get("credentialUrl") as string;
    const imageFile = formData.get("image") as File;
    const oldImageUrl = formData.get("imageUrl") as string;

    let finalImageUrl = oldImageUrl;

    if (imageFile && imageFile.size > 0) {
      const fileName = `cert-${Date.now()}-${imageFile.name.replaceAll(" ", "-")}`;
      const { error } = await supabase.storage.from("portofolio").upload(fileName, imageFile, { upsert: false });
      if (error) throw new Error("Gagal upload gambar: " + error.message);
      const { data } = supabase.storage.from("portofolio").getPublicUrl(fileName);
      finalImageUrl = data.publicUrl;
    }

    await prisma.certificate.update({
      where: { id },
      data: {
        title, issuer, issuedAt: new Date(issuedAtString),
        credentialUrl: credentialUrl || "", imageUrl: finalImageUrl,
      },
    });

    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (error: unknown) {
    // FIX: Handle tipe 'unknown' dengan aman
    const message = error instanceof Error ? error.message : "Gagal update sertifikat";
    return { error: message };
  }
}

export async function deleteCertificate(id: string) {
  try {
    await prisma.certificate.delete({ where: { id } });
    revalidatePath("/admin/certificates");
    return { success: true };
  } catch (error) {
     console.error("Delete Error:", error); // FIX: Log error biar variabel terpakai
     return { error: "Gagal menghapus sertifikat" };
  }
}