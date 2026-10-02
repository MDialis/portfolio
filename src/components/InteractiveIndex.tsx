"use client";

import { useState } from "react";
import { Fira_Code, Inter } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function InteractiveIndex() {
  // Using your exact projects as mock data for the example
  const projects = [
    {
      id: "01",
      title: "Aracaju Transparency Portal",
      role: "Lead Full Stack",
      tech: "Next.js / PostgreSQL",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", // Placeholder
      link: "#"
    },
    {
      id: "02",
      title: "Autonomous ETL Pipeline",
      role: "Data Engineering",
      tech: "Python / Playwright",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop", // Placeholder
      link: "#"
    },
    {
      id: "03",
      title: "AI Health Data Pipeline",
      role: "Capstone",
      tech: "Gemini API / Relational DB",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop", // Placeholder
      link: "#"
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className={`py-32 px-6 md:px-12 xl:px-20 bg-[var(--background)] ${inter.className}`}>
      <div className="max-w-7xl mx-auto relative">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-sm md:text-base font-semibold text-[var(--muted-foreground)] tracking-widest uppercase">
            <span className={`text-[var(--accent)] mr-2 ${firaCode.className}`}>//</span>
            Selected Architecture
          </h2>
          <div className="h-px bg-[var(--border)] flex-grow" />
        </div>

        {/* The Interactive List */}
        <div className="relative z-10 flex flex-col border-t border-[var(--border)]">
          {projects.map((project, index) => (
            <a 
              key={project.id}
              href={project.link}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 border-b border-[var(--border)] hover:bg-[var(--muted)]/20 transition-colors duration-500 cursor-pointer"
            >
              
              {/* Left side: ID and Title */}
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className={`text-[var(--muted-foreground)] text-sm md:text-lg transition-colors group-hover:text-[var(--accent)] ${firaCode.className}`}>
                  {project.id}
                </span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] tracking-tight group-hover:translate-x-4 transition-transform duration-500">
                  {project.title}
                </h3>
              </div>

              {/* Right side: Meta info */}
              <div className="flex flex-col md:items-end mt-4 md:mt-0 pl-14 md:pl-0">
                <span className="text-[var(--foreground)] font-medium text-sm md:text-base uppercase tracking-wider">
                  {project.role}
                </span>
                <span className={`text-[var(--muted-foreground)] text-xs md:text-sm mt-1 ${firaCode.className}`}>
                  {project.tech}
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* The Hover Reveal Image Container (Hidden on mobile) */}
        <div className="hidden lg:block pointer-events-none absolute top-0 right-10 w-[400px] h-[500px] z-0 overflow-hidden flex items-center justify-center">
          {projects.map((project, index) => (
            <div 
              key={`img-${project.id}`}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-[var(--border)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${hoveredIndex === index 
                  ? "opacity-100 scale-100 rotate-2" 
                  : "opacity-0 scale-90 rotate-0"}
              `}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[var(--primary)]/10 mix-blend-overlay" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}