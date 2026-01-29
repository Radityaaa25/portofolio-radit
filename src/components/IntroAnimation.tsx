"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const words = [
    "Hello",        
    "Halo",         
    "Bonjour",      
    "안녕하세요",    
    "こんにちは",     
    "FINAL_SCREEN"  
  ];

  useEffect(() => {
    // --- PENGATURAN DURASI (Total Waktu per Kata) ---
    let duration;
    
    if (currentIndex === 0) {
      duration = 800; // "Hello" Cepat (0.8s)
    } else if (currentIndex === words.length - 1) {
      duration = 2500; // Welcome Screen (2.5s)
    } else {
      duration = 1300; // Sapaan lain (1.3s)
    }

    const timer = setTimeout(() => {
      if (currentIndex === words.length - 1) {
        onComplete();
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete, words.length]);

  // FIX TYPE ERROR: Tambahkan ": Variants" disini
  const textVariants: Variants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(12px)", // Mulai dari sangat buram
      scale: 0.9,
      y: 10
    },
    visible: { 
      opacity: 1, 
      filter: "blur(0px)",  // MENJADI JELAS (Fokus)
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      filter: "blur(12px)", // Kembali buram saat keluar
      scale: 1.1, 
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-4">
      <AnimatePresence mode="wait">
        {words[currentIndex] === "FINAL_SCREEN" ? (
          // --- WELCOME SCREEN ---
          <motion.div
            key="welcome"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-medium mb-2">
              Welcome to Portfolio
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-8">
              Raditya
            </h1>
            
            {/* Loading Dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          // --- TEKS SAPAAN ---
          <motion.h1
            key={words[currentIndex]}
            variants={textVariants} // Error TS hilang karena sudah ditipe-kan
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-5xl md:text-7xl font-bold gradient-text pb-2 text-center"
          >
            {words[currentIndex]}
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IntroAnimation;