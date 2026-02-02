"use client";

import { createCategory, updateCategory, deleteCategory } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Save, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Category } from "@prisma/client";
import DeleteButton from "./DeleteButton"; 

export default function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const { toast } = useToast();
  // Hapus state 'categories' lokal karena kita pakai 'initialCategories' dari props server component
  const [loading, setLoading] = useState(false);
  
  // State Edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = async (formData: FormData) => {
    setLoading(true);
    const res = await createCategory(null, formData);
    setLoading(false);
    if (res?.success) {
      toast({ title: "Berhasil!", description: "Kategori ditambahkan.", className: "bg-green-500 text-white" });
    } else {
      toast({ title: "Gagal", description: res?.error, variant: "destructive" });
    }
  };

  const handleUpdate = async (id: string) => {
    const formData = new FormData();
    formData.append("name", editName);
    
    // Pass null as prevState
    const res = await updateCategory(id, null, formData);
    if (res?.success) {
      toast({ title: "Berhasil!", description: "Kategori diupdate.", className: "bg-green-500 text-white" });
      setEditingId(null);
    } else {
      toast({ title: "Gagal", description: res?.error, variant: "destructive" });
    }
  };

  return (
    <div className="bg-background p-6 rounded-xl border border-border space-y-6">
      <h3 className="text-lg font-bold">Kelola Kategori</h3>

      {/* Form Tambah */}
      <form action={handleCreate} className="flex gap-2 items-end">
        <div className="space-y-2 flex-1">
          <Label>Nama Kategori Baru</Label>
          <Input name="name" placeholder="Misal: UI/UX Design" required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Tambah
        </Button>
      </form>

      {/* List Kategori */}
      <div className="space-y-2 max-h-75 overflow-y-auto pr-2">
        {initialCategories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-3 rounded-lg border bg-secondary/20">
            {editingId === cat.id ? (
              <div className="flex gap-2 flex-1 mr-2">
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
                <Button size="icon" onClick={() => handleUpdate(cat.id)}><Save className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}><X className="w-4 h-4" /></Button>
              </div>
            ) : (
              <>
                <span className="font-medium">{cat.name}</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => { setEditingId(cat.id); setEditName(cat.name); }}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {/* DeleteButton sudah aman karena kita fix server actionnya di bawah */}
                  <DeleteButton id={cat.id} action={deleteCategory} title="Hapus Kategori?" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}