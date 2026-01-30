"use client";

import { updateProfile } from "@/actions/admin";
import { Save, Loader2, Info } from "lucide-react";
import { useState, useEffect } from "react";
import { getPortfolioData } from "@/actions/portofolio";
// Import Profile dari Prisma Client yang sudah di-generate
import { Profile } from "@prisma/client";

export default function AdminProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  // Pastikan tipe state adalah Profile | null
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getPortfolioData().then((data) => {
      setProfile(data.profile);
    });
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const result = await updateProfile(formData);
    setIsLoading(false);

    if (result.error) {
      alert("Gagal: " + result.error);
    } else {
      alert("Berhasil disimpan!");
      const isOpen = formData.get("isOpenToWork") === "on";
      setProfile((prev) => {
        if (!prev) return null;
        return { ...prev, isOpenToWork: isOpen };
      });
      window.location.reload(); 
    }
  };

  if (!profile) return <div className="p-8">Loading data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Profile & Animasi</h1>
      </div>

      <div className="bg-background border border-border rounded-2xl p-8 shadow-sm">
        <form action={handleSubmit} className="space-y-8">
          
          <div className="flex items-center gap-4 p-4 bg-secondary/20 rounded-xl border border-border/50">
            <input
              type="checkbox"
              name="isOpenToWork"
              id="isOpenToWork"
              defaultChecked={profile.isOpenToWork}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <label htmlFor="isOpenToWork" className="font-medium cursor-pointer">
              Status &quot;Open to Work&quot; / &quot;Available&quot;
            </label>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                defaultValue={profile.name}
                required
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Download CV</label>
              <input
                type="text"
                name="cvUrl"
                defaultValue={profile.cvUrl || ""}
                className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="/cv.pdf"
              />
            </div>
          </div>

          <div className="border-t border-border/50 pt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Headline Utama (Statis)
              <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">Teks diam sebelum animasi</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Utama (Indonesia)</label>
                <input
                  type="text"
                  name="roleId"
                  defaultValue={profile.roleId}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Contoh: Mahasiswa Sistem Informasi"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role Utama (English)</label>
                <input
                  type="text"
                  name="roleEn"
                  defaultValue={profile.roleEn}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Contoh: Information Systems Student"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-6 bg-primary/5 -mx-8 px-8 pb-6">
             <div className="flex items-center gap-2 mb-4">
                <h3 className="text-lg font-bold text-primary">Teks Animasi (Typewriter)</h3>
                <div className="group relative">
                    <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute left-6 top-0 w-64 p-2 bg-black text-white text-xs rounded shadow-lg hidden group-hover:block z-50">
                        Pisahkan setiap kata dengan tanda koma (,). Contoh: Web Developer, Desainer, Fotografer
                    </div>
                </div>
             </div>
             
             <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Animasi List (Indonesia)</label>
                <textarea
                  name="typewriterId"
                  // Kita akses property dengan aman karena Profile sudah di-generate ulang
                  defaultValue={profile.typewriterId || "Pengembang Web, Desainer UI/UX"}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                  placeholder="Pisahkan dengan koma..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Animasi List (English)</label>
                <textarea
                  name="typewriterEn"
                  defaultValue={profile.typewriterEn || "Web Developer, UI/UX Designer"}
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                  placeholder="Separate by comma..."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}