import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, FolderOpen, Mail, Menu, X, Award, Wrench } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavItem {
  id: string;
  labelKey: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "hero", labelKey: "nav.home", icon: Home },
  { id: "about", labelKey: "nav.about", icon: User },
  { id: "experience", labelKey: "nav.experience", icon: Briefcase },
  { id: "projects", labelKey: "nav.projects", icon: FolderOpen },
  { id: "tools", labelKey: "nav.tools", icon: Wrench },
  { id: "certificates", labelKey: "nav.certificates", icon: Award },
  { id: "contact", labelKey: "nav.contact", icon: Mail },
];

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Kita set active section manual agar responsif instan saat klik
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  // --- LOGIC SCROLL SPY ---
  useEffect(() => {
    const handleScroll = () => {
      // Offset 40% dari tinggi layar.
      // Artinya, section baru dianggap "aktif" jika sudah masuk mendekati tengah layar.
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          // Cek apakah posisi scroll kita berada di dalam area section ini
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(item.id);
          }
        }
      }
    };

    // Jalankan saat load dan saat scroll
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop & Tablet Navbar - BOTTOM CENTER */}
      {/* Posisi sudah diperbaiki: bottom-10 (naik) dan ditengah */}
      <motion.nav
        className="fixed bottom-10 left-1/2 z-50 hidden sm:block"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-full px-2 py-2 shadow-2xl border border-white/10 backdrop-blur-md bg-black/20">
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative flex items-center gap-2 px-3 lg:px-4 py-2.5 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden lg:inline">{t(item.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navbar - BOTTOM RIGHT CORNER */}
      {/* Posisi sudah diperbaiki: bottom-10 (naik) dan dikanan (right-6) */}
      <motion.nav
        className="fixed bottom-10 right-6 z-50 sm:hidden"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="glass w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border border-white/10 bg-primary/80 backdrop-blur-md"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Mobile Menu - Drops up from bottom right */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="absolute bottom-full mb-4 right-0 glass rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
              initial={{ opacity: 0, y: 10, scale: 0.95, originX: 1, originY: 1 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-2 min-w-[160px]">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10"
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{t(item.labelKey)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default FloatingNavbar;