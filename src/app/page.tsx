import dynamic from "next/dynamic";
import { Bodoni_Moda } from "next/font/google";

// --- Services & Types ---
import {
  getFeaturedProjects,
  getFeaturedExperiences,
} from "@/lib/contentfulService";
import { TechIcon } from "@/lib/types";

// --- Static Components ---
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import AboutMe from "@/components/AboutMe";
import DraggableCarousel from "@/components/DraggableCarousel";
import DistanceScaler from "@/components/DistanceScaler";

// --- Dynamic Components (Lazy Loaded) ---
// These components are loaded on demand to reduce initial bundle size
const InfiniteIconScroller = dynamic(
  () => import("@/components/InfiniteIconScroller"),
);
const Card = dynamic(() => import("@/components/Card"));
const Contacts = dynamic(() => import("@/components/Contacts"), {
  // Including a loading placeholder to prevent layout shifts
  loading: () => <div className="min-h-[50vh] bg-neutral-variant" />,
});

const bodoniModa = Bodoni_Moda({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-bodoni" });

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

export default async function Home() {
  const projects = await getFeaturedProjects();
  const experiences = await getFeaturedExperiences();

  const cardWidths = "w-[75vw] md:w-[60vw] lg:w-[32vw]";
  const spacerWidths = "w-[1vw] md:w-[14vw] lg:w-[30.5vw]";

  return (
    <div className="flex-1">
      <main>
        {/* Hero Section: Full-screen, spotlight background */}
        <HeroSection bodoniModa={bodoniModa} />

        {/* Main Content Area */}
        <div className="relative px-5 text-sm">
          <AboutMe />

          {/* Skills Section */}
          <section id="skills" className="py-4">
            <div className="relative z-10 max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-base-content mb-12">
                My Skills
              </h2>

              {/* Skills Scroller Container */}
              <div className="relative overflow-hidden bg-base-100 lg:mx-25">
                {/* Fading gradients on the left and right edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-72 lg:w-96 bg-linear-to-r from-base-200 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-48 bg-linear-to-l from-base-200 to-transparent" />

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

          {/* Projects Section */}
          <section id="projects" className="py-4 pt-10">
            <div className="mx-auto">
              <h2 className="text-4xl font-bold text-center mb-2 text-base-content">
                <a href="/works" className="px-2">
                  My Projects
                </a>
              </h2>

              {projects.length === 0 ? (
                <div className="text-center">
                  <h3 className="text-xl">
                    Oops! Looks like there's no projects ready for show or the
                    system failed to connect to the CMS.
                  </h3>
                  <p className="text-lg py-3">Try Again Later!</p>
                </div>
              ) : (
                <DraggableCarousel>
                  <div className={`${spacerWidths} shrink-0`} />

                  {projects.map((project) => {
                    const { title, slug, summary, cardImage, tech } =
                      project.fields;

                    const imageUrl = cardImage
                      ? `https:${cardImage.fields.file.url}`
                      : undefined;

                    const formattedTechIcons: TechIcon[] = (tech || []).map(
                      (techName) => {
                        return {
                          src: techName
                            ? `/icons/${techName}.svg`
                            : "/icons/default.svg",
                          alt: techName,
                        };
                      },
                    );
                    return (
                      <DistanceScaler
                        key={project.sys.id}
                        horizontal
                        deform
                        maxScale={1}
                        minScale={0.7}
                        className={`
                          ${cardWidths}
                          shrink-0
                          cursor-grab active:cursor-grabbing
                          hover:scale-105 transition-transform
                        `}
                      >
                        <Card
                          title={title}
                          text={summary}
                          link={`/works/${slug}`}
                          imageUrl={imageUrl}
                          techIcons={formattedTechIcons}
                          classname="cursor-grab active:cursor-grabbing"
                        />
                      </DistanceScaler>
                    );
                  })}

                  <div className={`${spacerWidths} shrink-0`} />
                </DraggableCarousel>
              )}
            </div>
          </section>

          <div className="max-w-6xl mx-auto">
            <Button link="/works" text="Check All Projects" />
          </div>

          {/* Experiences Section */}
          <section id="experiences" className="py-4">
            <div className="mx-auto">
              <h2 className="text-4xl font-bold text-center mb-2 text-base-content">
                <a href="/works" className="px-2">
                  My Experiences
                </a>
              </h2>

              {experiences.length === 0 ? (
                <div className="text-center">
                  <h3 className="text-xl">
                    Oops! Looks like there's no work ready for show or the
                    system failed to connect to the CMS.
                  </h3>
                  <p className="text-lg py-3">Try Again Later!</p>
                </div>
              ) : (
                <DraggableCarousel>
                  <div className={`${spacerWidths} shrink-0`} />

                  {experiences.map((experience) => {
                    const { title, systemLink, summary, image, tech } =
                      experience.fields;

                    const imageUrl = image
                      ? `https:${image.fields.file.url}`
                      : undefined;

                    const formattedTechIcons: TechIcon[] = (tech || []).map(
                      (techName) => {
                        return {
                          src: techName
                            ? `/icons/${techName}.svg`
                            : "/icons/default.svg",
                          alt: techName,
                        };
                      },
                    );
                    return (
                      <DistanceScaler
                        key={experience.sys.id}
                        horizontal
                        deform
                        maxScale={1}
                        minScale={0.7}
                        className={`
                          ${cardWidths}
                          shrink-0
                          cursor-grab active:cursor-grabbing
                          hover:scale-105 transition-transform
                        `}
                      >
                        <Card
                          title={title}
                          text={summary}
                          link={`${systemLink}`}
                          imageUrl={imageUrl}
                          techIcons={formattedTechIcons}
                          classname="cursor-grab active:cursor-grabbing"
                        />
                      </DistanceScaler>
                    );
                  })}

                  <div className={`${spacerWidths} shrink-0`} />
                </DraggableCarousel>
              )}
            </div>
          </section>

          <div className="max-w-6xl mx-auto mb-15">
            <Button link="/works" text="Check All Experiences" />
          </div>
        </div>

        <Contacts />
      </main>
    </div>
  );
}
