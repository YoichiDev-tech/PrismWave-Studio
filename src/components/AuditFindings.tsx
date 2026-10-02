import Reveal from "./Reveal";
import Section from "./Section";

const FINDING_TYPES = [
  {
    type: "Score breakdown",
    desc: "Overall score (0-100) plus individual category scores for speed, mobile, SEO, and AI-readability.",
  },
  {
    type: "Prioritized issues",
    desc: "Findings ranked by impact — you see what hurts most first, not a laundry list of minor problems.",
  },
  {
    type: "Actionable steps",
    desc: "Specific fixes, not vague advice. Each finding points to exactly what needs to change.",
  },
  {
    type: "No gate, no pitch",
    desc: "Preview 2-3 findings immediately. Full report requires only your email — no sales call required.",
  },
];

export default function AuditFindings() {
  return (
    <Section
      id="audit-findings"
      ai="audit-findings"
      intent="Explain the format and structure of audit findings so visitors know what to expect."
      labelledBy="audit-findings-title"
      className="grain relative overflow-hidden bg-ink py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[480px] w-[720px] translate-x-[35%] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #FFB84D 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">What you get</p>
          <h2 id="audit-findings-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Clear, prioritized, actionable findings.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Audit findings include an overall score, category breakdowns, and prioritized issues ranked by impact. Each finding is specific and actionable — no generic checklists or vague recommendations.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINDING_TYPES.map((item) => (
              <div
                key={item.type}
                className="rounded-2xl border border-ink-line bg-ink-2/60 p-5 transition-colors hover:border-amber"
              >
                <h3 className="font-display text-base font-semibold text-paper">{item.type}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
