"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";
import { Inter, Fira_Code } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["500"] });

export default function Navbar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const lang = searchParams.get("lang") || "en";

  const [isMounted, setIsMounted] = useState(false);
  const [isLogoMounted, setIsLogoMounted] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Mount animation sequence
  useEffect(() => {
    requestAnimationFrame(() => setIsMounted(true));

    // Triggers the logo slide-up reveal as the preloader finishes
    const logoTimer = setTimeout(() => setIsLogoMounted(true), 4500);

    return () => clearTimeout(logoTimer);
  }, []);

  // Track scroll position to determine if we are at the Hero section
  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logic Gates for the Easter Egg
  const canTriggerEasterEgg = pathname === "/" && isAtTop;
  const showEasterEggHover = canTriggerEasterEgg && isHoveringLogo;

  // --- SMART LOGO ROUTING & DISPATCHER ---
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (pathname !== "/") {
      // If not on the homepage, go to homepage
      router.push("/");
    } else if (!isAtTop) {
      // If on homepage but scrolled down, scroll back to Hero
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // If on homepage AND at the top, trigger the Reaper!
      window.dispatchEvent(new CustomEvent("toggleReaperMode"));
    }
  };

  const navDict = {
    en: { work: "Work", about: "About", contact: "Contact" },
    pt: { work: "Projetos", about: "Sobre", contact: "Contato" },
  };
  const dict = navDict[lang as keyof typeof navDict];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-background/70 backdrop-blur-lg border-b border-border transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isMounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="w-full px-6 md:px-12 xl:px-20 py-5 flex justify-between items-center">
        {/* Interactive Smart Logo */}
        <div className="overflow-hidden pb-1">
          <button
            onClick={handleLogoClick}
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
            className={`relative flex items-center justify-center w-[110px] h-[36px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${isLogoMounted ? "translate-y-0" : "translate-y-full"}`}
            aria-label={
              canTriggerEasterEgg ? "Toggle Easter Egg" : "Back to Top"
            }
          >
            {/* Text Layer */}
            <h1
              className={`absolute inset-0 flex items-center justify-center text-2xl font-bold text-foreground tracking-tight transition-all duration-300 ease-out ${inter.className} ${showEasterEggHover ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
            >
              MDialis<span className="text-accent">.</span>
            </h1>

            {/* Icon Layer */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${showEasterEggHover ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            >
              <Image
                src="/icon.png"
                alt="MDialis Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </button>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Page Links */}
          <div
            className={`hidden md:flex items-center gap-6 text-xs tracking-widest uppercase text-muted-foreground font-semibold ${inter.className}`}
          >
            <a
              href="#projects"
              className="hover:text-foreground transition-colors"
            >
              {dict.work}
            </a>
            <a
              href="#about"
              className="hover:text-foreground transition-colors"
            >
              {dict.about}
            </a>
            <a
              href="#contacts"
              className="hover:text-foreground transition-colors"
            >
              {dict.contact}
            </a>
          </div>

          <div className="w-px h-4 bg-border hidden md:block" />

          {/* Social Links */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <a
              href="https://github.com/MDialis"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/mateus-dialis"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div className="w-px h-4 bg-border" />

          {/* Switchers */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher className="text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-2 rounded-md transition-colors" />
            <ThemeSwitcher className="text-muted-foreground hover:text-foreground hover:bg-muted px-2 py-2 rounded-md transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
}
