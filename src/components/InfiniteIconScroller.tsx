import React from "react";

type Skill = {
  name: string;
  icon: string;
};

type ScrollerDirection = "left" | "right";

type InfiniteIconScrollerProps = {
  skills: Skill[];
  direction: ScrollerDirection;
  className?: string;
};

const InfiniteIconScroller: React.FC<InfiniteIconScrollerProps> = ({
  skills,
  direction,
  className = "",
}) => {
  const animationClass =
    direction === "right" ? "animate-reverse-scroll-x" : "animate-scroll-x";

  return (
    // Icons Row: Infinitely scrolls side to side
    <div className={`flex whitespace-nowrap ${animationClass} ${className}`}>
      {/* Render icon list */}
      <div className="flex min-w-full shrink-0 items-center justify-around">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center gap-3 px-2 md:px-0 transition-transform duration-300 hover:scale-110 shrink-0"
          >
            <img
              src={`/icons/${skill.icon}`}
              alt={`${skill.name} Logo`}
              className="h-12 w-12"
            />
            <p className="font-semibold text-md">{skill.name}</p>
          </div>
        ))}
      </div>

      {/* Duplicate icon list for seamless scrolling */}
      <div className="flex min-w-full shrink-0 items-center justify-around">
        {skills.map((skill) => (
          <div
            key={`${skill.name}-clone`}
            className="flex flex-col items-center gap-3 transition-transform duration-300 hover:scale-110 shrink-0"
          >
            <img
              src={`/icons/${skill.icon}`}
              alt={`${skill.name} Logo`}
              className="h-12 w-12"
            />
            <p className="font-semibold text-md">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteIconScroller;
