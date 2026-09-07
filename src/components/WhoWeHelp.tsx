import type { ReactElement } from "react";
import Reveal from "./Reveal";

interface Segment {
  eyebrow: string;
  title: string;
  desc: string;
  proof: string;
  accent: "amber" | "coral" | "violet";
  icon: ReactElement;
}

const accentClasses: Record<Segment["accent"], { ring: string; text: string; dot: string; glow: string }> = {
  amber: {
    ring: "group-hover:border-amber",
    text: "group-hover:text-amber",
    dot: "bg-amber",
    glow: "rgba(255,184,77,0.18)",
  },
  coral: {
    ring: "group-hover:border-coral",
    text: "group-hover:text-coral",
    dot: "bg-coral",
    glow: "rgba(255,122,89,0.18)",
  },
  violet: {
    ring: "group-hover:border-violet",
    text: "group-hover:text-violet",
    dot: "bg-violet",
    glow: "rgba(108,99,255,0.18)",
  },
};

const segments: Segment[] = [
  {
    eyebrow: "Independent operators",
    title: "Solo & small businesses",
    desc: "You're running the business, not maintaining a website. We build a site that gets found, gets booked, and doesn't need you to touch it again — grounded in years spent on the floor of hospitality and service businesses ourselves.",
    proof: "A booking form that actually reduces no-shows, not just a contact page.",
    accent: "amber",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 21V10l8-6 8 6v11" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    eyebrow: "Expanding internationally",
    title: "African businesses going global",
    desc: "A site that reads as credible the moment an overseas client, partner, or investor lands on it — fast, mobile-first, and built to survive the connection speeds and devices your real audience uses, not a demo laptop.",
    proof: "One clear page that makes the case before a call ever happens.",
    accent: "coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    eyebrow: "Circular economy",
    title: "Sustainability & recycling ventures",
    desc: "Most agencies don't speak this space — we do. A site that makes what you do, and why it matters, obvious within one scroll, plus an AI-Ready Audit that shows exactly what's holding your current site back from converting.",
    proof: "Copy and structure built around impact, not generic startup language.",
    accent: "violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 7 4 12l3 5M17 7l3 5-3 5M10 4h4l-2 4-2-4Zm0 16h4l-2-4-2 4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface WhoWeHelpProps {
  onSelectAudience?: (segment: string) => void;
}

export default function WhoWeHelp({ onSelectAudience }: WhoWeHelpProps) {
  return (
    <section id="who-we-help" className="bg-ink py-24 md:py-32 cursor-default">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-xl">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Who this is for</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Three kinds of businesses. One clear path in.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Whichever one you are, the goal is the same: a site that does real work for you, not just one that looks good.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line lg:grid-cols-3">
          {segments.map((segment, i) => {
            const accent = accentClasses[segment.accent];
            return (
              <Reveal key={segment.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4} className="h-full">
                <div className="group relative flex h-full flex-col bg-ink p-8 transition-colors duration-300 hover:bg-ink-2">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `radial-gradient(200px circle at 40px 30px, ${accent.glow}, transparent 70%)` }}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} aria-hidden="true" />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">{segment.eyebrow}</span>
                    </div>

                    <div
                      className={`mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-paper transition-colors duration-300 ${accent.ring} ${accent.text}`}
                    >
                      <div className="h-5 w-5">{segment.icon}</div>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-semibold text-paper">{segment.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{segment.desc}</p>

                    <p className="mt-5 border-t border-ink-line pt-4 text-xs leading-relaxed text-ink-soft">
                      {segment.proof}
                    </p>

                    <button
                      type="button"
                      onClick={() => onSelectAudience?.(segment.title)}
                      className={`mt-auto flex items-center gap-2 pt-6 text-left font-mono text-[12px] uppercase tracking-widest text-paper transition-colors duration-300 ${accent.text}`}
                    >
                      Start with this
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}