"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, ReactNode, useCallback } from "react";
import { CarouselProvider } from "@/contexts/CarouselContext";

interface DraggableCarouselProps {
  children: ReactNode;
  className?: string;
}

export default function DraggableCarousel({ children, className = "" }: DraggableCarouselProps) {
  const [constraint, setConstraint] = useState(0);
  const [isMoving, setIsMoving] = useState(false); // State to share with children

  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Ref to track dragging for click prevention
  const isDraggingRef = useRef(false);
  // Ref for the debounce timer

  useEffect(() => {
    if (!carouselRef.current || !contentRef.current) return;

    const updateConstraints = () => {
      const scrollWidth = contentRef.current?.scrollWidth || 0;
      const offsetWidth = carouselRef.current?.offsetWidth || 0;

      setConstraint(scrollWidth - offsetWidth);
    };

    updateConstraints();

    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, [children]);

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
    handleUpdate(); // Ensure we start moving immediately
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

  return (
    <CarouselProvider value={isMoving}>
      <div
        ref={carouselRef}
        className={`py-4 overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
      >
        <motion.div
          ref={contentRef}
          drag="x"
          dragConstraints={{ right: 0, left: -constraint }}
          dragElastic={0.5}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onUpdate={handleUpdate}
          onClickCapture={handleClickCapture}
          style={{ touchAction: "pan-y" }}
          className="flex gap-4 w-full"
        >
          {children}
        </motion.div>
      </div>
    </CarouselProvider>
  );
}