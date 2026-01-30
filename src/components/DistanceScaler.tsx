"use client";

import React, { useRef, useEffect, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const viewport = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      viewport.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let animationFrameId: number;

    const updateScale = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      const prev = lastPosition.current;
      const hasMoved = 
        Math.abs(elementCenterX - prev.x) > 0.1 || 
        Math.abs(elementCenterY - prev.y) > 0.1;

      if (hasMoved) {
        lastPosition.current = { x: elementCenterX, y: elementCenterY };

        const { width: viewportWidth, height: viewportHeight } = viewport.current;
        const viewCenterX = viewportWidth / 2;
        const viewCenterY = viewportHeight / 2;

        let distanceFactor = 0;
        
        const absDistY = Math.abs(elementCenterY - viewCenterY);
        const absDistX = Math.abs(elementCenterX - viewCenterX);

        const normY = Math.min(absDistY / (viewportHeight / 2), 1);
        const normX = Math.min(absDistX / (viewportWidth / 2), 1);

        if (vertical) distanceFactor = Math.max(distanceFactor, normY);
        if (horizontal) distanceFactor = Math.max(distanceFactor, normX);
        if (!vertical && !horizontal) distanceFactor = Math.max(normY, normX);

        const currentScale = maxScale - distanceFactor * (maxScale - minScale);

        let transformString = `scale(${currentScale})`;

        if (deform) {
          const signedNormX = (elementCenterX - viewCenterX) / (viewportWidth / 2);
          const signedNormY = (elementCenterY - viewCenterY) / (viewportHeight / 2);

          let rotateX = 0;
          let rotateY = 0;
          let translateX = 0;
          let translateY = 0;

          if (horizontal || (!vertical && !horizontal)) {
            rotateY = -signedNormX * maxRotation;
            translateX = -signedNormX * maxRotation * 2;
          }

          if (vertical || (!vertical && !horizontal)) {
            rotateX = signedNormY * maxRotation;
            translateY = -signedNormY * maxRotation * 2;
          }

          transformString = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) scale(${currentScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        ref.current.style.transform = transformString;
      }

      animationFrameId = requestAnimationFrame(updateScale);
    };

    updateScale();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, vertical, horizontal, maxScale, minScale, deform, maxRotation]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default DistanceScaler;