import Card from "@/components/Card";
import Reaper from "@/components/Reaper";

export default function Home() {
  return (
    <div className="flex-1">
      <main>
        <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
          <div className="absolute top-[-150px] w-[500vh] h-100 bg-black z-0 rotate-5" />
          <h1 className="text-9xl absolute z-0 rotate-4 font-asimov">
            WEB DEVELOPER
          </h1>
          <div className="absolute bottom-[-150px] w-[500vh] h-100 bg-black z-0 rotate-5" />

          <div className="relative move-vertical mt-8 top-[-260px]">
            <div className="move-horizontal">
              <div className="move-sway">
                <Reaper size={500} />
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                Howdy! I'm Mateus Diális
              </span>
            </h2>
            <p className="mt-4 text-xl text-base-content max-w-2xl mx-auto">
              A front-end developer passionate about crafting beautiful and
              functional web experiences. Welcome to my portfolio!
            </p>
            <div className="mt-10 flex gap-4 justify-center">
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg font-semibold text-primary-content bg-primary shadow-lg hover:opacity-80 transition-opacity"
              >
                My Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg font-semibold text-base-content bg-neutral shadow-lg hover:opacity-80 transition-colors"
              >
                Contact me!
              </a>
            </div>
          </div>

          {/* Reaper */}
          {/* Movido para dentro da mesma seção central, com uma margem superior */}
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          <section id="projects" className="py-20">
            <h3 className="text-4xl font-bold text-center mb-12 text-base-content">
              Projects
            </h3>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card title="Project Title" text="Project Description" link="#" />
              <Card title="Project Title" text="Project Description" link="#" />
              <Card title="Project Title" text="Project Description" link="#" />
            </div>
          </section>

          {/* Lembre-se de adicionar sua seção id="contact" aqui */}
        </div>
      </main>
    </div>
  );
}
