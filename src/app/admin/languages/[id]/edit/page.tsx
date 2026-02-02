import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import LanguageForm from "@/components/admin/LanguageForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditLanguagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await prisma.languageSkill.findUnique({ where: { id } });
  
  if (!data) return notFound();

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/languages"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Edit Language</h1>
      </div>
      
      {/* PENTING: Kirim props sebagai initialData */}
      <LanguageForm initialData={data} />
    </div>
  );
}