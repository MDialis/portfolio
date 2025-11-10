"use client";

import Card from "@/components/Card";
import Lamp from "@/components/Lamp";
import Reaper from "@/components/Reaper";
import { Bodoni_Moda } from "next/font/google";
import { useEffect, useState } from "react";

const bodoniModa = Bodoni_Moda({ subsets: ["latin"], weight: "400" });

const BREAKPOINTS = {
  md: 768,
  lg: 1024,
};

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

export default function Home() {
  const [reaperSize, setReaperSize] = useState(0);
  const [OpacityOnScroll, setOpacityOnScroll] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      const progress = Math.min(scrollY / (heroHeight * 0.8), 1);

      setOpacityOnScroll(1 - progress * 1.6);

      setOverlayOpacity(progress * 0.9);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex-1">
      <main>
        <section className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden bg-spotlight">
          <div className="absolute inset-0 w-full h-full top-0 left-0 flex justify-center items-center">
            <div className="absolute top-[-30px] md:top-[-50px] lg:top-[-80px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-spotlight-content z-0 rotate-5" />

            <h1
              className={`${bodoniModa.className} absolute font-extrabold text-spotlight-content z-0 left-0 rotate-5 text-[clamp(2rem,16vw,16rem)] 
                top-[clamp(15rem,35vh,23rem)] 
                md:top-[clamp(15rem,25vh,22rem)]
                lg:top-[clamp(7rem,14vh,10rem)]
              `}
            >
              MATEUS
            </h1>
            <h1
              className={`${bodoniModa.className} absolute font-extrabold text-spotlight-content z-0 right-0 rotate-5 text-[clamp(2rem,16vw,16rem)] 
                bottom-[clamp(15rem,35vh,23rem)]
                md:bottom-[clamp(15rem,25vh,22rem)] 
                lg:bottom-[clamp(7rem,14vh,10rem)]`}
            >
              DIÁLIS
            </h1>

            <div className="absolute bottom-[-30px] md:bottom-[-50px] lg:bottom-[-80px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-spotlight-content z-0 rotate-5" />

            <div
              className="relative move-vertical top-[-25%]"
              style={{ opacity: OpacityOnScroll }}
            >
              <div className="move-horizontal">
                <div className="relative move-sway">
                  <Reaper size={reaperSize} />
                </div>
              </div>
            </div>

            <div
              className="relative move-vertical top-[-10%] left-[15%]"
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
          <div
            className="absolute inset-0 bg-blackwhite z-20 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        </section>

        <div className="bg-base-200 relative py-20 pt-35">
          <section id="aboutMe" className="py-10">
            <div className="relative z-10 max-w-7xl mx-auto px-12">
              <div className="flex flex-col md:flex-row items-center md:gap-12">
                <div className="w-full md:w-1/3 mb-8 md:mb-0">
                  <img
                    src="/mateus.jpeg"
                    alt="Mateus Diális"
                    className="rounded-4xl shadow-lg w-full h-auto object-cover"
                  />
                </div>

                <div className="w-full md:w-2/3 flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-accent text-left">
                    About Me
                  </h2>

                  <p className="mt-4 text-xl text-base-content text-left">
                    A front-end developer passionate about crafting beautiful
                    and functional web experiences. Welcome to my portfolio!
                  </p>

                  <div className="mt-10 flex justify-start md:justify-end">
                    <a
                      href="#contact"
                      className="px-6 py-3 rounded-lg font-semibold text-primary-content bg-primary shadow-lg hover:opacity-80 transition-colors"
                    >
                      Contact me!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="py-10">
            <div className="relative z-10 max-w-7xl mx-auto px-12">
              <h2 className="text-3xl font-bold text-center text-accent mb-12">
                My Skills
              </h2>

              <div className="overflow-hidden bg-base-100">
                <div className="pointer-events-none absolute inset-y-0 left-12 z-10 w-48 bg-linear-to-r from-base-200 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-12 z-10 w-48 bg-linear-to-l from-base-200 to-transparent" />

                <div className="flex whitespace-nowrap py-6 pb-3 animate-scroll-x">
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

                <div className="flex whitespace-nowrap py-6 pt-3 animate-reverse-scroll-x">
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
            </div>
          </section>

          <section id="projects" className="py-10">
            <div className="max-w-7xl mx-auto px-4">
              <h3 className="text-4xl font-bold text-center mb-12 text-accent">
                Projects
              </h3>

              {/* Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card
                  title="Project Title 1"
                  text="Project Description"
                  link="#"
                  imageUrl="/project-1.jpg"
                />
                <Card
                  title="Project Title 2"
                  text="Project Description"
                  link="#"
                  imageUrl="/project-2.jpg"
                />
                <Card
                  title="Project Title 3"
                  text="Project Description"
                  link="#"
                  imageUrl="/project-3.jpg"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
