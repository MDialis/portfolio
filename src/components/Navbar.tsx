"use client";

import { useSearchParams } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";

  return (
    <nav className="sticky top-0 w-full bg-base-dark z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href={`/?lang=${lang}`} className="hover:opacity-85 px-2 py-1 rounded-lg">
          <h1 className="text-xl font-bold text-light-blue">MDialis</h1>
        </a>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="text-light-blue hover:bg-primary/30 hover:opacity-90" />
          <ThemeSwitcher className="text-light-blue hover:bg-primary/30 hover:opacity-90" />
        </div>
      </div>
    </nav>
  );
}