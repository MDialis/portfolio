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
  const aspectRatio = 19.5 / 9;
  const height = width * aspectRatio;

  const borderWidth = width / 22;
  const finalSrc = src.startsWith("//") ? `https:${src}` : src;

  const islandWidth = width * 0.25;
  const islandHeight = width * 0.06;
  const islandTopMargin = width * 0.025;

  return (
    <div
      className={`relative mx-auto shadow-xl bg-gray-800 border-gray-800 rounded-3xl ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderWidth: `${borderWidth}px`,
      }}
    >
      {/* Side Buttons */}
      <div
        className="absolute top-[72px] h-[46px] w-[3px] bg-gray-700 rounded-r-lg"
        style={{ right: `-${borderWidth + 3}px` }}
      />
      <div
        className="absolute top-[142px] h-[46px] w-[3px] bg-gray-700 rounded-r-lg"
        style={{ right: `-${borderWidth + 3}px` }}
      />

      {/* Screen Container */}
      <div className="h-full w-full overflow-hidden rounded-2xl relative">
        {/* --- DYNAMIC ISLAND --- */}
        <div
          className="absolute bg-gray-900 rounded-full left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          style={{
            width: `${islandWidth}px`,
            height: `${islandHeight}px`,
            top: `${islandTopMargin}px`,
          }}
        >
          <div className="absolute top-1/2 right-1/7 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-600" />
        </div>

        <Image
          src={finalSrc}
          alt={alt}
          fill
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}