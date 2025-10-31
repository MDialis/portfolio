"use client";

import { useEffect, useRef } from "react";

// SKULL: Reacts faster (higher smoothing), moves less (higher moveFactor)
const SKULL_SMOOTHING = 0.3;
const SKULL_MOVE_FACTOR = 35;
const SKULL_MAX_MOVE_PX = 20; 

// CAPE: Reacts slower (lower smoothing), moves more (lower moveFactor)
const CAPE_SMOOTHING = 0.1;
const CAPE_MOVE_FACTOR = 35;
const CAPE_MAX_MOVE_PX = 12;

export default function Reaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skullRef = useRef<HTMLDivElement>(null);
  const capeRef = useRef<HTMLDivElement>(null);

  // Cursor position
  const cursorPos = useRef({ x: 0, y: 0 });
  const isCursorActive = useRef(false);

  // Separate CURRENT positions for each part
  const skullPos = useRef({ x: 0, y: 0 });
  const capePos = useRef({ x: 0, y: 0 });

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
    // FIX: Changed this to call handleCursorLeave
    document.documentElement.addEventListener("mouseleave", handleCursorLeave);

    const animate = () => {
      let baseTargetX = 0;
      let baseTargetY = 0;

      if (isCursorActive.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const containerCenterX = rect.left + rect.width / 2;
        const containerCenterY = rect.top + rect.height / 2;

        // Distance from cursor to center
        const offsetX = cursorPos.current.x - containerCenterX;
        const offsetY = cursorPos.current.y - containerCenterY;

        baseTargetX = offsetX;
        baseTargetY = offsetY;
      }
      
      // --- Skull Movement ---
      // Skull's target position (divided by factor AND clamped)
      let skullTargetX = baseTargetX / SKULL_MOVE_FACTOR;
      let skullTargetY = baseTargetY / SKULL_MOVE_FACTOR;
      
      // Apply the maximum limit (clamp)
      skullTargetX = Math.min(Math.max(skullTargetX, -SKULL_MAX_MOVE_PX), SKULL_MAX_MOVE_PX);
      skullTargetY = Math.min(Math.max(skullTargetY, -SKULL_MAX_MOVE_PX), SKULL_MAX_MOVE_PX);

      // Skull's current position
      const skullCurrentX = skullPos.current.x;
      const skullCurrentY = skullPos.current.y;

      // Interpolate (Lerp) to the new position
      const skullNewX = skullCurrentX + (skullTargetX - skullCurrentX) * SKULL_SMOOTHING;
      const skullNewY = skullCurrentY + (skullTargetY - skullCurrentY) * SKULL_SMOOTHING;
      
      // Update the current position and the DOM
      skullPos.current = { x: skullNewX, y: skullNewY };
      if (skullRef.current) {
        skullRef.current.style.transform = `translate(${skullNewX}px, ${skullNewY}px)`;
      }

      // --- Cape Movement ---
      // Cape's target position (with its own factors)
      let capeTargetX = baseTargetX / CAPE_MOVE_FACTOR;
      let capeTargetY = baseTargetY / CAPE_MOVE_FACTOR;
      
      // Apply the maximum limit (clamp)
      capeTargetX = Math.min(Math.max(capeTargetX, -CAPE_MAX_MOVE_PX), CAPE_MAX_MOVE_PX);
      capeTargetY = Math.min(Math.max(capeTargetY, -CAPE_MAX_MOVE_PX), CAPE_MAX_MOVE_PX);

      // Cape's current position
      const capeCurrentX = capePos.current.x;
      const capeCurrentY = capePos.current.y;

      // Interpolate (Lerp) to the new position
      const capeNewX = capeCurrentX + (capeTargetX - capeCurrentX) * CAPE_SMOOTHING;
      const capeNewY = capeCurrentY + (capeTargetY - capeCurrentY) * CAPE_SMOOTHING;

      // Update the current position and the DOM
      capePos.current = { x: capeNewX, y: capeNewY };
      if (capeRef.current) {
        capeRef.current.style.transform = `translate(${capeNewX}px, ${capeNewY}px)`;
      }
      
      // Continue the loop
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate(); // Start the loop

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleCursorMove);
      document.documentElement.removeEventListener("mouseleave", handleCursorLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []); // [] = Runs only once

  return (
    <div ref={containerRef} className="ghost-container">
      <div ref={skullRef} id="ghost-skull" className="ghost-part"></div>
      <div ref={capeRef} id="ghost-cape" className="ghost-part"></div>
    </div>
  );
}