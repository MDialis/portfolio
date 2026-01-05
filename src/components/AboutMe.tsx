import dynamic from "next/dynamic";
import FlipSection from "@/components/FlipSection";
import aboutImg from "../../public/mateus.webp";

const Reaper = dynamic(() => import("@/components/Reaper"));

export default function AboutMe() {
  return (
    <section id="aboutMe" className="py-10">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* FlipSection component for interactive "About Me" */}
        <FlipSection
          imgLink={aboutImg}
          imgAlt="Image of Mateus"
          title="About Me"
          text="
            A passionate front-end developer dedicated to crafting beautiful, intuitive, and highly functional web experiences.
            I specialize in turning complex challenges into elegant, user-centric solutions. Welcome to my portfolio."
          textAlt="
            You found me! This portfolio was a passion project, and this section was a particularly fun challenge.
            I believe that building great software involves both technical skill and a touch of personality!
            Like the little animated detail you've discovered here."
          buttonLink="#contact"
          buttonText="Contact Me!"
        >
          {/* Content for the "back" of the FlipSection card */}
          <div
            className="
                flex items-center justify-center w-full h-full 
                relative overflow-hidden
                bg-linear-to-b from-primary/60 to-transparent"
          >
            {/* Background mist gradient effect */}
            <div
              className="
                absolute -left-50 -right-50
                0 h-2/3 -bottom-10 z-0
                bg-[radial-gradient(ellipse_at_bottom,white_30%,transparent_70%)]
                opacity-20 blur-xl
                pointer-events-none"
            />

            {/* Reaper in front of mist */}
            <div className="relative z-10 h-60 move-vertical">
              <div className="move-horizontal">
                <div className="relative">
                  <Reaper sizeMultiplier={0.45} />
                </div>
              </div>
            </div>

            {/* Foreground mist gradient effect */}
            <div
              aria-hidden="true"
              className="
                absolute -bottom-15 -left-10 z-20
                w-2/3 h-1/2
                bg-[radial-gradient(ellipse_at_bottom_left,white_30%,transparent_70%)]
                opacity-20 blur-xl move-vertical
                pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="
                absolute -bottom-15 -right-10 z-20
                w-2/3 h-1/2
                bg-[radial-gradient(ellipse_at_bottom_right,white_30%,transparent_70%)]
                opacity-20 blur-xl move-vertical
                pointer-events-none"
            />
          </div>
        </FlipSection>
      </div>
    </section>
  );
}
