"use client";

import { useState } from "react";
import ThemeLanguageToggle from "@/components/ThemeLanguageToggle"; // IMPORT BARU
import FloatingNavbar from "@/components/FloatingNavbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ToolsSection from "@/components/sections/ToolsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      {/* Jika showIntro true, tampilkan HANYA animasi. Jika false, tampilkan website */}
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          <ThemeLanguageToggle /> {/* PASANG TOGGLE DISINI */}
          <FloatingNavbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ToolsSection />
            <ExperienceSection />
            <ProjectsSection />
            <CertificatesSection />
            <ContactSection />
          </main>
          <FooterSection />
        </>
      )}
    </div>
  );
}