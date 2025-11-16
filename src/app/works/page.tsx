import Card from "@/components/Card";
import { contentfulClient } from "@/lib/contentfulClient";
import { IExperienceEntry, IProjectEntry } from "@/lib/types";

interface TechIcon {
  src: string;
  alt: string;
}

async function getProjects(): Promise<IProjectEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "project",
      order: ["-fields.date"],
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IProjectEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

async function getExperiences(): Promise<IExperienceEntry[]> {
  try {
    const res = await contentfulClient.getEntries({
      content_type: "experience",
      order: ["-fields.date"],
    });

    // "double cast" so TypeScript stop 'res.items' type error
    return res.items as unknown as IExperienceEntry[];
  } catch (error) {
    console.error("Error fetching Contentful data:", error);
    return [];
  }
}

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => {
                const { title, slug, summary, cardImage, tech } =
                  project.fields;

                const imageUrl = cardImage
                  ? `https:${cardImage.fields.file.url}`
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
                    key={project.sys.id}
                    title={title}
                    text={summary}
                    link={`/works/${slug}`}
                    imageUrl={imageUrl}
                    techIcons={formattedTechIcons}
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
