import CertificateForm from "@/components/admin/CertificateForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = await prisma.certificate.findUnique({ where: { id } });
  
  if (!cert) return notFound();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/certificates" className="p-2 hover:bg-secondary rounded-full transition-colors">
             <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold">Edit Sertifikat</h1>
      </div>
      
      {/* PENTING: Kirim props sebagai initialData */}
      <CertificateForm initialData={cert} />
    </div>
  );
}