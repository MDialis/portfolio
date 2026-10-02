import dynamic from "next/dynamic";
import { Inter, Fira_Code } from "next/font/google";
// --- Services & Types ---
import {
  getFeaturedProjects,
  getFeaturedExperiences,
} from "@/lib/contentfulService";
import { TechIcon } from "@/lib/types";

// --- Static Components ---
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import DraggableCarousel from "@/components/DraggableCarousel";
import DistanceScaler from "@/components/DistanceScaler";
import InteractiveIndex from "@/components/InteractiveIndex";

// --- Dynamic Components (Lazy Loaded) ---
// These components are loaded on demand to reduce initial bundle size
const InfiniteIconScroller = dynamic(
  () => import("@/components/InfiniteIconScroller"),
);
const Card = dynamic(() => import("@/components/Card"));
const Contacts = dynamic(() => import("@/components/Contacts"), {
  // Including a loading placeholder to prevent layout shifts
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

// --- Dictionary for Hardcoded Text ---
const dictionaries = {
  en: {
    skillsTitle: "My Skills",
    projectsTitle: "My Projects",
    projectsEmpty:
      "Oops! Looks like there's no projects ready for show or the system failed to connect to the CMS.",
    tryAgain: "Try Again Later!",
    checkAllProjects: "Check All Projects",
    experiencesTitle: "My Experiences",
    experiencesEmpty:
      "Oops! Looks like there's no work ready for show or the system failed to connect to the CMS.",
    checkAllExperiences: "Check All Experiences",
  },
  pt: {
    skillsTitle: "Minhas Habilidades",
    projectsTitle: "Meus Projetos",
    projectsEmpty:
      "Ops! Parece que não há projetos prontos para exibir ou o sistema falhou ao conectar com o CMS.",
    tryAgain: "Tente novamente mais tarde!",
    checkAllProjects: "Ver Todos os Projetos",
    experiencesTitle: "Minhas Experiências",
    experiencesEmpty:
      "Ops! Parece que não há trabalhos prontos para exibir ou o sistema falhou ao conectar com o CMS.",
    checkAllExperiences: "Ver Todas as Experiências",
  },
};

// Array of objects defining the skills for the top scrolling bar
const skillsTop = [
  { name: "Postgres", icon: "postgresql.svg" },
  { name: "MySql", icon: "mysql.svg" },
  { name: "GitHub", icon: "github.svg" },
  { name: "SpringBoot", icon: "springboot.svg" },
  { name: "Node.js", icon: "node.svg" },
  { name: "WordPress", icon: "wordpress.svg" },
  { name: "NextJS", icon: "nextjs.svg" },
  { name: "React", icon: "react.svg" },
  { name: "Tailwind", icon: "tailwind.svg" },
];

// Array of objects defining the skills for the bottom scrolling bar
const skillsBottom = [
  { name: "Python", icon: "python.svg" },
  { name: "Java", icon: "java.svg" },
  { name: "JavaScript", icon: "javascript.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "Docker", icon: "docker.svg" },
  { name: "AWS", icon: "aws.svg" },
  { name: "HTML", icon: "html.svg" },
  { name: "CSS", icon: "css.svg" },
  { name: "Figma", icon: "figma.svg" },
];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  // Map the URL param to Contentful locale code
  // If ?lang=pt is in the URL, use 'pt-BR', otherwise default to 'en-US'
  const locale = resolvedSearchParams?.lang === "pt" ? "pt-BR" : "en-US";
  const currentLang = resolvedSearchParams?.lang === "pt" ? "pt" : "en";

  // Select the correct dictionary
  const dict = dictionaries[currentLang];

  // Pass the locale to your fetch functions
  const projects = await getFeaturedProjects(locale);
  const experiences = await getFeaturedExperiences(locale);

  const cardWidths = "w-[75vw] md:w-[60vw] lg:w-[32vw]";
  const spacerWidths = "w-[1vw] md:w-[14vw] lg:w-[30.5vw]";

  return (
    <div
      className={`flex-1 bg-background text-foreground ${inter.variable} font-sans`}
    >
      <main>
        {/* Hero Section: Full-screen, spotlight background */}
        <HeroSection lang={currentLang} />

        {/* Main Content Area */}
        <div className="relative px-5 text-sm">
          <InteractiveIndex />

          {/* Skills Section */}
          <section id="skills" className="py-4">
            <div className="relative z-10 max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                {dict.skillsTitle}
              </h2>

              {/* Skills Scroller Container */}
              <div className="relative overflow-hidden bg-background lg:mx-25">
                {/* Fading gradients on the left and right edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-72 lg:w-96 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-48 bg-gradient-to-l from-background to-transparent" />

                {/* Top Row: Right to Left Movement */}
                <InfiniteIconScroller
                  skills={skillsTop}
                  direction="left"
                  className="py-6 pb-3"
                />

                {/* Top Row: Left to Right Movement */}
                <InfiniteIconScroller
                  skills={skillsBottom}
                  direction="right"
                  className="py-6 pt-3"
                />
              </div>
            </div>
          </section>
        </div>
        <Contacts lang={currentLang} />
      </main>
    </div>
  );
}
