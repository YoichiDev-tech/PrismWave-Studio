import { pickPlan } from "../lib/pickPlan";
import { scrollToSection } from "../lib/scroll";

interface PackageSuggestionProps {
  score: number;
  onSelect: (planLabel: string) => void;
}

export default function PackageSuggestion({
  score,
  onSelect,
}: PackageSuggestionProps) {
  // I use the existing threshold to decide when to offer a conversation,
  // not to diagnose the work a site needs.
  const plan = pickPlan(score);

  if (!plan) return null;

  return (
    <div className="mt-6 rounded-xl border border-ink-line p-4 text-left">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        Da approfondire
      </p>

      <p className="mt-2 font-display text-base font-semibold text-paper">
        Il punteggio è un punto di partenza, non un preventivo di progetto.
      </p>

      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        I can review the findings with you and help determine whether targeted
        improvements or a broader project would make sense. I confirm scope,
        price, and timeline before any work begins.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => onSelect("Revisione dei risultati dell'analisi")}
          className="font-display text-sm font-semibold text-paper underline underline-offset-4 hover:text-amber"
        >
          Parliamo dei risultati &rarr;
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("pricing")}
          className="font-mono text-[11px] uppercase tracking-wide text-ink-soft underline underline-offset-4 hover:text-amber"
        >
          Scopri i servizi disponibili
        </button>
      </div>
    </div>
  );
}