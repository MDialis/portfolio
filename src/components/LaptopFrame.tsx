import Image from "next/image";

interface PhoneFrameProps {
  src: string;
  alt?: string;
  width?: number;
  className?: string;
}

export default function PhoneFrame({
  src,
  alt = "Mobile Image",
  width = 300,
  className = "",
}: PhoneFrameProps) {
  const aspectRatio = 16 / 10;
  const height = width / aspectRatio;

  const borderWidth = width / 30;
  const finalSrc = src.startsWith("//") ? `https:${src}` : src;

  const bezelWidth = width * 0.03; // Borda da tela (~3%)
  const baseHeight = width * 0.04; // Altura da base inferior (~4%)

  const islandWidth = width * 0.25;
  const islandHeight = width * 0.06;
  const islandTopMargin = width * 0.025;

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ width: `${width}px` }}
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
              width: `${width * 0.12}px`, // Notch simulado ou apenas a câmera
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
        style={{ height: `${baseHeight}px`, width: `${width * 1.15}px` }}
      >
        {/* Detalhe do "Lip" (Abertura do notebook) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-600 rounded-b-md"
          style={{
            width: `${width * 0.15}px`,
            height: `${baseHeight * 0.4}px`,
          }}
        />
      </div>
    </div>
  );
}
