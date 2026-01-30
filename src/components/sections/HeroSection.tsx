"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mouse, FolderOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Profile } from "@prisma/client";
import { Typewriter } from "@/components/Typewriter";

interface HeroSectionProps {
  profile: Profile | null;
}

const HeroSection = ({ profile }: HeroSectionProps) => {
  const { t, language } = useLanguage();

  const rawString = language === "id" 
    ? (profile?.typewriterId || "Pengembang Web, Desainer") 
    : (profile?.typewriterEn || "Web Developer, Designer");

  // FIX: Pastikan array string bersih
  const typewriterArray = rawString.split(",").map((s: string) => s.trim());

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-0 relative overflow-hidden">
      
      <div className="absolute inset-0 w-full h-full bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-primary/20 blur-[120px] rounded-full opacity-20 -z-10" />

      <div className="container px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-6"
          >
            <div className={`px-4 py-1.5 rounded-full border flex items-center gap-2 text-sm font-medium ${
              profile?.isOpenToWork 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                : "bg-red-500/10 border-red-500/20 text-red-500"
            }`}>
              <div className={`w-2 h-2 rounded-full ${profile?.isOpenToWork ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
              {profile?.isOpenToWork 
                ? t("hero.available") 
                : (language === "id" ? "Sedang Sibuk" : "Currently Busy")
              }
            </div>
          </motion.div>

          {/* Nama Besar */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            {t("hero.greeting")} <br />
            <span className="bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {profile?.name || "Raditya"}
            </span>
          </motion.h1>

          {/* Role & Typewriter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto flex flex-col md:flex-row justify-center items-center gap-2"
          >
            <span className="whitespace-nowrap">
                {language === 'id' ? (profile?.roleId || "Mahasiswa") : (profile?.roleEn || "Student")} |
            </span>
            
            <Typewriter 
              texts={typewriterArray} 
              className="text-primary font-semibold min-w-36 text-left"
              typingSpeed={100}
              deletingSpeed={50}
              pauseTime={1500}
            />
          </motion.div>

          {/* Buttons CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#contact"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:shadow-lg hover:shadow-primary/20 flex items-center gap-2"
            >
              {t("hero.cta1")} <ArrowRight className="w-4 h-4" />
            </a>
            
            <a 
              href="#projects"
              className="px-8 py-4 bg-secondary/50 backdrop-blur-sm border border-border rounded-full font-medium hover:bg-secondary transition-all flex items-center gap-2 group"
            >
              {language === "id" ? "Lihat Proyek" : "View Projects"}
              <FolderOpen className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }} 
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          className="flex flex-col items-center gap-3" 
        >
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground/70">Scroll</span>
          <Mouse className="w-10 h-10 text-muted-foreground" />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;