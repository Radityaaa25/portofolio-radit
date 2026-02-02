"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// UPDATE DI SINI: Tambahkan 'null' ke dalam tipe data yang diterima
type ActionReturn = { success?: boolean; error?: string } | void | undefined | null;

interface DeleteButtonProps {
  id: string;
  action: (id: string) => Promise<ActionReturn>;
  title?: string;
  description?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function DeleteButton({ 
  id, 
  action, 
  title = "Apakah anda yakin?", 
  description = "Data yang dihapus tidak bisa dikembalikan.",
  className,
  variant = "destructive"
}: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await action(id);
      
      // Handle jika res adalah null (dianggap error atau silent fail)
      if (res === null) {
         toast({ title: "Gagal!", description: "Gagal menghapus data.", variant: "destructive" });
      } 
      // Handle jika ada error string
      else if (typeof res === 'object' && res?.error) {
        toast({ title: "Gagal!", description: res.error, variant: "destructive" });
      } 
      // Default: Sukses
      else {
        toast({ title: "Berhasil!", description: "Data berhasil dihapus.", className: "bg-green-500 text-white" });
      }
    } catch (error) {
      console.error("Delete action error:", error);
      toast({ title: "Error", description: "Terjadi kesalahan sistem.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size="sm" className={className} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={(e) => { e.preventDefault(); handleDelete(); }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {loading ? "Menghapus..." : "Ya, Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}