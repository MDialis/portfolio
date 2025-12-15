"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PhoneFrameProps {
  src: string;
  alt?: string;
  width?: number;
  className?: string;
}

export default function PhoneFrame({
  src,
  alt = "Mobile Image",
  width,
  className = "",
}: PhoneFrameProps) {
  const [currentWidth, setCurrentWidth] = useState(width || 450);

  useEffect(() => {
    if (width) {
      setCurrentWidth(width);
      return;
    }

    const handleResize = () => {
      const newWidth = window.innerWidth < 768 ? window.innerWidth / 1.5 : window.innerWidth / 3.5;

      setCurrentWidth(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const aspectRatio = 16 / 10;
  const height = currentWidth / aspectRatio;

  const finalSrc = src.startsWith("//") ? `https:${src}` : src;

  const bezelWidth = currentWidth * 0.02;
  const baseHeight = currentWidth * 0.03;

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width: `${currentWidth}px` }}
    >
      {/* --- PARTE SUPERIOR (TELA + BORDA) --- */}
      <div
        className="relative bg-gray-800 rounded-t-2xl shadow-xl flex items-center justify-center"
        style={{
          height: `${height}px`,
          padding: `${bezelWidth}px`, // A borda é feita com padding aqui
          borderBottom: "none",
        }}
      >
        {/* Webcam (Ponto no topo da borda) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-full pointer-events-none z-20">
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-gray-900 rounded-b-md flex justify-center items-center"
            style={{
              top: "0",
              height: `${bezelWidth * 0.8}px`,
              width: `${currentWidth * 0.12}px`, // Notch simulado ou apenas a câmera
            }}
          >
            {/* Lente da câmera */}
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mb-0.5" />
          </div>
        </div>

        {/* Container da Imagem (A tela acesa) */}
        <div className="relative w-full h-full overflow-hidden bg-black rounded-md">
          <Image
            src={finalSrc}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          />
        </div>
      </div>

      {/* --- PARTE INFERIOR (BASE DO TECLADO) --- */}
      <div
        className="relative bg-gray-700 rounded-b-xl shadow-lg border-t border-gray-600 left-1/2 -translate-x-1/2"
        style={{ height: `${baseHeight}px`, width: `${currentWidth * 1.15}px` }}
      >
        {/* Detalhe do "Lip" (Abertura do notebook) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-600 rounded-b-md"
          style={{
            width: `${currentWidth * 0.15}px`,
            height: `${baseHeight * 0.4}px`,
          }}
        />
      </div>
    </div>
  );
}
