"use client";

import { useEffect, useState } from "react";
import { Fira_Code, Inter } from "next/font/google";
import { motion, useMotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/5 animate-pulse" />
  ),
});

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800", "900"],
});

export default function HeroSection({ lang }: { lang: string }) {
  const [reaperMode, setReaperMode] = useState(false);

  // --- HIGH-PERFORMANCE MOUSE TRACKING ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    mouseY.set(e.pageY);
  };

  useEffect(() => {
    const toggleReaper = () => setReaperMode((prev) => !prev);
    window.addEventListener("toggleReaperMode", toggleReaper);
    return () => window.removeEventListener("toggleReaperMode", toggleReaper);
  }, []);

  // --- STAGGERED 3D PRELOAD ---
  useEffect(() => {
    // Preload the main abstract scene.
    const preloadSplineAsset = async () => {
      try {
        await fetch(
          "https://prod.spline.design/eBDJuZuqvXUGsJan/scene.splinecode",
          { mode: "cors" },
        );
      } catch (error) {
        console.warn("Spline preloading skipped");
      }
    };

    // Preload the Reaper Easter Egg after 15 seconds.
    const reaperTimer = setTimeout(() => {
      fetch("https://prod.spline.design/0-YokRHnFzyrNMdY/scene.splinecode", {
        mode: "cors",
      }).catch(() => {});
    }, 15000);

    return () => {
      preloadSplineAsset();
      clearTimeout(reaperTimer);
    };
  }, []);

  const content = {
    en: {
      badge: "Status: Available for Work",
      headlineLine1: "SCALABLE",
      headlineLine2: "SYSTEMS",
      subhead:
        "ENGINEERING FULL-STACK MODERNIZATION, DATA GOVERNANCE, AND RESILIENT WEB ARCHITECTURES.",
      scroll: "SCROLL TO EXPLORE",
    },
    pt: {
      badge: "Status: Disponível para Projetos",
      headlineLine1: "SISTEMAS",
      headlineLine2: "ESCALÁVEIS",
      subhead:
        "ENGENHARIA FOCADA EM MODERNIZAÇÃO FULL-STACK, GOVERNANÇA DE DADOS E ARQUITETURAS RESILIENTES.",
      scroll: "ROLE PARA EXPLORAR",
    },
  };

  const dict = content[lang as keyof typeof content];

  return (
    <section
      onMouseMove={handleMouseMove}
      className={`relative h-screen w-full flex flex-col justify-between bg-background overflow-hidden ${inter.className} pt-32 pb-20 px-6 md:px-12 xl:px-20`}
    >
      {/* Background Gradients & Mouse Glow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Dynamic Mouse Tracker */}
        <motion.div
          className={`absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] will-change-transform ${reaperMode ? "bg-primary/40" : "bg-primary/30"}`}
          style={{
            x: mouseX,
            y: mouseY,
            // Offset by half the width/height to center the glow on the cursor
            marginLeft: "-250px",
            marginTop: "-250px",
          }}
        />

        {/* Static Ambient Blobs */}

        {/* Light Yellow - Top Left Rim */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-30%] left-[20%] w-[500px] h-[500px] rounded-full bg-yellow-400 blur-[150px] will-change-transform"
        />

        {/* Blue - Bottom Left Rim */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-5%] w-[600px] h-[600px] rounded-full bg-blue-500 blur-[200px] will-change-transform"
        />

        {/* Neon Pink - Bottom Right Rim */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-10%] right-[-20%] w-[800px] h-[800px] rounded-full bg-pink-700 blur-[150px] will-change-transform"
        />
      </div>

      {/* 3D SCENE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3.8, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full z-0 hidden lg:block pointer-events-none"
      >
        <Scene3D reaperMode={reaperMode} />
      </motion.div>

      {/* Text Grid Container */}
      <div className="relative z-10 w-full grid lg:grid-cols-12 gap-12 flex-1 pt-4 pointer-events-none">
        {/* Left: Raw Details Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6 self-start pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border w-max shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
              {dict.badge}
            </span>
          </div>

          <p className="text-sm md:text-base text-foreground/80 leading-loose max-w-xl tracking-wide mt-2 transition-colors duration-500">
            {dict.subhead}
          </p>
        </motion.div>
      </div>

      {/* BOTTOM HALF */}
      <div className="relative z-10 w-full flex justify-between items-end mt-auto pointer-events-none">
        {/* Bottom Left */}
        <h1 className="uppercase flex flex-col overflow-hidden pb-4">
          <motion.span
            initial={{
              y: "100%",
              opacity: 0,
              fontWeight: 200,
              scale: 1.05,
              letterSpacing: "0.03em",
            }}
            animate={{
              y: "0%",
              opacity: 1,
              fontWeight: 900,
              scale: 1,
              letterSpacing: "-0.05em",
            }}
            transition={{
              y: { duration: 0.8, delay: 3.6, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8, delay: 3.6, ease: "easeOut" },
              fontWeight: {
                duration: 0,
                delay: 4.4,
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
              letterSpacing: {
                duration: 0,
                delay: 4.4,
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
              scale: { duration: 0.3, delay: 4.4, ease: "backOut" },
            }}
            className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.9] text-foreground origin-left"
          >
            {dict.headlineLine1}
          </motion.span>

          <motion.span
            initial={{
              y: "100%",
              opacity: 0,
              fontWeight: 200,
              scale: 1.05,
              letterSpacing: "0.02em",
            }}
            animate={{
              y: "0%",
              opacity: 1,
              fontWeight: 900,
              scale: 1,
              letterSpacing: "-0.05em",
            }}
            transition={{
              y: { duration: 0.8, delay: 3.7, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.8, delay: 3.7, ease: "easeOut" },
              fontWeight: {
                duration: 0,
                delay: 4.5,
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
              letterSpacing: {
                duration: 0,
                delay: 4.5,
                type: "spring",
                stiffness: 300,
                damping: 15,
              },
              scale: { duration: 0.3, delay: 4.5, ease: "backOut" },
            }}
            className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.8] text-muted-foreground/60 ml-2 md:ml-12 lg:ml-24 mr-12 origin-left"
          >
            {dict.headlineLine2}
          </motion.span>
        </h1>

        {/* Bottom Right: Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 4.6 }}
          className="hidden lg:flex flex-col items-center gap-3 mb-2 hover:opacity-100 transition-opacity pointer-events-auto"
        >
          <span
            className={`text-[10px] tracking-[0.25em] text-foreground uppercase style={{ writingMode: 'vertical-rl' }} ${firaCode.className}`}
          >
            {dict.scroll}
          </span>
          <div className="w-px h-16 bg-border relative overflow-hidden">
            <div
              className={`absolute top-0 left-0 w-full h-full animate-[bounce_2s_infinite] ${reaperMode ? "bg-destructive" : "bg-foreground"}`}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
