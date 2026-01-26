import Card from "@/components/Card";
import ListItem from "@/components/ListItem";
import { getProjects, getExperiences } from "@/lib/contentfulService";
import { TechIcon } from "@/lib/types";
import { formatTechIcons, getContentfulImageUrl } from "@/lib/utils";

export default async function Works() {
  const projects = await getProjects();
  const experiences = await getExperiences();
  return (
    <main className="flex flex-col gap-15 px-5 pt-10">
      {/* Projects Section */}
      <section id="projects">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            My Projects
          </h2>

          {projects.length === 0 ? (
            <div className="text-center">
              <h3 className="text-xl">Projects not found.</h3>
              <p className="text-lg py-3">Try Again Later!</p>
            </div>
          ) : (
            <div className="w-full flex flex-col">
              {projects.map((project) => {
                const { title, slug, summary, cardImage, mobileImage, tech } =
                  project.fields;

                return (
                  <ListItem
                    key={project.sys.id}
                    title={title}
                    slug={`works/${slug}`}
                    summary={summary}
                    cardImageUrl={getContentfulImageUrl(cardImage)}
                    mobileImageUrl={getContentfulImageUrl(mobileImage)}
                    formattedTechIcons={formatTechIcons(tech)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences">
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
            <div className="w-full flex flex-col">
              {experiences.map((experience) => {
                const { title, systemLink, summary, image, tech } =
                  experience.fields;

                return (
                  <ListItem
                    key={experience.sys.id}
                    title={title}
                    link={`${systemLink}`}
                    summary={summary}
                    cardImageUrl={getContentfulImageUrl(image)}
                    formattedTechIcons={formatTechIcons(tech)}
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
