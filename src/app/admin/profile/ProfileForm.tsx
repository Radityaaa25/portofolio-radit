"use client";

// FIX: Ganti import useFormState (dari react-dom) jadi useActionState (dari react)
import { useActionState } from "react"; 
import { useFormStatus } from "react-dom";
import { updateProfile } from "@/actions/profile";
import { User, FileText, Briefcase, Info, Save, Loader2, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Profile } from "@prisma/client";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg disabled:opacity-70"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </button>
  );
}

export default function ProfileForm({ initialData }: { initialData: Profile | null }) {
  // FIX: Gunakan useActionState pengganti useFormState
  const [state, formAction] = useActionState(updateProfile, null);
  
  const { toast } = useToast();
  const [previewPhoto, setPreviewPhoto] = useState(initialData?.photoUrl || "");

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Sukses!",
        description: state.message,
        className: "bg-green-500 text-white border-none",
      });
    } else if (state?.error) {
      toast({
        title: "Gagal!",
        description: state.error,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewPhoto(url);
    }
  };

  return (
    <form action={formAction} className="space-y-8">
      
      {/* 1. INFORMASI DASAR */}
      <div className="bg-background border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-4">
          <User className="w-5 h-5 text-primary" /> Informasi Dasar
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-secondary bg-secondary/30 group">
              {previewPhoto ? (
                  <Image src={previewPhoto} alt="Profile" fill className="object-cover" />
              ) : (
                  <User className="w-12 h-12 text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <UploadCloud className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="file" 
                name="photo" 
                accept="image/*" 
                onChange={handlePhotoChange}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" 
              />
              <button type="button" className="px-4 py-2 bg-secondary text-xs font-medium rounded-full hover:bg-secondary/80 transition-colors">
                Ganti Foto
              </button>
            </div>
          </div>

          <div className="flex-1 w-full space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <input name="name" defaultValue={initialData?.name} required className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" placeholder="Raditya..." />
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl border border-border">
              <input 
                  type="checkbox" 
                  name="isOpenToWork" 
                  defaultChecked={initialData?.isOpenToWork ?? true} 
                  className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" 
                  id="openToWork"
              />
              <label htmlFor="openToWork" className="text-sm font-medium cursor-pointer select-none">
                  Tampilkan Status <span className="text-green-500 font-bold">&quot;Open to Work&quot;</span> di Homepage
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ROLE & TYPEWRITER */}
      <div className="bg-background border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-4">
          <Briefcase className="w-5 h-5 text-primary" /> Role & Animasi
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <label className="text-sm font-medium text-blue-500">Role Utama (Indo)</label>
              <input name="roleId" defaultValue={initialData?.roleId} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
              <label className="text-sm font-medium text-orange-500">Main Role (Inggris)</label>
              <input name="roleEn" defaultValue={initialData?.roleEn} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          
          <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Teks Animasi (Pisahkan dengan koma)</label>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="text-xs text-blue-500 block mb-1">Indo</span>
                  <input name="typewriterId" defaultValue={initialData?.typewriterId || ""} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <span className="text-xs text-orange-500 block mb-1">Inggris</span>
                  <input name="typewriterEn" defaultValue={initialData?.typewriterEn || ""} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* 3. ABOUT ME & CV */}
      <div className="bg-background border border-border rounded-2xl p-6 shadow-sm space-y-6">
        <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-border pb-4">
          <Info className="w-5 h-5 text-primary" /> About & CV
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-500">Tentang Saya (Indo)</label>
              <textarea name="aboutId" defaultValue={initialData?.aboutId || ""} rows={4} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-orange-500">About Me (Inggris)</label>
              <textarea name="aboutEn" defaultValue={initialData?.aboutEn || ""} rows={4} className="w-full px-4 py-2 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" /> Upload CV (PDF)
          </label>
          <div className="flex items-center gap-4">
              <input type="file" name="cv" accept=".pdf" className="w-full p-2 border border-border rounded-lg bg-secondary/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
              {initialData?.cvUrl && (
                  <a href={initialData.cvUrl} target="_blank" className="text-sm text-primary hover:underline whitespace-nowrap">
                      Lihat CV
                  </a>
              )}
          </div>
        </div>
      </div>

      <div className="flex justify-end sticky bottom-4 z-10">
          <SubmitButton />
      </div>

    </form>
  );
}