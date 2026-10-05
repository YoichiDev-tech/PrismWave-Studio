import { formatWeeks } from "../data/offers";
import { pickPlan, REBUILD_BELOW_SCORE } from "../lib/pickPlan";
import { scrollToSection } from "../lib/scroll";

interface PackageSuggestionProps {
  score: number;
  onSelect: (planLabel: string) => void;
}

// Renders only for weak audit scores; returns null otherwise so healthy
// sites never see a sales prompt
export default function PackageSuggestion({ score, onSelect }: PackageSuggestionProps) {
  const plan = pickPlan(score);
  if (!plan) return null;

  const isRebuild = score < REBUILD_BELOW_SCORE;

  return (
    <div className="mt-6 rounded-xl border border-ink-line p-4 text-left">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
        {isRebuild ? "Suggested rebuild" : "Suggested fix"}
      </p>
      <div className="mt-2 flex items-baseline justify-between gap-3">
        <p className="font-display text-base font-semibold text-paper">{plan.label}</p>
        <p className="font-display text-base font-semibold text-amber">
          ${plan.price.toLocaleString()}
          <span className="ml-1.5 font-mono text-[11px] font-normal text-ink-soft">
            · {formatWeeks(plan.weeks)}
          </span>
        </p>
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{plan.blurb}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={() => onSelect(plan.label)}
          className="font-display text-sm font-semibold text-paper underline underline-offset-4 hover:text-amber"
        >
          Get this scoped &rarr;
        </button>
        <button
          type="button"
          onClick={() => scrollToSection("pricing")}
          className="font-mono text-[11px] uppercase tracking-wide text-ink-soft underline underline-offset-4 hover:text-amber"
        >
          See all packages
        </button>
      </div>
    </div>
  );
}