import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import LanguageForm from "../../LanguageForm"; // Pastikan path ini benar

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  
  // PERBAIKAN: Gunakan languageSkill, BUKAN experience
  const data = await prisma.languageSkill.findUnique({ where: { id } });
  
  if (!data) return notFound();
  
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Language</h1>
      <LanguageForm lang={data} />
    </div>
  );
}