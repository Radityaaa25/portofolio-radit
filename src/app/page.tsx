"use client";

import { useState, useEffect } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import ThemeLanguageToggle from "@/components/ThemeLanguageToggle";
import FloatingNavbar from "@/components/FloatingNavbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ToolsSection from "@/components/sections/ToolsSection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import { getPortfolioData, type PortfolioData } from "@/actions/portofolio";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPortfolioData();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="bg-background min-h-screen relative selection:bg-primary/30">
      {/* Intro Animation Jalan Normal */}
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

      {/* Konten Utama Muncul Setelah Intro */}
      {!showIntro && (
        <>
          <FloatingNavbar />
          <ThemeLanguageToggle />
          
          {/* Kirim Data Profile ke Hero (PENTING) */}
          <HeroSection profile={data?.profile || null} />
          
          {/* Kirim Data Profile ke About */}
          <AboutSection profile={data?.profile || null} />
          
          <ExperienceSection experiences={data?.experiences || []} />
          <ProjectsSection projects={data?.projects || []} categories={data?.categories || []} />
          <ToolsSection />
          <CertificatesSection />
          <ContactSection />
          <FooterSection />
        </>
      )}
    </main>
  );
}