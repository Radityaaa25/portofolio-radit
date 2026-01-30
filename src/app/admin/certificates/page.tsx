import Link from "next/link";
import prisma from "@/lib/prisma";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import Image from "next/image";
import { deleteCertificate } from "@/actions/certificates";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { date: "desc" }, // FIX: Sorting pakai 'date'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Kelola Sertifikat</h1>
        <Link href="/admin/certificates/new" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex gap-2 font-medium hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Tambah Sertifikat
        </Link>
      </div>

      <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
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
            {certificates.map((cert) => (
              <tr key={cert.id} className="hover:bg-secondary/20 transition-colors">
                <td className="p-4">
                  <div className="w-20 h-14 relative bg-secondary rounded overflow-hidden border border-border">
                    {/* FIX: Pakai cert.image */}
                    {cert.image ? (
                        <Image src={cert.image} alt={cert.title} fill className="object-cover" />
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
                <td className="p-4 text-muted-foreground">
                    {/* FIX: cert.date adalah string, jadi langsung tampilkan */}
                    {cert.date}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end">
                    <form action={async () => { "use server"; await deleteCertificate(cert.id); }}>
                        <button className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            
            {certificates.length === 0 && (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                        Belum ada sertifikat.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}