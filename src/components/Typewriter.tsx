"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export const Typewriter = ({ 
  texts, 
  className = "", 
  typingSpeed = 150, 
  deletingSpeed = 100,
  pauseTime = 2000 
}: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeedState, setTypingSpeedState] = useState(typingSpeed);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const i = loopNum % texts.length;
      const fullText = texts[i];

      setDisplayedText(prev => 
        isDeleting 
          ? fullText.substring(0, prev.length - 1)
          : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeedState(isDeleting ? deletingSpeed : typingSpeed);

      if (!isDeleting && displayedText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), pauseTime);
      } 
      else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleType, 500);
      } 
      else {
        timer = setTimeout(handleType, typingSpeedState);
      }
    };

    timer = setTimeout(handleType, typingSpeedState);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseTime, typingSpeedState]);

  return (
    <span className={`${className} inline-flex items-center`}>
      <span>{displayedText}</span>
      
      {/* FIX: Ganti w-[2px] jadi w-0.5 */}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="ml-1 w-0.5 h-[1em] bg-primary inline-block align-middle"
      />
    </span>
  );
};