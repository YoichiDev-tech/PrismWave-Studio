import { ArrowUpRight, CheckCircle2, Code2, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import Section from "./Section";

const collaborations = [
  {
    name: "OpsRook-VI",
    type: "Live project",
    description: "A live proof-of-work project showcasing a practical operations-focused product experience.",
    status: "Live",
    href: "https://opsrook-vi.vercel.app",
  },
  {
    name: "Take 5",
    type: "Site Rescue demonstration",
    description: "A fictional café website being refined to demonstrate careful UI/UX improvements to an existing site.",
    status: "Local QA in progress",
    href: null,
  },
];

function CollaborationCard({ item, clone = false }: { item: (typeof collaborations)[number]; clone?: boolean }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-line bg-ink text-amber">
          {item.name === "OpsRook-VI" ? <Code2 className="h-5 w-5" aria-hidden="true" /> : <CheckCircle2 className="h-5 w-5" aria-hidden="true" />}
        </span>
        <span className="rounded-full border border-ink-line bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
          {item.status}
        </span>
      </div>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-amber/80">{item.type}</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-paper">{item.name}</h3>
      <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-ink-soft">{item.description}</p>
      {item.href ? (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-paper transition-colors group-hover:text-amber">
          Visit live project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      ) : (
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft">
          Preview follows local QA
        </span>
      )}
    </>
  );

  if (item.href && !clone) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-[min(82vw,22rem)] shrink-0 rounded-2xl border border-ink-line bg-ink-2/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-amber/60 hover:bg-ink-2 focus-visible:outline-offset-4 sm:w-[22rem]"
      >
        {content}
      </a>
    );
  }

  return (
    <article className="group block w-[min(82vw,22rem)] shrink-0 rounded-2xl border border-ink-line bg-ink-2/80 p-6 sm:w-[22rem]">
      {content}
    </article>
  );
}

export default function Collaborations() {
  return (
    <Section
      id="collaborations"
      ai="collaborations"
      intent="Showcase current PrismWave Studio collaborations and demos with clear live or in-progress status."
      labelledBy="collaborations-title"
      className="overflow-hidden bg-ink-2 py-16 text-paper md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-amber">Working together</p>
              <h2 id="collaborations-title" className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Collaborations
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
                Live work and carefully built demonstrations. New projects will appear here once they are ready to share.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-ink-line px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-ink-soft sm:self-auto">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" /> 2 current projects
            </span>
          </div>
        </Reveal>
      </div>

      <div className="collaboration-viewport mt-9" aria-label="Current collaborations">
        <div className="collaboration-track">
          <div className="collaboration-group">
            {collaborations.map((item) => <CollaborationCard key={item.name} item={item} />)}
          </div>
          <div className="collaboration-group collaboration-duplicate" aria-hidden="true">
            {collaborations.map((item) => <CollaborationCard key={item.name} item={item} clone />)}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-5 flex max-w-6xl items-center justify-between gap-4 px-6 text-xs text-ink-soft">
        <p>Moves right to left · Pause on hover or keyboard focus</p>
        <p className="hidden sm:block"><ExternalLink className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" /> Live links open separately</p>
      </div>
    </Section>
  );
}
