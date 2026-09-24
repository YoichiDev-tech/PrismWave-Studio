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
// Tab switch animates left/right; panel content slides with the active tab
export default function StartCard({ onSelectIntent, onRequestFullTeardown, onStartIdea }: StartCardProps) {
  const [tab, setTab] = useState<Intent>("audit");
  const [idea, setIdea] = useState("");
  // Track direction so the panel slides the correct way
  const [direction, setDirection] = useState<"left" | "right">("right");

  const selectTab = (next: Intent) => {
    if (next === tab) return;
    setDirection(next === "build" ? "left" : "right");
    setTab(next);
    onSelectIntent(next);
  };

  const handleIdeaSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackAction("cta_click", { intent: "build", metadata: { label: "Start my project", location: "hero-card" } });
    onStartIdea(idea.trim());
  };

  const activeIndex = tab === "audit" ? 0 : 1;

  return (
    <div
      id="audit-tool"
      className="scroll-mt-24 w-full rounded-3xl border border-ink-line bg-ink-2/70 p-5 backdrop-blur-sm sm:p-7"
    >
      {/* Tab list with sliding pill indicator */}
      <div
        role="tablist"
        aria-label="Choose where to start"
        className="relative grid grid-cols-2 gap-1 rounded-full border border-ink-line p-1"
      >
        {/* Sliding background pill */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-full bg-paper transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`start-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`start-panel-${t.id}`}
            onClick={() => selectTab(t.id)}
            className={`relative z-10 min-h-11 rounded-full px-3 font-display text-[13px] font-semibold transition-colors duration-200 ${
              tab === t.id ? "text-ink" : "text-ink-soft hover:text-paper"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel area — slides with direction */}
      <div className="relative mt-5 overflow-hidden">
        <div
          key={tab}
          className={
            direction === "left"
              ? "animate-tab-in-from-right"
              : "animate-tab-in-from-left"
          }
        >
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
                  placeholder="e.g. a cafe shop site"
                  className="min-h-12 min-w-0 flex-1 rounded-lg border border-ink-line bg-transparent px-4 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                />
                <button
                  type="submit"
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
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
                    className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-[11px] text-ink-soft transition-colors hover:border-amber hover:text-paper active:scale-[0.98]"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes tab-in-from-right {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tab-in-from-left {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-tab-in-from-right {
          animation: tab-in-from-right 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-tab-in-from-left {
          animation: tab-in-from-left 0.28s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}