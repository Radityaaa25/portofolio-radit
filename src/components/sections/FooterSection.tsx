"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Typewriter } from "@/components/Typewriter";

const FooterSection = () => {
  // Hapus 't' karena memang tidak dipakai di sini
  const { language } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerHobbies = [
    "main game 🎮",
    "ngoding 💻",
    "olahraga 🏀",
    "kulineran 🍜"
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/radityaaa25", label: "Github" },
    { icon: Linkedin, href: "https://linkedin.com/in/radityaaa", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/radityaaa", label: "Instagram" },
  ];

  return (
    <footer className="bg-secondary/20 border-t border-border/50 py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        
      <div className="container px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
            
            {/* Kolom Kiri: Brand & Hobi */}
            <div className="space-y-4">
                {/* FIX: Ganti bg-gradient-to-r jadi bg-linear-to-r */}
                <h3 className="text-2xl font-bold bg-linear-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Raditya A.S.
                </h3>
                
                <div className="text-muted-foreground flex flex-col md:flex-row items-center md:items-start gap-2 justify-center md:justify-start">
                    <span>
                        {language === 'id' ? "Suka banget sama:" : "Passionate about:"}
                    </span>
                    <Typewriter 
                        texts={footerHobbies}
                        className="text-foreground font-medium"
                        typingSpeed={100}
                        pauseTime={1500}
                    />
                </div>
            </div>

            {/* Kolom Tengah: Social Links */}
            <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                    <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className="p-3 bg-background border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-sm"
                        aria-label={social.label}
                    >
                        <social.icon className="w-5 h-5" />
                    </motion.a>
                ))}
            </div>

            {/* Kolom Kanan: Copyright */}
            <div className="text-muted-foreground text-sm flex flex-col items-center md:items-end gap-2">
                <p>© {currentYear} Raditya. All rights reserved.</p>
                <p className="flex items-center gap-1.5">
                    Dibuat dengan <Heart className="w-4 h-4 text-red-500 animate-pulse fill-red-500" /> pakai Next.js
                </p>
            </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterSection;