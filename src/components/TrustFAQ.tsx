import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "You're new — why should I trust you with my site?", a: "Fair question. There's no long client roster yet — you'd be an early one. What you get in exchange: direct access to the person actually building it, a working prototype before you pay anything, and pricing that reflects that (see our packages)." },
  { q: "Do I pay before I see anything?", a: "No. For cold outreach and most first projects, we build a real working prototype first. You only move to a paid agreement once you've seen it and want it finished." },
  { q: "What if I don't like the direction?", a: "You react, we adjust — that's part of the process, not an extra charge. The Project Summary we send locks in scope, price, and timeline before final work starts, so there's no surprise revision creep." },
  { q: "What exactly do I own at the end?", a: "The finished site, its code, and the domain setup are yours. We don't hold it hostage behind a subscription unless you specifically want ongoing maintenance." },
  { q: "Do you only do one type of site?", a: "No — landing pages, e-commerce, dashboards, niche builds (we've scoped everything from restaurant sites to hobby-ranking platforms). If it's a real idea, we'll tell you honestly whether it's a fit." },
  { q: "How long does a project take?", a: "Depends on scope — our fixed packages list real timelines (1-3 weeks). Custom builds get a timeline in the Project Summary before you commit to anything." },
];

export default function TrustFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Before you ask</p>
      <h2 className="font-sora text-3xl font-bold text-ink mb-10">Straight answers</h2>
      <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
        {faqs.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center py-5 text-left"
            >
              <span className="font-sora text-sm md:text-base font-medium text-ink pr-4">{item.q}</span>
              {open === i ? <Minus size={18} className="text-coral shrink-0" /> : <Plus size={18} className="text-ink/40 shrink-0" />}
            </button>
            {open === i && (
              <p className="font-inter text-sm text-ink/60 pb-5 pr-8">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}