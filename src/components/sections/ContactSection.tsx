"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Instagram, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactLinks = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "radityasatria@gmail.com",
      href: "mailto:radityasatria@gmail.com",
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      value: "@radityaaa25",
      href: "https://instagram.com/radityaaa25",
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      value: "radityaaa25",
      href: "https://github.com/radityaaa25",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Jakarta, Indonesia",
      href: "https://maps.google.com/?q=Cipinang+Bali,+Jakarta+Timur",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
    alert(t("contact.successMessage"));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            {t("contact.title")} {t("contact.titleHighlight")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* KIRI: Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full" 
          >
            <div className="glass p-8 rounded-3xl h-full flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{t("contact.getInTouch")}</h3>
                <p className="text-muted-foreground">
                  {t("contact.getInTouchDesc")}
                </p>
              </div>

              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {contactLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-background/40 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0">
                      {link.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0"> 
                      <p className="text-sm text-muted-foreground">{link.label}</p>
                      <p className="font-medium text-foreground truncate">{link.value}</p>
                    </div>

                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* KANAN: Form Input */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-full" 
          >
            {/* PERBAIKAN: Mengganti 'space-y-6' dengan 'gap-6' agar jarak antar elemen lebih konsisten */}
            <form onSubmit={handleSubmit} className="glass p-8 rounded-3xl h-full flex flex-col gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">
                  {t("contact.yourName")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("contact.yourName")}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">
                  {t("contact.emailAddress")}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t("contact.emailAddress")}
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>

              {/* Flex Grow: Mengisi sisa ruang */}
              <div className="space-y-2 grow flex flex-col"> 
                <label className="text-sm font-medium ml-1">
                  {t("contact.message")}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t("contact.messagePlaceholder")}
                  // PERBAIKAN: Menghapus h-full dan membiarkan flex-grow di parent yang mengatur tinggi
                  className="w-full px-4 py-3 rounded-xl bg-background/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none grow min-h-30"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>

              {/* Tombol Send: mt-auto memastikan dia di bawah, tapi gap-6 akan menjaga jarak minimal */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all hover-glow flex items-center justify-center gap-2 mt-auto"
              >
                {isSubmitting ? (
                  t("contact.sending")
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {t("contact.sendMessage")}
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;