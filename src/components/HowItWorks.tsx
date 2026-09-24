import { Search, FileText, Hammer, CheckCircle2, Rocket } from "lucide-react";

const audit_path = [
  { icon: Search, label: "Free Audit", desc: "Send your site. We check it against today's speed, mobile, and conversion standards." },
  { icon: FileText, label: "Findings + Fix Plan", desc: "You get a plain-language breakdown of what's outdated and what it's costing you." },
  { icon: Hammer, label: "You Decide", desc: "Fix it yourself with the report, or have us do it. No pressure either way." },
];

const build_path = [
  { icon: FileText, label: "Tell Us the Idea", desc: "Barbershop, supermarket, anime ranking site — whatever it is, we scope it with you." },
  { icon: Hammer, label: "Prototype First", desc: "We build a real, working preview before any money changes hands." },
  { icon: CheckCircle2, label: "Review + Refine", desc: "You react, we adjust. No surprise revisions." },
  { icon: Rocket, label: "Launch", desc: "Live on your domain, handed off clean." },
];

function PathColumn({ title, steps, accent }: { title: string; steps: typeof audit_path; accent: string }) {
  return (
    <div className="flex-1 min-w-[280px]">
      <h3 className={`font-display text-lg md:text-xl font-semibold mb-6 ${accent}`}>{title}</h3>
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li
            key={s.label}
            aria-label={`${s.label} step`}
            className="flex gap-4 items-start cursor-default"
          >
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper border border-ink-line select-none">
                <s.icon size={16} className={accent} />
              </span>
              {i < steps.length - 1 && <span className="w-px flex-1 bg-ink-line mt-1" />}
            </div>
            <div className="pb-4">
              <p className="font-display text-sm font-semibold text-ink">{s.label}</p>
              <p className="font-inter text-sm text-ink-soft mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">How it works</p>
      <h2 className="font-display text-3xl font-bold text-ink mb-12">Two starting points. One outcome.</h2>

      <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-16">
        <PathColumn title="Have a site that feels outdated?" steps={audit_path} accent="text-coral" />
        <PathColumn title="Have an idea, no site yet?" steps={build_path} accent="text-violet" />
      </div>
    </section>
  );
}
