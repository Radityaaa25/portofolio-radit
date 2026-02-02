import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, ExternalLink, Pencil } from "lucide-react";
import Image from "next/image";
import { deleteCertificate } from "@/actions/certificates";
import DeleteButton from "@/components/admin/DeleteButton";
import { Button } from "@/components/ui/button";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Kelola Sertifikat</h1>
        <Link href="/admin/certificates/new" className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Tambah Sertifikat
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        {/* WRAPPER SCROLL */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-200">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold">Preview</th>
                <th className="p-4 font-semibold">Judul Sertifikat</th>
                <th className="p-4 font-semibold">Penerbit</th>
                <th className="p-4 font-semibold">Tanggal</th>
                <th className="p-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certificates.length === 0 ? (
                /* FIX JARAK: py-24 biar atas bawah lega banget */
                <tr>
                  <td colSpan={5} className="text-center py-24 text-muted-foreground">
                    Belum ada sertifikat.
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4">
                      <div className="w-20 h-14 relative bg-secondary rounded overflow-hidden border border-border">
                        {cert.imageUrl ? (
                          <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
                        ) : (
                          <span className="flex items-center justify-center h-full text-xs text-muted-foreground">No Img</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      {cert.title}
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" className="ml-2 inline-block text-primary hover:underline">
                          <ExternalLink className="w-3 h-3 inline" />
                        </a>
                      )}
                    </td>
                    <td className="p-4">{cert.issuer}</td>
                    <td className="p-4 text-muted-foreground whitespace-nowrap">
                      {new Date(cert.issuedAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long' })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                         <Link href={`/admin/certificates/${cert.id}/edit`}>
                            <Button variant="ghost" size="sm" className="p-2 text-blue-500 hover:bg-blue-500/10">
                               <Pencil className="w-4 h-4" />
                            </Button>
                         </Link>
                        
                         <DeleteButton 
                            id={cert.id} 
                            action={deleteCertificate} 
                            variant="ghost"
                            className="p-2 text-red-500 hover:bg-red-500/10 hover:text-red-600"
                         />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}