"use client";

import { useEffect, useRef, MutableRefObject, RefObject } from "react";

// Importações dos SVGs (sem alteração)
import FrontHoodie from "../assets/reaper/FrontHoodie.svg";
import Eyes from "../assets/reaper/Eyes.svg";
import Nose from "../assets/reaper/Nose.svg";
import Skull from "../assets/reaper/Skull.svg";
import BackHoodie from "../assets/reaper/BackHoodie.svg";
import FrontCape from "../assets/reaper/FrontCape.svg";
import BackCape from "../assets/reaper/BackCape.svg";

const SKULL_SMOOTHING = 0.2;
const SKULL_MOVE_FACTOR = 40;
const SKULL_MAX_MOVE_PX = 15;

const EYES_SMOOTHING = 0.18;
const EYES_MOVE_FACTOR = 35;
const EYES_MAX_MOVE_PX = 18;

const FRONT_HOODIE_SMOOTHING = 0.15;
const FRONT_HOODIE_MOVE_FACTOR = 38;
const FRONT_HOODIE_MAX_MOVE_PX = 16;

const BACK_HOODIE_SMOOTHING = 0.1;
const BACK_HOODIE_MOVE_FACTOR = 45;
const BACK_HOODIE_MAX_MOVE_PX = 12;

const FRONT_CAPE_SMOOTHING = 0.12;
const FRONT_CAPE_MOVE_FACTOR = 30;
const FRONT_CAPE_MAX_MOVE_PX = 22;

const BACK_CAPE_SMOOTHING = 0.08;
const BACK_CAPE_MOVE_FACTOR = 50;
const BACK_CAPE_MAX_MOVE_PX = 10;

export default function Reaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skullGroupRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const frontHoodieRef = useRef<HTMLDivElement>(null);
  const backHoodieRef = useRef<HTMLDivElement>(null);
  const frontCapeRef = useRef<HTMLDivElement>(null);
  const backCapeRef = useRef<HTMLDivElement>(null);

  // --- Refs de Posição ---
  const cursorPos = useRef({ x: 0, y: 0 });
  const isCursorActive = useRef(false);
  const skullGroupPos = useRef({ x: 0, y: 0 });
  const eyesPos = useRef({ x: 0, y: 0 });
  const frontHoodiePos = useRef({ x: 0, y: 0 });
  const backHoodiePos = useRef({ x: 0, y: 0 });
  const frontCapePos = useRef({ x: 0, y: 0 });
  const backCapePos = useRef({ x: 0, y: 0 });

  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const handleCursorMove = (event: MouseEvent) => {
      cursorPos.current = { x: event.clientX, y: event.clientY };
      isCursorActive.current = true;
    };

    const handleCursorLeave = () => {
      isCursorActive.current = false;
    };

    window.addEventListener("mousemove", handleCursorMove);
    document.documentElement.addEventListener("mouseleave", handleCursorLeave);

    const updatePartPosition = (
      baseTargetX: number,
      baseTargetY: number,
      domRef: RefObject<HTMLDivElement>,
      posRef: MutableRefObject<{ x: number; y: number }>,
      moveFactor: number,
      maxMovePx: number,
      smoothing: number
    ) => {
      let targetX = baseTargetX / moveFactor;
      let targetY = baseTargetY / moveFactor;
      targetX = Math.min(Math.max(targetX, -maxMovePx), maxMovePx);
      targetY = Math.min(Math.max(targetY, -maxMovePx), maxMovePx);
      const currentX = posRef.current.x;
      const currentY = posRef.current.y;
      const newX = currentX + (targetX - currentX) * smoothing;
      const newY = currentY + (targetY - currentY) * smoothing;
      posRef.current = { x: newX, y: newY };
      if (domRef.current) {
        domRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    const animate = () => {
      let baseTargetX = 0;
      let baseTargetY = 0;

      if (isCursorActive.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerCenterX = rect.left + rect.width / 2;
        const containerCenterY = rect.top + rect.height / 2;
        baseTargetX = cursorPos.current.x - containerCenterX;
        baseTargetY = cursorPos.current.y - containerCenterY;
      }

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

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate(); 

    return () => {
      window.removeEventListener("mousemove", handleCursorMove);
      document.documentElement.addEventListener(
        "mouseleave",
        handleCursorLeave
      );
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="ghost-container">
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
