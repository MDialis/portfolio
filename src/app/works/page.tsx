import Card from "@/components/Card";
import { getProjects, getExperiences } from "@/lib/contentfulService";
import { TechIcon } from "@/lib/types";

export default async function Home() {
  const projects = await getProjects();
  const experiences = await getExperiences();
  return (
    <main className="flex flex-col gap-20">
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
                    className="group relative flex flex-col gap-2 border-t border-secondary-content w-full py-4 transition-all duration-200 hover:bg-base-200/50 px-2"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-2xl font-semibold">{title}</h3>
                      {formattedTechIcons && formattedTechIcons.length > 0 ? (
                        <div className="flex flex-wrap gap-4 p-2 bg-neutral/30 rounded-2xl self-start">
                          {formattedTechIcons.map((icon) => (
                            <img
                              key={icon.alt}
                              src={icon.src}
                              alt={icon.alt}
                              title={icon.alt}
                              className="h-10 w-10"
                            />
                          ))}
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    <p className="pl-6 text-sm line-clamp-2 text-ellipsis">
                      {summary}
                    </p>

                    {/* Images for Card and Mobile */}
                    {(cardImageUrl || mobileImageUrl) && (
                      <div
                        className="
                          absolute mt-4 h-56 -right-20
                          hidden opacity-0
                          group-hover:block group-hover:opacity-100 
                          transition duration-500
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
