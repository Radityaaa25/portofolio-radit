import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { deleteLanguage } from "@/actions/languages";
import DeleteButton from "@/components/admin/DeleteButton"; // Import ini

export default async function LanguagesPage() {
  const languages = await prisma.languageSkill.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Languages</h1>
        <Button asChild>
          <Link href="/admin/languages/new" className="gap-2">
            <Plus className="w-4 h-4" /> Add Language
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* Kasih wrapper responsive juga biar konsisten */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-150">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4">Language</th>
                <th className="p-4">Flag</th>
                <th className="p-4">Level</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {languages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-muted-foreground">
                    Belum ada data bahasa.
                  </td>
                </tr>
              ) : (
                languages.map((lang) => (
                  <tr key={lang.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium">{lang.language}</td>
                    <td className="p-4 text-2xl">{lang.flag}</td>
                    <td className="p-4">
                      <div className="font-medium">{lang.levelEn}</div>
                      <div className="text-xs text-muted-foreground">{lang.levelId}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Tombol Edit */}
                        <Link href={`/admin/languages/${lang.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        {/* GANTI FORM DELETE BIASA JADI DELETEBUTTON POPUP */}
                        <DeleteButton 
                          id={lang.id} 
                          action={deleteLanguage} 
                          variant="destructive"
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