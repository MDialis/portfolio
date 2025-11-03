"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {

  return (
    <nav className="sticky top-0 w-full bg-linear-to-b z-50 from-base-300 to-transparent">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-accent">MDialis</h1>

        <ThemeSwitcher className="text-accent"/>
      </div>
    </nav>
  );
}
