"use client";

import { createCategory, deleteCategory } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { useActionState } from "react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@prisma/client";

// Props: Data kategori dikirim dari parent
export default function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const [state, formAction, isPending] = useActionState(createCategory, null);
  const { toast } = useToast();
  
  // Optimistic UI sederhana (biar kerasa cepet)
  const [categories, setCategories] = useState(initialCategories);

  // Update list kategori kalau props berubah (misal habis revalidate)
  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    if (state?.success) {
      toast({ title: "Sukses", description: "Kategori ditambahkan", className: "bg-green-500 text-white" });
    } else if (state?.error) {
      toast({ title: "Gagal", description: state.error, variant: "destructive" });
    }
  }, [state, toast]);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus kategori ini?")) return;
    
    const res = await deleteCategory(id);
    if (res?.success) {
      toast({ title: "Terhapus", description: "Kategori berhasil dihapus" });
    } else {
      toast({ title: "Gagal", description: res?.error || "Gagal hapus", variant: "destructive" });
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl border border-border space-y-6">
      <h3 className="text-lg font-bold">Kelola Kategori</h3>

      {/* Form Tambah */}
      <form action={formAction} className="flex gap-2 items-end">
        <div className="space-y-2 flex-1">
          <Label>Nama Kategori Baru</Label>
          <Input name="name" placeholder="Misal: UI/UX Design" required />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Tambah
        </Button>
      </form>

      {/* List Kategori */}
      <div className="space-y-2 max-h-75 overflow-y-auto pr-2">
        {categories.length === 0 && <p className="text-muted-foreground text-sm">Belum ada kategori.</p>}
        
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/20">
            <span className="font-medium">{cat.name}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-red-500 hover:text-red-600 hover:bg-red-100/10"
              onClick={() => handleDelete(cat.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}