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

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm min-w-250">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4 font-semibold w-[30%]">Role / Position</th>
                <th className="p-4 font-semibold w-[15%]">Type</th>
                <th className="p-4 font-semibold w-[25%]">Place</th>
                <th className="p-4 font-semibold w-[15%]">Period</th>
                <th className="p-4 font-semibold text-right w-[15%]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {experiences.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-24 text-muted-foreground">
                    <p className="text-lg font-medium">Belum ada experience.</p>
                    <p className="text-sm mt-1">Data experience akan muncul di sini.</p>
                  </td>
                </tr>
              ) : (
                experiences.map((exp) => (
                  <tr key={exp.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-medium align-top">
                      <div>{exp.roleEn}</div>
                      <div className="text-xs text-muted-foreground mt-1">{exp.roleId}</div>
                    </td>
                    <td className="p-4 capitalize align-top">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {exp.type}
                      </span>
                    </td>
                    <td className="p-4 align-top">{exp.place}</td>
                    <td className="p-4 align-top text-muted-foreground">{exp.period}</td>
                    <td className="p-4 text-right align-top">
                      <div className="flex justify-end gap-2 items-start">
                        <Link href={`/admin/experiences/${exp.id}/edit`}>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DeleteButton 
                          id={exp.id} 
                          action={deleteExperience} 
                          variant="destructive"
                          className="h-8 w-8 p-0"
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