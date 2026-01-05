const ICON_PATHS = ["/background/LampShadow.svg", "/background/LogoShadow.svg"];

const GENERATED_ITEMS = Array.from({ length: 100 })
  .map((_, i) => {
    if (i === 0)
      return { id: i, iconSrc: null, style: {}, visibilityClass: "" }; // Skip index 0 because i find it less cool than the other itens

    const iconSrc = i % 2 === 0 ? ICON_PATHS[0] : ICON_PATHS[1];

    const top = (i * 19) % 100;
    const left = (i * 11) % 100;
    const size = ((i % 3) + 3) * 15;

    const duration = 60 + (i % 60);
    const direction = i % 2 === 0 ? "normal" : "reverse";
    const delay = -1 * ((i * 13) % 100);

    let visibilityClass = "block";

    if (i >= 30 && i < 60) {
      visibilityClass = "hidden md:block";
    } else if (i >= 60) {
      visibilityClass = "hidden lg:block";
    }

    return {
      id: i,
      //iconSrc,
      style: {
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: `${duration}s`,
        animationDirection: direction,
        animationDelay: `${delay}s`,
        //animationTimingFunction: "linear",
        maskImage: `url(${iconSrc})`,
        WebkitMaskImage: `url(${iconSrc})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      },
      visibilityClass,
    };
  })
  .filter(Boolean); // Remove the null index 0

export default function BackgroundPattern({ invert = false, className = "" }) {
  const defaultColor = invert ? "bg-white" : "bg-black";
  const finalColorClass = className || defaultColor;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      style={{ contentVisibility: "auto", containIntrinsicSize: "100vw 100vh" }}
    >
      {GENERATED_ITEMS.map((item) => (
        <div
          key={item.id}
          className={`absolute animate-spin will-change-transform opacity-25 ${item.visibilityClass} ${finalColorClass}`}
          style={item.style}
        />
      ))}
    </div>
  );
}
