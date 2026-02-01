"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  LogOut, 
  User,
  GraduationCap, // Icon Experience (Topi Wisuda)
  Languages      // Icon Bahasa (Huruf)
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // DAFTAR MENU ADMIN (Pastikan Experience & Languages ada di sini)
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Experiences", href: "/admin/experiences", icon: GraduationCap }, // <--- MENU BARU
    { name: "Certificates", href: "/admin/certificates", icon: FileText },
    { name: "Languages", href: "/admin/languages", icon: Languages },         // <--- MENU BARU
    { name: "Profile", href: "/admin/profile", icon: User },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar Desktop */}
      <aside className="w-64 border-r border-border bg-card hidden md:block fixed h-full z-50">
        <div className="p-6">
          <h2 className="text-2xl font-bold gradient-text mb-2">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Manage your portfolio</p>
        </div>
        
        <nav className="px-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground font-medium shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-4">
          <Button
            variant="outline"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-screen pb-20 md:pb-8">
        {children}
      </main>

      {/* Note: Kalau tampilan mobile belum ada, biasanya pakai Sheet/Drawer. 
          Tapi untuk Admin biasanya diakses di Desktop biar enak. */}
    </div>
  );
}