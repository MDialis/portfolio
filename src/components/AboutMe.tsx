import dynamic from "next/dynamic";
import aboutImg from "../../public/mateus.webp";

const Reaper = dynamic(() => import("@/components/Reaper"));
const FlipSection = dynamic(() => import("@/components/FlipSection"));

// --- Dictionary for About Me ---
const dictionaries = {
  en: {
    title: "About Me",
    imgAlt: "Image of Mateus",
    text: "I'm a passionate full-stack developer dedicated to building robust applications and beautiful, intuitive web experiences. With a strong foundation in user-centric design and expertise in backend architecture and databases, I specialize in turning complex challenges into elegant, end-to-end solutions. Welcome to my portfolio.",
    textAlt: "You found me! This portfolio was a passion project, and this section was a particularly fun challenge. I believe that building great software involves both technical skill and a touch of personality! Like the little animated detail you've discovered here.",
    buttonText: "Contact Me!",
  },
  pt: {
    title: "Sobre Mim",
    imgAlt: "Imagem do Mateus",
    text: "Sou um desenvolvedor full-stack dedicado, gosto de construir aplicações robustas e experiências web bonitas e intuitivas. Com base sólida em design focado no usuário e uma expertise em arquitetura de software e bancos de dados, capaz em transformar desafios complexos em soluções elegantes de ponta a ponta. Bem-vindo ao meu portfólio.",
    textAlt: "Você me encontrou! Este portfólio foi um projeto feito com carinho, e esta seção foi um desafio muito divertido. Acredito que criar bons softwares envolve tanto habilidade técnica quanto um toque de personalidade! Assim como este pequeno detalhe animado que você descobriu aqui.",
    buttonText: "Entre em Contato!",
  },
};

export default function AboutMe({ lang }: { lang: string }) {
  // Select the correct dictionary, defaulting to English just in case
  const dict = dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;

  return (
    <section id="aboutMe" className="py-10">
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* FlipSection component for interactive "About Me" */}
        <FlipSection
          imgLink={aboutImg}
          imgAlt={dict.imgAlt}
          title={dict.title}
          text={dict.text}
          textAlt={dict.textAlt}
          buttonLink="#contact"
          buttonText={dict.buttonText}
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