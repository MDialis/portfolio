"use client";

import { useRef, useCallback, useMemo, useState, useEffect, CSSProperties } from "react";
import { followMove, updatePartPosition } from "@/hooks/followMove";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./Reaper.module.css";

import ReaperLamp from "@/assets/lamp/Lamp.svg";
// import LampOff from "@/assets/lamp/LampOff.svg";
// import LampOn from "@/assets/lamp/LampOn.svg";

// --- Animation Constants ---
const BASE_SIZE = 100;

const BODY_SMOOTHING = 0.2;
const BODY_MOVE_FACTOR = 12;
const BODY_MAX_MOVE_RATIO = 60 / BASE_SIZE;

// Define responsive breakpoints for use in JavaScript logic
const BREAKPOINTS = {
  md: 768,
  lg: 1024,
};

const GRADIENT_PROPERTIES: CSSProperties = {
  filter: "blur(100px)",
  backfaceVisibility: "hidden",
  transform: "translate3d(0,0,0)",
};

const GLOW_OFF_STYLE: CSSProperties = {
  ...GRADIENT_PROPERTIES,
  background:
    "radial-gradient(circle, rgba(28, 50, 127, 0.7) 5%, rgb(41, 95, 156, 0.5) 10%, rgba(118, 239, 251, 0.2) 20%, rgb(0, 0, 0, 0) 40%)",
};

const GLOW_ON_STYLE: CSSProperties = {
  ...GRADIENT_PROPERTIES,
  background:
    "radial-gradient(circle, rgba(253, 218, 119, 0.8) 5%, rgb(242, 240, 183, 0.5) 10%, rgba(118, 239, 251, 0.2) 20%, rgb(0, 0, 0, 0) 70%)",
};

const GLOW_ON_INNER_STYLE: CSSProperties = {
  ...GRADIENT_PROPERTIES,
  background:
    "radial-gradient(circle, rgba(253, 218, 119, 1) 1%, rgb(242, 240, 183, 0.9) 5%, rgba(118, 239, 251, 0.8) 10%, rgb(0, 0, 0, 0) 15%)",
};

interface LampProps {
  sizeMultiplier?: number;
}

export default function Lamp({ sizeMultiplier = 1 }: LampProps) {
  const [defaultSize, setdefaultSize] = useState(150);
  //  const [isOn, setIsOn] = useState(false);

  // Get theme state and setter from the ThemeProvider context
  const { theme, setTheme } = useTheme();
  const isOn = theme === "light";

  // Refs for DOM elements and animation state
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Ref to store the interpolated (smoothed) position
  const bodyPos = useRef({ x: 0, y: 0 });

  // Calculates the dynamic size for the Lamp component based on the window's inner width.
  const getDynamicLampSize = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= BREAKPOINTS.lg) {
      return screenWidth / 8.75;
    }
    if (screenWidth >= BREAKPOINTS.md) {
      return screenWidth / 4.9;
    }
    return screenWidth / 3.5;
  };

  // Set and update the lamp size on window resize
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setdefaultSize(getDynamicLampSize());
      }, 150);
    };

    setdefaultSize(getDynamicLampSize());

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const effectiveSize = defaultSize * sizeMultiplier;

  // Calculate the maximum pixels the body can move based on the component's size
  const maxMoveBody = useMemo(
    () => effectiveSize * BODY_MAX_MOVE_RATIO,
    [effectiveSize]
  );

  // Animation callback, this function is called on each animation frame by the `followMove` hook.
  const handleAnimate = useCallback(
    (baseTargetX: number, baseTargetY: number) => {
      // Update the visual position of the lamp body using the animation utility
      updatePartPosition(
        baseTargetX,
        baseTargetY,
        bodyRef,
        bodyPos,
        BODY_MOVE_FACTOR,
        maxMoveBody,
        BODY_SMOOTHING
      );
    },
    [maxMoveBody]
  );

  // Attach the mouse-follow animation logic to the container ref
  followMove(containerRef, handleAnimate);

  // Toggles the application theme between "light" and "dark".
  const toggleLamp = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    // Main container: Establishes the size and the reference for mouse tracking
    <div
      ref={containerRef}
      className={styles.reaperContainer}
      style={{
        width: `${effectiveSize}px`,
        height: `${effectiveSize}px`,
        position: "relative",
      }}
    >
      {/* Animated Body: This div moves around based on the animation logic */}
      <div
        ref={bodyRef}
        className={styles.reaperAssembly}
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <div>
          {/* "Off" Glow Effect (Blue-ish): Visible when theme is 'dark' (isOn = false) */}
          <div
            className="absolute inset-0"
            style={{
              opacity: isOn ? 0 : 1,
              transition: "opacity 0.2s ease-in-out",
              pointerEvents: "none",
              mixBlendMode: "screen",
              willChange: "opacity",
            }}
          >
            <div
              className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu"
              style={GLOW_OFF_STYLE}
            />
          </div>

          {/* "On" Glow Effect (Yellow-ish): Visible when theme is 'light' (isOn = true) */}
          <div
            className="absolute inset-0"
            style={{
              opacity: isOn ? 1 : 0,
              transition: "opacity 0.2s ease-in-out",
              pointerEvents: "none",
              mixBlendMode: "screen",
              willChange: "opacity",
            }}
          >
            <div
              className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu"
              style={GLOW_ON_STYLE}
            />
          </div>

          {/* Lamp SVG */}
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              inset: 0,
            }}
            onClick={toggleLamp}
          >
            {/* Actual lamp svg */}
            <ReaperLamp />

            {/* Inner Glow: A more intense, concentrated glow for the 'on' state */}
            <div
              className="absolute inset-0"
              style={{
                opacity: isOn ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
                pointerEvents: "none",
                mixBlendMode: "screen",
                willChange: "opacity",
              }}
            >
              <div
                className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu"
                style={GLOW_ON_INNER_STYLE}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}