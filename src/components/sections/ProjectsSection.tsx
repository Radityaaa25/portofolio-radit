"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Loader2, X, Eye } from "lucide-react"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProjects, getCategories } from "@/actions/projects";
import {
  Dialog,
  DialogContent,
  DialogTitle, 
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// --- TIPE DATA ---
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
  
  // State Data
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // State Popup
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsData, categoriesData] = await Promise.all([
          getProjects(),
          getCategories(),
        ]);
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
          <p className="text-muted-foreground text-sm">
            {language === 'id' ? "Klik kartu untuk detail lebih lengkap." : "Click card for more details."}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* --- FILTER BUTTONS --- */}
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

            {/* --- PROJECTS GRID --- */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedProject(project)} 
                  className="glass rounded-2xl overflow-hidden group hover:border-primary/50 transition-all border border-border/50 flex flex-col cursor-pointer hover:shadow-2xl hover:-translate-y-1"
                >
                  {/* Image Area */}
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
                    
                    {/* HOVER OVERLAY (BUTTONS) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                      
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>{language === 'id' ? "Lihat Project" : "View Project"}</span>
                        </a>
                      )}

                      {project.repoUrl && (
                        <a 
                          href={project.repoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()} 
                          className="flex items-center gap-2 px-6 py-2 bg-black/80 text-white font-medium rounded-full border border-white/20 hover:scale-105 transition-transform hover:bg-black"
                        >
                          <Github className="w-4 h-4" />
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col grow">
                    <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 grow">
                      {language === 'id' ? project.descriptionId : project.descriptionEn}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border/50">
                      {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-md bg-secondary text-primary font-medium border border-border">
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

        {/* ========================================================= */}
        {/* POP-UP: FRAMER MOTION CENTER POP (NO SLIDE) */}
        {/* ========================================================= */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          {/* TRICK: Wadah DialogContent dibuat transparan, tanpa border/shadow, dan animasi CSS dimatikan (!animate-none).
            Posisinya tetap di tengah (left-1/2 top-1/2 -translate...).
            Isinya kita animasiin pake motion.div biar 100% smooth.
          */}
          <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl p-0 border-none bg-transparent shadow-none animate-none!">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // Custom bezier curve (Pop Effect)
              className="bg-background border border-border shadow-2xl sm:rounded-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              
              {/* 1. Header Image */}
              <div className="relative w-full aspect-video bg-secondary shrink-0 group">
                {selectedProject?.imageUrl ? (
                  <Image 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Preview</div>
                )}
                {/* Close Button Manual */}
                <DialogClose className="absolute top-3 right-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-sm z-50 ring-0 focus:ring-0 outline-none">
                  <X className="w-4 h-4" />
                </DialogClose>
              </div>

              {/* 2. Content Body */}
              <div className="flex flex-col flex-1 overflow-hidden">
                <ScrollArea className="flex-1">
                  <div className="p-5 space-y-5">
                    
                    {/* Title & Badge */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                            {selectedProject?.category.name}
                        </Badge>
                      </div>
                      <DialogTitle className="text-xl md:text-2xl font-bold">
                        {selectedProject?.title}
                      </DialogTitle>
                    </div>

                    <Separator />

                    {/* Tech Stack */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                          {selectedProject?.techStack.map((tech, i) => (
                              <Badge key={i} variant="secondary" className="px-2 py-0.5 text-xs font-normal border-border">
                                  {tech}
                              </Badge>
                          ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {language === 'id' ? "Tentang Project" : "About Project"}
                      </h4>
                      <p className="text-foreground leading-relaxed text-sm md:text-base whitespace-pre-line">
                          {language === 'id' ? selectedProject?.descriptionId : selectedProject?.descriptionEn}
                      </p>
                    </div>
                  </div>
                </ScrollArea>

                {/* 3. Footer Actions */}
                <div className="p-5 border-t border-border bg-secondary/5 flex gap-3 justify-end items-center shrink-0">
                    {selectedProject?.repoUrl && (
                        <Button asChild variant="outline" size="sm" className="gap-2">
                            <a href={selectedProject.repoUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4" />
                                Source Code
                            </a>
                        </Button>
                    )}

                    {selectedProject?.demoUrl ? (
                        <Button asChild size="sm" className="gap-2 font-bold shadow-sm">
                            <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-4 h-4" />
                                {language === 'id' ? "Lihat Project" : "View Project"}
                            </a>
                        </Button>
                    ) : null}
                </div>
              </div>

            </motion.div>
          </DialogContent>
        </Dialog>

      </div>
    </section>
  );
};

export default ProjectsSection;