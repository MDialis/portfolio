"use client";

import { useEffect, useRef, RefObject, useCallback } from "react";

// --- SVG Imports ---
import FrontHoodie from "../assets/reaper/FrontHoodie.svg";
import Eyes from "../assets/reaper/Eyes.svg";
import Nose from "../assets/reaper/Nose.svg";
import Skull from "../assets/reaper/Skull.svg";
import BackHoodie from "../assets/reaper/BackHoodie.svg";
import FrontCape from "../assets/reaper/FrontCape.svg";
import BackCape from "../assets/reaper/BackCape.svg";
import { followMove, updatePartPosition } from "@/hooks/followMove";

// --- Physics Constants (Tweak these values) ---
const SKULL_SMOOTHING = 0.3;
const SKULL_MOVE_FACTOR = 9;
const SKULL_MAX_MOVE_PX = 70;

// Eyes (Moves slightly more than the skull)
const EYES_SMOOTHING = 0.35;
const EYES_MOVE_FACTOR = 8;
const EYES_MAX_MOVE_PX = 75;

// Front Hoodie
const FRONT_HOODIE_SMOOTHING = 0.25;
const FRONT_HOODIE_MOVE_FACTOR = 10;
const FRONT_HOODIE_MAX_MOVE_PX = 65;

// Back Hoodie
const BACK_HOODIE_SMOOTHING = 0.25;
const BACK_HOODIE_MOVE_FACTOR = 10;
const BACK_HOODIE_MAX_MOVE_PX = 65;

// Front Cape
const FRONT_CAPE_SMOOTHING = 0.2;
const FRONT_CAPE_MOVE_FACTOR = 13;
const FRONT_CAPE_MAX_MOVE_PX = 55;

// Back Cape
const BACK_CAPE_SMOOTHING = 0.2;
const BACK_CAPE_MOVE_FACTOR = 15;
const BACK_CAPE_MAX_MOVE_PX = 55;

interface ReaperProps {
  size: number;
}

export default function Reaper({ size }: ReaperProps) {
  // --- DOM Refs ---
  const containerRef = useRef<HTMLDivElement>(null); // A ref to the main container, used to find its center

  // Refs for each individual layer/group wrapper
  const skullGroupRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const frontHoodieRef = useRef<HTMLDivElement>(null);
  const backHoodieRef = useRef<HTMLDivElement>(null);
  const frontCapeRef = useRef<HTMLDivElement>(null);
  const backCapeRef = useRef<HTMLDivElement>(null);

  // Stores the current animated {x, y} position for each part
  const skullGroupPos = useRef({ x: 0, y: 0 });
  const eyesPos = useRef({ x: 0, y: 0 });
  const frontHoodiePos = useRef({ x: 0, y: 0 });
  const backHoodiePos = useRef({ x: 0, y: 0 });
  const frontCapePos = useRef({ x: 0, y: 0 });
  const backCapePos = useRef({ x: 0, y: 0 });

  // Animation handlers For each part of the body
  const handleAnimate = useCallback(
    (baseTargetX: number, baseTargetY: number) => {
      updatePartPosition(
        baseTargetX,
        baseTargetY,
        backCapeRef,
        backCapePos,
        BACK_CAPE_MOVE_FACTOR,
        BACK_CAPE_MAX_MOVE_PX,
        BACK_CAPE_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        backHoodieRef,
        backHoodiePos,
        BACK_HOODIE_MOVE_FACTOR,
        BACK_HOODIE_MAX_MOVE_PX,
        BACK_HOODIE_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        skullGroupRef,
        skullGroupPos,
        SKULL_MOVE_FACTOR,
        SKULL_MAX_MOVE_PX,
        SKULL_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        eyesRef,
        eyesPos,
        EYES_MOVE_FACTOR,
        EYES_MAX_MOVE_PX,
        EYES_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        frontHoodieRef,
        frontHoodiePos,
        FRONT_HOODIE_MOVE_FACTOR,
        FRONT_HOODIE_MAX_MOVE_PX,
        FRONT_HOODIE_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        frontCapeRef,
        frontCapePos,
        FRONT_CAPE_MOVE_FACTOR,
        FRONT_CAPE_MAX_MOVE_PX,
        FRONT_CAPE_SMOOTHING
      );
    },
    []
  );

  // Start the follow-move animation loop
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
      <div ref={backCapeRef} className="ghost-assembly">
        <BackCape id="back-cape" />
      </div>

      <div ref={frontCapeRef} className="ghost-assembly">
        <FrontCape id="front-cape" />
      </div>

      <div ref={backHoodieRef} className="ghost-assembly">
        <BackHoodie id="back-hoodie" />
      </div>

      <div ref={skullGroupRef} className="ghost-assembly">
        <Skull id="skull" />
        <Nose id="nose" />
      </div>

      <div ref={eyesRef} className="ghost-assembly">
        <Eyes id="eyes" />
      </div>

      <div ref={frontHoodieRef} className="ghost-assembly">
        <FrontHoodie id="front-hoodie" />
      </div>
    </div>
  );
}
