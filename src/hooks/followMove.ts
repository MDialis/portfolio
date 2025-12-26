"use client";

import { useEffect, useRef, RefObject } from "react";

export function followMove(
  containerRef: RefObject<HTMLDivElement | null>,
  onAnimate: (baseTargetX: number, baseTargetY: number) => void
) {
  // --- Position Refs ---
  const cursorPos = useRef({ x: 0, y: 0 });
  const isCursorActive = useRef(false);
  const animFrameRef = useRef<number>(0);
  const containerRect = useRef({ left: 0, top: 0, width: 0, height: 0 });
  const onAnimateRef = useRef(onAnimate);

  useEffect(() => {
    onAnimateRef.current = onAnimate;
  }, [onAnimate]);

  useEffect(() => {
    const updateContainerRect = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        // We only store what we need to avoid keeping the DOMRect object
        containerRect.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        };
      }
    };

    // --- Event Handlers ---
    const handleCursorMove = (event: MouseEvent) => {
      cursorPos.current = { x: event.clientX, y: event.clientY };
      isCursorActive.current = true;
    };

    // When the cursor leaves, set it to inactive
    const handleCursorLeave = () => {
      isCursorActive.current = false;
    };

    // Update rect on scroll or resize (these change the element's position)
    const handleLayoutChange = () => {
      updateContainerRect();
    };

    // --- Init Listeners ---
    window.addEventListener("mousemove", handleCursorMove);
    document.documentElement.addEventListener("mouseleave", handleCursorLeave);

    // Listen for scroll/resize to update the cached rect
    window.addEventListener("scroll", handleLayoutChange, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", handleLayoutChange, { passive: true });

    // Initial calculation
    updateContainerRect();

    // --- Main Animation Loop ---
    const animate = () => {
      let baseTargetX = 0;
      let baseTargetY = 0;

      // Check if cursor is active and container exists
      if (isCursorActive.current && containerRef.current) {
        // Find the center of the container
        const { left, top, width, height } = containerRect.current;

        if (width > 0 || height > 0) {
          const containerCenterX = left + width / 2;
          const containerCenterY = top + height / 2;

          // Calculate the raw distance from cursor to center
          baseTargetX = cursorPos.current.x - containerCenterX;
          baseTargetY = cursorPos.current.y - containerCenterY;
        }
      }

      onAnimateRef.current(baseTargetX, baseTargetY);
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
      document.documentElement.removeEventListener(
        "mouseleave",
        handleCursorLeave
      );

      window.removeEventListener("scroll", handleLayoutChange, {
        capture: true,
      });
      window.removeEventListener("resize", handleLayoutChange);

      // Stop the animation loop to prevent memory leaks
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [containerRef]);
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

  if (!posRef.current || !domRef.current) return;

  // Get the part's current animated position
  const currentX = posRef.current.x;
  const currentY = posRef.current.y;

  // Interpolate (lerp) for smooth motion
  const newX = currentX + (targetX - currentX) * smoothing;
  const newY = currentY + (targetY - currentY) * smoothing;

  // Update the position ref for the next frame
  posRef.current.x = newX;
  posRef.current.y = newY;

  // Apply the new position to the DOM element
  if (domRef.current) {
    domRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
  }
};
