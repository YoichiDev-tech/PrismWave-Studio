import Reveal from "./Reveal";
import Section from "./Section";

const collaborations = [
  { name: "OpsRook-VI", href: "https://opsrook-vi.vercel.app", mark: "opsrook", suffix: "VI", style: "font-sans font-bold tracking-[-0.07em]" },
  { name: "Take 5", href: null, mark: "take", suffix: "5", style: "font-display font-semibold tracking-[-0.06em]" },
];

function Wordmark({ item }: { item: (typeof collaborations)[number] }) {
  const mark = (
    <span className="inline-flex min-h-14 items-center justify-center gap-1 whitespace-nowrap px-3 text-ink-soft transition-colors duration-300 group-hover:text-paper sm:min-h-16 sm:px-5">
      <span className={`text-2xl sm:text-3xl ${item.style}`}>{item.mark}</span>
      <span className={`text-lg sm:text-xl ${item.name === "OpsRook-VI" ? "font-mono font-semibold tracking-tight text-amber" : "font-display font-bold text-paper"}`}>{item.suffix}</span>
    </span>
  );

  if (!item.href) {
    return <span className="group flex shrink-0 items-center" aria-label={item.name}>{mark}</span>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex shrink-0 items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      aria-label={`Visit ${item.name}`}
    >
      {mark}
    </a>
  );
}

export default function Collaborations() {
  return (
    <Section
      id="collaborations"
      ai="collaborations"
      intent="Show a restrained logo-only strip of current PrismWave Studio collaborations."
      labelledBy="collaborations-title"
      className="overflow-hidden border-y border-ink-line/70 bg-ink-2/45 py-10 text-paper sm:py-12"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 id="collaborations-title" className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft sm:text-xs">
            Collaborations
          </h2>
        </Reveal>
      </div>

      <div className="collaboration-viewport mt-5" role="group" aria-label="Collaborating brands">
        <div className="collaboration-track">
          <div className="collaboration-group">
            {collaborations.map((item) => <Wordmark key={item.name} item={item} />)}
          </div>
          <div className="collaboration-group collaboration-duplicate" aria-hidden="true">
            {collaborations.map((item) => <Wordmark key={item.name} item={item} />)}
          </div>
        </div>
      </div>
    </Section>
  );
}
