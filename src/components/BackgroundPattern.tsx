export default function BackgroundPattern({ invert = false }) {
  const items = Array.from({ length: 100 });

  const iconPaths = [
    "/background/LampShadow.svg",
    "/background/LogoShadow.svg",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {items.map((_, i) => {
        if (i === 0) return null;

        const iconSrc = i % 2 === 0 ? iconPaths[0] : iconPaths[1];

        const top = (i * 19) % 100;
        const left = (i * 11.255) % 100;
        const size = ((i % 3) + 2.2) * 20;

        const duration = 60 + (i % 60);
        const direction = i % 2 === 0 ? "normal" : "reverse";
        const delay = -1 * ((i * 13) % 100);

        let visibilityClass = "block";

        if (i >= 30 && i < 60) {
          visibilityClass = "hidden md:block";
        } else if (i >= 60) {
          visibilityClass = "hidden lg:block";
        }

        const colorFilter = invert ? "brightness-0 invert" : "";

        return (
          <img
            key={i}
            src={iconSrc}
            alt=""
            className={`absolute transition-transform duration-700 hover:scale-110 opacity-20 animate-spin ${visibilityClass} ${colorFilter}`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDirection: direction,
              animationDelay: `${delay}s`,
              animationTimingFunction: "linear",
            }}
          />
        );
      })}
    </div>
  );
}
