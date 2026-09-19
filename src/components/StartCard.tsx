import { useState } from "react";
import type { FormEvent } from "react";
import type { Intent } from "../pages/Home";
import AuditWidget from "./AuditWidget";
import { trackAction } from "../lib/track";

interface StartCardProps {
  onSelectIntent: (intent: Intent) => void;
  onRequestFullTeardown: (context: { siteUrl: string; score: number; findings: string[] }) => void;
  onStartIdea: (idea: string) => void;
}

const IDEA_EXAMPLES = ["A barber shop booking site", "A neighborhood supermarket site", "My startup's first site"];

const TABS: { id: Intent; label: string }[] = [
  { id: "audit", label: "I have a site" },
  { id: "build", label: "I have an idea" },
];

// The hero's single conversion surface. Two visitor types, two low-friction
// first steps — both end in the same Contact form with the right intent set
export default function StartCard({ onSelectIntent, onRequestFullTeardown, onStartIdea }: StartCardProps) {
  const [tab, setTab] = useState<Intent>("audit");
  const [idea, setIdea] = useState("");

  const selectTab = (next: Intent) => {
    setTab(next);
    onSelectIntent(next);
  };

  const handleIdeaSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackAction("cta_click", { intent: "build", metadata: { label: "Start my project", location: "hero-card" } });
    onStartIdea(idea.trim());
  };

  return (
    <div
      id="audit-tool"
      className="scroll-mt-24 w-full rounded-3xl border border-ink-line bg-ink-2/70 p-5 backdrop-blur-sm sm:p-7"
    >
      <div role="tablist" aria-label="Choose where to start" className="grid grid-cols-2 gap-1 rounded-full border border-ink-line p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`start-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`start-panel-${t.id}`}
            onClick={() => selectTab(t.id)}
            className={`min-h-11 rounded-full px-3 font-display text-[13px] font-semibold transition-colors ${
              tab === t.id ? "bg-paper text-ink" : "text-ink-soft hover:text-paper"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "audit" ? (
          <div role="tabpanel" id="start-panel-audit" aria-labelledby="start-tab-audit">
            <AuditWidget onRequestFullTeardown={onRequestFullTeardown} />
          </div>
        ) : (
          <div role="tabpanel" id="start-panel-build" aria-labelledby="start-tab-build">
            <p className="font-display text-xl font-semibold leading-snug text-paper">What do you want to build?</p>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              One line is enough. We reply within one business day — no obligation.
            </p>
            <form onSubmit={handleIdeaSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor="idea-input" className="sr-only">
                Describe your idea
              </label>
              <input
                id="idea-input"
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="e.g. a booking site for my barber shop"
                className="min-h-12 min-w-0 flex-1 rounded-lg border border-ink-line bg-transparent px-4 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
              />
              <button
                type="submit"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
                style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
              >
                Start my project
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </form>
            <div className="mt-4 flex flex-wrap gap-2">
              {IDEA_EXAMPLES.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setIdea(example)}
                  className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-[11px] text-ink-soft transition-colors hover:border-amber hover:text-paper"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}