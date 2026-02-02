"use client";

import { updateExperience } from "@/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { Experience } from "@prisma/client";

// Form ini adalah COPY dari halaman NEW, tapi nerima data untuk diedit
export default function EditExperienceForm({ data }: { data: Experience }) {
  // Bind ID ke action update
  const updateWithId = updateExperience.bind(null, data.id);

  return (
    <form action={updateWithId} className="space-y-6 bg-card p-6 rounded-xl border border-border">
      
      <div className="space-y-2">
        <Label>Type</Label>
        <Select name="type" required defaultValue={data.type}>
          <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
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
          <Input name="roleEn" placeholder="e.g. Frontend Developer" required defaultValue={data.roleEn} />
        </div>
        <div className="space-y-2">
          <Label>Role (Indonesia)</Label>
          <Input name="roleId" placeholder="Contoh: Pengembang Frontend" required defaultValue={data.roleId} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Place / Company</Label>
        <Input name="place" placeholder="e.g. Google Inc." required defaultValue={data.place} />
      </div>

      <div className="space-y-2">
        <Label>Period</Label>
        <Input name="period" placeholder="e.g. 2023 - Present" required defaultValue={data.period} />
      </div>

      <div className="space-y-2">
        <Label>Description (English)</Label>
        <Textarea name="descriptionEn" placeholder="Describe what you did..." rows={4} required defaultValue={data.descriptionEn} />
      </div>

      <div className="space-y-2">
        <Label>Description (Indonesia)</Label>
        <Textarea name="descriptionId" placeholder="Deskripsikan apa yang kamu lakukan..." rows={4} required defaultValue={data.descriptionId} />
      </div>

      <Button type="submit" className="w-full gap-2">
        <Save className="w-4 h-4" /> Update Experience
      </Button>
    </form>
  );
}