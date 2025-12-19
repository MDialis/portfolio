import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

const BackgroundPattern = () => {
  const items = Array.from({ length: 100 });
  
  const iconPaths = [
    "/background/LampShadow.svg",
    "/background/LogoShadow.svg"
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {items.map((_, i) => {
        if (i === 0) return null;
        
        const iconSrc = i % 2 === 0 ? iconPaths[0] : iconPaths[1];

        const top = (i * 19) % 100; 
        const left = (i * 11.2) % 100;
        const rotate = (i * 7) % 360; 
        const size = ((i % 3) + 2.2) * 20;

        let visibilityClass = "block";

        if (i >= 30 && i < 60) {
          visibilityClass = "hidden md:block";
        } else if (i >= 60) {
          visibilityClass = "hidden lg:block";
        }

        return (
          <img
            key={i}
            src={iconSrc}
            alt=""
            className={`absolute transition-transform duration-700 hover:scale-110 opacity-20 ${visibilityClass}`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              transform: `rotate(${rotate}deg)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default function Contacts() {
  return (
    <section
      id="contact"
      className="relative px-5 bg-neutral-variant text-neutral-variant-content overflow-hidden"
    >
      <BackgroundPattern />

      <div className="relative z-10 flex flex-col w-full min-h-[89vh]">
        <div className="container flex flex-col justify-center grow max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-center pb-10 md:pb-30">
            Let's keep in touch!
          </h1>

          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <SocialLinks />
            </div>

            {/* Contact Form Section */}
            <div className="space-y-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}