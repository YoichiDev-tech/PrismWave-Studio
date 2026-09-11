import { useState } from "react";
import Reveal from "./Reveal";

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
    <section id="faq" className="grain relative overflow-hidden bg-ink py-24 md:py-32 cursor-default">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] will-change-transform transform-gpu"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Frequently Asked Questions
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Everything you need to know before we start.
          </h2>
        </Reveal>

        <Reveal delay={1} className="mt-14 divide-y divide-ink-line overflow-hidden rounded-2xl border border-ink-line bg-ink-2/40">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-ink-2/60 sm:px-8 sm:py-6"
                >
                  <span className="font-display text-base font-semibold text-paper sm:text-lg">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink-line text-ink-soft transition-all duration-300 ${
                      isOpen ? "rotate-45 border-amber text-amber" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-ink-soft sm:px-8">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>

        <Reveal delay={2} className="mt-8 text-center">
          <p className="text-sm text-ink-soft">
            Still have questions?{" "}
            <a href="#contact" className="font-semibold text-amber underline underline-offset-4">
              Get in touch
            </a>{" "}
            — we reply within one business day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}