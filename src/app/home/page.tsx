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
        <section className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full top-0 left-0 flex justify-center items-center">
            <div className="absolute top-[-30px] md:top-[-50px] lg:top-[-80px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-black z-0 rotate-5" />

            <h1
              className={`${bodoniModa.className} absolute font-extrabold text-black z-0 left-0 rotate-5 text-[clamp(2rem,16vw,16rem)] 
                top-[clamp(15rem,35vh,23rem)] 
                md:top-[clamp(15rem,25vh,22rem)]
                lg:top-[clamp(7rem,14vh,10rem)]
              `}
            >
              MATEUS
            </h1>
            <h1
              className={`${bodoniModa.className} absolute font-extrabold text-black z-0 right-0 rotate-5 text-[clamp(2rem,16vw,16rem)] 
                bottom-[clamp(15rem,35vh,23rem)]
                md:bottom-[clamp(15rem,25vh,22rem)] 
                lg:bottom-[clamp(7rem,14vh,10rem)]`}
            >
              DIÁLIS
            </h1>

            <div className="absolute bottom-[-30px] md:bottom-[-50px] lg:bottom-[-80px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-black z-0 rotate-5" />

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
              className="relative move-vertical top-[-25%]"
              style={{
                opacity: OpacityOnScroll,
                mixBlendMode: "overlay",
              }}
            >
              <div className="move-horizontal">
                <div className="relative move-sway">
                  <div className="absolute move-vertical z-40 top-[18vh] md:top-[20vh] lg:top-[20vh] left-[15vh] md:left-[18vh] lg:left-[25vh]">
                    <div className="relative">
                      <Lamp size={reaperSize / 4.5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-0 bg-black z-20 pointer-events-none"
            style={{ opacity: overlayOpacity }}
          />
        </section>

        <div className="bg-base-300 relative py-20">
          <section>
            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-extrabold">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                    Howdy! I'm Mateus Diális
                  </span>
                </h2>
                <p className="mt-4 text-xl text-base-content max-w-2xl mx-auto">
                  A front-end developer passionate about crafting beautiful and
                  functional web experiences. Welcome to my portfolio!
                </p>
                <div className="mt-10 flex gap-4 justify-center">
                  <a
                    href="#projects"
                    className="px-6 py-3 rounded-lg font-semibold text-primary-content bg-primary shadow-lg hover:opacity-80 transition-opacity"
                  >
                    My Projects
                  </a>
                  <a
                    href="#contact"
                    className="px-6 py-3 rounded-lg font-semibold text-base-content bg-neutral shadow-lg hover:opacity-80 transition-colors"
                  >
                    Contact me!
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="py-20">
            <div className="max-w-5xl mx-auto px-4 py-12">
              <h3 className="text-4xl font-bold text-center mb-12 text-base-content">
                Projects
              </h3>

              {/* Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card
                  title="Project Title"
                  text="Project Description"
                  link="#"
                />
                <Card
                  title="Project Title"
                  text="Project Description"
                  link="#"
                />
                <Card
                  title="Project Title"
                  text="Project Description"
                  link="#"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
