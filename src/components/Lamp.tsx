"use client";

import { useRef, useCallback } from "react";
import { followMove, updatePartPosition } from "@/hooks/followMove";

import LampBody from "@/assets/lamp/LampOff.svg";
import LampFlame from "@/assets/lamp/LampOn.svg";

const BODY_SMOOTHING = 0.2;
const BODY_MOVE_FACTOR = 12;
const BODY_MAX_MOVE_PX = 60;

const FLAME_SMOOTHING = 0.4;
const FLAME_MOVE_FACTOR = 7;
const FLAME_MAX_MOVE_PX = 80;

interface LampProps {
  size: number;
}

export default function Lamp({ size }: LampProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const flameRef = useRef<HTMLDivElement>(null);

  const bodyPos = useRef({ x: 0, y: 0 });
  const flamePos = useRef({ x: 0, y: 0 });

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
      updatePartPosition(
        baseTargetX,
        baseTargetY,
        flameRef,
        flamePos,
        FLAME_MOVE_FACTOR,
        FLAME_MAX_MOVE_PX,
        FLAME_SMOOTHING
      );
    },
    []
  );

  followMove(containerRef, handleAnimate);

  return (
    <div
      ref={containerRef}
      className="ghost-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div ref={bodyRef} className="ghost-assembly">
        <LampBody />
      </div>

      <div ref={flameRef} className="ghost-assembly">
        <LampFlame />
      </div>
    </div>
  );
}
