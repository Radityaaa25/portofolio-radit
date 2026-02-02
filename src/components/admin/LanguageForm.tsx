"use client";

import { createLanguage, updateLanguage } from "@/actions/languages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2 } from "lucide-react";
import { LanguageSkill } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// Ganti props jadi 'initialData' biar konsisten
export default function LanguageForm({ initialData }: { initialData?: LanguageSkill }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    let res;

    // Cek initialData untuk tentukan Update atau Create
    if (initialData) {
      res = await updateLanguage(initialData.id, formData);
    } else {
      res = await createLanguage(formData);
    }

    if (res?.error) {
      toast({ title: "Gagal", description: res.error, variant: "destructive" });
      setLoading(false);
    } else {
      toast({ 
        title: "Berhasil!", 
        description: initialData ? "Bahasa berhasil diupdate." : "Bahasa berhasil disimpan.", 
        className: "bg-green-500 text-white" 
      });
      router.push("/admin/languages");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border border-border">
      <div className="space-y-2">
        <Label>Language Name</Label>
        {/* Tambah Placeholder & DefaultValue dari initialData */}
        <Input 
            name="language" 
            placeholder="Contoh: Bahasa Indonesia" 
            required 
            defaultValue={initialData?.language} 
        />
      </div>

      <div className="space-y-2">
        <Label>Flag Emoji</Label>
        <Input 
            name="flag" 
            placeholder="Contoh: 🇮🇩" 
            required 
            defaultValue={initialData?.flag} 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Level (English)</Label>
          <Input 
              name="levelEn" 
              placeholder="e.g. Native Speaker" 
              required 
              defaultValue={initialData?.levelEn} 
          />
        </div>
        <div className="space-y-2">
          <Label>Level (Indonesia)</Label>
          <Input 
              name="levelId" 
              placeholder="Contoh: Penutur Asli" 
              required 
              defaultValue={initialData?.levelId} 
          />
        </div>
      </div>

      <Button type="submit" className="w-full gap-2" disabled={loading}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {loading ? "Menyimpan..." : (initialData ? "Update Language" : "Save Language")}
      </Button>
    </form>
  );
}