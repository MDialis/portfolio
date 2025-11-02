"use client";

import { useEffect, useRef, RefObject } from "react";

// --- SVG Imports ---
import FrontHoodie from "../assets/reaper/FrontHoodie.svg";
import Eyes from "../assets/reaper/Eyes.svg";
import Nose from "../assets/reaper/Nose.svg";
import Skull from "../assets/reaper/Skull.svg";
import BackHoodie from "../assets/reaper/BackHoodie.svg";
import FrontCape from "../assets/reaper/FrontCape.svg";
import BackCape from "../assets/reaper/BackCape.svg";

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
  const containerRef = useRef<HTMLDivElement>(null);      // A ref to the main container, used to find its center
  
  // Refs for each individual layer/group wrapper
  const skullGroupRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const frontHoodieRef = useRef<HTMLDivElement>(null);
  const backHoodieRef = useRef<HTMLDivElement>(null);
  const frontCapeRef = useRef<HTMLDivElement>(null);
  const backCapeRef = useRef<HTMLDivElement>(null);

  // --- Position Refs ---
  const cursorPos = useRef({ x: 0, y: 0 });               // Stores the cursor's current {x, y} position
  const isCursorActive = useRef(false);                   // Tracks if the cursor is inside the window
  
  // Stores the current animated {x, y} position for each part
  const skullGroupPos = useRef({ x: 0, y: 0 });
  const eyesPos = useRef({ x: 0, y: 0 });
  const frontHoodiePos = useRef({ x: 0, y: 0 });
  const backHoodiePos = useRef({ x: 0, y: 0 });
  const frontCapePos = useRef({ x: 0, y: 0 });
  const backCapePos = useRef({ x: 0, y: 0 });

  // Stores the ID of the animation frame to cancel it on unmount
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    // --- Event Handlers ---
    const handleCursorMove = (event: MouseEvent) => {
      cursorPos.current = { x: event.clientX, y: event.clientY };
      isCursorActive.current = true;
    };

    // When the cursor leaves, set it to inactive
    const handleCursorLeave = () => {
      isCursorActive.current = false;
    };

    // Attach listeners
    window.addEventListener("mousemove", handleCursorMove);
    document.documentElement.addEventListener("mouseleave", handleCursorLeave);

    // function to calculate and apply the new position for a single part.
    const updatePartPosition = (
      baseTargetX: number,
      baseTargetY: number,
      domRef: RefObject<HTMLDivElement | null>,
      posRef: React.RefObject<{ x: number; y: number }>,
      moveFactor: number,
      maxMovePx: number,
      smoothing: number
    ) => {
      // Calculate the target position
      let targetX = baseTargetX / moveFactor;
      let targetY = baseTargetY / moveFactor;

      // Clamp the target to the maximum allowed pixels
      targetX = Math.min(Math.max(targetX, -maxMovePx), maxMovePx);
      targetY = Math.min(Math.max(targetY, -maxMovePx), maxMovePx);
      
      // Get the part's current animated position
      const currentX = posRef.current.x;
      const currentY = posRef.current.y;

      // Interpolate (lerp) for smooth motion
      const newX = currentX + (targetX - currentX) * smoothing;
      const newY = currentY + (targetY - currentY) * smoothing;

      // Update the position ref for the next frame
      posRef.current = { x: newX, y: newY };

      // Apply the new position to the DOM element
      if (domRef.current) {
        domRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    };

    // --- Main Animation Loop ---
    const animate = () => {
      let baseTargetX = 0;
      let baseTargetY = 0;

      // Check if cursor is active and container exists
      if (isCursorActive.current && containerRef.current) {
        // Find the center of the container
        const rect = containerRef.current.getBoundingClientRect();
        const containerCenterX = rect.left + rect.width / 2;
        const containerCenterY = rect.top + rect.height / 2;

        // Calculate the raw distance from cursor to center
        baseTargetX = cursorPos.current.x - containerCenterX;
        baseTargetY = cursorPos.current.y - containerCenterY;
      }
      // If cursor is not active, baseTargetX/Y remain 0,
      // so all parts will animate back to their center.

      // Update each part individually using its own physics
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

      // Continue the loop on the next frame
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate(); // Start the loop

    // --- Cleanup Function ---
    // This runs when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleCursorMove);
      document.documentElement.addEventListener(
        "mouseleave",
        handleCursorLeave
      );

      // Stop the animation loop to prevent memory leaks
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []); // [] = Empty dependency array, so this runs only once on mount

  return (
    <div 
      ref={containerRef}
      className="ghost-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}>
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
