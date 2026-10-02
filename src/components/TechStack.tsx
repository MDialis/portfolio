"use client";

import { Fira_Code, Inter } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function TechStack({ lang }: { lang: string }) {
  const content = {
    en: {
      sectionTitle: "Technical Arsenal",
      categories: [
        {
          title: "Infrastructure & AppSec",
          description: "Zero-trust environments and deployment pipelines.",
          skills: ["Docker", "AWS", "JWT / IAM", "Vulnerability Management"]
        },
        {
          title: "Backend & Data Governance",
          description: "High-performance APIs and relational data modeling.",
          skills: ["PostgreSQL", "Python", "Go", "Spring Boot", "Node.js"]
        },
        {
          title: "Frontend & Architecture",
          description: "Modern, type-safe user interfaces.",
          skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
        }
      ]
    },
    pt: {
      sectionTitle: "Arsenal Técnico",
      categories: [
        {
          title: "Infraestrutura & AppSec",
          description: "Ambientes zero-trust e pipelines de implantação.",
          skills: ["Docker", "AWS", "JWT / IAM", "Gestão de Vulnerabilidades"]
        },
        {
          title: "Backend & Governança de Dados",
          description: "APIs de alta performance e modelagem relacional.",
          skills: ["PostgreSQL", "Python", "Go", "Spring Boot", "Node.js"]
        },
        {
          title: "Frontend & Arquitetura",
          description: "Interfaces de usuário modernas e type-safe.",
          skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
        }
      ]
    }
  };

  const dict = content[lang as keyof typeof content];

  return (
    <section id="skills" className={`py-32 px-6 md:px-12 xl:px-20 bg-background ${inter.className}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <h2 className="text-sm md:text-base font-semibold text-muted-foreground tracking-widest uppercase">
            <span className={`text-accent mr-2 ${firaCode.className}`}>//</span>
            {dict.sectionTitle}
          </h2>
          <div className="h-px bg-border flex-grow" />
        </div>

        {/* Spec Sheet Grid */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {dict.categories.map((category, index) => (
            <div key={index} className="flex flex-col">
              
              {/* Category Header */}
              <div className="border-b border-border pb-6 mb-6">
                <span className={`text-accent text-xs mb-3 block tracking-widest ${firaCode.className}`}>
                  0{index + 1}.
                </span>
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {category.description}
                </p>
              </div>

              {/* Skills List */}
              <ul className="flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <li 
                    key={skill} 
                    className={`text-foreground text-sm flex items-center gap-3 ${firaCode.className}`}
                  >
                    <span className="w-1.5 h-1.5 bg-muted-foreground/30 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}