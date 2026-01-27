"use client";

import React, { useRef, useEffect } from "react";

interface DistanceScalerProps {
  children: React.ReactNode;
  vertical?: boolean;
  horizontal?: boolean;
  maxScale?: number;
  minScale?: number;
  className?: string;
}

export const DistanceScaler: React.FC<DistanceScalerProps> = ({
  children,
  vertical = false,
  horizontal = false,
  maxScale = 1,
  minScale = 0.5,
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

      let distanceFactor = 0;

      // Calculate Vertical Distance
      if (vertical) {
        const distY = Math.abs(elementCenterY - viewCenterY);
        const normY = Math.min(distY / (viewportHeight / 2), 1);
        distanceFactor = Math.max(distanceFactor, normY);
      }

      // Calculate Horizontal Distance
      if (horizontal) {
        const distX = Math.abs(elementCenterX - viewCenterX);
        const normX = Math.min(distX / (viewportWidth / 2), 1);
        distanceFactor = Math.max(distanceFactor, normX);
      }

      // Default if neither prop is set
      if (!vertical && !horizontal) {
        const distY = Math.abs(elementCenterY - viewCenterY);
        const distX = Math.abs(elementCenterX - viewCenterX);
        const normY = Math.min(distY / (viewportHeight / 2), 1);
        const normX = Math.min(distX / (viewportWidth / 2), 1);
        distanceFactor = Math.max(normY, normX);
      }

      // Interpolate Scale
      const currentScale = maxScale - distanceFactor * (maxScale - minScale);

      // Apply transform directly
      ref.current.style.transform = `scale(${currentScale})`;

      // Schedule next frame
      animationFrameId = requestAnimationFrame(updateScale);
    };

    // Start the loop
    updateScale();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [vertical, horizontal, maxScale, minScale]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ease-out ${className}`}
    >
      {children}
    </div>
  );
};

export default DistanceScaler;
