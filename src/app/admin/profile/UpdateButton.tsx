"use client";

import { Save, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export default function UpdateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-lg"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </button>
  );
}