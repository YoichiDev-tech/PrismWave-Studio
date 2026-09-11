import Reveal from "./Reveal";
import { trackAction } from "../lib/track";

export default function Pricing() {
  return (
    <section id="pricing" className="grain relative overflow-hidden bg-ink py-24 md:py-32 cursor-default">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] will-change-transform transform-gpu"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Transparent & Fixed-Scope
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Simple, clear pricing for small businesses.
          </h2>
          <p className="mt-5 text-ink-soft">
            Every project is scoped upfront. No surprises, no hidden fees — just clean,
            predictable pricing that fits your business.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-16 grid gap-10 md:grid-cols-3">
          {/* Landing Page */}
          <div className="card-interaction rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl font-semibold text-paper mb-3">
              Landing Page
            </h3>
            <p className="font-mono text-[13px] text-ink-soft mb-6">
              Starting from <span className="text-paper font-semibold">$350</span>
            </p>
            <ul className="space-y-2 text-ink-soft text-sm">
              <li>Single page</li>
              <li>One conversion goal</li>
              <li>Mobile-first responsive design</li>
              <li>Basic SEO setup</li>
              <li>Up to 2 revision rounds</li>
            </ul>
            <p className="text-[12px] font-mono text-ink-soft mt-6">
              Does not include hosting, domain, or copywriting.
            </p>
          </div>

          {/* Small Business Site */}
          <div className="card-interaction rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl font-semibold text-paper mb-3">
              Small Business Site
            </h3>
            <p className="font-mono text-[13px] text-ink-soft mb-6">
              Starting from <span className="text-paper font-semibold">$1,000</span>
            </p>
            <ul className="space-y-2 text-ink-soft text-sm">
              <li>3-6 pages</li>
              <li>Navigation + responsive layout</li>
              <li>Contact form + email integration</li>
              <li>Basic SEO setup</li>
              <li>Up to 3 revision rounds</li>
            </ul>
            <p className="text-[12px] font-mono text-ink-soft mt-6">
              Does not include hosting, domain, or brand/logo design.
            </p>
          </div>

          {/* Website Redesign */}
          <div className="card-interaction rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl font-semibold text-paper mb-3">
              Website Redesign
            </h3>
            <p className="font-mono text-[13px] text-ink-soft mb-6">
              Starting from <span className="text-paper font-semibold">$800</span>
            </p>
            <ul className="space-y-2 text-ink-soft text-sm">
              <li>Full rebuild of existing site</li>
              <li>Modern UI + improved UX</li>
              <li>Performance optimization</li>
              <li>Up to 2 revision rounds</li>
            </ul>
            <p className="text-[12px] font-mono text-ink-soft mt-6">
              Does not include hosting/domain migration or content rewriting.
            </p>
          </div>
        </Reveal>

        <Reveal delay={2} className="mx-auto mt-10 max-w-3xl rounded-2xl border border-amber/30 bg-amber/5 p-6 text-center md:p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber">A lower-risk way to start</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-paper">See the plan before you commit.</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
            Start with the free audit or a 15-minute fit call. Your project is only scoped and scheduled after we agree on the goal, deliverables, price, and timeline.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-paper/60">No retainers. No surprise add-ons. No locked-in platform.</p>
        </Reveal>

        <Reveal delay={3} className="mt-16 flex justify-center">
          <a
            href="https://calendly.com/hello-prismwave-studio/15min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAction("cta_click", { metadata: { label: "Book a free 15-min call", location: "pricing" } })}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
          >
            Not sure which tier fits? Book a free 15-min call
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}