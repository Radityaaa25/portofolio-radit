import { useState, useRef, forwardRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Award, X, ExternalLink, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "January 2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
    credentialUrl: "#",
  },
  {
    id: 2,
    title: "React Developer Certification",
    issuer: "Meta",
    date: "December 2023",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    credentialUrl: "#",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    issuer: "Google",
    date: "November 2023",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60",
    credentialUrl: "#",
  },
  {
    id: 4,
    title: "JavaScript Algorithms",
    issuer: "freeCodeCamp",
    date: "October 2023",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60",
    credentialUrl: "#",
  },
];

const CertificatesSection = forwardRef<HTMLElement>((_, forwardedRef) => {
  const internalRef = useRef(null);
  const ref = forwardedRef || internalRef;
  const isInView = useInView(internalRef, { once: true, margin: "-100px" });
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const { t } = useLanguage();

  return (
    <section id="certificates" className="py-24 md:py-32 relative" ref={internalRef}>
      <div className="container px-6">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t("certificates.title")}</span> {t("certificates.titleHighlight")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("certificates.subtitle")}
            </p>
          </motion.div>

          {/* Certificates Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="glass rounded-2xl overflow-hidden hover-glow transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-primary" />
                        <span className="text-xs text-primary font-medium">{cert.issuer}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm mb-1 line-clamp-2">{cert.title}</h3>
                    <p className="text-muted-foreground text-xs">{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCertificate(null)}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-lg glass rounded-3xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div className="aspect-[16/10]">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm text-primary font-medium">{selectedCertificate.issuer}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {selectedCertificate.title}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                  <Calendar className="w-4 h-4" />
                  {selectedCertificate.date}
                </div>

                {selectedCertificate.credentialUrl && (
                  <a
                    href={selectedCertificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {t("certificates.viewCredential")}
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

CertificatesSection.displayName = "CertificatesSection";

export default CertificatesSection;
