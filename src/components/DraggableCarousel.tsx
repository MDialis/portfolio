'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState, ReactNode } from 'react';

interface DraggableCarouselProps {
  children: ReactNode;
  className?: string;
}

export default function DraggableCarousel({ children, className = '' }: DraggableCarouselProps) {
  const [constraint, setConstraint] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!carouselRef.current || !contentRef.current) return;

    const updateConstraints = () => {
      const scrollWidth = contentRef.current?.scrollWidth || 0;
      const offsetWidth = carouselRef.current?.offsetWidth || 0;
      
      setConstraint(scrollWidth - offsetWidth);
    };

    updateConstraints();

    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [children]);

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = () => {
    // We use a small timeout because the 'click' event fires immediately
    // after 'dragEnd'. We need the flag to stay true long enough to
    // block that click.
    setTimeout(() => {
      isDragging.current = false;
    }, 150);
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div 
      ref={carouselRef} 
      className={`p-4 overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
    >
      <motion.div
        ref={contentRef}
        drag="x"
        dragConstraints={{ right: 0, left: -constraint }}
        dragElastic={0.5}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClickCapture={handleClickCapture}
        className="flex gap-4 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}