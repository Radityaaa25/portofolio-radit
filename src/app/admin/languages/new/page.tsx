"use client";

import { createLanguage } from "@/actions/languages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewLanguagePage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/languages"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Add Language Skill</h1>
      </div>

      <form action={createLanguage} className="space-y-6 bg-card p-6 rounded-xl border border-border">
        
        <div className="space-y-2">
          <Label>Language Name</Label>
          <Input name="language" placeholder="e.g. Indonesian" required />
        </div>

        <div className="space-y-2">
          <Label>Flag Emoji</Label>
          <Input name="flag" placeholder="e.g. 🇮🇩" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Level (English)</Label>
            <Input name="levelEn" placeholder="e.g. Native" required />
          </div>
          <div className="space-y-2">
            <Label>Level (Indonesia)</Label>
            <Input name="levelId" placeholder="Contoh: Aktif" required />
          </div>
        </div>

        <Button type="submit" className="w-full gap-2">
          <Save className="w-4 h-4" /> Save Language
        </Button>
      </form>
    </div>
  );
}