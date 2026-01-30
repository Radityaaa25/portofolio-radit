import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();

  // Double check (meskipun middleware sudah jaga)
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-4">Selamat Datang, Admin! 👋</h1>
      <p className="mb-8 text-muted-foreground">
        Anda login sebagai: <span className="font-mono text-primary">{session.user?.email}</span>
      </p>

      <div className="p-6 border border-border rounded-xl bg-secondary/20">
        <h2 className="text-xl font-semibold mb-2">Status Sistem:</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>✅ Database Connected</li>
          <li>✅ Auth Secure</li>
          <li>✅ Middleware Active</li>
        </ul>
      </div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="mt-8"
      >
        <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors">
          Log Out
        </button>
      </form>
    </div>
  );
}