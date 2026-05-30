import ListItem from "@/components/ListItem";
import { getProjects, getExperiences } from "@/lib/contentfulService";
import { formatTechIcons, getContentfulImageUrl } from "@/lib/utils";

const dictionaries = {
  en: {
    projectsTitle: "My Projects",
    projectsEmpty: "Projects not found.",
    tryAgain: "Try Again Later!",
    experiencesTitle: "My Experiences",
    experiencesEmpty: "Oops! Looks like there's no work ready for show or the system failed to connect to the CMS.",
  },
  pt: {
    projectsTitle: "Meus Projetos",
    projectsEmpty: "Projetos não encontrados.",
    tryAgain: "Tente novamente mais tarde!",
    experiencesTitle: "Minhas Experiências",
    experiencesEmpty: "Ops! Parece que não há trabalhos prontos para exibir ou o sistema falhou ao conectar com o CMS.",
  },
};

export default async function Works({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const lang = resolvedSearchParams?.lang === "pt" ? "pt" : "en";
  const locale = lang === "pt" ? "pt-BR" : "en-US";
  const dict = dictionaries[lang];

  const projects = await getProjects(locale);
  const experiences = await getExperiences(locale);

  return (
    <main className="flex flex-col gap-15 px-5 pt-10">
      {/* Projects Section */}
      <section id="projects">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
            {dict.projectsTitle}
          </h2>

          {projects.length === 0 ? (
            <div className="text-center">
              <h3 className="text-xl">{dict.projectsEmpty}</h3>
              <p className="text-lg py-3">{dict.tryAgain}</p>
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
                    // Persist the language parameter in the URL!
                    slug={`works/${slug}?lang=${lang}`}
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
            {dict.experiencesTitle}
          </h2>

          {experiences.length === 0 ? (
            <div className="text-center">
              <h3 className="text-xl">{dict.experiencesEmpty}</h3>
              <p className="text-lg py-3">{dict.tryAgain}</p>
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