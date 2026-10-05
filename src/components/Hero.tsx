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
  "2-4 week turnaround",
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
      intent="Lead with a free site audit so visitors can see the problem first, then start a fixed-scope build or rebuild."
      labelledBy="hero-title"
      className="grain relative overflow-x-clip bg-ink pb-16 pt-28 md:pb-24 md:pt-36"
    >
      <style>{`
        .flow-text {
          background: linear-gradient(100deg, #FFB84D, #FF7A59, #6C63FF, #FFB84D);
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
      `}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] translate-x-[35%] rounded-full opacity-20 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-0 h-[420px] w-[420px] -translate-x-[35%] rounded-full opacity-10 blur-[130px]"
        style={{
          background: "radial-gradient(circle, #FFB84D 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-14">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-soft sm:text-[12px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-amber" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            Free site audit · Fixed-scope builds for small businesses
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.2rem,9vw,3.4rem)] font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl md:text-[3.8rem] lg:text-[4.2rem]"
          >
            See what&apos;s holding your website back.
            <br />
            <span className="flow-text">
              Then fix it — or rebuild it properly.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Free audit that scores speed, mobile, SEO and AI-readability in
            seconds. Then a 15-minute review and a written fixed-scope plan —
            Site Rescue or a full rebuild — with clear price and 2-4 week
            delivery. You own the code.
          </p>

          <ul className="mt-6 hidden flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[12px] uppercase tracking-wide text-ink-soft sm:flex">
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

          <p className="mt-8 text-center font-mono text-[12px] uppercase tracking-wide text-ink-soft">
            Just browsing{" "}
            <a
              href="#work"
              onClick={() =>
                trackAction("cta_click", {
                  metadata: { label: "See our work", location: "hero" },
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