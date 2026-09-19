import Reveal from "./Reveal";
import Section from "./Section";

const STEPS = [
  { title: "Discovery", desc: "We learn your business, goals and audience." },
  { title: "Design", desc: "Structure, layout and a visual direction that fits your brand." },
  { title: "Build", desc: "Fast, responsive, production-ready code." },
  { title: "Launch", desc: "Deploy, connect your domain, check every device." },
  { title: "Support", desc: "Updates and improvements after launch." },
];

export default function Process() {
  return (
    <Section
      id="process"
      ai="process"
      intent="Show the five steps from first conversation through launch and support."
      labelledBy="process-title"
      className="border-y border-ink-line bg-ink-2 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">How it works</p>
          <h2 id="process-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Five predictable steps, from idea to launch.
          </h2>
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
                  <h3 className="font-display text-base font-semibold text-paper">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}