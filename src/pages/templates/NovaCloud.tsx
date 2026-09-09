import { Link } from "react-router-dom";
import { BackToStudioBadge, PickThisTemplateBadge } from "../../components/Badge";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const BG = "#0B1220";
const PANEL = "#0F1A2E";
const LINE = "rgba(255,255,255,0.08)";
const MINT = "#37E6C4";
const BLUE = "#2AA9FF";

const FEATURES = [
  { tag: "monitor", title: "Real-time uptime", desc: "Second-by-second checks across every region you serve." },
  { tag: "alert", title: "Smart alerting", desc: "Escalations that page the right person, not the whole team." },
  { tag: "trace", title: "Root-cause traces", desc: "Jump from an incident straight to the request that caused it." },
];

const TIERS = [
  { name: "Starter", price: "$0", blurb: "For side projects and early-stage products.", cta: "Start free" },
  { name: "Team", price: "$49", blurb: "For teams that need on-call and history.", cta: "Start trial", featured: true },
  { name: "Scale", price: "Custom", blurb: "For platforms with strict SLAs.", cta: "Talk to us" },
];

export default function NovaCloud() {
  return (
    <div
      style={{ background: BG, color: "#E7ECF5", fontFamily: "'Inter', sans-serif" }}
      ai-tag="template" data-ai="page" className="min-h-screen cursor-default"
    >
      <AiMetadata
        map={["Uptime hero", "Product features", "Performance statistics", "Pricing tiers"]}
        intent="Present an observability SaaS template and move technical teams toward starting a free trial."
        tags={["SaaS landing page", "observability", "uptime monitoring", "developer tools", "status monitoring"]}
        extract={{ title: "Nova Cloud", audience: "Engineering and platform teams", primaryActions: "Start a free trial or review features", pricing: "Starter free; Team $49; Scale custom", proof: "99.98% average uptime across customers" }}
      />
      <BackToStudioBadge tone="dark" />
      <PickThisTemplateBadge tone="dark" />

      <header data-ai="navigation" className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <p className="text-base font-semibold" style={{ fontFamily: MONO }}>
            nova<span style={{ color: MINT }}>_</span>cloud
          </p>
          <ul className="hidden gap-8 text-[13px] text-white/60 md:flex">
            <li>Product</li>
            <li>Pricing</li>
            <li>Docs</li>
            <li>Changelog</li>
          </ul>
          <a
            href="#pricing"
            className="rounded-md px-4 py-2 text-[13px] font-medium"
            style={{ background: MINT, color: "#04211C" }}
          >
            Start free trial
          </a>
        </div>
      </header>

      <main data-ai="main-content">

        {/* Hero */}
        <section aria-labelledby="nova-hero" aria-describedby="nova-hero-intent" role="region" data-ai="hero" className="relative overflow-hidden">
          <AiIntent id="nova-hero-intent">Introduce Nova Cloud and direct technical teams toward a trustworthy uptime monitoring trial.</AiIntent>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-20 blur-[110px] will-change-transform transform-gpu"
            style={{ background: MINT }}
          />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center">
            <div>
              <p
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] uppercase tracking-widest text-white/60"
                style={{ borderColor: LINE, fontFamily: MONO }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: MINT }} />
                status.novacloud.io — all systems green
              </p>
              <h1
                id="nova-hero"
                className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl"
              >
                Uptime you can <span style={{ color: MINT }}>prove</span>, not
                just promise.
              </h1>
              <p className="mt-5 max-w-md text-white/60">
                Nova Cloud watches every endpoint, traces every failure to its
                root cause, and pages the right engineer before your customers
                notice.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#pricing"
                  className="rounded-md px-5 py-3 text-sm font-semibold"
                  style={{ background: MINT, color: "#04211C" }}
                >
                  Start free trial
                </a>
                <a
                  href="#features"
                  className="rounded-md border px-5 py-3 text-sm font-semibold text-white/80"
                  style={{ borderColor: LINE }}
                >
                  View docs
                </a>
              </div>
            </div>

            <aside data-ai="product-preview"
              className="rounded-xl border p-5"
              style={{ borderColor: LINE, background: PANEL }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span
                  className="ml-3 text-[11px] text-white/40"
                  style={{ fontFamily: MONO }}
                >
                  terminal — nova status
                </span>
              </div>

              <pre
                className="mt-4 overflow-x-auto text-[12px] leading-relaxed text-white/70"
                style={{ fontFamily: MONO }}
              >
                {`$ nova status --region us-east
                ✓ api.checkout        122ms  200
                ✓ api.auth             48ms  200
                ✓ worker.payments      91ms  200
                ✓ edge.cdn              9ms  200

                uptime (30d)  99.98%
                p95 latency    134ms`}
              </pre>

              <div
                className="mt-5 rounded-lg p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${LINE}` }}
              >
                <div className="flex items-center justify-between">
                  <p
                    className="text-[11px] uppercase tracking-widest text-white/45"
                    style={{ fontFamily: MONO }}
                  >
                    p95 latency by region
                  </p>
                  <span
                    className="flex items-center gap-1.5 text-[11px] text-white/45"
                    style={{ fontFamily: MONO }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-sm"
                      style={{
                        background: `linear-gradient(180deg, ${MINT}, ${BLUE})`,
                      }}
                    />
                    ms
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {[
                    { region: "US-East", ms: 91, pct: 68 },
                    { region: "EU-West", ms: 58, pct: 43 },
                    { region: "AP-SE", ms: 121, pct: 90 },
                  ].map((bar) => (
                    <div key={bar.region} className="flex flex-col items-center">
                      <span
                        className="text-[12px] font-semibold text-white/85"
                        style={{ fontFamily: MONO }}
                      >
                        {bar.ms}
                      </span>
                      <div
                        className="mt-1.5 flex h-16 w-full items-end rounded-md p-1"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <div
                          className="w-full rounded-sm"
                          style={{
                            height: `${bar.pct}%`,
                            background: `linear-gradient(180deg, ${MINT}, ${BLUE})`,
                          }}
                        />
                      </div>
                      <span
                        className="mt-1.5 text-[10px] uppercase tracking-wide text-white/40"
                        style={{ fontFamily: MONO }}
                      >
                        {bar.region}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Features */}
        <section id="features" aria-labelledby="nova-features" aria-describedby="nova-features-intent" role="region" data-ai="features" className="border-t py-20" style={{ borderColor: LINE }}>
          <AiIntent id="nova-features-intent">Explain the core observability capabilities available to on-call engineering teams.</AiIntent>
          <div className="mx-auto max-w-6xl px-6">
            <p
              className="text-[11px] uppercase tracking-widest text-white/40"
              style={{ fontFamily: MONO }}
            >
            </p>
            <h2 id="nova-features" className="mt-3 text-3xl font-semibold">
              Everything an on-call engineer actually opens.
            </h2>

            <div role="list"
              className="mt-12 grid gap-px overflow-hidden rounded-xl border"
              style={{ borderColor: LINE, background: LINE }}
            >
              {FEATURES.map((f) => (
                <article role="listitem" ai-tag="feature" data-ai="feature"
                  key={f.title}
                  className="p-6 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6"
                  style={{ background: BG }}
                >
                  <p
                    className="text-[11px] uppercase tracking-widest"
                    style={{ fontFamily: MONO, color: MINT }}
                  >
                    {f.tag}
                  </p>
                  <h3 className="mt-3 text-base font-semibold sm:mt-0">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/55 sm:mt-0">
                    {f.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section aria-labelledby="nova-stats" aria-describedby="nova-stats-intent" role="region" data-ai="proof" className="border-t py-16" style={{ borderColor: LINE, background: PANEL }}>
          <AiIntent id="nova-stats-intent">Provide quantitative proof points for uptime, alert latency, and customer adoption.</AiIntent>
          <h2 id="nova-stats" className="sr-only">Nova Cloud performance statistics</h2>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3">
            {[
              { n: "99.98%", l: "Average uptime across customers" },
              { n: "40ms", l: "Median alert-to-page latency" },
              { n: "1,200+", l: "Teams monitoring on Nova" },
            ].map((s) => (
              <article key={s.l} data-ai="stat">
                <p
                  className="text-3xl font-semibold"
                  style={{ fontFamily: MONO, color: MINT }}
                >
                  {s.n}
                </p>
                <p className="mt-2 text-sm text-white/55">{s.l}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" aria-labelledby="nova-pricing" aria-describedby="nova-pricing-intent" role="region" data-ai="pricing" className="border-t py-20" style={{ borderColor: LINE }}>
          <AiIntent id="nova-pricing-intent">Present transparent Nova Cloud tiers and guide teams toward starting a trial or contacting sales.</AiIntent>
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="nova-pricing" className="text-3xl font-semibold">
              Simple pricing, no surprise overages.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TIERS.map((tier) => (
                <article ai-tag="pricing-tier" data-ai="offer"
                  key={tier.name}
                  className="rounded-xl border p-6"
                  style={{
                    borderColor: tier.featured ? MINT : LINE,
                    background: tier.featured ? "rgba(55,230,196,0.06)" : PANEL,
                  }}
                >
                  <p className="text-sm font-semibold text-white/80">
                    {tier.name}
                  </p>
                  <p
                    className="mt-2 text-3xl font-semibold"
                    style={{ fontFamily: MONO }}
                  >
                    {tier.price}
                  </p>
                  <p className="mt-3 text-sm text-white/55">{tier.blurb}</p>
                  <button
                    type="button"
                    className="mt-6 w-full rounded-md py-2.5 text-sm font-semibold"
                    style={
                      tier.featured
                        ? { background: MINT, color: "#04211C" }
                        : { border: `1px solid ${LINE}`, color: "#E7ECF5" }
                    }
                  >
                    {tier.cta}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer data-ai="footer" className="border-t py-8" style={{ borderColor: LINE }}>
        <div
          className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-[11px] uppercase tracking-widest text-white/40 sm:flex-row sm:items-center sm:justify-between"
          style={{ fontFamily: MONO }}
        >
          <span>© {new Date().getFullYear()} nova_cloud</span>
          <Link
            to="/"
            className="underline underline-offset-4 transition-opacity hover:opacity-70"
          >
            Template preview by PrismWave Studio
          </Link>
        </div>
      </footer>
    </div>
  );
}