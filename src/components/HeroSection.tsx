"use client";

import { Fira_Code, Inter } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function HeroSection({ lang }: { lang: string }) {
  const content = {
    en: {
      badge: "AppSec & Data Governance",
      headlineLine1: "SECURE",
      headlineLine2: "ARCHITECTURE",
      subhead:
        "I engineer resilient DevSecOps environments and data pipelines, delivered through high-performance Next.js interfaces. Enterprise security meets modern product design.",
      ctaPrimary: "Explore Projects",
      ctaSecondary: "View GitHub",
    },
    pt: {
      badge: "AppSec & Governança",
      headlineLine1: "ARQUITETURA",
      headlineLine2: "SEGURA",
      subhead:
        "Desenvolvo ambientes DevSecOps resilientes e pipelines de dados, entregues através de interfaces Next.js de alta performance. Segurança corporativa aliada a design de produto moderno.",
      ctaPrimary: "Explorar Projetos",
      ctaSecondary: "Ver GitHub",
    },
  };

  const dict = content[lang as keyof typeof content];

  return (
    <section
      className={`relative min-h-[90vh] flex flex-col justify-center bg-[var(--background)] overflow-hidden ${inter.className} pt-24 pb-12`}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] rounded-full bg-[var(--primary)]/10 blur-[150px]" />
        <div className="absolute bottom-[0%] -left-[5%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-8">
        {/* Top */}
        <div className="w-full relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--muted)] border border-[var(--border)] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-[var(--foreground)] text-xs font-semibold tracking-wide uppercase">
              {dict.badge}
            </span>
          </div>

          <h1 className="font-black tracking-tighter uppercase flex flex-col">
            <span className="text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] text-[var(--foreground)]">
              {dict.headlineLine1}
            </span>
            <span className="text-[clamp(3.5rem,9vw,9rem)] leading-[0.9] text-[var(--muted-foreground)]/60 lg:ml-12">
              {dict.headlineLine2}
            </span>
          </h1>
        </div>

        {/* Bottom */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start lg:items-end mt-8 relative z-10">
          {/* Left Side */}
          <div className="lg:col-span-6 flex flex-col gap-8 pb-4">
            <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed max-w-md font-medium">
              {dict.subhead}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="px-6 py-3.5 bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold rounded-md shadow-lg shadow-[var(--foreground)]/10 hover:bg-[var(--foreground)]/90 transition-all"
              >
                {dict.ctaPrimary}
              </a>
              <a
                href="#github"
                className="px-6 py-3.5 bg-transparent text-[var(--foreground)] text-sm font-semibold rounded-md border border-[var(--border)] hover:bg-[var(--muted)] transition-all flex items-center gap-2"
              >
                {dict.ctaSecondary}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-6 relative hidden md:flex justify-end items-center h-[250px] lg:h-[300px] perspective-1000 lg:-mt-32">
            <div className="relative w-full max-w-[420px] h-full origin-bottom-right">
              {/* Main Dashboard Panel */}
              <div className="absolute top-0 right-0 w-full bg-[var(--card)]/95 backdrop-blur-sm border border-[var(--border)] rounded-xl shadow-2xl p-5 z-10 transition-transform duration-700 hover:-translate-y-2">
                <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-[var(--primary)]/20 flex justify-center items-center">
                      <svg
                        className="w-4 h-4 text-[var(--primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[var(--foreground)] text-sm font-semibold">
                        Zero-Trust IAM
                      </h3>
                      <p className="text-[var(--muted-foreground)] text-xs">
                        Aracaju Gov API
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[var(--accent)] text-xs bg-[var(--accent)]/10 px-2 py-1 rounded ${firaCode.className}`}
                  >
                    Secured
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      label: "SQLi Mitigation",
                      value: "Active",
                      status: "accent",
                    },
                    {
                      label: "XSS Scanner",
                      value: "Enforcing",
                      status: "accent",
                    },
                    {
                      label: "JWT Expiration",
                      value: "15m Window",
                      status: "muted-foreground",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-[var(--muted-foreground)] text-sm font-medium">
                        {item.label}
                      </span>
                      <span
                        className={`text-[var(--${item.status})] ${firaCode.className} text-xs`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Code Snippet Card */}
              <div className="absolute top-24 -left-8 lg:-left-16 w-[260px] bg-[#0d1117] border border-[var(--border)] rounded-xl shadow-2xl p-4 z-20 opacity-95 transition-transform duration-500 hover:scale-105">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--destructive)]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)]/80" />
                </div>
                <pre
                  className={`text-[10px] leading-relaxed text-slate-300 ${firaCode.className} overflow-hidden`}
                >
                  <code>
                    <span className="text-pink-400">export const</span>{" "}
                    <span className="text-blue-300">sanitize</span> = (data){" "}
                    {"=>"} {"{"}
                    <br />
                    &nbsp;&nbsp;<span className="text-pink-400">
                      return
                    </span>{" "}
                    validate(data, {"{"}
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;blockSQL:{" "}
                    <span className="text-orange-300">true</span>
                    <br />
                    &nbsp;&nbsp;{"}"});
                    <br />
                    {"}"};
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
