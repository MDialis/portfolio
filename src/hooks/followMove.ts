"use client";

import { useEffect, useRef, RefObject } from "react";

export function followMove(
  containerRef: RefObject<HTMLDivElement | null>,
  onAnimate: (baseTargetX: number, baseTargetY: number) => void
) {
  // --- Position Refs ---
  const cursorPos = useRef({ x: 0, y: 0 }); // Stores the cursor's current {x, y} position
  const isCursorActive = useRef(false); // Tracks if the cursor is inside the window

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
      onAnimate(baseTargetX, baseTargetY);
      // If cursor is not active, baseTargetX/Y remain 0,
      // so all parts will animate back to their center.

      // Continue the loop on the next frame
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate(); // Starts the loop

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
  }, [containerRef, onAnimate]);
}

// function to calculate and apply the new position for a single part.
export const updatePartPosition = (
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

  //if (!posRef.current || !domRef.current) return;

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

  // domRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
};
