"use client";

import { useState, useEffect } from "react";

export default function useHardwareAcceleration() {
  const [hasGPU, setHasGPU] = useState<boolean | null>(null);

  useEffect(() => {
    const checkGPU = () => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!gl) return false;

        const debugInfo = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
        if (!debugInfo) return true; // Assume true if we can't get debug info

        const renderer = (gl as WebGLRenderingContext)
          .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          .toLowerCase();

        // List of known software renderers (CPU rendering)
        const softwareRenderers = [
          "swiftshader",
          "llvmpipe",
          "software",
          "microsoft basic render driver",
        ];
        
        for (const sr of softwareRenderers) {
          if (renderer.includes(sr)) return false;
        }
        return true;
      } catch (e) {
        return false; // Fail safe to the code mockup
      }
    };

    setHasGPU(checkGPU());
  }, []);

  return hasGPU;
}