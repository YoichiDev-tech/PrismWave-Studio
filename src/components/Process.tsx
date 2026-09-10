/* This will add to my page: 
- structure
- reliability
- predictability
- professionalism 
- safety (safe to hire)

This section must contain:
- discovery (understand the business)
- design (layout, structure, brand direction)
- build (code the site)
- launch (deploy, connect domain)
- support (optional updates/improvements)
*/

import Reveal from "./Reveal";

export default function Process() {
  return (
    <section id="process" className="grain relative overflow-hidden bg-ink py-24 md:py-32 cursor-default">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] will-change-transform transform-gpu"
        style={{background:"radial-gradient(circle, #6C63FF 0%, transparent 70%)"}}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Our Process
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            A clear, simple workflow from idea to launch.
          </h2>
          <p className="mt-5 text-ink-soft">
            We follow a structured 5-step process that keeps projects predictable,
            collaborative, and stress-free — whether it's a landing page or a full
            business website.
          </p>
        </Reveal>

        {/* Steps */}
        <Reveal delay={1} className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 */}
          <div className="card-interaction rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl text-paper mb-3">1. Discovery</h3>
            <p className="text-ink-soft text-sm">
              We learn about your business, goals, audience, and what success looks like.
              This gives us the clarity needed to build the right solution.
            </p>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl text-paper mb-3">2. Design</h3>
            <p className="text-ink-soft text-sm">
              We create the structure, layout, and visual direction. Clean, modern,
              conversion-focused design that fits your brand.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl text-paper mb-3">3. Build</h3>
            <p className="text-ink-soft text-sm">
              We turn the design into a fast, responsive, production-ready website using
              modern frontend tools and best practices.
            </p>
          </div>

          {/* Step 4 */}
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            <h3 className="font-display text-xl text-paper mb-3">4. Launch</h3>
            <p className="text-ink-soft text-sm">
              We deploy the site, connect your domain, set up hosting, and ensure
              everything runs smoothly on all devices.
            </p>
          </div>

          {/* Step 5 */}
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-8 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber md:col-span-2 lg:col-span-1">
            <h3 className="font-display text-xl text-paper mb-3">5. Support</h3>
            <p className="text-ink-soft text-sm">
              After launch, we're available for updates, improvements, and ongoing
              support — keeping your site fresh and effective.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={2} className="mt-16 flex justify-center">
          <a
            href="#calendly"
            className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
          >
            Ready to start your project?
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}