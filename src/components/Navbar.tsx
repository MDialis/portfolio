"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {

  return (
    <nav className="sticky top-0 w-full bg-bg-card shadow-md z-10">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-secondary">MyPortfolio</h1>

        <ThemeSwitcher />

        {/* 
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-muted hidden sm:inline">
            Theme:
          </span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as any)}
            className="rounded-md p-1.5 text-text-base bg-bg-base border border-text-muted/20 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
        */}
      </div>
    </nav>
  );
}
