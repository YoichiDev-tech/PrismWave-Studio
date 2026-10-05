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

const accentClasses: Record<
  Segment["accent"],
  { ring: string; text: string; dot: string; glow: string }
> = {
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
    eyebrow: "Building alone",
    title: "Solo founders",
    desc: "You're shipping the product and wearing every other hat. You need a site that looks credible, explains what you do in one screen, and turns visitors into conversations — without another tool to maintain.",
    proof: "A clear homepage and enquiry path so people can say yes without a long pitch.",
    accent: "amber",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Local & service businesses",
    title: "Small & medium businesses",
    desc: "Trades, hospitality, professional services — you need enquiries and bookings, not a brochure. We build fixed-scope sites that load fast, work on phones, and make it easy for customers to contact you.",
    proof: "A site that gets found, gets contacted, and doesn't need weekly babysitting.",
    accent: "coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 21V10l8-6 8 6v11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Product-led teams",
    title: "SaaS & early products",
    desc: "You need a marketing site or lightweight product surface that makes the value obvious and the next step obvious. Clean UI, clear pricing or trial path, built so you can iterate without starting from scratch.",
    proof: "A page that turns technical credibility into sign-ups or booked demos.",
    accent: "violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3.5"
          y="4.5"
          width="17"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 14h3M8 17h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
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
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Who this is for
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Solo founders. SMBs. SaaS teams.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Same path for all of them: free audit or short review, written fixed
            scope, clear price, 2–4 week delivery. A site that does real work —
            not just one that looks finished.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line lg:grid-cols-3">
          {segments.map((segment, i) => {
            const accent = accentClasses[segment.accent];
            return (
              <Reveal
                key={segment.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col bg-ink p-8 transition-colors duration-300 hover:bg-ink-2">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(200px circle at 40px 30px, ${accent.glow}, transparent 70%)`,
                    }}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                        {segment.eyebrow}
                      </span>
                    </div>

                    <div
                      className={`mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-paper transition-colors duration-300 ${accent.ring} ${accent.text}`}
                    >
                      <div className="h-5 w-5">{segment.icon}</div>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-semibold text-paper">
                      {segment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {segment.desc}
                    </p>

                    <p className="mt-5 border-t border-ink-line pt-4 text-xs leading-relaxed text-ink-soft">
                      {segment.proof}
                    </p>

                    <button
                      type="button"
                      onClick={() => onSelectAudience?.(segment.title)}
                      className={`mt-auto flex items-center gap-2 pt-6 text-left font-mono text-[12px] uppercase tracking-widest text-paper transition-colors duration-300 ${accent.text}`}
                    >
                      Start with this
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
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