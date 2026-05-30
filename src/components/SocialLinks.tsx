import Image from "next/image";

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

const dictionaries = {
  en: { heading: "Contacts" },
  pt: { heading: "Contatos" },
};

export default function SocialLinks({ lang }: { lang: string }) {
  const dict = dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;

  return (
    <>
      <h3 className="text-3xl font-bold hidden md:block">{dict.heading}</h3>
      {/* Socials */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to ${link.name}`}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit pr-8"
          >
            <Image src={link.icon} alt={link.name} width={48} height={48} />
            <p className="font-semibold">{link.name}</p>
          </a>
        ))}
      </div>
    </>
  );
}