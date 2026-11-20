import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { BackToStudioBadge, PickThisTemplateBadge } from "../../components/Badge";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import SEO from "../../components/SEO";

const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const BG = "#0B1220";
const PANEL = "#0F1A2E";
const LINE = "rgba(255,255,255,0.08)";
const MINT = "#37E6C4";
const BLUE = "#2AA9FF";

const FEATURES = [
  { tag: "monitoraggio", title: "Disponibilità in tempo reale", desc: "Controlli continui in ogni area geografica in cui operi." },
  { tag: "avvisi", title: "Avvisi intelligenti", desc: "Notifiche inoltrate alla persona giusta, senza allertare tutto il team." },
  { tag: "tracciamento", title: "Analisi delle cause", desc: "Passa direttamente da un incidente alla richiesta che lo ha provocato." },
];

const TIERS = [
  { name: "Starter", price: "$0", blurb: "Per progetti personali e prodotti nelle prime fasi.", cta: "Inizia gratis" },
  { name: "Team", price: "$49", blurb: "Per i team che hanno bisogno di reperibilità e cronologia.", cta: "Avvia la prova", featured: true },
  { name: "Scale", price: "Personalizzato", blurb: "Per piattaforme con accordi sui livelli di servizio rigorosi.", cta: "Contattaci" },
];

const REGIONS = [
  { region: "US-East", ms: 91, pct: 68 },
  { region: "EU-West", ms: 58, pct: 43 },
  { region: "AP-SE", ms: 121, pct: 90 },
];

export default function NovaCloud() {
  const [activeRegion, setActiveRegion] = useState("US-East");
  const [selectedTier, setSelectedTier] = useState("Team");
  const [email, setEmail] = useState("");
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialSent, setTrialSent] = useState(false);

  const openTrial = (tierName?: string) => {
    if (tierName) setSelectedTier(tierName);
    setTrialOpen(true);
    setTrialSent(false);
  };

  const handleTrial = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setTrialSent(true);
  };

  return (
    <div
      style={{ background: BG, color: "#E7ECF5", fontFamily: "'Inter', sans-serif" }}
      ai-tag="template"
      data-ai="page"
      className="min-h-screen cursor-default"
    >
      <SEO
        title="Nova Cloud — Modello dimostrativo"
        description="An observability SaaS landing page template with pricing tiers and a free-trial flow, built by PrismWave Studio."
        path="/work/nova-cloud"
      />
      <AiMetadata
        map={["Presentazione della disponibilità", "Funzionalità del prodotto", "Statistiche sulle prestazioni", "Piani tariffari"]}
        intent="Presentare un modello SaaS per il monitoraggio e invitare i team tecnici ad avviare una prova gratuita."
        tags={["Pagina SaaS", "osservabilità", "monitoraggio della disponibilità", "strumenti per sviluppatori", "monitoraggio dello stato"]}
        extract={{
          title: "Nova Cloud",
          audience: "Team di sviluppo e piattaforma",
          primaryActions: "Avviare una prova gratuita o consultare le funzionalità",
          pricing: "Base gratuita; Team $49; Scale personalizzato",
          proof: "99.98% average uptime across customers",
        }}
      />
      <BackToStudioBadge tone="dark" />
      <PickThisTemplateBadge tone="dark" />

      <header data-ai="navigation" className="border-b" style={{ borderColor: LINE }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <p className="text-base font-semibold" style={{ fontFamily: MONO }}>
            nova<span style={{ color: MINT }}>_</span>cloud
          </p>
          <ul className="hidden gap-8 text-[13px] text-white/60 md:flex">
            <li>
              <a href="#features" className="transition-colors hover:text-white">
                Prodotto
              </a>
            </li>
            <li>
              <a href="#pricing" className="transition-colors hover:text-white">
                Prezzi
              </a>
            </li>
            <li>
              <a href="#features" className="transition-colors hover:text-white">
                Documentazione
              </a>
            </li>
            <li className="text-white/35">Aggiornamenti</li>
          </ul>
          <button
            type="button"
            onClick={() => openTrial("Team")}
            className="rounded-md px-4 py-2 text-[13px] font-medium transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: MINT, color: "#04211C" }}
          >
            Avvia la prova gratuita
          </button>
        </div>
      </header>

      <main data-ai="main-content">
        <section
          aria-labelledby="nova-hero"
          aria-describedby="nova-hero-intent"
          role="region"
          data-ai="hero"
          className="relative overflow-hidden"
        >
          <AiIntent id="nova-hero-intent">
            Presentare Nova Cloud e invitare i team tecnici a provare un servizio affidabile di monitoraggio della disponibilità.
          </AiIntent>
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
                status.novacloud.io — tutti i sistemi funzionano
              </p>
              <h1 id="nova-hero" className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl">
                Una disponibilità che puoi <span style={{ color: MINT }}>dimostrare</span>, non solo promettere.
              </h1>
              <p className="mt-5 max-w-md text-white/60">
                Nova Cloud monitora ogni endpoint, individua la causa degli errori e avvisa la persona giusta
                prima che se ne accorgano i tuoi clienti.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openTrial("Team")}
                  className="rounded-md px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]"
                  style={{ background: MINT, color: "#04211C" }}
                >
                  Avvia la prova gratuita
                </button>
                <a
                  href="#features"
                  className="rounded-md border px-5 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-white/30 hover:text-white"
                  style={{ borderColor: LINE }}
                >
                  Scopri il prodotto
                </a>
              </div>
            </div>

            <aside
              data-ai="product-preview"
              className="rounded-xl border p-5"
              style={{ borderColor: LINE, background: PANEL }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[11px] text-white/40" style={{ fontFamily: MONO }}>
                  terminal — nova status
                </span>
              </div>

              <pre className="mt-4 overflow-x-auto text-[12px] leading-relaxed text-white/70" style={{ fontFamily: MONO }}>
                {`$ nova status --region ${activeRegion.toLowerCase().replace("-", "-")}
✓ api.checkout        122ms  200
✓ api.auth             48ms  200
✓ worker.payments      91ms  200
✓ edge.cdn              9ms  200

uptime (30d)  99.98%
latenza p95    ${REGIONS.find((r) => r.region === activeRegion)?.ms ?? 91}ms`}
              </pre>

              <div
                className="mt-5 rounded-lg p-4"
                style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${LINE}` }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-widest text-white/45" style={{ fontFamily: MONO }}>
                    Latenza p95 per area geografica — seleziona una barra
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  {REGIONS.map((bar) => {
                    const active = activeRegion === bar.region;
                    return (
                      <button
                        key={bar.region}
                        type="button"
                        onClick={() => setActiveRegion(bar.region)}
                        className="flex flex-col items-center rounded-md p-1 transition-transform hover:scale-[1.03] active:scale-[0.98]"
                        style={{
                          outline: active ? `1px solid ${MINT}` : "1px solid transparent",
                          background: active ? "rgba(55,230,196,0.08)" : "transparent",
                        }}
                      >
                        <span className="text-[12px] font-semibold text-white/85" style={{ fontFamily: MONO }}>
                          {bar.ms}
                        </span>
                        <div
                          className="mt-1.5 flex h-16 w-full items-end rounded-md p-1"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          <div
                            className="w-full rounded-sm transition-all duration-300"
                            style={{
                              height: `${bar.pct}%`,
                              background: `linear-gradient(180deg, ${MINT}, ${BLUE})`,
                              opacity: active ? 1 : 0.55,
                            }}
                          />
                        </div>
                        <span
                          className="mt-1.5 text-[10px] uppercase tracking-wide text-white/40"
                          style={{ fontFamily: MONO }}
                        >
                          {bar.region}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="features"
          aria-labelledby="nova-features"
          aria-describedby="nova-features-intent"
          role="region"
          data-ai="features"
          className="border-t py-20"
          style={{ borderColor: LINE }}
        >
          <AiIntent id="nova-features-intent">
            Spiegare le principali funzionalità di monitoraggio disponibili per i team tecnici reperibili.
          </AiIntent>
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="nova-features" className="mt-3 text-3xl font-semibold">
              Tutto ciò che serve a un tecnico durante la reperibilità.
            </h2>

            <div
              role="list"
              className="mt-12 grid gap-px overflow-hidden rounded-xl border"
              style={{ borderColor: LINE, background: LINE }}
            >
              {FEATURES.map((f) => (
                <article
                  role="listitem"
                  ai-tag="feature"
                  data-ai="feature"
                  key={f.title}
                  className="p-6 transition-colors hover:bg-white/[0.02] sm:grid sm:grid-cols-3 sm:items-start sm:gap-6"
                  style={{ background: BG }}
                >
                  <p className="text-[11px] uppercase tracking-widest" style={{ fontFamily: MONO, color: MINT }}>
                    {f.tag}
                  </p>
                  <h3 className="mt-3 text-base font-semibold sm:mt-0">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/55 sm:mt-0">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="nova-stats"
          aria-describedby="nova-stats-intent"
          role="region"
          data-ai="proof"
          className="border-t py-16"
          style={{ borderColor: LINE, background: PANEL }}
        >
          <AiIntent id="nova-stats-intent">
            Presentare indicatori quantitativi relativi alla disponibilità, alla latenza degli avvisi e all'adozione del servizio.
          </AiIntent>
          <h2 id="nova-stats" className="sr-only">
            Statistiche sulle prestazioni di Nova Cloud
          </h2>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-3">
            {[
              { n: "99.98%", l: "Disponibilità media del servizio" },
              { n: "40ms", l: "Latenza mediana degli avvisi" },
              { n: "1,200+", l: "Team che utilizzano Nova" },
            ].map((s) => (
              <article key={s.l} data-ai="stat">
                <p className="text-3xl font-semibold" style={{ fontFamily: MONO, color: MINT }}>
                  {s.n}
                </p>
                <p className="mt-2 text-sm text-white/55">{s.l}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          aria-labelledby="nova-pricing"
          aria-describedby="nova-pricing-intent"
          role="region"
          data-ai="pricing"
          className="border-t py-20"
          style={{ borderColor: LINE }}
        >
          <AiIntent id="nova-pricing-intent">
            Presentare i piani di Nova Cloud e invitare i team ad avviare una prova o a contattare il reparto commerciale.
          </AiIntent>
          <div className="mx-auto max-w-6xl px-6">
            <h2 id="nova-pricing" className="text-3xl font-semibold">
              Prezzi semplici, senza costi aggiuntivi a sorpresa.
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {TIERS.map((tier) => {
                const selected = selectedTier === tier.name;
                return (
                  <article
                    ai-tag="pricing-tier"
                    data-ai="offer"
                    key={tier.name}
                    className="rounded-xl border p-6 transition-transform hover:scale-[1.01]"
                    style={{
                      borderColor: selected || tier.featured ? MINT : LINE,
                      background: selected || tier.featured ? "rgba(55,230,196,0.06)" : PANEL,
                    }}
                  >
                    <p className="text-sm font-semibold text-white/80">{tier.name}</p>
                    <p className="mt-2 text-3xl font-semibold" style={{ fontFamily: MONO }}>
                      {tier.price}
                    </p>
                    <p className="mt-3 text-sm text-white/55">{tier.blurb}</p>
                    <button
                      type="button"
                      onClick={() => openTrial(tier.name)}
                      className="mt-6 w-full rounded-md py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={
                        tier.featured || selected
                          ? { background: MINT, color: "#04211C" }
                          : { border: `1px solid ${LINE}`, color: "#E7ECF5" }
                      }
                    >
                      {tier.cta}
                    </button>
                  </article>
                );
              })}
            </div>

            {trialOpen && (
              <div
                className="mt-10 rounded-xl border p-6"
                style={{ borderColor: LINE, background: PANEL }}
                id="trial"
              >
                {trialSent ? (
                  <div>
                    <p className="text-lg font-semibold" style={{ color: MINT }}>
                      Sei nella lista per il piano {selectedTier}.
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      Solo dimostrazione: non è stata inviata alcuna email. In un prodotto reale, questa azione avvierebbe la prova o aprirebbe un calendario
                      link.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setTrialOpen(false);
                        setTrialSent(false);
                        setEmail("");
                      }}
                      className="mt-4 text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-white"
                    >
                      Chiudi
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleTrial} className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white/90">
                        Attiva {selectedTier} — inserisci l'email di lavoro
                      </p>
                      <p className="mt-1 text-xs text-white/45">Demo form. Nothing is stored or emailed.</p>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-3 min-h-11 w-full rounded-md border bg-transparent px-3 text-sm text-white placeholder:text-white/35"
                        style={{ borderColor: LINE }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="min-h-11 rounded-md px-6 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{ background: MINT, color: "#04211C" }}
                    >
                      Continua
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <footer data-ai="footer" className="border-t py-8" style={{ borderColor: LINE }}>
        <div
          className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-[11px] uppercase tracking-widest text-white/40 sm:flex-row sm:items-center sm:justify-between"
          style={{ fontFamily: MONO }}
        >
          <span>© {new Date().getFullYear()} nova_cloud</span>
          <Link to="/" className="underline underline-offset-4 transition-opacity hover:opacity-70">
            Anteprima del modello a cura di PrismWave Studio
          </Link>
        </div>
      </footer>
    </div>
  );
}