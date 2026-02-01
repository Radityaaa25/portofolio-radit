import Link from "next/link";
import prisma from "@/lib/prisma"; // HAPUS KURUNG KURAWAL {}
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { deleteExperience } from "@/actions/experiences";

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
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="p-4">Role / Position</th>
              <th className="p-4">Type</th>
              <th className="p-4">Place</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-secondary/20 transition-colors">
                <td className="p-4 font-medium">{exp.roleEn}</td>
                <td className="p-4 capitalize">{exp.type}</td>
                <td className="p-4">{exp.place}</td>
                <td className="p-4 text-right">
                  <form action={deleteExperience.bind(null, exp.id)}>
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