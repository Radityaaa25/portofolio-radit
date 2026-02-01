"use client";

import { createExperience } from "@/actions/experiences";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewExperiencePage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/experiences"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Add New Experience</h1>
      </div>

      <form action={createExperience} className="space-y-6 bg-card p-6 rounded-xl border border-border">
        
        <div className="space-y-2">
          <Label>Type</Label>
          <Select name="type" required defaultValue="work">
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
            <Input name="roleEn" placeholder="e.g. Frontend Developer" required />
          </div>
          <div className="space-y-2">
            <Label>Role (Indonesia)</Label>
            <Input name="roleId" placeholder="Contoh: Pengembang Frontend" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Place / Company</Label>
          <Input name="place" placeholder="e.g. Google Inc." required />
        </div>

        <div className="space-y-2">
          <Label>Period</Label>
          <Input name="period" placeholder="e.g. 2023 - Present" required />
        </div>

        <div className="space-y-2">
          <Label>Description (English)</Label>
          <Textarea name="descriptionEn" placeholder="Describe what you did..." rows={4} required />
        </div>

        <div className="space-y-2">
          <Label>Description (Indonesia)</Label>
          <Textarea name="descriptionId" placeholder="Deskripsikan apa yang kamu lakukan..." rows={4} required />
        </div>

        <Button type="submit" className="w-full gap-2">
          <Save className="w-4 h-4" /> Save Experience
        </Button>
      </form>
    </div>
  );
}