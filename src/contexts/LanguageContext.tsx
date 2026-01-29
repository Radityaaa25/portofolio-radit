import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { en: "Home", id: "Beranda" },
  "nav.about": { en: "About", id: "Tentang" },
  "nav.projects": { en: "Projects", id: "Proyek" },
  "nav.contact": { en: "Contact", id: "Kontak" },
  "nav.experience": { en: "Experience", id: "Pengalaman" },
  "nav.tools": { en: "Tools", id: "Alat" },
  "nav.certificates": { en: "Certificates", id: "Sertifikat" },

  // Hero
  "hero.available": { en: "Available for Work", id: "Tersedia untuk Bekerja" },
  "hero.greeting": { en: "Hello, I'm", id: "Halo, Saya" },
  "hero.role": { en: "Information Systems Student", id: "Mahasiswa Sistem Informasi" },
  "hero.role2": { en: "Fullstack Web Developer", id: "Pengembang Web Fullstack" },
  "hero.cta1": { en: "Let's Talk", id: "Mari Bicara" },
  "hero.cta2": { en: "View Projects", id: "Lihat Proyek" },

  // About
  "about.title": { en: "About", id: "Tentang" },
  "about.me": { en: "Me", id: "Saya" },
  "about.subtitle": { en: "Passionate about creating digital experiences that make a difference", id: "Bersemangat menciptakan pengalaman digital yang membuat perbedaan" },
  "about.myStory": { en: "My Story", id: "Cerita Saya" },
  "about.story1": { en: "I'm a dedicated Information Systems student with a deep passion for technology and creative problem-solving. My journey in web development started with curiosity and has evolved into a commitment to crafting exceptional digital experiences.", id: "Saya adalah mahasiswa Sistem Informasi yang berdedikasi dengan minat mendalam pada teknologi dan pemecahan masalah kreatif. Perjalanan saya di pengembangan web dimulai dengan rasa ingin tahu dan berkembang menjadi komitmen untuk menciptakan pengalaman digital yang luar biasa." },
  "about.story2": { en: "As a Fullstack Developer, I bridge the gap between design and functionality, building applications that are not only visually appealing but also perform seamlessly. I believe in writing clean, maintainable code and staying updated with the latest technologies.", id: "Sebagai Pengembang Fullstack, saya menjembatani kesenjangan antara desain dan fungsionalitas, membangun aplikasi yang tidak hanya menarik secara visual tetapi juga berkinerja mulus. Saya percaya dalam menulis kode yang bersih, dapat dipelihara, dan mengikuti teknologi terbaru." },
  "about.story3": { en: "Beyond coding, I have a keen eye for design and photography, which helps me create user interfaces that truly resonate with users. I'm always eager to take on new challenges and collaborate on innovative projects.", id: "Di luar pengkodean, saya memiliki mata yang tajam untuk desain dan fotografi, yang membantu saya membuat antarmuka pengguna yang benar-benar beresonansi dengan pengguna. Saya selalu bersemangat untuk mengambil tantangan baru dan berkolaborasi pada proyek-proyek inovatif." },
  "about.downloadCV": { en: "Download CV", id: "Unduh CV" },
  "about.skills": { en: "Skills", id: "Keahlian" },
  "about.languageSkills": { en: "Language Skills", id: "Kemampuan Bahasa" },
  "about.indonesian": { en: "Indonesian", id: "Bahasa Indonesia" },
  "about.english": { en: "English", id: "Bahasa Inggris" },
  "about.korean": { en: "Korean", id: "Bahasa Korea" },
  "about.active": { en: "Active", id: "Aktif" },
  "about.passive": { en: "Passive", id: "Pasif" },

  // Experience
  "experience.title": { en: "My", id: "Pengalaman" },
  "experience.titleHighlight": { en: "Experience", id: "Saya" },
  "experience.subtitle": { en: "A journey through education, organizations, and professional work", id: "Perjalanan melalui pendidikan, organisasi, dan pekerjaan profesional" },
  "experience.education": { en: "education", id: "pendidikan" },
  "experience.organization": { en: "organization", id: "organisasi" },
  "experience.freelance": { en: "freelance", id: "freelance" },

  // Projects
  "projects.title": { en: "My", id: "Proyek" },
  "projects.titleHighlight": { en: "Projects", id: "Saya" },
  "projects.subtitle": { en: "A collection of my work across different domains", id: "Koleksi karya saya di berbagai domain" },
  "projects.all": { en: "All", id: "Semua" },
  "projects.web": { en: "Web / Coding", id: "Web / Koding" },
  "projects.design": { en: "UI / Design", id: "UI / Desain" },
  "projects.photo": { en: "Photography", id: "Fotografi" },
  "projects.video": { en: "Videography", id: "Videografi" },
  "projects.techStack": { en: "Tech Stack", id: "Teknologi" },
  "projects.liveDemo": { en: "Live Demo", id: "Demo Langsung" },

  // Tools
  "tools.title": { en: "Tools &", id: "Alat &" },
  "tools.titleHighlight": { en: "Technologies", id: "Teknologi" },
  "tools.subtitle": { en: "The technologies and tools I use to bring ideas to life", id: "Teknologi dan alat yang saya gunakan untuk mewujudkan ide" },

  // Certificates
  "certificates.title": { en: "Certificates", id: "Sertifikat" },
  "certificates.titleHighlight": { en: "& Awards", id: "& Penghargaan" },
  "certificates.subtitle": { en: "Professional certifications and achievements", id: "Sertifikasi profesional dan pencapaian" },
  "certificates.viewCredential": { en: "View Credential", id: "Lihat Kredensial" },

  // Contact
  "contact.title": { en: "Let's", id: "Mari" },
  "contact.titleHighlight": { en: "Work Together", id: "Bekerja Sama" },
  "contact.subtitle": { en: "Have a project in mind? I'd love to hear from you. Send me a message and I'll respond as soon as possible.", id: "Punya proyek dalam pikiran? Saya ingin mendengar dari Anda. Kirim pesan dan saya akan merespons sesegera mungkin." },
  "contact.yourName": { en: "Your Name", id: "Nama Anda" },
  "contact.emailAddress": { en: "Email Address", id: "Alamat Email" },
  "contact.message": { en: "Message", id: "Pesan" },
  "contact.messagePlaceholder": { en: "Tell me about your project...", id: "Ceritakan tentang proyek Anda..." },
  "contact.sendMessage": { en: "Send Message", id: "Kirim Pesan" },
  "contact.sending": { en: "Sending...", id: "Mengirim..." },
  "contact.getInTouch": { en: "Get in Touch", id: "Hubungi Saya" },
  "contact.getInTouchDesc": { en: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out through any of these channels.", id: "Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, atau kesempatan untuk menjadi bagian dari visi Anda. Jangan ragu untuk menghubungi melalui saluran ini." },
  "contact.availableForWork": { en: "Available for work", id: "Tersedia untuk bekerja" },
  "contact.openTo": { en: "Open to freelance & full-time opportunities", id: "Terbuka untuk freelance & peluang penuh waktu" },
  "contact.successMessage": { en: "Message sent successfully! I'll get back to you soon.", id: "Pesan berhasil terkirim! Saya akan segera menghubungi Anda." },

  // Footer
  "footer.madeWith": { en: "Made with", id: "Dibuat dengan" },
  "footer.inIndonesia": { en: "in Indonesia", id: "di Indonesia" },
  "footer.allRights": { en: "All rights reserved", id: "Hak cipta dilindungi" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
