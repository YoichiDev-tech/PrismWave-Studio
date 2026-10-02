import Reveal from "./Reveal";
import Section from "./Section";

const CHECKS = [
  {
    title: "Page Speed",
    desc: "Server response time and HTML payload weight. Visitors expect under 1s; anything over 3s kills conversions.",
  },
  {
    title: "Mobile Responsiveness",
    desc: "Viewport meta tag and responsive breakpoints. Your site must render correctly on phones, not zoomed-out desktop layouts.",
  },
  {
    title: "SEO Basics",
    desc: "HTTPS security, meta descriptions, title tags, and Open Graph tags for social sharing previews.",
  },
  {
    title: "AI Readability",
    desc: "Semantic landmarks, heading structure, structured data (JSON-LD), and image alt text for AI crawlers and accessibility.",
  },
];

export default function AuditDetails() {
  return (
    <Section
      id="audit-details"
      ai="audit-details"
      intent="Explain what the free website audit actually checks across four categories."
      labelledBy="audit-details-title"
      className="border-y border-ink-line bg-ink-2 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">What the audit checks</p>
          <h2 id="audit-details-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Four technical signals that matter for your site.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            A free website audit analyzes your site against performance, mobile, SEO, and AI-readability standards. The audit checks response time, page weight, viewport configuration, semantic markup, and structured data to identify concrete problems.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHECKS.map((check) => (
              <div
                key={check.title}
                className="rounded-2xl border border-ink-line bg-ink/60 p-5 transition-colors hover:border-amber"
              >
                <h3 className="font-display text-base font-semibold text-paper">{check.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{check.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
