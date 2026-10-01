"use client";

import { Fira_Code, Inter } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export default function HeroSection({ lang }: { lang: string }) {
  const content = {
    en: {
      badge: "Status: Available for Work",
      headlineLine1: "SECURE",
      headlineLine2: "ARCHITECTURE",
      subhead: "FOCUSED ON ZERO-TRUST INFRASTRUCTURE, DATA GOVERNANCE, AND MODERN WEB EXPERIENCES.",
      scroll: "SCROLL TO EXPLORE",
    },
    pt: {
      badge: "Status: Disponível para Projetos",
      headlineLine1: "ARQUITETURA",
      headlineLine2: "SEGURA",
      subhead: "FOCADO EM INFRAESTRUTURA ZERO-TRUST, GOVERNANÇA DE DADOS E EXPERIÊNCIAS WEB MODERNAS.",
      scroll: "ROLE PARA EXPLORAR",
    }
  };

  const dict = content[lang as keyof typeof content];

  return (
    <section className={`relative h-screen w-full flex flex-col justify-between bg-[var(--background)] overflow-hidden ${inter.className} pt-32 pb-20 px-6 md:px-12 xl:px-20`}>
      
      {/* Premium SaaS Background Gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] right-[20%] w-[600px] h-[600px] rounded-full bg-[var(--primary)]/30 blur-[150px]" />
        <div className="absolute bottom-[0%] left-[0%] w-[800px] h-[800px] rounded-full bg-[var(--accent)]/20 blur-[150px]" />
      </div>

      {/* TOP HALF: Text & UI Mockups (Now vertically centered using flex-1 & items-center) */}
      <div className="relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center flex-1">
        
        {/* Left/Center: Raw Details Text */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--muted)] border border-[var(--border)] w-max shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--foreground)] text-xs font-semibold tracking-wide uppercase">
              {dict.badge}
            </span>
          </div>

          {/* Brutalist Detail Paragraph (Now white and wider) */}
          <p className="text-sm md:text-base text-[var(--foreground)]/80 leading-loose max-w-xl tracking-wide text-nowrap mt-2">
            {dict.subhead}
          </p>
        </div>

        {/* Right/Center: Floating SaaS Mockups */}
        <div className="lg:col-span-7 relative hidden lg:flex justify-center lg:-ml-12 items-center perspective-1000">
          
          {/* A fixed height box that perfectly frames the two mockups */}
          <div className="relative w-full max-w-[480px] h-[340px]">

            {/* Main Dashboard Panel (Anchored to Top Left) */}
            <div className="absolute top-0 left-0 xl:left-12 w-[380px] xl:w-[420px] bg-[var(--card)]/95 backdrop-blur-sm border border-[var(--border)] rounded-xl shadow-2xl p-5 z-10 transition-transform duration-700 hover:-translate-y-2 hover:rotate-1">
              <div className="flex justify-between items-center mb-6 border-b border-[var(--border)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[var(--primary)]/20 flex justify-center items-center">
                    <svg className="w-4 h-4 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-[var(--foreground)] text-sm font-semibold">Zero-Trust IAM</h3>
                    <p className="text-[var(--muted-foreground)] text-xs">Aracaju Gov API</p>
                  </div>
                </div>
                <span className={`text-[var(--accent)] text-xs bg-[var(--accent)]/10 px-2 py-1 rounded ${firaCode.className}`}>Secured</span>
              </div>

              <div className="space-y-4">
                {[
                  { label: "SQLi Mitigation Filter", value: "Active", status: "accent" },
                  { label: "XSS Payload Scanner", value: "Enforcing", status: "accent" },
                  { label: "JWT Token Expiration", value: "15m Window", status: "muted-foreground" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-[var(--muted-foreground)] text-sm font-medium">{item.label}</span>
                    <span className={`text-[var(--${item.status})] ${firaCode.className} text-xs`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Code Snippet Card (Anchored to Bottom Right) */}
            <div className="absolute bottom-0 left-48 xl:left-64 w-[280px] bg-[#0d1117] border border-[var(--border)] rounded-xl shadow-2xl p-4 z-20 opacity-95 transition-transform duration-500 hover:-scale-105 hover:-rotate-1">
              <div className="flex gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--destructive)]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)]/80" />
              </div>
              <pre className={`text-[10px] leading-relaxed text-slate-300 ${firaCode.className} overflow-hidden`}>
                <code>
                  <span className="text-pink-400">export const</span> <span className="text-blue-300">sanitize</span> = (data) {"=>"} {"{"}<br/>
                  &nbsp;&nbsp;<span className="text-pink-400">return</span> validate(data, {"{"}<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;blockSQL: <span className="text-orange-300">true</span><br/>
                  &nbsp;&nbsp;{"}"});<br/>
                  {"}"};
                </code>
              </pre>
            </div>

          </div>
        </div>
      </div>

      {/* BOTTOM HALF: Anchored Massive Title & Scroll Indicator */}
      <div className="relative z-10 w-full flex justify-between items-end mt-auto">
        
        {/* Bottom Left: Huge Editorial Headline */}
        <h1 className="font-black tracking-tighter uppercase flex flex-col">
          <span className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] text-[var(--foreground)]">
            {dict.headlineLine1}
          </span>
          <span className="text-[clamp(3.5rem,10vw,12rem)] leading-[0.85] text-[var(--muted-foreground)]/40 ml-2 md:ml-12 lg:ml-24">
            {dict.headlineLine2}
          </span>
        </h1>

        {/* Bottom Right: Scroll Indicator */}
        <div className="hidden lg:flex flex-col items-center gap-3 mb-2 opacity-70 hover:opacity-100 transition-opacity">
          <span className={`text-[10px] tracking-[0.25em] text-[var(--foreground)] uppercase style={{ writingMode: 'vertical-rl' }} ${firaCode.className}`}>
            {dict.scroll}
          </span>
          <div className="w-px h-16 bg-[var(--border)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[var(--foreground)] animate-[bounce_2s_infinite]" />
          </div>
        </div>
        
      </div>
    </section>
  );
}