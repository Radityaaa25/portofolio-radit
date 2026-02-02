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
        
        <div className="w-full overflow-x-auto max-w-[85vw] md:max-w-full">
          
          <table className="w-full text-left text-sm min-w-250">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold w-37.5">Preview</th>
                <th className="p-4 font-semibold w-[30%]">Judul Sertifikat</th>
                <th className="p-4 font-semibold w-[20%]">Penerbit</th>
                <th className="p-4 font-semibold w-[15%]">Tanggal</th>
                <th className="p-4 font-semibold text-right w-[15%]">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certificates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-24 text-muted-foreground">
                    <p className="text-lg font-medium">Belum ada sertifikat.</p>
                    <p className="text-sm mt-2">Data sertifikat akan muncul di sini.</p>
                  </td>
                </tr>
              ) : (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 align-middle">
                      <div className="w-24 h-16 relative bg-secondary rounded-md overflow-hidden border border-border shadow-sm">
                        {cert.imageUrl ? (
                          <Image src={cert.imageUrl} alt={cert.title} fill className="object-cover" />
                        ) : (
                          <span className="flex items-center justify-center h-full text-xs text-muted-foreground">No Img</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-medium align-middle">
                      <div className="line-clamp-2" title={cert.title}>
                        {cert.title}
                        {cert.credentialUrl && (
                          <a href={cert.credentialUrl} target="_blank" className="ml-2 inline-flex items-center text-primary hover:underline" title="Lihat Kredensial">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle">{cert.issuer}</td>
                    <td className="p-4 text-muted-foreground align-middle whitespace-nowrap">
                      {new Date(cert.issuedAt).toLocaleDateString("id-ID", { year: 'numeric', month: 'long' })}
                    </td>
                    <td className="p-4 text-right align-middle">
                      <div className="flex justify-end gap-2 items-center">
                         <Link href={`/admin/certificates/${cert.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-500 hover:bg-blue-500/10 hover:text-blue-600">
                               <Pencil className="w-4 h-4" />
                            </Button>
                         </Link>
                        
                         <DeleteButton 
                            id={cert.id} 
                            action={deleteCertificate} 
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:bg-red-500/10 hover:text-red-600"
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