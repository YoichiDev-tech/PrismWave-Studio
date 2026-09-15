import { AiIntent } from "../AiMetadata";

const PAPER = "#F7F6F2";
const INK = "#14181F";
const AMBER = "#D98E2B";
const MUTED = "#A9A296";
const LINE = "rgba(20,24,31,0.1)";
const DISPLAY = "'Inter', ui-sans-serif, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

const SCORES = [
  { label: "Speed", before: 34, after: 88 },
  { label: "Structure", before: 41, after: 92 },
  { label: "Local search", before: 20, after: 81 },
  { label: "Accessibility", before: 55, after: 90 },
];

const FINDINGS = [
  "Missing meta title and description on 4 of 5 pages — written and added",
  "12 images with no alt text — described and tagged",
  "H1 duplicated across two pages — restructured to one per page",
  "Homepage load time 4.1s — compressed images, added lazy loading, now 1.6s",
  "Google Business Profile hours didn't match the site — aligned",
  "No schema markup — added LocalBusiness structured data",
];

export default function SeoShowcase() {
  return (
    <div style={{ background: PAPER, color: INK, fontFamily: DISPLAY }} className="cursor-default">
      {/* Header */}
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-[15px] font-semibold">Site Audit Report</p>
            <p className="text-[12px]" style={{ color: MUTED, fontFamily: MONO }}>
              colombo-ferramenta.it
            </p>
          </div>
          <p className="text-[12px]" style={{ color: MUTED }}>
            Prepared Sep 2026
          </p>
        </div>
      </header>

      <main>
        {/* Hero — overall score */}
        <section aria-labelledby="seo-hero" aria-describedby="seo-hero-intent" className="mx-auto max-w-4xl px-6 py-16 text-center">
          <AiIntent id="seo-hero-intent">Summarize the overall improvement from the SEO Adjustment package.</AiIntent>
          <p className="text-[13px]" style={{ color: MUTED }}>
            Overall score
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <span className="text-4xl" style={{ color: MUTED }}>37</span>
            <span className="text-2xl" style={{ color: MUTED }}>&rarr;</span>
            <span id="seo-hero" className="text-6xl font-semibold" style={{ color: AMBER }}>88</span>
          </div>
          <p className="mx-auto mt-4 max-w-sm text-[14px]" style={{ color: "rgba(20,24,31,0.6)" }}>
            Same pages, same content — fixed what was quietly costing search
            visibility.
          </p>
        </section>

        {/* Score breakdown */}
        <section aria-labelledby="seo-scores" aria-describedby="seo-scores-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="seo-scores-intent">Break down the score improvement by category.</AiIntent>
          <div className="mx-auto max-w-4xl px-6">
            <h2 id="seo-scores" className="text-xl font-semibold">
              By category
            </h2>
            <div className="mt-8 space-y-6">
              {SCORES.map((s) => (
                <div key={s.label}>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span>{s.label}</span>
                    <span style={{ color: MUTED }}>
                      {s.before} <span style={{ color: AMBER }}>&rarr; {s.after}</span>
                    </span>
                  </div>
                  <div className="mt-2 flex h-2 gap-0.5 overflow-hidden rounded-full" style={{ background: "rgba(20,24,31,0.06)" }}>
                    <div style={{ width: `${s.before}%`, background: MUTED }} />
                    <div style={{ width: `${s.after - s.before}%`, background: AMBER }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Findings */}
        <section aria-labelledby="seo-findings" aria-describedby="seo-findings-intent" style={{ borderTop: `1px solid ${LINE}` }} className="py-16">
          <AiIntent id="seo-findings-intent">List what was found and fixed during the audit.</AiIntent>
          <div className="mx-auto max-w-4xl px-6">
            <h2 id="seo-findings" className="text-xl font-semibold">
              What was found &amp; fixed
            </h2>
            <ul className="mt-6 space-y-3">
              {FINDINGS.map((f) => (
                <li key={f} className="flex gap-3 border-b pb-3 text-[14px]" style={{ borderColor: LINE, color: "rgba(20,24,31,0.75)" }}>
                  <span style={{ color: AMBER }}>&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}