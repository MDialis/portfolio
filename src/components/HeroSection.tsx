"use client";

import { useEffect, useState } from "react";
import Reaper from "@/components/Reaper";
import Lamp from "@/components/Lamp";
import BackgroundPattern from "./BackgroundPattern";

type HeroSectionProps = {
  bodoniModa: { className: string };
};

export default function HeroSection({ bodoniModa }: HeroSectionProps) {
  const [opacityOnScroll, setOpacityOnScroll] = useState(1);
  const [indicatorOpacity, setIndicatorOpacity] = useState(1);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Handle scroll animations (opacity changes)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      const progress = Math.min(scrollY / (heroHeight * 0.7), 1);

      const newOpacity = 1 - progress * 1.4;

      setOpacityOnScroll((prev) =>
        Math.abs(prev - newOpacity) > 0.01 ? newOpacity : prev,
      );

      setIndicatorOpacity(1 - progress * 4);

      setOverlayOpacity(progress * 0.9);

      setIsVisible(newOpacity > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative -top-10 h-screen flex flex-col justify-center items-center overflow-hidden bg-spotlight">
      <div className="absolute inset-0 w-full h-full top-0 left-0 flex justify-center items-center">
        {isVisible && (
          <>
            {/* Background decorative elements (rotated divs and text) */}
            <div className="absolute top-0 md:-top-5 lg:-top-11 w-[300vw] h-[250px] md:h-[300px] lg:h-[275px] bg-spotlight-content z-0 rotate-5">
              <BackgroundPattern className="bg-spotlight opacity-100" />
            </div>
          </>
        )}

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
            bottom-[clamp(5rem,100vh,11rem)]
            md:bottom-[clamp(15rem,25vh,22rem)] 
            lg:bottom-[clamp(2rem,8vh,5rem)]
          `}
        >
          DIÁLIS
        </h1>

        <div className="absolute bottom-[-60px] md:-bottom-20 lg:bottom-[-100px] w-[300vw] h-[250px] md:h-[300px] lg:h-[250px] bg-spotlight-content z-0 rotate-5">
          <BackgroundPattern className="bg-spotlight opacity-100" />
        </div>

        {/* Only render if they are actually visible */}
        {isVisible && (
          <>
            {/* Reaper Animation Container */}
            <div
              className="relative move-vertical h-1/2"
              style={{ opacity: opacityOnScroll }}
            >
              <div className="move-horizontal">
                <div className="relative move-sway">
                  <Reaper />
                </div>
              </div>
            </div>

            {/* Lamp Animation Container */}
            <div
              className="relative move-vertical"
              style={{
                opacity: opacityOnScroll,
              }}
            >
              <div className="move-horizontal">
                <div className="relative move-sway">
                  <div className="absolute move-vertical z-40">
                    <div className="relative">
                      <Lamp />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* --- SCROLL INDICATOR --- */}
            <div
              onClick={handleScrollDown}
              className="
                absolute transform animate-bounce 
                bottom-12 left-1/2 -translate-x-1/2
                flex flex-col items-center 
                text-secondary font-semibold 
                z-30 gap-1 cursor-pointer
                "
              style={{
                opacity: indicatorOpacity,
                pointerEvents: indicatorOpacity <= 0 ? "none" : "auto",
              }}
            >
              <span className="text-sm uppercase tracking-widest">
                Scroll
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Overlay that fades in on scroll */}
      <div
        className="absolute inset-0 bg-blackwhite z-20 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </section>
  );
}
