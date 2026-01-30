"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Code, Palette, Terminal, Layout, Database, Smartphone, Download } from "lucide-react";
import Image from "next/image";
import { Profile } from "@prisma/client"; // Import Tipe Data

// --- KOMPONEN KARTU FOTO (KODE ASLI ANDA) ---
const ProfileCard = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * 32.5;
    const mouseY = (e.clientY - rect.top) * 32.5;

    const rX = (mouseY / height - 32.5 / 2) * -1;
    const rY = mouseX / width - 32.5 / 2;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-full h-auto rounded-2xl bg-linear-to-br from-primary/30 to-accent/30 p-0.5 group"
    >
      <div
        style={{ transform: "translateZ(0px)" }}
        className="absolute inset-4 rounded-2xl bg-primary/20 blur-3xl group-hover:bg-primary/40 transition-colors duration-500"
      />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="relative h-auto w-full rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden"
      >
        <Image
          src="/foto.jpg"
          alt="Raditya Ananda Satria"
          width={500} 
          height={600} 
          className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
          priority 
        />
        
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

        <div className="absolute bottom-4 left-4 text-left">
          <h3 className="text-xl font-bold text-white mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            Raditya A.S.
          </h3>
          <p className="text-primary font-medium text-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            Fullstack Developer
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- ABOUT SECTION UTAMA ---
interface AboutSectionProps {
  profile?: Profile | null; // Terima Data Profile
}

const AboutSection = ({ profile }: AboutSectionProps) => {
  const { t, language } = useLanguage();

  const skillsData = [
    {
      icon: Code,
      name: "React & Next.js",
      desc: { en: "Modern React ecosystems.", id: "Ekosistem React modern." }
    },
    {
      icon: Terminal,
      name: "TypeScript",
      desc: { en: "Type-safe & scalable code.", id: "Kode aman & berskala." }
    },
    {
      icon: Layout,
      name: "Tailwind CSS",
      desc: { en: "Utility-first CSS styling.", id: "Styling CSS utility-first." }
    },
    {
      icon: Database,
      name: "Node.js & MySQL",
      desc: { en: "Robust backend services.", id: "Layanan backend tangguh." }
    },
    {
      icon: Palette,
      name: "Figma, Canva & UI/UX",
      desc: { en: "Intuitive user experiences.", id: "Pengalaman pengguna intuitif." }
    },
    {
      icon: Smartphone,
      name: "Responsive Web",
      desc: { en: "Perfect on all devices.", id: "Sempurna di semua perangkat." }
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("about.title")} <span className="gradient-text">{t("about.me")}</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("about.subtitle")}
            </p>
          </div>

          {/* BAGIAN ATAS: Foto (Kiri) & Story (Kanan) */}
          <div className="grid md:grid-cols-12 gap-12 items-start mb-20">
            
            {/* Kolom Foto */}
            <div className="md:col-span-4 lg:col-span-4">
              <ProfileCard />
            </div>

            {/* Kolom Story */}
            <div className="md:col-span-8 lg:col-span-8 space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full"></span>
                  {t("about.myStory")}
                </h3>
                <div className="prose dark:prose-invert text-muted-foreground leading-relaxed text-justify text-lg">
                  <p>{t("about.story1")}</p>
                  <p>{t("about.story2")}</p>
                  <p>{t("about.story3")}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="pt-6 border-t border-white/5">
                <h4 className="text-sm font-semibold mb-3 text-foreground">{t("about.languageSkills")}</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium flex items-center gap-1">
                    🇮🇩 {t("about.indonesian")} <span className="text-muted-foreground">({t("about.active")})</span>
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium flex items-center gap-1">
                    🇬🇧 {t("about.english")} <span className="text-muted-foreground">({t("about.passive")})</span>
                  </span>
                  <span className="px-3 py-1 bg-secondary rounded-full text-xs font-medium flex items-center gap-1">
                    🇰🇷 {t("about.korean")} <span className="text-muted-foreground">({t("about.passive")})</span>
                  </span>
                </div>
              </div>

              {/* Download CV Button (SUDAH DINAMIS DARI DB) */}
              {profile?.cvUrl && (
                <motion.a 
                  href={profile.cvUrl} // Link dari Database
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-primary/20 bg-primary/5 text-primary font-medium hover:bg-primary/10 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  {language === "id" ? "Unduh CV" : "Download CV"}
                </motion.a>
              )}
            </div>
          </div>

          {/* BAGIAN BAWAH: Skills */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2">
              <span className="w-8 h-1 bg-accent rounded-full"></span>
              {t("about.skills")}
              <span className="w-8 h-1 bg-accent rounded-full"></span>
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)] p-4 rounded-xl glass hover:bg-secondary/50 transition-colors border border-white/5 group flex flex-col items-center text-center md:items-start md:text-left"
                >
                  <div className="p-2 bg-primary/10 rounded-lg text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    <skill.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{skill.name}</h4>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {language === "id" ? skill.desc.id : skill.desc.en}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;