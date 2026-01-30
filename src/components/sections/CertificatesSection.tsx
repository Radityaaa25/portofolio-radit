"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
// FIX: Hapus import Image karena tidak dipakai

const CertificatesSection = () => {
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const certificates = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "Udemy",
      date: "2023",
      image: "/certificates/cert1.jpg",
      credentialUrl: "#"
    },
  ];

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="container px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("certificates.title")} <span className="gradient-text">{t("certificates.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("certificates.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              layoutId={`cert-${cert.id}`}
              onClick={() => setSelectedCert(cert.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-all border border-border/50 relative"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                 <div className="absolute inset-0 bg-secondary flex items-center justify-center text-muted-foreground">
                    <Award className="w-12 h-12 opacity-20" />
                 </div>
                 
                 {/* FIX: Ganti bg-gradient-to-t jadi bg-linear-to-t */}
                 <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-white font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      {t("certificates.viewCredential")} <ExternalLink className="w-4 h-4" />
                    </span>
                 </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>{cert.issuer}</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {cert.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCert !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                layoutId={`cert-${selectedCert}`}
                className="bg-background rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative aspect-16/10 bg-secondary flex items-center justify-center">
                   <Award className="w-20 h-20 text-muted-foreground/30" />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Full Stack Web Development</h3>
                  <p className="text-muted-foreground mb-6">Udemy • Issued 2023</p>
                  <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                    View Credential <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificatesSection;