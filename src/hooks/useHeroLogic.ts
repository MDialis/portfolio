"use client";

import { useEffect, useState } from "react";
import { useMotionValue } from "framer-motion";
import useHardwareAcceleration from "./useHardwareAcceleration"; // Adjust path if needed

export function useHeroLogic() {
  const [reaperMode, setReaperMode] = useState(false);
  const hasGPU = useHardwareAcceleration();

  // --- HIGH-PERFORMANCE MOUSE TRACKING ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.pageX);
    mouseY.set(e.pageY);
  };

  // --- EASTER EGG LISTENER ---
  useEffect(() => {
    const toggleReaper = () => setReaperMode((prev) => !prev);
    window.addEventListener("toggleReaperMode", toggleReaper);
    return () => window.removeEventListener("toggleReaperMode", toggleReaper);
  }, []);

  // --- SMART NETWORK-AWARE 3D PRELOAD ---
  useEffect(() => {
    if (hasGPU !== true) return;

    const reaperTimer = setTimeout(() => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;

      const isCellular =
        connection &&
        (connection.saveData ||
          connection.type === "cellular" ||
          ["slow-2g", "2g", "3g", "4g"].includes(connection.effectiveType));

      if (!isCellular) {
        fetch("https://prod.spline.design/0-YokRHnFzyrNMdY/scene.splinecode", {
          mode: "cors",
        }).catch(() => {});
      }
    }, 15000);

    return () => clearTimeout(reaperTimer);
  }, [hasGPU]);

  return {
    reaperMode,
    hasGPU,
    mouseX,
    mouseY,
    handleMouseMove,
  };
}
