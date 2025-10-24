import Card from "@/components/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content transition-colors duration-200">
      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Hero section */}
        <section className="text-center py-20">
          <h2 className="text-5xl md:text-6xl font-extrabold">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Howdy! I'm Mateus Diális
            </span>
          </h2>
          <p className="mt-4 text-xl text-base-content max-w-2xl mx-auto">
            A front-end developer passionate about crafting beautiful and functional web experiences. Welcome to my portfolio!
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
        </section>

        {/* Projects section */}
        <section id="projects" className="py-20">
          <h3 className="text-4xl font-bold text-center mb-12 text-base-content">
            Projects
          </h3>
          
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <Card 
              title="Project Title"
              text="Project Description"
              link="#"
            />

            <Card 
              title="Project Title"
              text="Project Description"
              link="#"
            />

            <Card 
              title="Project Title"
              text="Project Description"
              link="#"
            />
          </div>
        </section>
      </main>
    </div>
  )
}