"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Category, Project } from "@prisma/client";

// Tipe gabungan
type ProjectWithCategory = Project & { category: Category };

interface ProjectsSectionProps {
  projects: ProjectWithCategory[];
  categories: Category[];
}

const ProjectsSection = ({ projects = [], categories = [] }: ProjectsSectionProps) => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category.name === activeCategory); // Pastikan ini match dengan nama di DB Category

  return (
    <section id="projects" className="py-20 relative bg-secondary/20">
      <div className="container px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("projects.title")} <span className="gradient-text">{t("projects.titleHighlight")}</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button onClick={() => setActiveCategory("All")} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === "All" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary border border-border"}`}>All</button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.name)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.name ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary border border-border"}`}>{cat.name}</button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all border border-border/50 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                {/* PAKAI imageUrl */}
                {project.imageUrl ? (
                  <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (<div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>)}
                
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  {/* PAKAI demoUrl */}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"><ExternalLink className="w-5 h-5" /></a>
                  )}
                  {/* PAKAI repoUrl */}
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-3 bg-black text-white rounded-full hover:scale-110 transition-transform"><Github className="w-5 h-5" /></a>
                  )}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                   {language === 'id' ? project.descriptionId : project.descriptionEn}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                  {/* PAKAI techStack */}
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-md bg-secondary text-primary font-medium">{tech}</span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">+{project.techStack.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;