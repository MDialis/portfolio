"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

export default function Navbar() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Triggers the slide-down animation right after the component mounts
    requestAnimationFrame(() => {
      setIsMounted(true);
    });
  }, []);

  const navDict = {
    en: { work: "Work", about: "About", contact: "Contact" },
    pt: { work: "Projetos", about: "Sobre", contact: "Contato" }
  };
  const dict = navDict[lang as keyof typeof navDict];

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 
        bg-[var(--background)]/70 backdrop-blur-lg border-b border-[var(--border)]
        transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isMounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="w-full px-6 md:px-12 xl:px-20 py-5 flex justify-between items-center">
        
        {/* Logo */}
        <a href={`/?lang=${lang}`} className="hover:opacity-80 transition-opacity">
          <h1 className={`text-2xl font-bold text-[var(--foreground)] tracking-tight ${inter.className}`}>
            MDialis<span className="text-[var(--accent)]">.</span>
          </h1>
        </a>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-6">
          
          {/* Page Links */}
          <div className={`hidden md:flex items-center gap-6 text-xs tracking-widest uppercase text-[var(--muted-foreground)] font-semibold ${inter.className}`}>
            <a href="#projects" className="hover:text-[var(--foreground)] transition-colors">{dict.work}</a>
            <a href="#about" className="hover:text-[var(--foreground)] transition-colors">{dict.about}</a>
            <a href="#contact" className="hover:text-[var(--foreground)] transition-colors">{dict.contact}</a>
          </div>

          <div className="w-px h-4 bg-[var(--border)] hidden md:block" />

          {/* Switchers */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] px-2 py-2 rounded-md transition-colors" />
            <ThemeSwitcher className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] px-2 py-2 rounded-md transition-colors" />
          </div>
        </div>
        
      </div>
    </nav>
  );
}