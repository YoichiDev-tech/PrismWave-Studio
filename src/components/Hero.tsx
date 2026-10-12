import type { Intent } from "../pages/Home";
import Section from "./Section";
import StartCard from "./StartCard";
import { trackAction } from "../lib/track";

interface HeroProps {
  onSelectIntent: (intent: Intent) => void;
  onRequestFullTeardown: (context: {
    siteUrl: string;
    score: number;
    findings: string[];
  }) => void;
  onStartIdea: (idea: string) => void;
}

const TRUST = [
  "Fixed-scope pricing",
  "You own the code",
  "15-min review first",
];

export default function Hero({
  onSelectIntent,
  onRequestFullTeardown,
  onStartIdea,
}: HeroProps) {
  return (
    <Section
      id="top"
      ai="hero"
      intent="Lead with a free website audit, then offer fixed-scope website improvements or rebuilds."
      labelledBy="hero-title"
      className="grain relative overflow-x-clip bg-ink pb-10 pt-20 md:pb-14 md:pt-24"
    >
      <style>{`
        .flow-text {
          background: linear-gradient(
            100deg,
            #FFB84D,
            #FF7A59,
            #6C63FF,
            #FFB84D
          );
          background-size: 600px 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: flow 7s linear infinite;
        }

        @keyframes flow {
          0% { background-position: -340px 0; }
          50% { background-position: 340px 0; }
          100% { background-position: -340px 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flow-text {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] translate-x-[35%] rounded-full opacity-20 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 h-[420px] w-[420px] -translate-x-[35%] rounded-full opacity-10 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, #FFB84D 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-7 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-10">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-ink-soft sm:text-[11px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            Free website audit · Fixed-scope builds
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.2rem,8vw,3.4rem)] font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-[3.5rem] lg:text-[3.8rem]"
          >
            Find out what&apos;s holding your website back.
            <br />
            <span className="flow-text">
              Then fix it or rebuild it.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Get a free audit, clear pricing, and a website built in 2–4 weeks.
          </p>

          <ul className="mt-5 hidden flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-wide text-ink-soft sm:flex">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-amber"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <StartCard
            onSelectIntent={onSelectIntent}
            onRequestFullTeardown={onRequestFullTeardown}
            onStartIdea={onStartIdea}
          />

          <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            Just browsing{" "}
            <a
              href="#work"
              onClick={() =>
                trackAction("cta_click", {
                  metadata: {
                    label: "See our work",
                    location: "hero",
                  },
                })
              }
              className="text-paper underline underline-offset-4 transition-colors hover:text-amber"
            >
              See concept demos →
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}