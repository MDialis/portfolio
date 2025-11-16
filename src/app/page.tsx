import Card from "@/components/Card";
import Reaper from "@/components/Reaper";
import FlipSection from "@/components/FlipSection";

import { Bodoni_Moda } from "next/font/google";
import InfiniteIconScroller from "@/components/InfiniteIconScroller";
import HeroSection from "@/components/HeroSection";

import { contentfulClient } from "@/lib/contentfulClient";
import { IExperienceEntry, IProjectEntry } from "@/lib/types";
import Contacts from "@/components/Contacts";

const bodoniModa = Bodoni_Moda({ subsets: ["latin"], weight: "400" });

interface TechIcon {
  src: string;
  alt: string;
}

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

async function getProjects(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      order: ["-fields.date"],
      "fields.featured": true,
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

async function getExperiences(): Promise<IExperienceEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "experience",
      order: ["-fields.date"],
      "fields.featured": true,
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IExperienceEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();
  const experiences = await getExperiences();

  return (
    <div className="flex-1">
      <main>
        {/* Hero Section: Full-screen, spotlight background */}
        <HeroSection bodoniModa={bodoniModa} />

        {/* Main Content Area */}
        <div className="bg-base-200 relative px-5 text-sm">
          {/* About Me Section */}
          <section id="aboutMe" className="py-10">
            <div className="relative z-10 max-w-5xl mx-auto">
              {/* FlipSection component for interactive "About Me" */}
              <FlipSection
                imgLink="mateus.jpeg"
                imgAlt="Image of Mateus"
                title="About Me"
                text="
                  A passionate front-end developer dedicated to crafting beautiful, intuitive, and highly functional web experiences.
                  I specialize in turning complex challenges into elegant, user-centric solutions. Welcome to my portfolio."
                textAlt="
                  You found me! This portfolio was a passion project, and this section was a particularly fun challenge.
                  I believe that building great software involves both technical skill and a touch of personality!
                  Like the little animated detail you've discovered here."
                buttonLink="#contact"
                buttonText="Contact Me!"
              >
                {/* Content for the "back" of the FlipSection card */}
                <div
                  className="
                  flex items-center justify-center w-full h-full 
                  relative overflow-hidden
                  bg-linear-to-b from-primary/60 to-transparent
                "
                >
                  {/* Background mist gradient effect */}
                  <div
                    className="
                      absolute -left-50 -right-50
                      0 h-2/3 -bottom-10 z-0
                      bg-[radial-gradient(ellipse_at_bottom,white_30%,transparent_70%)]
                      opacity-20 blur-xl
                      pointer-events-none
                      "
                  />

                  {/* Reaper in front of mist */}
                  <div className="relative z-10 h-60 move-vertical">
                    <div className="move-horizontal">
                      <div className="relative">
                        <Reaper sizeMultiplier={0.45} />
                      </div>
                    </div>
                  </div>

                  {/* Foreground mist gradient effect */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute -bottom-15 -left-10 z-20
                      w-2/3 h-1/2
                      bg-[radial-gradient(ellipse_at_bottom_left,white_30%,transparent_70%)]
                      opacity-20 blur-xl move-vertical
                      pointer-events-none
                    "
                  />
                  <div
                    aria-hidden="true"
                    className="
                      absolute -bottom-15 -right-10 z-20
                      w-2/3 h-1/2
                      bg-[radial-gradient(ellipse_at_bottom_right,white_30%,transparent_70%)]
                      opacity-20 blur-xl move-vertical
                      pointer-events-none
                    "
                  />
                </div>
              </FlipSection>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-10">
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
          <section id="projects" className="py-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
                My Projects
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      }
                    );
                    return (
                      <Card
                        key={project.sys.id}
                        title={title}
                        text={summary}
                        link={`/works/${slug}`}
                        imageUrl={imageUrl}
                        techIcons={formattedTechIcons}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Experiences Section */}
          <section id="experiences" className="py-10">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
                My Experiences
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                      }
                    );
                    return (
                      <Card
                        key={experience.sys.id}
                        title={title}
                        text={summary}
                        link={`${systemLink}`}
                        imageUrl={imageUrl}
                        techIcons={formattedTechIcons}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </div>

        <Contacts />
      </main>
    </div>
  );
}
