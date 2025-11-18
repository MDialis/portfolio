import Card from "@/components/Card";
import ListItem from "@/components/ListItem";
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
                  <ListItem 
                    key={project.sys.id}
                    title={title}
                    slug={slug}
                    summary={summary}
                    cardImageUrl={cardImageUrl}
                    mobileImageUrl={mobileImageUrl}
                    formattedTechIcons={formattedTechIcons}
                  />
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
