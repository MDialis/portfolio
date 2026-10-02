import dynamic from "next/dynamic";
import { Inter, Fira_Code } from "next/font/google";

// --- Services & Types ---
import {
  getFeaturedProjects,
  getFeaturedExperiences,
} from "@/lib/contentfulService";

// --- Static Components ---
import HeroSection from "@/components/HeroSection";
import InteractiveIndex from "@/components/InteractiveIndex";
import TechStack from "@/components/TechStack";
import ExperienceShowcase from "@/components/ExperienceShowcase";

// --- Dynamic Components ---
const Contacts = dynamic(() => import("@/components/Contacts"), {
  loading: () => <div className="min-h-[50vh] bg-muted" />,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  // Map the URL param to Contentful locale code
  const locale = resolvedSearchParams?.lang === "pt" ? "pt-BR" : "en-US";
  const currentLang = resolvedSearchParams?.lang === "pt" ? "pt" : "en";

  // Fetch dynamic content
  const projects = await getFeaturedProjects(locale);
  const experiences = await getFeaturedExperiences(locale);

  return (
    <div className={`flex-1 bg-background text-foreground ${inter.variable} font-sans`}>
      <main>
        {/* 1. Hero Section */}
        <HeroSection lang={currentLang} />

        {/* 2. Current Works / Experiences (Timeline format) */}
        <ExperienceShowcase experiences={experiences} lang={currentLang} />

        {/* 3. Projects (Interactive Hover format) */}
        <InteractiveIndex projects={projects} lang={currentLang} />

        {/* 4. Tech Stack (Spec Sheet format) */}
        <TechStack lang={currentLang} />

        {/* 5. Footer / Contact */}
        <Contacts lang={currentLang} />
      </main>
    </div>
  );
}