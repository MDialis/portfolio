"use client";

import { useState } from "react";
import { Fira_Code, Inter } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function InteractiveIndex({ projects, lang }: { projects: any[], lang: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const dict = {
    en: { title: "Selected Architecture", empty: "No projects found." },
    pt: { title: "Arquitetura Selecionada", empty: "Nenhum projeto encontrado." }
  }[lang as "en" | "pt"];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section 
      id="projects" 
      className={`py-32 px-6 md:px-12 xl:px-20 bg-background ${inter.className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-sm md:text-base font-semibold text-muted-foreground tracking-widest uppercase">
            <span className={`text-accent mr-2 ${firaCode.className}`}>//</span>
            {dict.title}
          </h2>
          <div className="h-px bg-border flex-grow" />
        </div>

        {/* The Interactive List */}
        <div className="relative z-10 flex flex-col border-t border-border">
          {projects.map((project, index) => {
            const { title, slug, summary, tech, cardImage } = project.fields;
            // Format ID like 01, 02, 03...
            const formattedId = (index + 1).toString().padStart(2, '0');
            // Format tech array into a single string separated by slashes
            const techString = tech ? tech.slice(0, 3).join(" / ") : "Architecture";
            
            return (
              <a 
                key={project.sys.id}
                href={`/works/${slug}?lang=${lang}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-border hover:bg-muted/20 transition-colors duration-500 cursor-pointer"
              >
                
                {/* Left side: ID and Title */}
                <div className="flex items-baseline gap-6 md:gap-12 z-20">
                  <span className={`text-muted-foreground text-sm md:text-lg transition-colors group-hover:text-accent ${firaCode.className}`}>
                    {formattedId}
                  </span>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                    {title}
                  </h3>
                </div>

                {/* Right side: Meta info */}
                <div className="flex flex-col md:items-end mt-4 md:mt-0 pl-14 md:pl-0 z-20">
                  <span className="text-foreground font-medium text-sm md:text-base uppercase tracking-wider line-clamp-1 max-w-xs md:text-right">
                    {summary}
                  </span>
                  <span className={`text-muted-foreground text-xs md:text-sm mt-1 ${firaCode.className}`}>
                    {techString}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* The Hover Reveal Image Container (Tied to Cursor Position) */}
      <div 
        className="hidden lg:block pointer-events-none fixed top-0 left-0 z-50 transition-all duration-150 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      >
        {projects.map((project, index) => {
          const { cardImage, title } = project.fields;
          const imageUrl = cardImage ? `https:${cardImage.fields.file.url}` : "";

          return (
            <div 
              key={`img-${project.sys.id}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-[400px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${hoveredIndex === index ? "opacity-100 scale-100 rotate-3" : "opacity-0 scale-90 rotate-0"}
              `}
            >
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt={title as string} 
                  className="w-full h-full object-cover bg-card"
                />
              )}
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
          );
        })}
      </div>
    </section>
  );
}