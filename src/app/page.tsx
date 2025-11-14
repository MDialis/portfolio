import Card from "@/components/Card";
import Reaper from "@/components/Reaper";
import FlipSection from "@/components/FlipSection";

import { Bodoni_Moda } from "next/font/google";
import InfiniteIconScroller from "@/components/InfiniteIconScroller";
import HeroSection from "@/components/HeroSection";

import { contentfulClient } from "@/lib/contentfulClient";
import { IProjectEntry } from "@/lib/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

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

// Array of objects defining the projects to be displayed
const mockedProjects = [
  {
    title: "Project Title 1",
    text: "Project Description",
    link: "#",
    imageUrl: "/project-1.jpg",
  },
  {
    title: "S.A.A.I",
    text: "An AI-powered nutritional analysis system built with a Python and FastAPI backend. It allows a user to upload a meal photo daily and receive a feedback about what to improve in their diet based on what he ate in the last week (or more). The data gets analyzed both by the system and a nutritionists user, saving its time when making a professional report and improving precision when giving feedback (also avoids AI hallucinations to get too far).",
    link: "https://github.com/MDialis/S.A.A.I",
    imageUrl: "/SAAI.jpg",
    techIcons: [{ src: "/icons/python.svg", alt: "Python" }],
  },
  // Conversores de Arquivos
  // WebGame
  // Netflix Clone
];

async function getProjects(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      order: ["-fields.date"],
    });

    // 2. USE um "double cast" (as unknown as ...) no retorno.
    // Isso diz ao TypeScript: "Eu sei o que estou fazendo,
    // confie que 'res.items' corresponde ao tipo IProjectEntry[]".
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex-1">
      <main>
        {/* Hero Section: Full-screen, spotlight background */}
        <HeroSection bodoniModa={bodoniModa} />

        {/* Main Content Area */}
        <div className="bg-base-200 relative py-20 pt-35">
          {/* About Me Section */}
          <section id="aboutMe" className="py-10">
            <div className="relative z-10 max-w-7xl mx-auto">
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
            </div>

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
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-10">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
                Projects
              </h2>

              {/* Grid layout for project cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Map over the projects array to create a Card for each project */}
                {mockedProjects.map((project) => (
                  <Card
                    key={project.link}
                    title={project.title}
                    text={project.text}
                    link={project.link}
                    imageUrl={project.imageUrl}
                    techIcons={project.techIcons}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
