import Reveal from "./Reveal";
import Section from "./Section";
import BrandReel from "./BrandReel";

// Merges the old About + Why Choose Us: the story (why hospitality matters)
// and the proof (what you can rely on) belong together
const PROMISES = [
  { label: "Response time", value: "1 business day" },
  { label: "Code ownership", value: "100% yours" },
  { label: "Built with", value: "React & TypeScript" },
  { label: "Pricing", value: "Fixed, no surprises" },
];

const STANDARDS = [
  { title: "Fast loading", desc: "Lean code and optimized assets." },
  { title: "Mobile-first", desc: "Designed for the phone in your customer's hand." },
  { title: "SEO-friendly", desc: "Semantic markup and clean structure." },
  { title: "Tailored", desc: "No shared templates — every layout starts from your brand." },
];

export default function About() {
  return (
    <Section
      id="about"
      ai="about"
      intent="Explain who is behind PrismWave Studio and why founders can rely on it."
      labelledBy="about-title"
      className="grain relative overflow-hidden bg-ink py-16 md:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14">
          <Reveal delay={1}>
            <BrandReel className="hidden aspect-[4/3] w-full md:flex" />
            <div className="grid grid-cols-2 gap-3 md:mt-5">
              {PROMISES.map((item) => (
                <div key={item.label} className="rounded-xl border border-ink-line bg-ink-2/60 px-4 py-3.5 transition-colors hover:border-amber">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{item.label}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-paper">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Who we are</p>
            <h2 id="about-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
              From hospitality to building digital experiences.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              We're PrismWave Studio — a small studio with roots in hospitality and service businesses. Years of working directly with
              customers taught us how small businesses actually operate, and what a website has to do for them.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              So every project is built for clarity and real-world use: no bloated features, no confusing dashboards, no agency-style
              upsells. You're not hiring "just a coder."
            </p>

            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {STANDARDS.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-amber">
                    ✓
                  </span>
                  <p className="text-sm text-ink-soft">
                    <span className="font-semibold text-paper">{s.title}.</span> {s.desc}
                  </p>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              Let's work together
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}