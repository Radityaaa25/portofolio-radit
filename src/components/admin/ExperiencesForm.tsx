"use client";

import { createExperience, updateExperience } from "@/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Loader2 } from "lucide-react";
import { Experience } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Pakai initialData
export default function ExperienceForm({ initialData }: { initialData?: Experience }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let res;

    if (initialData) {
      res = await updateExperience(initialData.id, formData);
    } else {
      res = await createExperience(formData);
    }

    if (res?.error) {
      toast({ title: "Gagal", description: res.error, variant: "destructive" });
      setLoading(false);
    } else {
      toast({ 
        title: "Berhasil!", 
        description: initialData ? "Experience berhasil diupdate." : "Experience berhasil disimpan.", 
        className: "bg-green-500 text-white" 
      });
      router.push("/admin/experiences");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border border-border">
      <div className="space-y-2">
        <Label>Type</Label>
        <Select name="type" required defaultValue={initialData?.type || "work"}>
          <SelectTrigger><SelectValue placeholder="Pilih tipe" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="organization">Organization</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Role (English)</Label>
          <Input name="roleEn" placeholder="e.g. Frontend Developer" required defaultValue={initialData?.roleEn} />
        </div>
        <div className="space-y-2">
          <Label>Role (Indonesia)</Label>
          <Input name="roleId" placeholder="Contoh: Pengembang Frontend" required defaultValue={initialData?.roleId} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Place / Company</Label>
        <Input name="place" placeholder="e.g. Google Inc. / Universitas Indonesia" required defaultValue={initialData?.place} />
      </div>

      <div className="space-y-2">
        <Label>Period</Label>
        <Input name="period" placeholder="e.g. Jan 2023 - Present" required defaultValue={initialData?.period} />
      </div>

      <div className="space-y-2">
        <Label>Description (English)</Label>
        <Textarea name="descriptionEn" placeholder="Describe your responsibilities..." rows={4} required defaultValue={initialData?.descriptionEn} />
      </div>

      <div className="space-y-2">
        <Label>Description (Indonesia)</Label>
        <Textarea name="descriptionId" placeholder="Deskripsikan tanggung jawab anda..." rows={4} required defaultValue={initialData?.descriptionId} />
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {loading ? "Menyimpan..." : (initialData ? "Update Experience" : "Save Experience")}
      </Button>
    </form>
  );
}