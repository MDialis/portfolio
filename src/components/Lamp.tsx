"use client";

import { useRef, useCallback } from "react";
import { followMove, updatePartPosition } from "@/hooks/followMove";
import { useTheme } from "@/components/ThemeProvider";

import ReaperLamp from "@/assets/lamp/Lamp.svg";
// import LampOff from "@/assets/lamp/LampOff.svg";
// import LampOn from "@/assets/lamp/LampOn.svg";

const BODY_SMOOTHING = 0.2;
const BODY_MOVE_FACTOR = 12;
const BODY_MAX_MOVE_PX = 60;

interface LampProps {
  size: number;
}

export default function Lamp({ size }: LampProps) {
  //  const [isOn, setIsOn] = useState(false);

  const { theme, setTheme } = useTheme();
  const isOn = theme === "light";

  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const bodyPos = useRef({ x: 0, y: 0 });

  const handleAnimate = useCallback(
    (baseTargetX: number, baseTargetY: number) => {
      updatePartPosition(
        baseTargetX,
        baseTargetY,
        bodyRef,
        bodyPos,
        BODY_MOVE_FACTOR,
        BODY_MAX_MOVE_PX,
        BODY_SMOOTHING
      );
    },
    []
  );

  followMove(containerRef, handleAnimate);

  const toggleLamp = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  return (
    <div
      ref={containerRef}
      className="ghost-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
      }}
    >
      <div
        ref={bodyRef}
        className="ghost-assembly"
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <div>
          <div
            className="absolute inset-0"
            style={{
              opacity: isOn ? 0 : 1,
              transition: "opacity 0.2s ease-in-out",
              pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          >
            <div
              className="absolute w-[100vh] h-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  "radial-gradient(circle, rgba(28, 50, 127, 0.7) 5%, rgb(41, 95, 156, 0.5) 10%, rgba(118, 239, 251, 0.2) 20%, rgb(0, 0, 0, 0) 40%)",
                filter: "blur(100px)",
              }}
            />
          </div>

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
                  "radial-gradient(circle, rgba(253, 218, 119, 0.8) 5%, rgb(242, 240, 183, 0.5) 10%, rgba(118, 239, 251, 0.2) 20%, rgb(0, 0, 0, 0) 70%)",
                filter: "blur(100px)",
              }}
            />
          </div>
          <div
            style={{
              cursor: "pointer",
              position: "absolute",
              inset: 0,
            }}
            onClick={toggleLamp}
          >
            <ReaperLamp />
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
