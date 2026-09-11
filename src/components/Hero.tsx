import type { MouseEvent } from "react";
import type { Intent } from "../pages/Home";
import { trackAction } from "../lib/track";
import { scrollToSection } from "../lib/scroll";

interface HeroProps {
  onSelectIntent: (intent: Intent) => void;
}

export default function Hero({ onSelectIntent }: HeroProps) {
  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="top"
      className="grain relative overflow-x-hidden bg-ink pb-24 pt-36 md:pb-32 md:pt-44 cursor-default"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 translate-x-[35%] h-[560px] w-[560px] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 -translate-x-[35%] h-[420px] w-[420px] rounded-full opacity-10 blur-[130px]"
        style={{ background: "radial-gradient(circle, #FFB84D 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            Now booking Q3 projects
          </p>

          <h1 className="font-display text-[clamp(2.2rem,9vw,3.4rem)] font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-[4.2rem]">
            Websites that carry
            <br />
            your business <span className="text-gradient">further.</span>
          </h1>

          <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft">
            Two ways in: your current site is holding you back and needs a
            second look — or you've got an idea and nothing built yet.
            Either way, tell us where you're starting from.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#audit-tool"
              onClick={(event) => {
                handleSectionClick(event, "audit-tool");
                onSelectIntent("audit");
                trackAction("cta_click", { metadata: { label: "Get a Free Website Audit", location: "hero" } });
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] bg-amber"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              Get a Free Website Audit
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
            <a
              href="#build"
              onClick={(event) => {
                handleSectionClick(event, "build");
                onSelectIntent("build");
                trackAction("cta_click", { metadata: { label: "I Have an Idea, Not a Site", location: "hero" } });
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink-line px-7 py-3.5 font-display text-sm font-semibold text-paper transition-colors hover:border-amber hover:text-amber"
            >
              I Have an Idea, Not a Site
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>

          <div className="mt-8">
            <a
              href="#work"
              onClick={(event) => {
                handleSectionClick(event, "work");
                trackAction("cta_click", { metadata: { label: "See our work", location: "hero" } });
              }}
              className="font-mono text-[12px] uppercase tracking-wide text-ink-soft underline underline-offset-4 transition-colors hover:text-paper"
            >
              Or just see our work &rarr;
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[12px] uppercase tracking-wide text-ink-soft">
            <span>2-4 weeks turnaround</span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-line sm:inline-block" />
            <span>Fixed-scope pricing</span>
            <span className="hidden h-1 w-1 rounded-full bg-ink-line sm:inline-block" />
            <span>Built on modern frameworks</span>
          </div>
        </div>

        {/* Signature: animated waveform */}
        <div className="relative flex items-center justify-center rounded-3xl border border-ink-line p-2 transition-colors hover:border-amber hover:bg-ink-2 sm:p-3 md:transition-transform md:hover:scale-[1.02]">
          <div className="relative w-full max-w-sm rounded-[1.35rem] border border-ink-line bg-ink-2/60 p-5 backdrop-blur-sm sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Signal — live preview</p>
            <svg viewBox="0 0 340 160" className="mt-5 w-full sm:mt-6" aria-hidden="true">
              <defs>
                <linearGradient id="hero-wave" x1="0" y1="0" x2="340" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFB84D" />
                  <stop offset="0.32" stopColor="#FF7A59" />
                  <stop offset="0.64" stopColor="#6C63FF" />
                  <stop offset="1" stopColor="#FFB84D" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="0 0; 340 0; 0 0"
                    dur="7s"
                    repeatCount="indefinite"
                  />
                </linearGradient>
              </defs>
              <path
                className="wave-path"
                d="M0 80 C 20 20, 40 20, 60 80 S 100 140, 120 80 S 160 20, 180 80 S 220 140, 240 80 S 280 20, 300 80 S 330 100, 340 80"
                fill="none"
                stroke="url(#hero-wave)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-ink-line pt-5 sm:mt-6 sm:gap-4">
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold leading-none text-paper">3</p>
                <p className="mt-2 max-w-[7ch] font-mono text-[10px] uppercase leading-[1.35] tracking-wide text-ink-soft sm:text-[11px]">Live templates</p>
              </div>
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold leading-none text-paper">4</p>
                <p className="mt-2 max-w-[7ch] font-mono text-[10px] uppercase leading-[1.35] tracking-wide text-ink-soft sm:text-[11px]">Audit signals</p>
              </div>
              <div className="min-w-0">
                <p className="font-display text-2xl font-semibold leading-none text-paper">2-4</p>
                <p className="mt-2 max-w-[7ch] font-mono text-[10px] uppercase leading-[1.35] tracking-wide text-ink-soft sm:text-[11px]">Weeks typical</p>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="float-slow absolute -bottom-6 -left-6 hidden rounded-2xl border border-ink-line bg-ink-2 px-4 py-3 shadow-xl sm:block"
          >
            <p className="font-mono text-[11px] text-ink-soft">Mobile-first &check;</p>
          </div>
        </div>
      </div>
    </section>
  );
}