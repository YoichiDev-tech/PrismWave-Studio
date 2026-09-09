import BrowserChrome from "../../components/Badge";
import Screenshot from "../../components/Screenshot";
import AiMetadata from "../../components/AiMetadata";

export default function ServeSyncCaseStudy() {
  return (
    <div className="bg-ink text-paper cursor-default">
      <AiMetadata
        map={["Case study hero", "Weekly savings", "Operational problem", "Product fixes", "Background", "What was built", "Pricing", "Outcome"]}
        intent="Explain how PrismWave Studio designed ServeSync to automate hospitality operations and return time and margin to operators."
        tags={["case study", "hospitality software", "operations automation", "SaaS product design", "ServeSync"]}
        extract={{ title: "ServeSync case study", audience: "Hospitality operators and product teams", primaryActions: "Understand the product problem, solution, and outcome", result: "Automated recurring back-office administration" }}
      />

      <main role="main">

        <article aria-labelledby="servesync-hero" className="py-24 md:py-32">
          <div className="mx-auto max-w-4xl px-6">

            {/* Hero */}
            <section aria-labelledby="servesync-hero">
              <h1 id="servesync-hero" className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
                ServeSync — Case Study
              </h1>
              <p className="mt-6 text-paper/70 leading-relaxed">
                ServeSync is a hospitality operations engine built to give operators
                their time, their margin, and their evenings back — by automating the
                recurring admin nobody has time for. From schedules to stock counts,
                from supplier reconciliation to compliance logs, ServeSync runs the
                back office quietly in the background.
              </p>

              <div className="mt-12">
                <BrowserChrome bg="#E8E8E8">
                  <Screenshot label="ServeSync dashboard screenshot placeholder" />
                </BrowserChrome>
              </div>
            </section>

            {/* Weekly Savings Ticket */}
            <section aria-labelledby="servesync-savings" className="mt-20">
              <h2 id="servesync-savings" className="font-display text-2xl font-semibold">Weekly Savings Ticket</h2>
              <ul className="mt-4 text-paper/70 leading-relaxed list-disc pl-6">
                <li>Time: 11 hrs returned weekly</li>
                <li>Money: $1,800+ monthly savings</li>
                <li>Waste: -30% reduction</li>
                <li>Admin: 70% automated</li>
                <li>Shifts: 0 min manual typing</li>
              </ul>
            </section>

            {/* Problem */}
            <section aria-labelledby="servesync-problem" className="mt-20">
              <h2 id="servesync-problem" className="font-display text-2xl font-semibold">The Problem</h2>
              <p className="mt-4 text-paper/70 leading-relaxed">
                Hospitality operators didn't open a restaurant to become data-entry
                clerks. Every week they re-type the same shift schedule, re-count the
                same stockroom, chase the same invoices, and re-explain the same
                closing checklist — hours that never make it back to them.
              </p>
              <p className="mt-4 text-paper/70 leading-relaxed">
                This unpaid second job shows up as spoiled stock, overtime you didn't
                approve, and evenings spent on a laptop instead of at home.
              </p>
            </section>

            {/* Five Things ServeSync Fixes */}
            <section aria-labelledby="servesync-fixes" className="mt-20">
              <h2 id="servesync-fixes" className="font-display text-2xl font-semibold">
                The Five Things ServeSync Fixes
              </h2>

              <div className="mt-8 space-y-10" role="list">

                <div role="listitem" aria-label="Time — Get your hours back">
                  <h3 className="font-display text-xl font-semibold">Time — Get your hours back</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Every recurring task you currently do by hand — schedules, counts,
                    reports, reminders — runs in the background instead. The hours you
                    used to lose to admin come back to you every single week.
                  </p>
                </div>

                <div role="listitem" aria-label="Money — Spend less, keep more">
                  <h3 className="font-display text-xl font-semibold">Money — Spend less, keep more</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    ServeSync flags overtime before it happens, catches supplier invoice
                    errors automatically, and keeps ordering aligned to what you actually
                    sell — so less revenue leaks out through repeated small mistakes.
                  </p>
                </div>

                <div role="listitem" aria-label="Waste — See spoilage before it happens">
                  <h3 className="font-display text-xl font-semibold">Waste — See spoilage before it happens</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Breakage and spoilage get logged in seconds, not shrugged off.
                    ServeSync tracks the pattern and warns you before the next batch
                    turns — so waste becomes a number you manage, not a surprise you
                    absorb.
                  </p>
                </div>

                <div role="listitem" aria-label="Admin — Automate the paperwork">
                  <h3 className="font-display text-xl font-semibold">Admin — Automate the paperwork</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Invoices, compliance logs, temperature checks, supplier
                    reconciliation — the recurring low-value tasks that eat a manager's
                    day run themselves in the background. Fewer typos, no missed steps,
                    and your energy goes to the parts of the business only you can run.
                  </p>
                </div>

                <div role="listitem" aria-label="Shifts — The schedule builds itself">
                  <h3 className="font-display text-xl font-semibold">Shifts — The schedule builds itself</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Staff submit availability through a simple form. ServeSync — powered
                    by Power Automate under the hood — turns that into a finished weekly
                    schedule, handles swap requests, and notifies the team. You never
                    type a shift by hand again.
                  </p>
                </div>

              </div>
            </section>

            {/* Runs quietly in the background */}
            <section aria-labelledby="servesync-background" className="mt-20">
              <h2 id="servesync-background" className="font-display text-2xl font-semibold">
                Runs quietly in the background
              </h2>

              <div className="mt-8 space-y-10" role="list">

                <div role="listitem" aria-label="Compliance & safety logs">
                  <h3 className="font-display text-xl font-semibold">Compliance & safety logs</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Temperature checks, HACCP records, and opening/closing sign-offs are
                    timestamped and stored automatically — ready the moment an inspector
                    asks.
                  </p>
                </div>

                <div role="listitem" aria-label="Guest inquiries, answered">
                  <h3 className="font-display text-xl font-semibold">Guest inquiries, answered</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Common questions — hours, bookings, allergens — get handled
                    instantly, so front-of-house isn't interrupted every five minutes.
                  </p>
                </div>

                <div role="listitem" aria-label="Multi-site reporting">
                  <h3 className="font-display text-xl font-semibold">Multi-site reporting</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Labor, waste, and sales roll up across every location into one
                    dashboard, so groups and shopping-center operators see the whole
                    portfolio at a glance.
                  </p>
                </div>

              </div>
            </section>

            {/* Built for hospitality */}
            <section aria-labelledby="servesync-built" className="mt-20">
              <h2 id="servesync-built" className="font-display text-2xl font-semibold">
                Built for hospitality, not adapted from it
              </h2>

              <ul className="mt-4 text-paper/70 leading-relaxed list-disc pl-6">
                <li>Family restaurants — one site, tight crew, no back office</li>
                <li>Full-service & QSR — higher volume, tighter margins</li>
                <li>Multi-location groups — consistency across every site</li>
                <li>Cafés & coffee shops — fast turns, thin staffing</li>
                <li>Shopping centers — shared services across tenants</li>
              </ul>
            </section>

            {/* Pricing */}
            <section aria-labelledby="servesync-pricing" className="mt-20">
              <h2 id="servesync-pricing" className="font-display text-2xl font-semibold">Pricing</h2>

              <div className="mt-8 space-y-12" role="list">

                <div role="listitem" aria-label="Pricing tier: Counter, $39/month">
                  <h3 className="font-display text-xl font-semibold">Counter — $39/month</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Auto-built weekly schedule, inventory & waste tracking, daily
                    checklists — for single-site cafés and family restaurants.
                  </p>
                </div>

                <div role="listitem" aria-label="Pricing tier: Kitchen, $99/month">
                  <h3 className="font-display text-xl font-semibold">Kitchen — $99/month</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Everything in Counter, plus predictive waste alerts, invoice
                    reconciliation, labor-cost alerts — for full-service restaurants and
                    QSR.
                  </p>
                </div>

                <div role="listitem" aria-label="Pricing tier: Group, Custom">
                  <h3 className="font-display text-xl font-semibold">Group — Custom</h3>
                  <p className="mt-2 text-paper/70 leading-relaxed">
                    Unlimited locations, portfolio-wide reporting, dedicated onboarding
                    — built for multi-location groups and shopping centers.
                  </p>
                </div>

              </div>
            </section>

            {/* Outcome */}
            <section aria-labelledby="servesync-outcome" className="mt-20">
              <h2 id="servesync-outcome" className="font-display text-2xl font-semibold">Outcome</h2>
              <p className="mt-4 text-paper/70 leading-relaxed">
                ServeSync gives hospitality operators their time, their margin, and
                their evenings back. It replaces spreadsheets, WhatsApp groups, manual
                counts, and repetitive admin with a single automated platform — running
                quietly in the background while the team runs the floor.
              </p>
            </section>

          </div>
        </article>

      </main>

    </div>
  );
}