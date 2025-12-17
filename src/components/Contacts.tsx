import ContactForm from "./ContactForm";

const SOCIAL_LINKS = [
  {
    name: "E-mail",
    icon: "/icons/gmail.svg",
    href: "mailto:dialis.dev@gmail.com",
  },
  {
    name: "Telegram",
    icon: "/icons/telegram.svg",
    href: "https://t.me/MDialis",
  },
  {
    name: "Github",
    icon: "/icons/github.svg",
    href: "https://github.com/MDialis",
  },
  {
    name: "LinkedIn",
    icon: "/icons/linkedin.svg",
    href: "https://linkedin.com/in/mateus-dialis",
  },
];

export default function Contacts() {
  return (
    <section
      id="contact"
      className="px-5 bg-neutral-variant text-neutral-variant-content"
    >
      <div className="flex flex-col w-full min-h-screen">
        <div className="container flex flex-col justify-center grow max-w-5xl mx-auto py-20">
          <h1 className="text-5xl font-bold text-center pb-10 md:pb-30">
            Let's keep in touch!
          </h1>

          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold hidden md:block">Contacts</h3>
              {/* Socials */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to ${link.name}`}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={link.icon}
                      alt={link.name}
                      className="h-12 w-12"
                    />
                    <p className="font-semibold">{link.name}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="space-y-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
