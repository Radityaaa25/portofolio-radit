import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus, Pencil } from "lucide-react";
import { deleteExperience } from "@/actions/experiences";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function ExperiencesPage() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Experiences</h1>
        <Button asChild>
          <Link href="/admin/experiences/new" className="gap-2">
            <Plus className="w-4 h-4" /> Add Experience
          </Link>
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        {/* WRAPPER SCROLL: Supaya tabel bisa digeser di HP */}
        <div className="overflow-x-auto">
          {/* MIN-WIDTH: Supaya tabel tidak gepeng */}
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4">Role / Position</th>
                <th className="p-4">Type</th>
                <th className="p-4">Place</th>
                {/* KOLOM BARU: Period */}
                <th className="p-4">Period</th> 
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {experiences.length === 0 ? (
                /* FIX JARAK: py-24 biar atas bawah lega banget */
                <tr>
                  <td colSpan={5} className="text-center py-24 text-muted-foreground">
                    Belum ada experience.
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium">{exp.roleEn}</td>
                    <td className="p-4 capitalize">{exp.type}</td>
                    <td className="p-4">{exp.place}</td>
                    {/* DATA BARU: Period */}
                    <td className="p-4">{exp.period}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/experiences/${exp.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        
                        <DeleteButton 
                          id={exp.id} 
                          action={deleteExperience} 
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