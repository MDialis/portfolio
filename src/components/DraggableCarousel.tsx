"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState, ReactNode, useCallback } from "react";
import { CarouselProvider } from "@/contexts/CarouselContext";

interface DraggableCarouselProps {
  children: ReactNode;
  className?: string;
  initialIndex?: number;
}

export default function DraggableCarousel({
  children,
  className = "",
  initialIndex = 0,
}: DraggableCarouselProps) {
  const x = useMotionValue(0);
  const [isMoving, setIsMoving] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const isInitializedRef = useRef(false);
  const activeIndexRef = useRef(initialIndex);
  const snapPointsRef = useRef<number[]>([]);

  // Calculate the exact translation needed to center each card
  const updateSnapPoints = useCallback(() => {
    if (!carouselRef.current || !contentRef.current) return;

    const carouselWidth = carouselRef.current.offsetWidth;
    const carouselCenter = carouselWidth / 2;

    // Filter out spacers (spacers have no child elements; cards contain children)
    let cardElements = Array.from(contentRef.current.children).filter(
      (el) => el.children.length > 0
    ) as HTMLElement[];

    // Fallback if no spacers are used
    if (cardElements.length === 0) {
      cardElements = Array.from(contentRef.current.children) as HTMLElement[];
    }

    if (cardElements.length === 0) return;

    // Snap point formula: carouselCenter - (cardLeft + cardWidth / 2)
    const points = cardElements.map((card) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      return Math.round(carouselCenter - cardCenter);
    });

    snapPointsRef.current = points;

    // Set constraints to the outer limits of the cards
    // points[0] is the right limit (first card), points[last] is the left limit (last card)
    const maxRight = points[0];
    const maxLeft = points[points.length - 1];

    setConstraints({ right: maxRight, left: maxLeft });

    // On initial load, immediately align the initial card without animation
    if (!isInitializedRef.current && points[initialIndex] !== undefined) {
      x.set(points[initialIndex]);
      isInitializedRef.current = true;
    } else if (!isDraggingRef.current && points[activeIndexRef.current] !== undefined) {
      // Keep currently active card centered on screen resize/orientation change
      x.set(points[activeIndexRef.current]);
    }
  }, [initialIndex, x]);

  useEffect(() => {
    if (!carouselRef.current || !contentRef.current) return;

    updateSnapPoints();

    const resizeObserver = new ResizeObserver(() => {
      updateSnapPoints();
    });

    resizeObserver.observe(carouselRef.current);
    resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, [children, updateSnapPoints]);

  // --- LOGIC TO DETECT MOVEMENT (Drag + Inertia) ---
  const handleUpdate = useCallback(() => {
    // If we aren't marked as moving yet, do it now.
    // (React won't re-render if we set true when it's already true)
    setIsMoving(true);

    // Clear the timer that would turn it off
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a timer. If no updates happen for 150ms, assume we stopped.
    timeoutRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 150);
  }, []);

  const handleDragStart = () => {
    isDraggingRef.current = true;
    handleUpdate();
  };

  const handleDragEnd = () => {
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 150);
    // Note: We do NOT set isMoving(false) here because inertia might still be going.
    // handleUpdate will take care of that.
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Determine which snap point to lock into based on flick momentum
  const handleModifyTarget = useCallback((target: number) => {
    const snapPoints = snapPointsRef.current;
    if (!snapPoints || snapPoints.length === 0) return target;

    let closest = snapPoints[0];
    let closestIndex = 0;
    let minDistance = Math.abs(target - snapPoints[0]);

    for (let i = 1; i < snapPoints.length; i++) {
      const distance = Math.abs(target - snapPoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closest = snapPoints[i];
        closestIndex = i;
      }
    }

    activeIndexRef.current = closestIndex;
    return closest;
  }, []);

  return (
    <CarouselProvider value={isMoving}>
      <div
        ref={carouselRef}
        className={`py-4 overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      >
        <motion.div
          ref={contentRef}
          style={{ x, touchAction: "pan-y" }}
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.2}
          dragTransition={{
            power: 0.18,       // Friction sensitivity
            timeConstant: 200,  // Deceleration speed
            modifyTarget: handleModifyTarget,
          }}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUpdate={handleUpdate}
          onClickCapture={handleClickCapture}
          className="relative flex gap-4 w-max"
        >
          {children}
        </motion.div>
      </div>
    </CarouselProvider>
  );
}