"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["600", "700", "800"] });

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

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 
        bg-[var(--background)]/70 backdrop-blur-lg border-b border-[var(--border)]
        transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isMounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
        
        {/* Logo */}
        <a 
          href={`/?lang=${lang}`} 
          className="hover:opacity-80 transition-opacity"
        >
          <h1 className={`text-2xl font-bold text-[var(--foreground)] tracking-tight ${inter.className}`}>
            MDialis<span className="text-[var(--accent)]">.</span>
          </h1>
        </a>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher 
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] px-3 py-2 rounded-md transition-colors duration-200" 
          />
          <ThemeSwitcher 
            className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)] px-3 py-2 rounded-md transition-colors duration-200" 
          />
        </div>
        
      </div>
    </nav>
  );
}