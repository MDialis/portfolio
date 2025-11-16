"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { twMerge } from "tailwind-merge";

type ThemeSwitcherProps = {
  className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const renderIcon = () => {
    const iconClass = twMerge("h-6 w-6");

    return theme === "dark" ? (
      <Moon className={iconClass} />
    ) : (
      <Sun className={iconClass} />
    );
  };

  return (
    <button
      aria-label="Cycle Theme"
      onClick={cycleTheme}
      className={`rounded-full p-1 transition-colors ${className}`}
    >
      {renderIcon()}
    </button>
  );
};
