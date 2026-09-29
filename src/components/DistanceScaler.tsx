"use client";

import { useCarouselMoving } from "@/contexts/CarouselContext";
import React, { useRef, useEffect, useLayoutEffect } from "react";

// Prevents React warnings when using useLayoutEffect in Next.js Server-Side Rendering
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// ============================================================================
// GLOBAL MASTER ENGINE
// Centralized loop to prevent Layout Thrashing. 1 Read -> N Math -> N Writes per frame.
// ============================================================================

let viewportWidth = 0;
let viewportHeight = 0;
let isLoopRunning = false;
let globalIdleFrames = 0;
let initFrames = 0;

const carouselGroups = new Map<
  HTMLElement,
  {
    lastParentLeft: number;
    subscribers: Set<any>;
  }
>();

if (typeof window !== "undefined") {
  viewportWidth = window.innerWidth;
  viewportHeight = window.innerHeight;

  const forceRecalculation = () => {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    initFrames = 0; // Restart the warm-up phase

    // Reset cache for all carousels
    carouselGroups.forEach((group) => {
      group.lastParentLeft = -99999;
      group.subscribers.forEach((sub) => (sub.initialized = false));
    });

    startGlobalLoop();
  };

  window.addEventListener("resize", forceRecalculation);
  window.addEventListener("load", forceRecalculation);
}

const startGlobalLoop = () => {
  if (isLoopRunning) return;
  isLoopRunning = true;
  globalIdleFrames = 0;

  const tick = () => {
    if (carouselGroups.size === 0) {
      isLoopRunning = false;
      return;
    }

    const isWarmUpPhase = initFrames < 30;
    if (isWarmUpPhase) {
      initFrames++;
    }

    let isAnyContextMoving = false;
    let anyGroupMoved = false;

    // Iterate through each independent carousel on the page
    carouselGroups.forEach((group, parentElement) => {
      if (group.subscribers.size === 0) return;

      // Single DOM Read per carousel
      const parentRect = parentElement.getBoundingClientRect();
      const hasMoved = Math.abs(parentRect.left - group.lastParentLeft) > 0.1;

      if (isWarmUpPhase) {
        group.lastParentLeft = -99999; // Bypass the cache during warm-up
      }

      if (hasMoved || group.lastParentLeft === -99999) {
        group.lastParentLeft = parentRect.left;
        anyGroupMoved = true;

        // Math & Caching
        group.subscribers.forEach((sub) => {
          if (!sub.initialized || isWarmUpPhase) {
            const rect = sub.measureRef.current.getBoundingClientRect();
            sub.offsetX = rect.left - parentRect.left;
            sub.offsetY = rect.top - parentRect.top;
            sub.width = rect.width;
            sub.height = rect.height;
            sub.initialized = true;
          }

          const elementCenterX = parentRect.left + sub.offsetX + sub.width / 2;
          const elementCenterY = parentRect.top + sub.offsetY + sub.height / 2;

          sub.calculate(elementCenterX, elementCenterY);
        });

        // Batched Writes
        group.subscribers.forEach((sub) => sub.write());
      }

      // Check if this specific carousel is currently being dragged
      group.subscribers.forEach((sub) => {
        if (sub.isMovingRef.current) isAnyContextMoving = true;
      });
    });

    if (anyGroupMoved) {
      globalIdleFrames = 0;
    } else {
      globalIdleFrames++;
    }

    // Loop stays alive if ANY carousel is moving, settling, or warming up
    if (isAnyContextMoving || globalIdleFrames < 15 || isWarmUpPhase) {
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
    const parentElement = measureRef.current?.parentElement;
    if (!parentElement) return;

    // Ensure the group exists in the global map for this specific carousel container
    if (!carouselGroups.has(parentElement)) {
      carouselGroups.set(parentElement, {
        lastParentLeft: -99999,
        subscribers: new Set(),
      });
    }

    const group = carouselGroups.get(parentElement)!;

    let calculatedTransform = "";
    let calculatedZIndex = "";

    let lastAppliedTransform = "";
    let lastAppliedZIndex = "";

    const calculateTransformation = (
      elementCenterX: number,
      elementCenterY: number,
    ) => {
      const viewCenterX = viewportWidth / 2;
      const viewCenterY = viewportHeight / 2;

      const physicalDistX = elementCenterX - viewCenterX;
      const physicalDistY = elementCenterY - viewCenterY;

      const normX = Math.abs(physicalDistX) / viewCenterX;
      const normY = Math.abs(physicalDistY) / viewCenterY;

      // Deck Settings
      const boundary = 0.7; // Start stacking at 70% of screen distance
      const pileSpeed = 0.2; // Move at 20% speed once inside the stack

      const progressX = Math.min(normX / boundary, 1);
      const progressY = Math.min(normY / boundary, 1);

      let distanceFactor = 0;
      if (vertical) distanceFactor = progressY;
      if (horizontal) distanceFactor = progressX;
      if (!vertical && !horizontal)
        distanceFactor = Math.max(progressY, progressX);

      const currentScale = maxScale - distanceFactor * (maxScale - minScale);

      // Forces elements physically closer to the screen center to render on top
      const rawDistance = Math.max(
        Math.abs(physicalDistX),
        Math.abs(physicalDistY),
      );
      const zIndex = Math.round(10000 - rawDistance);

      let transformString = `scale(${currentScale})`;

      if (deform) {
        let rotateX = 0;
        let rotateY = 0;
        let translateX = 0;
        let translateY = 0;

        const calcPileTranslate = (
          physDist: number,
          radius: number,
          progress: number,
        ) => {
          const absDist = Math.abs(physDist);
          const sign = Math.sign(physDist);
          const threshold = radius * boundary;

          let targetVisualDist;
          if (absDist < threshold) {
            targetVisualDist = absDist;
          } else {
            targetVisualDist = threshold + (absDist - threshold) * pileSpeed;
          }

          // Counter-acts the physical scroll by pushing the element backwards, locking it visually in the deck
          const tiltPush = progress * maxRotation * 2;
          return sign * targetVisualDist - physDist - sign * tiltPush;
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
          // Strict caching ensures we only write to the DOM if values actively changed
          if (lastAppliedTransform !== calculatedTransform) {
            transformRef.current.style.transform = calculatedTransform;
            lastAppliedTransform = calculatedTransform;
          }
          if (lastAppliedZIndex !== calculatedZIndex) {
            measureRef.current.style.zIndex = calculatedZIndex;
            lastAppliedZIndex = calculatedZIndex;
          }
        }
      },
    };

    // Register card to its specific parent group
    group.subscribers.add(subscriber);

    // Kick off the engine
    initFrames = 0;
    startGlobalLoop();

    return () => {
      // Clean up when unmounting
      group.subscribers.delete(subscriber);
      if (group.subscribers.size === 0) {
        carouselGroups.delete(parentElement);
      }
    };
  }, [vertical, horizontal, maxScale, minScale, deform, maxRotation]);

  return (
    <div
      ref={measureRef}
      // pointer-events-none disables CSS hover transitions while dragging to prevent JS/CSS fighting
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
