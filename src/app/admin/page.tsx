import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  FileText, 
  Award, 
  Plus, 
  ArrowUpRight, 
  LayoutDashboard,
  Clock,
  Code
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image"; // FIX: Import Image

// FIX: Pastikan halaman ini selalu fresh (tidak dicache statis)
export const dynamic = "force-dynamic";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 19) return "Selamat Sore";
  return "Selamat Malam";
}

const quotes = [
  "Code is like humor. When you have to explain it, it’s bad. – Cory House",
  "First, solve the problem. Then, write the code. – John Johnson",
  "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
  "Make it work, make it right, make it fast. – Kent Beck",
  "Simplicity is the soul of efficiency. – Austin Freeman"
];

export default async function AdminDashboard() {
  const [
    totalProjects,
    totalCategories,
    totalCertificates,
    recentProjects,
    profile
  ] = await Promise.all([
    prisma.project.count(),
    prisma.category.count(),
    prisma.certificate.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true }
    }),
    prisma.profile.findFirst()
  ]);

  // FIX: Random Logic diganti jadi Index berdasarkan Tanggal (Stabil)
  // Quote akan berganti setiap hari, bukan setiap refresh (Pure Function)
  const dayIndex = new Date().getDate() % quotes.length;
  const quoteOfTheDay = quotes[dayIndex];
  
  const greeting = getGreeting();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER & GREETING */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {greeting}, <span className="gradient-text">{profile?.name || "Admin"}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang kembali di panel kontrol portofolio Anda.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border">
          <Clock className="w-4 h-4" />
          {new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* QUOTE CARD */}
      {/* FIX: Warning Gradient & Unescaped Quotes */}
      <div className="bg-linear-to-r from-primary/10 via-secondary/10 to-background border border-primary/20 p-6 rounded-xl flex items-start gap-4">
        <div className="p-3 bg-primary/20 rounded-full text-primary">
          <Code className="w-6 h-6" />
        </div>
        <div>
          {/* FIX: Pakai &quot; untuk tanda kutip */}
          <p className="italic text-lg font-medium text-foreground/80">&quot;{quoteOfTheDay}&quot;</p>
          <p className="text-sm text-muted-foreground mt-2 font-bold">— Developer Wisdom</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Project */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">Project yang telah dibuat</p>
          </CardContent>
        </Card>

        {/* Total Kategori */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategori & Skill</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">Bidang keahlian</p>
          </CardContent>
        </Card>

        {/* Total Sertifikat */}
        <Card className="hover:border-primary/50 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sertifikat</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCertificates}</div>
            <p className="text-xs text-muted-foreground">Prestasi yang diraih</p>
          </CardContent>
        </Card>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid gap-8 md:grid-cols-7">
        
        {/* KOLOM KIRI: Recent Projects */}
        <Card className="md:col-span-4 h-full">
          <CardHeader>
            <CardTitle>Project Terbaru</CardTitle>
            <CardDescription>
              5 Project terakhir yang Anda tambahkan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Belum ada project.</div>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center font-bold text-primary text-xs overflow-hidden relative">
                         {/* FIX: Ganti img jadi Image Next.js */}
                         {project.imageUrl ? (
                           <Image 
                             src={project.imageUrl} 
                             alt={project.title} 
                             fill 
                             sizes="40px"
                             className="object-cover" 
                           />
                         ) : (
                           <span>IMG</span>
                         )}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{project.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{project.category.name}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                      {new Date(project.createdAt).toLocaleDateString("id-ID")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6">
              <Link href="/admin/projects">
                <Button variant="outline" className="w-full text-xs">
                  Lihat Semua Project <ArrowUpRight className="ml-2 w-3 h-3" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* KOLOM KANAN: Quick Actions */}
        <div className="md:col-span-3 space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Mau ngapain sekarang?</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Link href="/admin/projects/new">
                <Button className="w-full justify-start" variant="default">
                  <Plus className="mr-2 h-4 w-4" /> Tambah Project Baru
                </Button>
              </Link>
              <Link href="/admin/certificates/new">
                <Button className="w-full justify-start" variant="secondary">
                  <Award className="mr-2 h-4 w-4" /> Upload Sertifikat
                </Button>
              </Link>
              <Link href="/admin/profile">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Edit Profile / CV
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
             <CardHeader className="pb-2">
                <CardTitle className="text-sm text-primary font-bold">Status Profile</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-sm">Open to Work</span>
                </div>
                <p className="text-xs text-muted-foreground">
                    Profile Anda sedang aktif dan bisa dilihat oleh publik.
                </p>
             </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}