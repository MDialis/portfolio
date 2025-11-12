"use client";

import { useRef, useCallback, useMemo } from "react";
import styles from "./Reaper.module.css";

// --- SVG Imports ---
import FrontHoodie from "../assets/reaper/FrontHoodie.svg";
import Eyes from "../assets/reaper/Eyes.svg";
import Nose from "../assets/reaper/Nose.svg";
import Skull from "../assets/reaper/Skull.svg";
import BackHoodie from "../assets/reaper/BackHoodie.svg";
import FrontCape from "../assets/reaper/FrontCape.svg";
import BackCape from "../assets/reaper/BackCape.svg";
import { followMove, updatePartPosition } from "@/hooks/followMove";

// --- Animation Constants ---
const BASE_SIZE = 350;

// Skull
const SKULL_SMOOTHING = 0.3;
const SKULL_MOVE_FACTOR = 9;
const SKULL_MAX_MOVE_RATIO = 70 / BASE_SIZE;

// Eyes (Moves slightly more than the skull)
const EYES_SMOOTHING = 0.35;
const EYES_MOVE_FACTOR = 8;
const EYES_MAX_MOVE_RATIO = 75 / BASE_SIZE;

// Front Hoodie
const FRONT_HOODIE_SMOOTHING = 0.25;
const FRONT_HOODIE_MOVE_FACTOR = 10;
const FRONT_HOODIE_MAX_MOVE_RATIO = 65 / BASE_SIZE;

// Back Hoodie
const BACK_HOODIE_SMOOTHING = 0.25;
const BACK_HOODIE_MOVE_FACTOR = 10;
const BACK_HOODIE_MAX_MOVE_RATIO = 65 / BASE_SIZE;

// Front Cape
const FRONT_CAPE_SMOOTHING = 0.2;
const FRONT_CAPE_MOVE_FACTOR = 13;
const FRONT_CAPE_MAX_MOVE_RATIO = 55 / BASE_SIZE;

// Back Cape
const BACK_CAPE_SMOOTHING = 0.15;
const BACK_CAPE_MOVE_FACTOR = 15;
const BACK_CAPE_MAX_MOVE_RATIO = 55 / BASE_SIZE;

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

  const maxMoveValues = useMemo(
    () => ({
      skull: size * SKULL_MAX_MOVE_RATIO,
      eyes: size * EYES_MAX_MOVE_RATIO,
      frontHoodie: size * FRONT_HOODIE_MAX_MOVE_RATIO,
      backHoodie: size * BACK_HOODIE_MAX_MOVE_RATIO,
      frontCape: size * FRONT_CAPE_MAX_MOVE_RATIO,
      backCape: size * BACK_CAPE_MAX_MOVE_RATIO,
    }),
    [size]
  );

  // Animation handlers For each part of the body
  const handleAnimate = useCallback(
    (baseTargetX: number, baseTargetY: number) => {
      updatePartPosition(
        baseTargetX,
        baseTargetY,
        backCapeRef,
        backCapePos,
        BACK_CAPE_MOVE_FACTOR,
        maxMoveValues.backCape,
        BACK_CAPE_SMOOTHING
      );
      updatePartPosition(
        baseTargetX,
        baseTargetY,
        backCapeRef,
        backCapePos,
        BACK_CAPE_MOVE_FACTOR,
        maxMoveValues.backCape,
        BACK_CAPE_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        backHoodieRef,
        backHoodiePos,
        BACK_HOODIE_MOVE_FACTOR,
        maxMoveValues.backHoodie,
        BACK_HOODIE_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        skullGroupRef,
        skullGroupPos,
        SKULL_MOVE_FACTOR,
        maxMoveValues.skull,
        SKULL_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        eyesRef,
        eyesPos,
        EYES_MOVE_FACTOR,
        maxMoveValues.eyes,
        EYES_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        frontHoodieRef,
        frontHoodiePos,
        FRONT_HOODIE_MOVE_FACTOR,
        maxMoveValues.frontHoodie,
        FRONT_HOODIE_SMOOTHING
      );

      updatePartPosition(
        baseTargetX,
        baseTargetY,
        frontCapeRef,
        frontCapePos,
        FRONT_CAPE_MOVE_FACTOR,
        maxMoveValues.frontCape,
        FRONT_CAPE_SMOOTHING
      );
    },
    [maxMoveValues]
  );

  // Start the follow-move animation loop
  followMove(containerRef, handleAnimate);

  return (
    <div
      ref={containerRef}
      className={styles.reaperContainer}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: "relative",
      }}
    >
      <div ref={backCapeRef} className={styles.reaperAssembly}>
        <BackCape id="back-cape" />
      </div>

      <div ref={frontCapeRef} className={styles.reaperAssembly}>
        <FrontCape id="front-cape" />
      </div>

      <div ref={backHoodieRef} className={styles.reaperAssembly}>
        <BackHoodie id="back-hoodie" />
      </div>

      <div ref={skullGroupRef} className={styles.reaperAssembly}>
        <Skull id="skull" />
        <Nose id="nose" />
      </div>

      <div ref={eyesRef} className={styles.reaperAssembly}>
        <Eyes id="eyes" />
      </div>

      <div ref={frontHoodieRef} className={styles.reaperAssembly}>
        <FrontHoodie id="front-hoodie" />
      </div>
    </div>
  );
}
