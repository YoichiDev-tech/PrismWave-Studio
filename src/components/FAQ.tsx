import { useState } from "react";
import Reveal from "./Reveal";
import Section from "./Section";

const FAQS = [
  {
    q: "How long does a project take?",
    a: "Most landing pages take 3-7 days. Small business sites usually take 2-3 weeks depending on content readiness and revision rounds.",
  },
  {
    q: "Do I own the site after it's built?",
    a: "Yes — you fully own the code, design, and all exported assets. Nothing is locked behind subscriptions or proprietary builders.",
  },
  {
    q: "Why should I trust PrismWave with my website?",
    a: "You can inspect the work before committing: the audit uses real signals from your site, pricing is visible upfront, and the portfolio shows live builds rather than vague promises. You keep ownership of the finished code, and every project starts with a clear scope and timeline.",
  },
  {
    q: "What happens if the project is not the right fit?",
    a: "We start with a short conversation and a defined scope before any work begins. If the goals, budget, or timeline do not line up, I will say so and you can walk away without being pushed into a package.",
  },
  {
    q: "What if I need changes after launch?",
    a: "You can request additional updates anytime. Small fixes are quick; larger changes can be scoped as a mini-project.",
  },
  {
    q: "Do you offer hosting or maintenance?",
    a: "Hosting and domains are handled by providers like Vercel or Namecheap. We do offer ongoing maintenance, but you stay in full control.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A short description of your business, your goals, any existing content, and examples of sites you like. That's enough to begin.",
  },
  {
    q: "What if I don't have a logo or brand yet?",
    a: "No problem — we can design a simple starter brand or work with neutral styling until you have a full identity.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((current) => (current === i ? null : i));

  return (
    <Section
      id="faq"
      ai="faq"
      intent="Answer common questions about the studio, process, pricing, and project fit."
      labelledBy="faq-title"
      className="border-t border-ink-line bg-ink-2 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Frequently asked questions</p>
          <h2 id="faq-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Everything you need to know before we start.
          </h2>
        </Reveal>

        <Reveal delay={1} className="mt-10 divide-y divide-ink-line overflow-hidden rounded-2xl border border-ink-line bg-ink/60">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex min-h-14 w-full items-center justify-between gap-6 px-6 py-4 text-left transition-colors hover:bg-ink-2/60 sm:px-8"
                  >
                    <span className="font-display text-base font-semibold text-paper">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink-line text-ink-soft transition-all duration-300 ${
                        isOpen ? "rotate-45 border-amber text-amber" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft sm:px-8">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}