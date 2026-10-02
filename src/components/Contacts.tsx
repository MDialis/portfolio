import BackgroundPattern from "./BackgroundPattern";
import ContactForm from "./ContactForm";
import { Inter, Fira_Code } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"] });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });

const dictionaries = {
  en: { 
    heading: "Let's Talk.", 
    sub: "Secure channels open. Based in Aracaju, Sergipe, available for global opportunities.",
    directLine: "Direct Payload",
    email: "dialis.dev@gmail.com"
  },
  pt: { 
    heading: "Vamos Conversar.", 
    sub: "Canais seguros abertos. Baseado em Aracaju, Sergipe, disponível para oportunidades globais.",
    directLine: "Payload Direto",
    email: "dialis.dev@gmail.com"
  },
};

export default function Contacts({ lang }: { lang: string }) {
  const dict = dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;

  return (
    <section
      id="contacts"
      className={`relative w-full min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] overflow-hidden px-4 md:px-12 py-24 ${inter.className}`}
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--primary)]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[var(--accent)]/20 blur-[120px] rounded-full" />
      </div>

      {/* The 50/50 Floating Card */}
      <div className="relative z-10 w-full max-w-6xl bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Context & Direct Line */}
        <div className="w-full md:w-1/2 bg-[var(--muted)]/30 p-10 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--border)] min-h-[400px]">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 text-[var(--foreground)]">
              {dict.heading}
            </h2>
            <p className="text-[var(--muted-foreground)] text-sm md:text-base leading-relaxed max-w-sm">
              {dict.sub}
            </p>
          </div>

          {/* Massive Email Link pushed to the bottom */}
          <div className="mt-12 md:mt-0">
            <span className={`text-[var(--accent)] text-xs uppercase tracking-widest mb-2 block ${firaCode.className}`}>
              {dict.directLine}
            </span>
            <a 
              href={`mailto:${dict.email}`}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] hover:text-[var(--primary)] transition-colors break-words tracking-tight block"
            >
              {dict.email}
            </a>
          </div>
        </div>

        {/* Right Side: The Minimalist Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 bg-[var(--background)]">
          <ContactForm lang={lang} />
        </div>
        
      </div>
    </section>
  );
}