"use client";

import Spline from "@splinetool/react-spline";
import { motion, AnimatePresence } from "framer-motion";

interface Scene3DProps {
  reaperMode: boolean;
}

export default function Scene3D({ reaperMode }: Scene3DProps) {
  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-auto"
      onWheelCapture={(e) => e.stopPropagation()}
      onTouchMoveCapture={(e) => e.stopPropagation()}
    >
      
      <div className="absolute top-0 left-0 w-full h-[calc(100vh+120px)]">
        <AnimatePresence mode="wait">
          {!reaperMode ? (
            <motion.div
              key="abstract-mesh"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Spline scene="https://prod.spline.design/eBDJuZuqvXUGsJan/scene.splinecode" />
            </motion.div>
          ) : (
            <motion.div
              key="reaper-mesh"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Spline scene="https://prod.spline.design/0-YokRHnFzyrNMdY/scene.splinecode" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}