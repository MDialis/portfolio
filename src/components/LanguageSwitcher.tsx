"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read the current language from the URL, defaulting to 'en'
  const language = searchParams.get("lang") || "en";

  const toggleLanguage = () => {
    // Determine the target language
    const newLang = language === "en" ? "pt" : "en";

    // Create a new URL search parameter string
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("lang", newLang);

    // Push the new URL to the router (e.g., /?lang=pt)
    // This tells Next.js to re-render the server components with the new parameter
    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
  };

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Toggle Language"
      className={`
        flex items-center gap-2 px-3 py-1.5 
        text-sm font-semibold duration-200
        rounded-full p-1 transition-colors hover:bg-primary/30 hover:opacity-90 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
      {language === "en" ? "EN" : "PT"}
    </button>
  );
}