"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLanguage, updateLanguage } from "@/actions/languages";
import { LanguageSkill } from "@prisma/client"; // Import tipe

export default function LanguageForm({ lang }: { lang?: LanguageSkill }) {
  const action = lang ? updateLanguage.bind(null, lang.id) : createLanguage;
  return (
    <form action={action} className="space-y-6 bg-card p-6 rounded-xl border border-border">
        <div className="space-y-2"><Label>Language</Label><Input name="language" defaultValue={lang?.language} required /></div>
        <div className="space-y-2"><Label>Flag Emoji</Label><Input name="flag" defaultValue={lang?.flag} required /></div>
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2"><Label>Level (EN)</Label><Input name="levelEn" defaultValue={lang?.levelEn} required /></div>
             <div className="space-y-2"><Label>Level (ID)</Label><Input name="levelId" defaultValue={lang?.levelId} required /></div>
        </div>
        <Button type="submit" className="w-full">{lang ? "Update" : "Simpan"}</Button>
    </form>
  );
}