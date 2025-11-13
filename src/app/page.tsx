"use client";

import Card from "@/components/Card";
import FlipSection from "@/components/FlipSection";
import Lamp from "@/components/Lamp";
import Reaper from "@/components/Reaper";
import { Bodoni_Moda } from "next/font/google";
import { useEffect, useState } from "react";

const bodoniModa = Bodoni_Moda({ subsets: ["latin"], weight: "400" });

// Define responsive breakpoints for use in JavaScript logic
const BREAKPOINTS = {
  md: 768,
  lg: 1024,
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

// Array of objects defining the projects to be displayed
const projects = [
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
    techIcons: [
      { src: "/icons/python.svg", alt: "Python" },
    ]
  },
  // Conversores de Arquivos
  // WebGame
  // Netflix Clone
];

export default function Home() {
  const [reaperSize, setReaperSize] = useState(0);
  const [OpacityOnScroll, setOpacityOnScroll] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

  // Calculates the dynamic size for the Reaper component based on the window's inner width.
  const getDynamicReaperSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= BREAKPOINTS.lg) {
      return screenWidth / 2.5;
    }
    if (screenWidth >= BREAKPOINTS.md) {
      return screenWidth / 1.4;
    }
    return screenWidth / 1;
  };

  // Set and update the reaper size on window resize
  useEffect(() => {
    const handleResize = () => {
      setReaperSize(getDynamicReaperSize());
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle scroll animations (opacity changes)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      const progress = Math.min(scrollY / (heroHeight * 0.7), 1);

      setOpacityOnScroll(1 - progress * 1.6);

      setOverlayOpacity(progress * 0.9);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex-1">
      <main>
        {/* Hero Section: Full-screen, spotlight background */}
        <section className="relative top-0 h-screen flex flex-col justify-center items-center overflow-hidden bg-spotlight">
          <div className="absolute inset-0 w-full h-full top-0 left-0 flex justify-center items-center">
            {/* Background decorative elements (rotated divs and text) */}
            <div className="absolute top-0 md:top-[-20px] lg:top-[-40px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-spotlight-content z-0 rotate-5" />

            <h1
              className={`${bodoniModa.className} absolute font-extrabold text-spotlight-content z-0 left-0 rotate-5 text-[clamp(2rem,16vw,16rem)] 
                top-[clamp(14rem,100vh,15rem)] 
                md:top-[clamp(15rem,25vh,22rem)]
                lg:top-[clamp(6rem,16vh,9rem)]
              `}
            >
              MATEUS
            </h1>
            <h1
              className={`${bodoniModa.className} absolute font-extrabold text-spotlight-content z-0 right-0 rotate-5 text-[clamp(2rem,16vw,16rem)] 
                bottom-[clamp(15rem,35vh,23rem)]
                md:bottom-[clamp(15rem,25vh,22rem)] 
                lg:bottom-[clamp(2rem,8vh,5rem)]`}
            >
              DIÁLIS
            </h1>

            <div className="absolute bottom-[-60px] md:bottom-[-80px] lg:bottom-[-100px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-spotlight-content z-0 rotate-5" />

            {/* Reaper Animation Container */}
            <div
              className="relative move-vertical h-1/2"
              style={{ opacity: OpacityOnScroll }}
            >
              <div className="move-horizontal">
                <div className="relative move-sway">
                  <Reaper size={reaperSize} />
                </div>
              </div>
            </div>

            {/* Lamp Animation Container */}
            <div
              className="relative move-vertical"
              style={{
                opacity: OpacityOnScroll,
              }}
            >
              <div className="move-horizontal">
                <div className="relative move-sway">
                  <div className="absolute move-vertical z-40">
                    <div className="relative">
                      <Lamp size={reaperSize / 3.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Overlay that fades in on scroll */}
          <div
            className="absolute inset-0 bg-blackwhite z-20 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        </section>

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
                  <div className="relative z-10 h-75 move-vertical">
                    <div className="move-horizontal">
                      <div className="relative">
                        <Reaper size={reaperSize / 1.75} />
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

              {/* Top Skills Row: Infinitely scrolls left-to-right */}
              <div className="flex whitespace-nowrap py-6 pb-3 animate-scroll-x">
                {/* Render skillsTop list */}
                <div className="flex min-w-full shrink-0 items-center justify-around">
                  {skillsTop.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110 shrink-0"
                    >
                      <img
                        src={`/icons/${skill.icon}`}
                        alt={`${skill.name} Logo`}
                        className="h-12 w-12"
                      />
                      <p className="font-semibold text-md">{skill.name}</p>
                    </div>
                  ))}
                </div>

                {/* Duplicate skillsTop list for seamless scrolling */}
                <div className="flex min-w-full shrink-0 items-center justify-around">
                  {skillsTop.map((skill) => (
                    <div
                      key={`${skill.name}-clone`}
                      className="flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110 shrink-0"
                    >
                      <img
                        src={`/icons/${skill.icon}`}
                        alt={`${skill.name} Logo`}
                        className="h-12 w-12"
                      />
                      <p className="font-semibold text-md">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Skills Row: Infinitely scrolls right-to-left */}
              <div className="flex whitespace-nowrap py-6 pt-3 animate-reverse-scroll-x">
                {/* Render skillsBottom list */}
                <div className="flex min-w-full shrink-0 items-center justify-around">
                  {skillsBottom.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110 shrink-0"
                    >
                      <img
                        src={`/icons/${skill.icon}`}
                        alt={`${skill.name} Logo`}
                        className="h-12 w-12"
                      />
                      <p className="font-semibold text-md">{skill.name}</p>
                    </div>
                  ))}
                </div>

                {/* Duplicate skillsBottom list for seamless scrolling */}
                <div className="flex min-w-full shrink-0 items-center justify-around">
                  {skillsBottom.map((skill) => (
                    <div
                      key={`${skill.name}-clone`}
                      className="flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110 shrink-0"
                    >
                      <img
                        src={`/icons/${skill.icon}`}
                        alt={`${skill.name} Logo`}
                        className="h-12 w-12"
                      />
                      <p className="font-semibold text-md">{skill.name}</p>
                    </div>
                  ))}
                </div>
              </div>
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
                {projects.map((project) => (
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
