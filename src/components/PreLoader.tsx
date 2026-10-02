"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter, Fira_Code } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["800", "900"] });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400"] });

export default function Preloader({ lang }: { lang: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isShortened, setIsShortened] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const dict = {
    en: { conn: "Establishing Connection", granted: "Access Granted" },
    pt: { conn: "Estabelecendo Conexão", granted: "Acesso Concedido" }
  }[lang as "en" | "pt"];

  useEffect(() => {
    // Lock scrolling while the preloader is active
    document.body.style.overflow = "hidden";
    
    // Timeline Choreography
    const morphTimer = setTimeout(() => setIsShortened(true), 1400);
    const grantTimer = setTimeout(() => setIsGranted(true), 2000);
    const exitTimer = setTimeout(() => setIsExiting(true), 3000);
    const unmountTimer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3400);

    return () => {
      clearTimeout(morphTimer);
      clearTimeout(grantTimer);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Smooth crossfade reveal to the Hero section instead of sliding the whole screen up
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <div className="flex flex-col items-center">
            
            {/* The Text Masking, Morphing & Exiting Container */}
            <div className="overflow-hidden pb-2 flex items-center justify-center">
              <motion.div
                initial={{ y: "100%" }}
                // Shoots up when exiting, otherwise sets to 0
                animate={{ 
                  y: isExiting ? "-150%" : "0%", 
                  opacity: isExiting ? 0 : 1 
                }}
                transition={{ 
                  duration: isExiting ? 0.4 : 0.8, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isExiting ? 0 : 0.2 
                }}
                className={`text-5xl md:text-7xl font-black text-foreground tracking-tighter flex items-center ${inter.className}`}
              >
                <span>M</span>
                
                {/* Collapsing "ateus " */}
                <motion.span
                  initial={false}
                  animate={{ 
                    width: isShortened ? 0 : "auto", 
                    opacity: isShortened ? 0 : 1 
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden whitespace-nowrap inline-block"
                >
                  ateus&nbsp;
                </motion.span>
                
                <span>D</span>
                <span>i</span>
                
                {/* Crossfading "á" to "a" */}
                <div className="relative grid place-items-center">
                  <motion.span
                    initial={false}
                    animate={{ opacity: isShortened ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    á
                  </motion.span>
                  <motion.span
                    initial={false}
                    animate={{ opacity: isShortened ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                  >
                    a
                  </motion.span>
                </div>
                
                <span>lis</span>
                <span className="text-accent">.</span>
              </motion.div>
            </div>
            
            {/* Terminal Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isExiting ? 0 : 1 }}
              transition={{ duration: 0.3, delay: isExiting ? 0 : 1 }}
              className={`mt-6 flex items-center gap-3 text-xs tracking-widest uppercase transition-colors duration-300 ${firaCode.className} ${isGranted ? "text-accent" : "text-muted-foreground"}`}
            >
              <span className={`w-2 h-2 rounded-full bg-accent ${!isGranted && "animate-pulse"}`} />
              {isGranted ? dict?.granted : dict?.conn}
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}