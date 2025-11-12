"use client";

import { useRef, useCallback, useMemo } from "react";
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

interface LampProps {
  size: number;
}

export default function Lamp({ size }: LampProps) {
  //  const [isOn, setIsOn] = useState(false);

  // Get theme state and setter from the ThemeProvider context
  const { theme, setTheme } = useTheme();
  const isOn = theme === "light";

  // Refs for DOM elements and animation state
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Ref to store the interpolated (smoothed) position
  const bodyPos = useRef({ x: 0, y: 0 });

  // Calculate the maximum pixels the body can move based on the component's size
  const maxMoveBody = useMemo(() => size * BODY_MAX_MOVE_RATIO, [size]);

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
        width: `${size}px`,
        height: `${size}px`,
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
            }}
          >
            {/* The glow is a large, blurred radial gradient */}
            <div
              className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(circle, rgba(28, 50, 127, 0.7) 5%, rgb(41, 95, 156, 0.5) 10%, rgba(118, 239, 251, 0.2) 20%, rgb(0, 0, 0, 0) 40%)",
                filter: "blur(100px)",
              }}
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
            }}
          >
            {/* The glow is a large, blurred radial gradient */}
            <div
              className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(circle, rgba(253, 218, 119, 0.8) 5%, rgb(242, 240, 183, 0.5) 10%, rgba(118, 239, 251, 0.2) 20%, rgb(0, 0, 0, 0) 70%)",
                filter: "blur(100px)",
              }}
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

            {/* "On" Inner Glow: A more intense, concentrated glow for the 'on' state */}
            <div
              className="absolute inset-0"
              style={{
                opacity: isOn ? 1 : 0,
                transition: "opacity 0.2s ease-in-out",
                pointerEvents: "none",
                mixBlendMode: "screen",
              }}
            >
              <div
                className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    "radial-gradient(circle, rgba(253, 218, 119, 1) 1%, rgb(242, 240, 183, 0.9) 5%, rgba(118, 239, 251, 0.8) 10%, rgb(0, 0, 0, 0) 15%)",
                  filter: "blur(100px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
