"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";

const ThemeLanguageToggle = () => {
  const { theme, setTheme } = useTheme(); 
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // FIX: Gunakan setTimeout agar update state tidak synchronous
    // Ini solusi paling aman untuk menghindari error ESLint "set-state-in-effect"
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const toggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    setLanguage(newLang);
  };

  const isDark = theme === "dark";

  return (
    <motion.div
      className="fixed top-4 right-4 z-50 flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <button
        onClick={toggleLanguage}
        className="glass flex items-center gap-2 px-3 py-2 rounded-full hover-glow transition-all duration-300 cursor-pointer"
      >
        <Globe className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground uppercase">{language}</span>
      </button>

      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="glass w-10 h-10 rounded-full flex items-center justify-center hover-glow transition-all duration-300 cursor-pointer"
      >
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -30, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 30, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-foreground" />
          ) : (
            <Sun className="w-4 h-4 text-foreground" />
          )}
        </motion.div>
      </button>
    </motion.div>
  );
};

export default ThemeLanguageToggle;