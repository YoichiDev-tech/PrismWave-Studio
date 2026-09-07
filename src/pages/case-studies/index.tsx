import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";
import { CaseStudyCard } from "../../components/case-study/CaseStudyCard";

const caseStudies = [
  {
    title: "ServeSync",
    category: "Hospitality · SaaS Automation",
    description: "Back-office automation platform for restaurants, cafés, and multi-location groups.",
    to: "/work/servesync/case-study",
    image: "/images/case-studies-livePreview/servesync-preview.png",
  },
  {
    title: "Bloom Market",
    category: "Retail · Inventory Intelligence",
    description: "Real-time stock tracking, waste prediction, and automated ordering for small retailers.",
    to: "/work/bloom-market/case-study",
    image: "/images/case-studies-livePreview/bloom-market-preview.png",
  },
];

export default function CaseStudiesIndex() {
  return (
    <div className="bg-ink cursor-default">
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link to="/" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper">
            &larr; Back to studio
          </Link>
        </div>
      </header>

      <section id="case-studies" className="grain relative overflow-hidden py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-0 translate-x-[35%] h-[560px] w-[560px] rounded-full opacity-20 blur-[130px] will-change-transform transform-gpu"
          style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-0 -translate-x-[35%] h-[420px] w-[420px] rounded-full opacity-10 blur-[130px] will-change-transform transform-gpu"
          style={{ background: "radial-gradient(circle, #FFB84D 0%, transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal className="max-w-xl">
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Work</p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
              Case studies
            </h1>
            <p className="mt-4 text-paper/70 leading-relaxed">
              A closer look at how these projects were designed and built — palette, layout, and the
              decisions behind each one.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {caseStudies.map((study, i) => (
              <Reveal key={study.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <CaseStudyCard {...study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}