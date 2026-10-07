import Reveal from "./Reveal";
import Section from "./Section";
import ScoreGauge from "./ScoreGauge";
import { scrollToSection } from "../lib/scroll";
import { trackAction } from "../lib/track";

/*
  Homepage proof block — same job as a "product in action" demo.
  Shows a representative audit report card so visitors see the output
  before they run their own URL. Not a real client claim.

  Before / after are pure UI mocks (no stock photos) so the section
  still looks real in both themes and never depends on missing assets.
*/

const FLOW = ["Enter URL", "Scan", "Score", "Prioritized fixes", "15-min review"];

const CATEGORIES = [
  { label: "Speed", score: 42 },
  { label: "Mobile", score: 61 },
  { label: "SEO", score: 55 },
  { label: "AI-readability", score: 38 },
];

const FINDINGS = [
  {
    impact: "High",
    title: "Mobile viewport missing",
    detail:
      "No viewport meta tag — phones render a zoomed-out desktop layout. Enquiries drop here first.",
  },
  {
    impact: "High",
    title: "Slow first response",
    detail:
      "Server TTFB over 1.8s on the homepage. Most visitors decide in under three seconds.",
  },
  {
    impact: "Medium",
    title: "Thin metadata for search and AI",
    detail:
      "Title and description are generic; no structured data. Harder to rank and harder for AI to cite.",
  },
];

function impactClass(impact: string): string {
  if (impact === "High") return "border-coral/40 text-coral";
  if (impact === "Medium") return "border-amber/40 text-amber";
  return "border-ink-line text-ink-soft";
}

function barColor(score: number): string {
  // Matches ScoreGauge thresholds so the card and gauges feel like one system
  if (score >= 80) return "#7CD98A";
  if (score >= 55) return "#FFB84D";
  return "#FF7A59";
}

function ReportChrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink shadow-sm">
      <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" aria-hidden="true" />
        <span className="ml-3 truncate font-mono text-[11px] text-ink-soft">{label}</span>
      </div>
      {children}
    </div>
  );
}

/* Outdated local-trades homepage — reads as a real weak site, not a cartoon */
function BeforeSiteMock() {
  return (
    <div className="bg-[#e8e4dc] text-[#1a1a1a]">
      <div className="border-b border-black/15 bg-[#1e3a5f] px-3 py-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-white/90">
          Northside Electrical Ltd
        </p>
        <p className="mt-0.5 text-[9px] text-white/60">Est. 1998 · Call 0161 000 0000</p>
      </div>
      <div className="space-y-2 p-3">
        <div className="border border-black/20 bg-[#f5f1e8] p-2">
          <p className="text-[11px] font-bold leading-tight">Welcome to our website!!!</p>
          <p className="mt-1 text-[9px] leading-snug text-black/70">
            We do electrics. Click the links below. Best prices in the area. Under construction —
            more pages coming soon.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["Home", "Services", "Contact"].map((label) => (
            <div
              key={label}
              className="border border-black/25 bg-[#c5d4e8] px-1 py-1.5 text-center text-[9px] font-semibold text-[#1e3a5f]"
            >
              {label}
            </div>
          ))}
        </div>
        <ul className="space-y-1 border border-black/15 bg-white/70 p-2 text-[9px] leading-snug text-black/75">
          <li>• Rewires — ask for quote</li>
          <li>• Consumer units (fuse boards)</li>
          <li>• Emergency callouts when available</li>
          <li>• Email us from the contact page</li>
        </ul>
        <p className="text-center text-[8px] text-black/45">
          Best viewed in Internet Explorer · Last updated 2014
        </p>
      </div>
    </div>
  );
}

/* Clean Site Rescue direction for the same vertical — concept only */
function AfterSiteMock() {
  return (
    <div className="bg-[#0f1419] text-[#f3f4f1]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
        <p className="font-display text-[11px] font-semibold tracking-tight">Northside Electrical</p>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold text-[#0a0e1a]"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          Call now
        </span>
      </div>
      <div className="space-y-2.5 p-3">
        <div>
          <p className="font-display text-[13px] font-semibold leading-tight">
            Fast, certified electrical work across Greater Manchester.
          </p>
          <p className="mt-1 text-[9px] leading-snug text-white/55">
            EICR · rewires · consumer units · same-week slots where available.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { t: "Emergency", d: "Priority callouts" },
            { t: "EICR", d: "Clear pass/fail report" },
            { t: "Rewires", d: "Fixed-scope quote" },
            { t: "Landlords", d: "Compliance ready" },
          ].map((card) => (
            <div key={card.t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
              <p className="text-[10px] font-semibold">{card.t}</p>
              <p className="text-[8px] text-white/50">{card.d}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
          <span className="text-[9px] text-white/60">Next available</span>
          <span className="font-mono text-[9px] text-[#FFB84D]">Thu · AM</span>
        </div>
        <div
          className="rounded-full py-1.5 text-center text-[10px] font-semibold text-[#0a0e1a]"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          Request a callback
        </div>
      </div>
    </div>
  );
}

export default function AuditInAction() {
  const goToAudit = () => {
    trackAction("cta_click", {
      metadata: { label: "Run this on my site", location: "audit-in-action" },
    });
    const target = document.getElementById("audit-tool") ? "audit-tool" : "top";
    scrollToSection(target);
  };

  return (
    <Section
      id="audit-in-action"
      ai="audit-in-action"
      intent="Show a concrete sample audit report so visitors understand the free audit output before running their own site."
      labelledBy="audit-in-action-title"
      className="border-y border-ink-line bg-ink-2 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Audit in action
          </p>
          <h2
            id="audit-in-action-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            See what a free audit actually returns.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Score, category breakdown, and prioritized issues — then a clear next
            step. Representative example for a local service site. Run yours above
            for live numbers.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-ink-line bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-paper">
                  {step}
                </span>
                {i < FLOW.length - 1 ? (
                  <span aria-hidden="true" className="text-ink-soft">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10">
            <ReportChrome label="prismwave-studio · sample audit report">
              <div className="flex items-center justify-between border-b border-ink-line px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Sample URL · local trades homepage
                </span>
                <span className="rounded-full border border-ink-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Example
                </span>
              </div>

              <div className="grid gap-8 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
                <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-ink-line bg-ink-2/60 p-6">
                  <ScoreGauge label="Overall" score={48} size={120} />
                  <div className="w-full space-y-3">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        <div className="mb-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide">
                          <span className="text-ink-soft">{cat.label}</span>
                          <span className="text-paper">{cat.score}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-ink-line">
                          <div
                            className="h-full rounded-full transition-[width] duration-700"
                            style={{
                              width: `${cat.score}%`,
                              backgroundColor: barColor(cat.score),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                    Prioritized findings
                  </p>
                  <ul className="mt-4 flex flex-1 flex-col gap-3">
                    {FINDINGS.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-xl border border-ink-line bg-ink-2/40 p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${impactClass(
                              item.impact
                            )}`}
                          >
                            {item.impact}
                          </span>
                          <h3 className="font-display text-sm font-semibold text-paper">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs leading-relaxed text-ink-soft">
                    After the live audit: a 15-minute review, then a written fixed-scope
                    plan — Site Rescue fixes or a full rebuild — with a clear price
                    before any deposit.
                  </p>
                </div>
              </div>
            </ReportChrome>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-10">
            <p className="text-center font-mono text-[12px] uppercase tracking-widest text-ink-soft">
              What Site Rescue can look like
            </p>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-soft">
              Same vertical, two directions — outdated brochure site versus a clear
              enquiry-led layout. Concept demo only.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <figure>
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    Before · concept
                  </span>
                  <span className="font-mono text-[10px] text-coral">Score ~48</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-ink-line shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-ink-line bg-ink-2 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="ml-2 truncate font-mono text-[10px] text-ink-soft">
                      northside-electrical.example
                    </span>
                  </div>
                  <BeforeSiteMock />
                </div>
                <figcaption className="mt-2 px-1 text-xs leading-relaxed text-ink-soft">
                  No clear offer, weak mobile layout, hard to contact.
                </figcaption>
              </figure>

              <div className="hidden text-center md:block">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
                  Site Rescue
                </span>
                <span className="mt-1 block font-mono text-[10px] text-ink-soft">concept</span>
              </div>

              <figure>
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    After · concept
                  </span>
                  <span className="font-mono text-[10px] text-amber">Enquiry-led</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-ink-line shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-ink-line bg-ink-2 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="ml-2 truncate font-mono text-[10px] text-ink-soft">
                      northside-electrical.example
                    </span>
                  </div>
                  <AfterSiteMock />
                </div>
                <figcaption className="mt-2 px-1 text-xs leading-relaxed text-ink-soft">
                  Clear offer, phone CTA, services visitors can act on.
                </figcaption>
              </figure>
            </div>

            <p className="mt-4 text-center text-xs text-ink-soft">
              Illustrative Site Rescue direction for a trades site — not a published
              client case study. Real work is scoped only after your audit and review.
            </p>
          </div>
        </Reveal>

        <Reveal delay={4} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={goToAudit}
            className="rounded-full px-8 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
            }}
          >
            Run this on my site
          </button>
          <button
            type="button"
            onClick={() => {
              trackAction("cta_click", {
                metadata: { label: "Book 15-min review", location: "audit-in-action" },
              });
              scrollToSection("contact");
            }}
            className="rounded-full border border-ink-line px-8 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-amber active:scale-[0.98]"
          >
            Book a 15-min review
          </button>
        </Reveal>
      </div>
    </Section>
  );
}