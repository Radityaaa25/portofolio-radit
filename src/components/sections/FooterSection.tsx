import { Github, Instagram, Mail } from "lucide-react";

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative overflow-hidden pb-32">
      <div className="container px-6 relative z-10">
        <div className="glass rounded-3xl p-8 md:p-10 border border-white/10">
          {/* Flex Container: Mobile = Column (Tumpuk), Desktop = Row (Baris) */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
            
            {/* BAGIAN KIRI: Nama & Copyright */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 order-2 md:order-1 w-full md:w-auto">
              <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Raditya Ananda Satria
              </h3>
              <p className="text-muted-foreground font-medium text-lg">
                Fullstack Web Developer
              </p>
              <p className="text-sm text-muted-foreground/60 pt-2">
                &copy; {currentYear} Raditya Ananda Satria. All rights reserved.
              </p>
            </div>

            {/* BAGIAN KANAN: Social Icons */}
            <div className="flex items-center gap-4 order-1 md:order-2">
              <a
                href="https://github.com/Radityaaa25" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              
              {/* REVISI: Mengganti LinkedIn menjadi Instagram */}
              <a
                href="https://www.instagram.com/rdityaas?igsh=MWVjeTcwMGhwM3VuaQ%3D%3D&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                // Warna hover diganti jadi khas Instagram (#E1306C)
                className="p-3 glass rounded-full hover:bg-[#E1306C] hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="mailto:radityaanandasatria@gmail.com" 
                className="p-3 glass rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;