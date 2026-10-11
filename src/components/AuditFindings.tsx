import Reveal from "./Reveal";
import Section from "./Section";

const FINDING_TYPES = [
  {
    type: "Score breakdown",
    desc: "We show the overall score and individual scores for speed, mobile readiness, page metadata, and AI readability.",
  },
  {
    type: "Observed findings",
    desc: "We show the signals detected during the scan and explain what they may mean, without presenting assumptions as proven business problems.",
  },
  {
    type: "Business context",
    desc: "We explain why a finding may deserve attention. A scan alone cannot determine its full impact on conversions, search visibility, or revenue.",
  },
  {
    type: "Optional human review",
    desc: "We offer a free review so we can discuss which findings matter most and whether any work is worth doing.",
  },
];

export default function AuditFindings() {
  return (
    <Section
      id="audit-findings"
      ai="audit-findings"
      intent="Explain the format and limitations of the automated website audit."
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
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            What you get
          </p>

          <h2
            id="audit-findings-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            Know what the scan found. Understand what to review.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            We show the measured score, the signals detected, and the areas that
            may deserve a closer look. The scan is a starting point, not a
            complete assessment of your website or its business performance.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINDING_TYPES.map((item) => (
              <div
                key={item.type}
                className="rounded-2xl border border-ink-line bg-ink-2/60 p-5 transition-colors hover:border-amber"
              >
                <h3 className="font-display text-base font-semibold text-paper">
                  {item.type}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}