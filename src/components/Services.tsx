import type { ReactElement } from "react";
import Reveal from "./Reveal";

interface Service {
  index: string;
  title: string;
  desc: string;
  icon: ReactElement;
}

const services: Service[] = [
  {
    index: "01",
    title: "Web Design",
    desc: "Clean, intentional layouts built around your brand — designed to earn trust in the first five seconds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6.5" cy="6.5" r="0.75" fill="currentColor" />
        <circle cx="9" cy="6.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Web Development",
    desc: "Fast, accessible builds on modern frameworks — code that stays maintainable long after launch.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Landing Pages",
    desc: "Single-purpose pages engineered around one conversion goal, with copy and layout built to match.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12h11M15 12l-3.5-3.5M15 12l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19 5v14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    index: "04",
    title: "Website Redesigns",
    desc: "A modern rebuild of your existing site — same content and voice, faster, sharper, and mobile-ready.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M17.5 3v4h-4M6.5 21v-4h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-ink py-24 md:py-32 cursor-default">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-xl">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">What we build</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            One clear outcome: a site that helps your business move.
          </h2>
          <p className="mt-5 max-w-2xl text-ink-soft">
            Choose the starting point that matches where you are now. We can sharpen an existing site, launch a focused page, or build the larger idea behind it.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className="group relative h-full bg-ink p-7 transition-colors duration-300 hover:bg-ink-2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(160px circle at 30px 20px, rgba(108,99,255,0.18), transparent 70%)" }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-paper transition-colors duration-300 group-hover:border-amber group-hover:text-amber">
                      <div className="h-5 w-5">{service.icon}</div>
                    </div>
                    <span className="font-mono text-[12px] text-ink-soft">{service.index}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-paper">{service.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{service.desc}</p>
                  <span className="mt-6 block h-px w-8 bg-ink-line transition-all duration-300 group-hover:w-14 group-hover:bg-amber" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}