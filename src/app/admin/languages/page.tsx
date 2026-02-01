import Link from "next/link";
import prisma from "@/lib/prisma"; // HAPUS KURUNG KURAWAL {}
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { deleteLanguage } from "@/actions/languages";

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
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="p-4">Flag</th>
              <th className="p-4">Language</th>
              <th className="p-4">Level</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {languages.map((lang) => (
              <tr key={lang.id} className="hover:bg-secondary/20 transition-colors">
                <td className="p-4 text-xl">{lang.flag}</td>
                <td className="p-4 font-medium">{lang.language}</td>
                <td className="p-4">{lang.levelEn} / {lang.levelId}</td>
                <td className="p-4 text-right">
                  <form action={deleteLanguage.bind(null, lang.id)}>
                    <Button variant="destructive" size="sm" type="submit">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}