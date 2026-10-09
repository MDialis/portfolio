"use client";

import { motion } from "framer-motion";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });

interface CodeBlockProps {
  reaperMode: boolean;
}

export default function CodeBlock({ reaperMode }: CodeBlockProps) {
  const codeLines = reaperMode
    ? [
        "// PROTOCOL OVERRIDE ENGAGED",
        "import { ReaperProtocol } from '@mdialis/sys';",
        "",
        "const core = new ReaperProtocol();",
        "core.bypassSecurity({",
        "  level: 'ROOT',",
        "  stealth: true,",
        "});",
        "",
        "await core.execute();",
        "> SYSTEM YIELDING TO NEW DIRECTIVE...",
      ]
    : [
        "import { ScalableArchitecture } from '@mdialis/core';",
        "import { DataGovernance } from '@mdialis/sec';",
        "",
        "const infrastructure = new ScalableArchitecture({",
        "  resilience: 'MAXIMUM',",
        "  latency: 'SUB_MILLISECOND',",
        "  nodes: 'AUTO_SCALING',",
        "});",
        "",
        "await infrastructure.deploy();",
        "> SYSTEM STATUS: OPTIMAL & READY.",
      ];

  return (
    // CHANGED: Shifted position to top on mobile (pt-[15vh]) and right on desktop (lg:justify-end) to clear the massive H1
    <div className="
      absolute inset-0 w-full h-full 
      flex flex-col lg:flex-row
      items-center justify-start lg:items-center lg:justify-end
      pt-[15vh] lg:pt-0 lg:pr-[3%] pointer-events-none z-0">
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 3.8, ease: "easeOut" }}
        className="w-[90%] sm:w-[500px] lg:w-[550px] rounded-xl border border-border/50 bg-background/60 backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto"
      >
        {/* Fake Window Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-border" />
          <div className="w-3 h-3 rounded-full bg-border" />
          <span
            className={`ml-4 text-[10px] tracking-widest text-muted-foreground uppercase ${firaCode.className}`}
          >
            {reaperMode ? "sys_override.ts" : "infrastructure_init.ts"}
          </span>
        </div>

        <div className="p-5 md:p-6 flex flex-col gap-5">
          {/* CHANGED: Visual HUD Status Bar - Instantly readable without reading code */}
          <motion.div
            key={reaperMode ? "hud-reaper" : "hud-normal"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
              reaperMode
                ? "bg-amber-500/10 border-amber-500/20"
                : "bg-emerald-500/10 border-emerald-500/20"
            }`}
          >
            <span
              className={`text-xs uppercase tracking-widest font-bold ${firaCode.className} ${
                reaperMode ? "text-amber-500" : "text-emerald-500"
              }`}
            >
              {reaperMode ? "Reaper Protocol Active" : "Architecture Stable"}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                  className={`w-2 h-2 rounded-full ${
                    reaperMode ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Animated Code Lines */}
          <div
            className={`text-xs md:text-sm text-foreground/80 leading-relaxed ${firaCode.className}`}
          >
            {codeLines.map((line, index) => (
              <motion.div
                key={`${reaperMode}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className={
                  line.startsWith("//") || line.startsWith(">")
                    ? reaperMode
                      ? "text-amber-500 font-bold"
                      : "text-emerald-400 font-bold"
                    : line.includes("import")
                      ? "text-blue-400"
                      : line.includes("new") ||
                          line.includes("await") ||
                          line.includes("core")
                        ? reaperMode
                          ? "text-purple-400"
                          : "text-pink-400"
                        : "text-foreground"
                }
              >
                {line || "\u00A0"}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
