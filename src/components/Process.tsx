import Reveal from "./Reveal";
import Section from "./Section";

const STEPS = [
  {
    title: "Audit or short call",
    desc: "Free site audit or a 15-minute review. You get clear findings and a realistic recommendation — fix, rebuild, or leave it.",
  },
  {
    title: "Written project summary",
    desc: "One plain document: exact pages, features, timeline, and what's included or excluded. No vague proposals.",
  },
  {
    title: "Simple agreement + deposit",
    desc: "You receive a short agreement covering price, deposit, revisions, and ownership. Work starts only after deposit and signed terms.",
  },
  {
    title: "Build & review rounds",
    desc: "Fixed-scope build in 2-4 weeks. You get the included revision rounds. No surprise hours or scope creep.",
  },
  {
    title: "Launch & full handover",
    desc: "Deploy, connect domain if needed, handover the complete code and assets. You own 100%. Optional support after that.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      ai="process"
      intent="Show the clear fixed-scope path from first contact through written agreement, build, and handover."
      labelledBy="process-title"
      className="border-y border-ink-line bg-ink-2 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            How it works
          </p>
          <h2
            id="process-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            Fixed scope. Written terms. No surprises.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Every project follows the same path: clear findings, a written
            project summary, a simple agreement, then the build. You see the
            exact scope and price before any work or deposit begins.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-ink-line bg-ink/60 p-5 transition-colors hover:border-amber lg:flex-col lg:gap-3"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink-line font-mono text-[12px] text-amber">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={2} className="mt-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-ink-line bg-ink/60 px-6 py-5 text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-paper">How payment works:</span>{" "}
              35% deposit to start after the agreement is signed, 65% on delivery.
              Scope is locked before work begins. Extra work outside the agreed
              summary is quoted separately — never billed as surprise hours.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}