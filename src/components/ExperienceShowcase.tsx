"use client";

import { useState } from "react";
import { Fira_Code, Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function ExperienceShowcase({ experiences, lang }: { experiences: any[], lang: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const dict = {
    en: { 
      title: "Professional Environments", 
      current: "ACTIVE",
      archived: "ARCHIVED",
      access: "Access System"
    },
    pt: { 
      title: "Ambientes Profissionais", 
      current: "ATIVO",
      archived: "ARQUIVADO",
      access: "Acessar Sistema"
    }
  }[lang as "en" | "pt"];

  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experiences" className={`py-32 px-6 md:px-12 xl:px-20 bg-background ${inter.className}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-sm md:text-base font-semibold text-muted-foreground tracking-widest uppercase">
            <span className={`text-accent mr-2 ${firaCode.className}`}>//</span>
            {dict.title}
          </h2>
          <div className="h-px bg-border flex-grow" />
        </div>

        {/* Master-Detail Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* LEFT: Sidebar Tabs (The "Master" List) */}
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible hide-scrollbar border-b lg:border-b-0 lg:border-l border-border lg:w-1/3 shrink-0">
            {experiences.map((exp, index) => {
              const isActive = activeIndex === index;
              const isCurrent = index === 0; // Assuming the first item is your current job
              
              return (
                <button
                  key={exp.sys.id}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    relative flex flex-col text-left px-6 py-4 whitespace-nowrap lg:whitespace-normal transition-all duration-300
                    ${isActive 
                      ? "text-foreground bg-muted/30" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/10"}
                  `}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 w-full h-0.5 lg:w-0.5 lg:h-full bg-accent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <span className={`text-[10px] uppercase tracking-widest mb-1 ${firaCode.className} ${isActive ? "text-accent" : "text-muted-foreground/60"}`}>
                    [{isCurrent ? dict.current : dict.archived}]
                  </span>
                  <span className="font-semibold text-sm md:text-base tracking-tight truncate">
                    {exp.fields.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detailed Content (The "Detail" View) */}
          <div className="lg:w-2/3 min-h-[350px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col h-full"
              >
                <div className="mb-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
                    {experiences[activeIndex].fields.title}
                  </h3>
                  
                  {/* Tech Stack Array */}
                  {experiences[activeIndex].fields.tech && experiences[activeIndex].fields.tech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {experiences[activeIndex].fields.tech.map((t: string) => (
                        <span key={t} className={`px-2 py-1 bg-muted border border-border rounded text-[10px] uppercase tracking-widest text-foreground ${firaCode.className}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed md:text-lg">
                    {experiences[activeIndex].fields.summary}
                  </p>
                </div>

                {experiences[activeIndex].fields.systemLink && (
                  <div className="mt-auto pt-10">
                    <a 
                      href={experiences[activeIndex].fields.systemLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`inline-flex items-center gap-2 text-sm text-background bg-foreground px-6 py-3 rounded-md hover:bg-foreground/90 transition-colors font-semibold w-fit ${firaCode.className}`}
                    >
                      {dict.access} <span className="text-accent ml-1">{"->"}</span>
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}