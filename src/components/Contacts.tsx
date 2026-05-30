import BackgroundPattern from "./BackgroundPattern";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

const dictionaries = {
  en: {
    heading: "Let's keep in touch!",
  },
  pt: {
    heading: "Vamos manter contato!",
  },
};

export default function Contacts({ lang }: { lang: string }) {
  const dict = dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;

  return (
    <section
      id="contact"
      className="relative px-5 bg-neutral-variant text-neutral-variant-content overflow-hidden"
    >
      <BackgroundPattern />

      <div className="relative z-10 flex flex-col w-full min-h-[89vh]">
        <div className="container flex flex-col justify-center grow max-w-5xl mx-auto">
          <h1 className="text-5xl font-bold text-center pb-10 md:pb-30">
            {dict.heading}
          </h1>

          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <SocialLinks lang={lang} />
            </div>

            {/* Contact Form Section */}
            <div className="space-y-4">
              <ContactForm lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}