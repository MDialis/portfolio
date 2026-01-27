"use client";

import React, { useRef, useEffect } from "react";

interface DistanceScalerProps {
  children: React.ReactNode;
  vertical?: boolean;
  horizontal?: boolean;
  deform?: boolean;
  maxScale?: number;
  minScale?: number;
  maxRotation?: number;
  className?: string;
}

export const DistanceScaler: React.FC<DistanceScalerProps> = ({
  children,
  vertical = false,
  horizontal = false,
  maxScale = 1,
  minScale = 0.5,
  deform = false,
  maxRotation = 45,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const updateScale = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate centers
      const viewCenterX = viewportWidth / 2;
      const viewCenterY = viewportHeight / 2;

      // Calculate element center relative to the viewport
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      // --- 1. Calculate Distances for Scaling (Absolute) ---
      let distanceFactor = 0; // 0 = center, 1 = edge
      const absDistY = Math.abs(elementCenterY - viewCenterY);
      const absDistX = Math.abs(elementCenterX - viewCenterX);

      const normY = Math.min(absDistY / (viewportHeight / 2), 1);
      const normX = Math.min(absDistX / (viewportWidth / 2), 1);

      if (vertical) {
        distanceFactor = Math.max(distanceFactor, normY);
      }
      if (horizontal) {
        distanceFactor = Math.max(distanceFactor, normX);
      }
      if (!vertical && !horizontal) {
        distanceFactor = Math.max(normY, normX);
      }

      const currentScale = maxScale - distanceFactor * (maxScale - minScale);

      // --- Calculate Deformation (Signed Distances) ---
      let transformString = `scale(${currentScale})`;

      if (deform) {
        // We calculate signed Normalization (-1 to 1)
        // -1 = Top/Left, 1 = Bottom/Right
        const signedNormX = (elementCenterX - viewCenterX) / (viewportWidth / 2);
        const signedNormY = (elementCenterY - viewCenterY) / (viewportHeight / 2);

        let rotateX = 0;
        let rotateY = 0;
        let translateX = 0;
        let translateY = 0;

        // Logic: If element is to the Left (-X), we want the Right side to pop out (towards center).
        // This means RotateY should be Positive.
        if (horizontal || (!vertical && !horizontal)) {
          rotateY = -signedNormX * maxRotation; 
          // Invert the signed distance to pull towards center
          translateX = -signedNormX * maxRotation * 2;
        }

        // Logic: If element is to the Top (-Y), we want the Bottom side to pop out.
        // This means RotateX should be Positive.
        if (vertical || (!vertical && !horizontal)) {
          rotateX = signedNormY * maxRotation; 
          // Invert the signed distance to pull towards center
          translateY = -signedNormY * maxRotation * 2;
        }
        
        // Add perspective and rotations to the transform string
        // Note: Perspective must come first in the string
        transformString = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) scale(${currentScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      // Apply transform directly // `scale(${currentScale})`
      ref.current.style.transform = transformString;

      // Schedule next frame
      animationFrameId = requestAnimationFrame(updateScale);
    };

    // Start the loop
    updateScale();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [vertical, horizontal, maxScale, minScale, deform, maxRotation]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ease-out ${className}`}
      // Ensure the parent preserves 3d if needed, though perspective() in transform handles most cases
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default DistanceScaler;