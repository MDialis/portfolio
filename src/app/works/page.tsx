import Card from "@/components/Card";
import { getProjects, getExperiences } from "@/lib/contentfulService";
import { TechIcon } from "@/lib/types";

export default async function Home() {
  const projects = await getProjects();
  const experiences = await getExperiences();
  return (
    <main className="flex flex-col gap-20 px-5">
      {/* Projects Section */}
      <section id="projects" className="py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            My Projects
          </h2>

          {projects.length === 0 ? (
            <div className="text-center">
              <h3 className="text-xl">
                Oops! Looks like there's no projects ready for show or the
                system failed to connect to the CMS.
              </h3>
              <p className="text-lg py-3">Try Again Later!</p>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {projects.map((project) => {
                const { title, slug, summary, cardImage, mobileImage, tech } =
                  project.fields;

                const cardImageUrl = cardImage
                  ? `https:${cardImage.fields.file.url}`
                  : undefined;

                const mobileImageUrl = mobileImage
                  ? `https:${mobileImage.fields.file.url}`
                  : undefined;

                const formattedTechIcons: TechIcon[] = (tech || []).map(
                  (techName) => {
                    return {
                      src: techName
                        ? `/icons/${techName}.svg`
                        : "/icons/default.svg",
                      alt: techName,
                    };
                  }
                );
                return (
                  <a
                    key={slug}
                    href={`/works/${slug}`}
                    className="
                      group relative flex flex-col
                      border-t border-base-content/40
                      w-full py-3 px-2 gap-1
                      hover:text-accent hover:border-accent/40 hover:pl-6
                      transition-all duration-200
                    "
                  >
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-3xl font-semibold min-w-0 truncate">{title}</h3>
                      {formattedTechIcons && formattedTechIcons.length > 0 ? (
                        <div 
                          className="
                            flex flex-wrap self-start
                            p-1 px-2 gap-4 shrink-0
                            rounded-2xl bg-neutral/50 
                            group-hover:bg-accent/10 group-hover:gap-5
                            duration-300
                          ">
                          {formattedTechIcons.map((icon) => (
                            <img
                              key={icon.alt}
                              src={icon.src}
                              alt={icon.alt}
                              title={icon.alt}
                              className="h-8 w-8"
                            />
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <p className="px-4 text-md line-clamp-2 text-ellipsis group-hover:pl-8 duration-400">
                      {summary}
                    </p>

                    {/* Images for Card and Mobile */}
                    {(cardImageUrl || mobileImageUrl) && (
                      <div
                        className="
                          absolute mt-4 h-64 p-5 rounded-xl
                          right-0 lg:-right-15 -top-1/2
                          pointer-events-none opacity-0
                          group-hover:pointer-events-auto group-hover:opacity-100 
                          transition duration-300
                      "
                      >
                        {mobileImageUrl && (
                          <img
                            src={mobileImageUrl}
                            alt={title}
                            className="aspect-4/6 h-full object-cover rounded-lg shadow-2xl md:hidden"
                          />
                        )}

                        {cardImageUrl && (
                          <img
                            src={cardImageUrl}
                            alt={title}
                            className="aspect-video h-full object-cover rounded-lg shadow-2xl hidden md:block"
                          />
                        )}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            My Experiences
          </h2>

          {experiences.length === 0 ? (
            <div className="text-center">
              <h3 className="text-xl">
                Oops! Looks like there's no work ready for show or the system
                failed to connect to the CMS.
              </h3>
              <p className="text-lg py-3">Try Again Later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {experiences.map((experience) => {
                const { title, systemLink, summary, image, tech } =
                  experience.fields;

                const imageUrl = image
                  ? `https:${image.fields.file.url}`
                  : undefined;

                const formattedTechIcons: TechIcon[] = (tech || []).map(
                  (techName) => {
                    return {
                      src: techName
                        ? `/icons/${techName}.svg`
                        : "/icons/default.svg",
                      alt: techName,
                    };
                  }
                );
                return (
                  <Card
                    key={experience.sys.id}
                    title={title}
                    text={summary}
                    link={`${systemLink}`}
                    imageUrl={imageUrl}
                    techIcons={formattedTechIcons}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
