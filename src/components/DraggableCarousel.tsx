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
        className="flex gap-4 w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}