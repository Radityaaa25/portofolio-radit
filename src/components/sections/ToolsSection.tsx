"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { useState } from "react";

const ToolsSection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const tools = [
    // Languages
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    
    // Frameworks & Libs
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    
    // Database
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
    { name: "Prisma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" },
    
    // Design
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    
    // --- FILE LOKAL (PASTI MUNCUL) ---
    // Pastikan file ada di folder: public/icons/canva.png
    { name: "Canva", icon: "/icons/canva.png" },
    
    // Pastikan file ada di folder: public/icons/capcut.png
    { name: "CapCut", icon: "/icons/capcut.png" },
    // --------------------------------
    
    // Tools
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
    { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  ];

  return (
    <section id="tools" className="py-20 relative">
       <div className="container px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("tools.title")} <span className="gradient-text">{t("tools.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("tools.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {tools.map((tool, index) => {
            const isActive = activeIndex === index;

            return (
                <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setActiveIndex(isActive ? null : index)}
                className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-3 border border-border/50 hover:border-primary/50 transition-colors group aspect-square cursor-pointer"
                >
                <div className={`
                    relative w-12 h-12 transition-all duration-300 filter 
                    ${isActive 
                        ? "grayscale-0 opacity-100 scale-110" 
                        : "grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100"
                    }
                `}>
                    <Image 
                    src={tool.icon} 
                    alt={tool.name} 
                    fill 
                    className="object-contain"
                    // unoptimized={true} saya biarkan agar link Devicon tetap aman tanpa config
                    unoptimized={true} 
                    />
                </div>
                
                <span className={`
                    text-sm font-medium transition-colors text-center
                    ${isActive 
                        ? "text-foreground font-bold"
                        : "text-muted-foreground group-hover:text-foreground"
                    }
                `}>
                    {tool.name}
                </span>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;