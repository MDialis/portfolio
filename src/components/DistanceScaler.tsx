"use client";

import { useCarouselMoving } from "@/contexts/CarouselContext";
import React, { useRef, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ============================================================================
// GLOBAL MASTER ENGINE
// ============================================================================

let viewportWidth = 0;
let viewportHeight = 0;
let parentElement: HTMLElement | null = null;
let lastParentLeft = -99999;
let isLoopRunning = false;
let globalIdleFrames = 0;

const subscribers = new Set<any>();

if (typeof window !== "undefined") {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;
  window.addEventListener("resize", () => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    lastParentLeft = -99999; 
    subscribers.forEach(sub => (sub.initialized = false));
    startGlobalLoop();
  });
}

const startGlobalLoop = () => {
  if (isLoopRunning) return;
  isLoopRunning = true;
  globalIdleFrames = 0;

  const tick = () => {
    if (subscribers.size === 0) {
      isLoopRunning = false;
      return;
    }

    if (!parentElement) {
      const firstSub = subscribers.values().next().value;
      parentElement = firstSub.measureRef.current?.parentElement || null;
    }

    if (!parentElement) {
      requestAnimationFrame(tick);
      return;
    }

    const parentRect = parentElement.getBoundingClientRect();
    const hasMoved = Math.abs(parentRect.left - lastParentLeft) > 0.1;

    if (hasMoved || lastParentLeft === -99999) {
      lastParentLeft = parentRect.left;
      globalIdleFrames = 0;

      subscribers.forEach((sub) => {
        if (!sub.initialized) {
          const rect = sub.measureRef.current.getBoundingClientRect();
          sub.offsetX = rect.left - parentRect.left;
          sub.offsetY = rect.top - parentRect.top;
          sub.width = rect.width;
          sub.height = rect.height;
          sub.initialized = true;
        }

        const elementCenterX = parentRect.left + sub.offsetX + (sub.width / 2);
        const elementCenterY = parentRect.top + sub.offsetY + (sub.height / 2);

        sub.calculate(elementCenterX, elementCenterY);
      });

      subscribers.forEach((sub) => sub.write());
    } else {
      globalIdleFrames++;
    }

    let isAnyContextMoving = false;
    subscribers.forEach((sub) => {
      if (sub.isMovingRef.current) isAnyContextMoving = true;
    });

    if (isAnyContextMoving || globalIdleFrames < 15) {
      requestAnimationFrame(tick);
    } else {
      isLoopRunning = false;
    }
  };

  requestAnimationFrame(tick);
};

// ============================================================================
// COMPONENT
// ============================================================================

interface DistanceScalerProps {
  children: React.ReactNode;
  className?: string;
  vertical?: boolean;
  horizontal?: boolean;
  deform?: boolean;
  maxScale?: number;
  minScale?: number;
  maxRotation?: number;
}

export const DistanceScaler: React.FC<DistanceScalerProps> = ({
  children,
  className = "",
  vertical = false,
  horizontal = false,
  maxScale = 1,
  minScale = 0.5,
  deform = false,
  maxRotation = 25,
}) => {
  const measureRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<HTMLDivElement>(null);

  const isMoving = useCarouselMoving();
  const isMovingRef = useRef(isMoving);
  isMovingRef.current = isMoving;

  useEffect(() => {
    if (isMoving) {
      startGlobalLoop();
    }
  }, [isMoving]);

  useIsomorphicLayoutEffect(() => {
    let calculatedTransform = "";
    let calculatedZIndex = "";
    
    let lastAppliedTransform = "";
    let lastAppliedZIndex = "";

    const calculateTransformation = (elementCenterX: number, elementCenterY: number) => {
      const viewCenterX = viewportWidth / 2;
      const viewCenterY = viewportHeight / 2;

      const physicalDistX = elementCenterX - viewCenterX;
      const physicalDistY = elementCenterY - viewCenterY;

      const normX = Math.abs(physicalDistX) / viewCenterX;
      const normY = Math.abs(physicalDistY) / viewCenterY;

      const boundary = 0.7; 
      const pileSpeed = 0.2; 

      const progressX = Math.min(normX / boundary, 1);
      const progressY = Math.min(normY / boundary, 1);

      let distanceFactor = 0;
      if (vertical) distanceFactor = progressY;
      if (horizontal) distanceFactor = progressX;
      if (!vertical && !horizontal) distanceFactor = Math.max(progressY, progressX);

      const currentScale = maxScale - distanceFactor * (maxScale - minScale);
      
      const rawDistance = Math.max(Math.abs(physicalDistX), Math.abs(physicalDistY));
      const zIndex = 1000 - Math.floor(rawDistance / 20);

      let transformString = `scale(${currentScale})`;

      if (deform) {
        let rotateX = 0;
        let rotateY = 0;
        let translateX = 0;
        let translateY = 0;

        const calcPileTranslate = (physDist: number, radius: number, progress: number) => {
          const absDist = Math.abs(physDist);
          const sign = Math.sign(physDist);
          const threshold = radius * boundary;

          let targetVisualDist;
          if (absDist < threshold) {
            targetVisualDist = absDist; 
          } else {
            targetVisualDist = threshold + (absDist - threshold) * pileSpeed;
          }

          const tiltPush = progress * maxRotation * 2;
          return (sign * targetVisualDist) - physDist - (sign * tiltPush);
        };

        if (horizontal || (!vertical && !horizontal)) {
          rotateY = -Math.sign(physicalDistX) * progressX * maxRotation;
          translateX = calcPileTranslate(physicalDistX, viewCenterX, progressX);
        }

        if (vertical || (!vertical && !horizontal)) {
          rotateX = Math.sign(physicalDistY) * progressY * maxRotation;
          translateY = calcPileTranslate(physicalDistY, viewCenterY, progressY);
        }

        transformString = `perspective(1000px) translate3d(${translateX}px, ${translateY}px, 0) scale(${currentScale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      calculatedTransform = transformString;
      calculatedZIndex = zIndex.toString();
    };

    const subscriber = {
      measureRef,
      isMovingRef,
      initialized: false,
      offsetX: 0,
      offsetY: 0,
      width: 0,
      height: 0,
      calculate: calculateTransformation,
      write: () => {
        if (transformRef.current && measureRef.current) {
          if (lastAppliedTransform !== calculatedTransform) {
            transformRef.current.style.transform = calculatedTransform;
            lastAppliedTransform = calculatedTransform;
          }
          if (lastAppliedZIndex !== calculatedZIndex) {
            measureRef.current.style.zIndex = calculatedZIndex;
            lastAppliedZIndex = calculatedZIndex;
          }
        }
      }
    };

    subscribers.add(subscriber);
    
    lastParentLeft = -99999;
    startGlobalLoop();

    return () => {
      subscribers.delete(subscriber);
    };
  }, [vertical, horizontal, maxScale, minScale, deform, maxRotation]);

  return (
    <div 
      ref={measureRef} 
      className={`relative ${className} ${isMoving ? "pointer-events-none" : ""}`}
    >
      <div 
        ref={transformRef}
        className="w-full h-full will-change-transform"
        style={{ transformStyle: "preserve-3d", position: "relative" }} 
      >
        {children}
      </div>
    </div>
  );
};

export default DistanceScaler;