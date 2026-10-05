"use client";

import { Fira_Code, Inter } from "next/font/google";
import { motion } from "framer-motion";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800", "900"],
});

export default function HeroSection({ lang }: { lang: string }) {
  const content = {
    en: {
      badge: "Status: Available for Work",
      headlineLine1: "SCALABLE",
      headlineLine2: "SYSTEMS",
      subhead:
        "ENGINEERING FULL-STACK MODERNIZATION, DATA GOVERNANCE, AND RESILIENT WEB ARCHITECTURES.",
      scroll: "SCROLL TO EXPLORE",
      mockupTitle: "Data Sync Pipeline",
      mockupSub: "ETL Worker",
    },
    pt: {
      badge: "Status: Disponível para Projetos",
      headlineLine1: "SISTEMAS",
      headlineLine2: "ESCALÁVEIS",
      subhead:
        "ENGENHARIA FOCADA EM MODERNIZAÇÃO FULL-STACK, GOVERNANÇA DE DADOS E ARQUITETURAS RESILIENTES.",
      scroll: "ROLE PARA EXPLORAR",
      mockupTitle: "Pipeline de Sincronização",
      mockupSub: "Worker ETL",
    },
  };

  const dict = content[lang as keyof typeof content];

  return (
    <section
      className={`relative h-screen w-full flex flex-col justify-between bg-background overflow-hidden ${inter.className} pt-32 pb-20 px-6 md:px-12 xl:px-20`}
    >
      {/* Premium SaaS Background Gradients (Pulsing slowly) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[20%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[0%] left-[0%] w-[800px] h-[800px] rounded-full bg-accent/20 blur-[150px]"
        />
      </div>

      <div className="relative z-10 w-full grid lg:grid-cols-12 gap-12 flex-1 pt-4">
        {/* Left/Center: Raw Details Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col gap-6 self-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border w-max shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-foreground text-xs font-semibold tracking-wide uppercase">
              {dict.badge}
            </span>
          </div>

          <p className="text-sm md:text-base text-foreground/80 leading-loose max-w-xl tracking-wide mt-2">
            {dict.subhead}
          </p>
        </motion.div>

        {/* Right/Center: Floating SaaS Mockups */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 relative hidden lg:flex justify-end lg:-mr-8 self-center lg:mt-24 perspective-1000"
        >
          <div className="relative w-full max-w-[320px] h-[300px] origin-right scale-95 xl:scale-100">
            {/* Main Dashboard Panel */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="
                absolute top-[-2.5rem] right-12 md:right-24 lg:right-32 
                w-[380px] lg:w-[420px] bg-card/95 
                backdrop-blur-sm border border-border 
                rounded-xl shadow-2xl p-4 z-10 
                transition-transform duration-700 hover:scale-[1.02]
            "
            >
              <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20 flex justify-center items-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground text-sm font-semibold">
                      {dict.mockupTitle}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {dict.mockupSub}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-accent text-xs bg-accent/10 px-2 py-1 rounded ${firaCode.className}`}
                >
                  Active
                </span>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: "Data Integrity Check",
                    value: "Verified",
                    status: "accent",
                  },
                  {
                    label: "Legacy DB Connection",
                    value: "Secure",
                    status: "accent",
                  },
                  {
                    label: "Next Sync Cycle",
                    value: "T-minus 5m",
                    status: "muted-foreground",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-sm"
                  >
                    <span className="text-muted-foreground text-sm font-medium">
                      {item.label}
                    </span>
                    <span
                      className={`text-${item.status} ${firaCode.className} text-xs`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Code Snippet Card */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="
                absolute bottom-[-2rem] left-[-3rem] xl:left-[-2rem] 
                w-[280px] bg-[#0d1117] border border-border 
                rounded-xl shadow-2xl p-4 z-20 opacity-95 
                transition-transform duration-500 hover:scale-[1.02]"
            >
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-warning/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
              </div>
              <pre
                className={`text-[10px] leading-relaxed text-slate-300 ${firaCode.className} overflow-hidden`}
              >
                <code>
                  <span className="text-pink-400">async function</span>{" "}
                  <span className="text-blue-300">syncData</span>() {"{"}
                  <br />
                  &nbsp;&nbsp;<span className="text-pink-400">try</span> {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-pink-400">await</span>{" "}
                  processBatch(payload);
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;logger.info(
                  <span className="text-green-300">'Sync OK'</span>);
                  <br />
                  &nbsp;&nbsp;{"}"} <span className="text-pink-400">catch</span>{" "}
                  (err) {"{"}
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;handleException(err);
                  <br />
                  &nbsp;&nbsp;{"}"}
                  <br />
                  {"}"}
                </code>
              </pre>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM HALF: Anchored Massive Title & Scroll Indicator */}
      <div className="relative z-10 w-full flex justify-between items-end mt-auto">
        {/* Bottom Left: Mechanical Snapping Typography Effect */}
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
              // Duration 0 forces an instant CSS update, eliminating layout thrashing
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
          className="hidden lg:flex flex-col items-center gap-3 mb-2 hover:opacity-100 transition-opacity"
        >
          <span
            className={`text-[10px] tracking-[0.25em] text-foreground uppercase style={{ writingMode: 'vertical-rl' }} ${firaCode.className}`}
          >
            {dict.scroll}
          </span>
          <div className="w-px h-16 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-foreground animate-[bounce_2s_infinite]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
