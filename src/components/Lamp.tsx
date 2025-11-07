"use client";

import { useRef, useCallback, useState } from "react";
import { followMove, updatePartPosition } from "@/hooks/followMove";

import LampOff from "@/assets/lamp/LampOff.svg";
import LampOn from "@/assets/lamp/LampOn.svg";

const BODY_SMOOTHING = 0.2;
const BODY_MOVE_FACTOR = 12;
const BODY_MAX_MOVE_PX = 60;

interface LampProps {
  size: number;
}

export default function Lamp({ size }: LampProps) {
  const [isOn, setIsOn] = useState(false);

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
    setIsOn((prev) => !prev);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={toggleLamp}
      className="ghost-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: "pointer",
        position: "relative",
        mixBlendMode: "screen",
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
        {/* "Off" State Wrapper */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isOn ? 0 : 1,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <div
            className="absolute w-[100vh] h-screen top-15 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(28, 50, 127, 0.7) 5%, rgb(41, 95, 156, 0.5) 10%, rgba(118, 239, 251, 0.1) 20%, rgb(0, 0, 0, 0) 40%)",
              filter: "blur(100px)",
            }}
          />
          <LampOff />
        </div>

        {/* "On" State Wrapper */}
        <div
          className="absolute inset-0"
          style={{
            opacity: isOn ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <div
            className="absolute w-[100vh] h-screen top-15 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              background:
                "radial-gradient(circle, rgba(28, 50, 127, 0.8) 5%, rgb(41, 95, 156, 0.7) 10%, rgba(118, 239, 251, 0.15) 50%, rgb(0, 0, 0, 0) 70%)",
              filter: "blur(100px)",
            }}
          />
          <div style={{ mixBlendMode: "normal" }}>
            <LampOn />
          </div>
        </div>
      </div>
    </div>
  );
}
