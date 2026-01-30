"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Experience } from "@prisma/client";

interface ExperienceSectionProps {
  experiences?: Experience[];
}

const ExperienceSection = ({ experiences = [] }: ExperienceSectionProps) => {
  const { t, language } = useLanguage();

  const education = experiences.filter(item => item.type === "education");
  const organization = experiences.filter(item => item.type === "organization");
  const work = experiences.filter(item => item.type === "work");

  const TimelineItem = ({ item, last }: { item: Experience; last?: boolean }) => (
    <div className="relative pl-8 md:pl-10 pb-12 last:pb-0">
      {!last && (
        <div className="absolute left-1.75 md:left-2.25 top-0 bottom-0 w-0.5 bg-border" />
      )}
      
      <div className="absolute left-0 top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-background bg-primary shadow-sm" />
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all group"
      >
        <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
          <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
            {language === 'id' ? item.roleId : item.roleEn}
          </h4>
          <span className="px-3 py-1 rounded-full bg-secondary/50 text-xs font-medium border border-border">
            {item.period}
          </span>
        </div>
        
        <p className="text-primary font-medium mb-2 flex items-center gap-2">
           {item.place}
        </p>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {language === 'id' ? item.descriptionId : item.descriptionEn}
        </p>
      </motion.div>
    </div>
  );

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container px-6">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("experience.title")} <span className="gradient-text">{t("experience.titleHighlight")}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500"><GraduationCap /></div>
              <h3 className="text-2xl font-bold">{t("experience.education")}</h3>
            </div>
            <div className="relative border-l-0">
               {education.map((item, i) => (
                 <TimelineItem key={item.id} item={item} last={i === education.length - 1} />
               ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500"><Users /></div>
              <h3 className="text-2xl font-bold">{t("experience.organization")}</h3>
            </div>
            <div className="relative">
               {organization.map((item, i) => (
                 <TimelineItem key={item.id} item={item} last={i === organization.length - 1} />
               ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500"><Briefcase /></div>
              <h3 className="text-2xl font-bold">
                 {language === 'id' ? "Pekerjaan" : "Work / Job"}
              </h3>
            </div>
            <div className="relative">
               {work.map((item, i) => (
                 <TimelineItem key={item.id} item={item} last={i === work.length - 1} />
               ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;