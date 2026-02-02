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
  GraduationCap, 
  Languages,
  Menu 
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

// --- KOMPONEN SIDEBAR (DIPISAH KE LUAR) ---
const SidebarContent = ({ pathname }: { pathname: string }) => {
  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Experiences", href: "/admin/experiences", icon: GraduationCap },
    { name: "Certificates", href: "/admin/certificates", icon: FileText },
    { name: "Languages", href: "/admin/languages", icon: Languages },
    { name: "Profile", href: "/admin/profile", icon: User },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold gradient-text mb-2">Admin Panel</h2>
        <p className="text-xs text-muted-foreground">Manage your portfolio</p>
      </div>
      
      <nav className="px-4 space-y-2 mt-4 flex-1">
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

      <div className="p-4 mt-auto">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

// --- LAYOUT UTAMA ---
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Logic: Halaman Login Fullscreen
  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-background w-full">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      
      {/* 1. SIDEBAR DESKTOP */}
      <aside className="w-64 border-r border-border bg-card hidden md:block fixed h-full z-50">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* 2. HEADER MOBILE */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 flex items-center px-4 justify-between">
        <span className="font-bold gradient-text">Admin Panel</span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-card border-r border-border">
             <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
             <SidebarContent pathname={pathname} />
          </SheetContent>
        </Sheet>
      </div>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 min-h-screen pt-20 md:pt-8 pb-20 md:pb-8">
        {children}
      </main>
    </div>
  );
}