import { motion } from "framer-motion";
import { GraduationCap, Users, Briefcase, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Tipe data untuk pengalaman
interface ExperienceItem {
  id: number;
  role: { en: string; id: string };
  place: string;
  period: string;
  description: { en: string; id: string };
}

const ExperienceSection = () => {
  const { t, language } = useLanguage();

  // --- BAGIAN DATA (SILAKAN DIEDIT) ---
  
  // 1. Data Pendidikan (Kiri)
  const educationData: ExperienceItem[] = [
    {
      id: 1,
      role: { en: "Bachelor of Information Systems", id: "S1 Sistem Informasi" },
      place: "University Name",
      period: "2021 - Present",
      description: { 
        en: "Focusing on Software Engineering and Web Development. GPA: 3.xx", 
        id: "Fokus pada Rekayasa Perangkat Lunak dan Pengembangan Web. IPK: 3.xx" 
      }
    },
    {
      id: 2,
      role: { en: "High School Diploma", id: "SMA Jurusan IPA" },
      place: "High School Name",
      period: "2018 - 2021",
      description: { 
        en: "Graduated with honors in Science major.", 
        id: "Lulus dengan predikat baik jurusan Ilmu Pengetahuan Alam." 
      }
    },
  ];

  // 2. Data Organisasi (Tengah)
  const organizationData: ExperienceItem[] = [
    {
      id: 1,
      role: { en: "Head of IT Division", id: "Kepala Divisi IT" },
      place: "Student Executive Board",
      period: "2023 - 2024",
      description: { 
        en: "Led a team of 5 to maintain campus website and manage digital assets.", 
        id: "Memimpin tim beranggotakan 5 orang untuk mengelola web kampus dan aset digital." 
      }
    },
    {
      id: 2,
      role: { en: "Active Member", id: "Anggota Aktif" },
      place: "Computer Club",
      period: "2022 - 2023",
      description: { 
        en: "Participated in various programming workshops and events.", 
        id: "Berpartisipasi dalam berbagai workshop pemrograman dan acara." 
      }
    },
  ];

  // 3. Data Pekerjaan / Work (Kanan)
  const workData: ExperienceItem[] = [
    {
      id: 1,
      role: { en: "Frontend Developer Intern", id: "Magang Frontend Developer" },
      place: "Tech Company A",
      period: "Jan 2024 - Apr 2024",
      description: { 
        en: "Developed responsive landing pages using React and Tailwind CSS.", 
        id: "Mengembangkan landing page responsif menggunakan React dan Tailwind CSS." 
      }
    },
    {
      id: 2,
      role: { en: "Freelance Web Developer", id: "Freelance Web Developer" },
      place: "Remote",
      period: "2023 - Present",
      description: { 
        en: "Building custom websites for small business clients.", 
        id: "Membangun website kustom untuk klien bisnis kecil." 
      }
    },
  ];

  // --- KOMPONEN CARD ---
  const ExperienceCard = ({ item }: { item: ExperienceItem }) => (
    <div className="relative pl-6 pb-6 border-l border-primary/20 last:pb-0">
      <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-4 border-background" />
      <div className="glass p-4 rounded-xl hover:bg-secondary/40 transition-colors border border-white/5">
        <h4 className="font-bold text-foreground text-lg">{language === "id" ? item.role.id : item.role.en}</h4>
        <div className="text-primary font-medium text-sm mb-2">{item.place}</div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.period}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {language === "id" ? item.description.id : item.description.en}
        </p>
      </div>
    </div>
  );

  return (
    <section id="experience" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("experience.title")} <span className="gradient-text">{t("experience.titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("experience.subtitle")}
            </p>
          </div>

          {/* 3 Columns Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            
            {/* Column 1: Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-primary/5 w-fit">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                  {language === "id" ? "Pendidikan" : "Education"}
                </h3>
              </div>
              <div className="space-y-2">
                {educationData.map((item) => (
                  <ExperienceCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Column 2: Organization */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-accent/5 w-fit">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                  {language === "id" ? "Organisasi" : "Organization"}
                </h3>
              </div>
              <div className="space-y-2">
                {organizationData.map((item) => (
                  <ExperienceCard key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Column 3: Work */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-blue-500/5 w-fit">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                  {language === "id" ? "Pekerjaan" : "Work"}
                </h3>
              </div>
              <div className="space-y-2">
                {workData.map((item) => (
                  <ExperienceCard key={item.id} item={item} />
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;