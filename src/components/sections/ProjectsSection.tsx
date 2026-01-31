"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2 } from "lucide-react"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects, getCategories } from "@/actions/projects";

// Definisi tipe data manual untuk komponen client
type Category = {
  id: string;
  name: string;
};

type Project = {
  id: string;
  title: string;
  descriptionId: string;
  descriptionEn: string;
  techStack: string[];
  imageUrl: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
  categoryId: string;
  category: Category;
};

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          getProjects(),
          getCategories(),
        ]);
        
        // FIX: Hapus @ts-ignore dan gunakan casting tipe yang aman
        setProjects(projectsData as unknown as Project[]);
        setCategories(categoriesData);
        
      } catch (error) {
        console.error("Gagal ambil data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category.name === activeCategory);

  return (
    <section id="projects" className="py-20 relative bg-secondary/20">
      <div className="container px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("projects.title")} <span className="gradient-text">{t("projects.titleHighlight")}</span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button 
                onClick={() => setActiveCategory("All")} 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === "All" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary border border-border"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveCategory(cat.name)} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.name ? "bg-primary text-primary-foreground" : "bg-background hover:bg-secondary border border-border"}`}
                >
                  {cat.name}
                </button>
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
                    {project.imageUrl ? (
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                    )}
                    
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="p-3 bg-black text-white rounded-full hover:scale-110 transition-transform"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* FIX: Ganti flex-grow jadi grow atau flex-1 biar rapi */}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 grow">
                      {language === 'id' ? project.descriptionId : project.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-md bg-secondary text-primary font-medium">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;