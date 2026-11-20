import Reveal from "./Reveal";
import Section from "./Section";
import ScoreGauge from "./ScoreGauge";
import { scrollToSection } from "../lib/scroll";
import { trackAction } from "../lib/track";

/*
  Homepage proof block — same job as a "product in action" demo.
  Shows a representative audit report card so visitors see the output
  before they run their own URL. Not a real client claim.

  Before / after are pure UI mocks (no stock photos) so the section
  still looks real in both themes and never depends on missing assets.
*/

const FLOW = ["Inserisci il sito", "Analisi", "Punteggio", "Interventi prioritari", "Revisione di 15 min"];

const CATEGORIES = [
  { label: "Velocità", score: 42 },
  { label: "Dispositivi mobili", score: 61 },
  { label: "SEO", score: 55 },
  { label: "Leggibilità per i sistemi di IA", score: 38 },
];

const FINDINGS = [
  {
    impact: "Alta",
    title: "Dispositivi mobili: meta viewport mancante",
    detail:
      "Manca il meta tag viewport: sugli smartphone il sito appare come una pagina desktop rimpicciolita. Questo può scoraggiare le richieste di contatto.",
  },
  {
    impact: "Alta",
    title: "Prima risposta lenta",
    detail:
      "Il TTFB della homepage supera 1,8 secondi. Molti visitatori decidono se restare in meno di tre secondi.",
  },
  {
    impact: "Media",
    title: "Metadati insufficienti per ricerca e sistemi di IA",
    detail:
      "Titolo e descrizione sono generici e mancano dati strutturati. Questo può rendere più difficile comparire nei risultati e nelle risposte dei sistemi di IA.",
  },
];

function impactClass(impact: string): string {
  if (impact === "Alta") return "border-coral/40 text-coral";
  if (impact === "Media") return "border-amber/40 text-amber";
  return "border-ink-line text-ink-soft";
}

function barColor(score: number): string {
  // Matches ScoreGauge thresholds so the card and gauges feel like one system
  if (score >= 80) return "#7CD98A";
  if (score >= 55) return "#FFB84D";
  return "#FF7A59";
}

function ReportChrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink shadow-sm">
      <div className="flex items-center gap-2 border-b border-ink-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-line" aria-hidden="true" />
        <span className="ml-3 truncate font-mono text-[11px] text-ink-soft">{label}</span>
      </div>
      {children}
    </div>
  );
}

/* Outdated local-trades homepage — reads as a real weak site, not a cartoon */
function BeforeSiteMock() {
  return (
    <div className="bg-[#e8e4dc] text-[#1a1a1a]">
      <div className="border-b border-black/15 bg-[#1e3a5f] px-3 py-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-white/90">
          Northside Impianti Elettrici
        </p>
        <p className="mt-0.5 text-[9px] text-white/60">Dal 1998 · Chiama 0161 000 0000</p>
      </div>
      <div className="space-y-2 p-3">
        <div className="border border-black/20 bg-[#f5f1e8] p-2">
          <p className="text-[11px] font-bold leading-tight">Benvenuti nel nostro sito!!!</p>
          <p className="mt-1 text-[9px] leading-snug text-black/70">
            Ci occupiamo di impianti elettrici. Usa i collegamenti qui sotto. Prezzi competitivi nella zona. Sito in costruzione: presto nuove pagine.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["Inizio", "Servizi", "Contatti"].map((label) => (
            <div
              key={label}
              className="border border-black/25 bg-[#c5d4e8] px-1 py-1.5 text-center text-[9px] font-semibold text-[#1e3a5f]"
            >
              {label}
            </div>
          ))}
        </div>
        <ul className="space-y-1 border border-black/15 bg-white/70 p-2 text-[9px] leading-snug text-black/75">
          <li>• Rifacimento impianti — chiedi un preventivo</li>
          <li>• Quadri elettrici e centralini</li>
          <li>• Interventi urgenti, in base alla disponibilità</li>
          <li>• Scrivici dalla pagina dei contatti</li>
        </ul>
        <p className="text-center text-[8px] text-black/45">
          Visualizzazione consigliata con Internet Explorer · Ultimo aggiornamento: 2014
        </p>
      </div>
    </div>
  );
}

/* Clean Site Rescue direction for the same vertical — concept only */
function AfterSiteMock() {
  return (
    <div className="bg-[#0f1419] text-[#f3f4f1]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5">
        <p className="font-display text-[11px] font-semibold tracking-tight">Northside Electrical</p>
        <span
          className="rounded-full px-2 py-0.5 text-[9px] font-semibold text-[#0a0e1a]"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          Chiama ora
        </span>
      </div>
      <div className="space-y-2.5 p-3">
        <div>
          <p className="font-display text-[13px] font-semibold leading-tight">
            Interventi elettrici rapidi e certificati nell'area di Greater Manchester.
          </p>
          <p className="mt-1 text-[9px] leading-snug text-white/55">
            Verifiche EICR · rifacimento impianti · quadri elettrici · appuntamenti nella stessa settimana, in base alla disponibilità.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { t: "Emergenze", d: "Interventi prioritari" },
            { t: "EICR", d: "Report chiaro con esito" },
            { t: "Rifacimento impianti", d: "Preventivo ad ambito definito" },
            { t: "Proprietari", d: "Documentazione di conformità" },
          ].map((card) => (
            <div key={card.t} className="rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
              <p className="text-[10px] font-semibold">{card.t}</p>
              <p className="text-[8px] text-white/50">{card.d}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-2 py-1.5">
          <span className="text-[9px] text-white/60">Prossima disponibilità</span>
          <span className="font-mono text-[9px] text-[#FFB84D]">Gio · Mattina</span>
        </div>
        <div
          className="rounded-full py-1.5 text-center text-[10px] font-semibold text-[#0a0e1a]"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          Richiedi di essere richiamato
        </div>
      </div>
    </div>
  );
}

export default function AuditInAction() {
  const goToAudit = () => {
    trackAction("cta_click", {
      metadata: { label: "Analizza il mio sito", location: "audit-in-action" },
    });
    const target = document.getElementById("audit-tool") ? "audit-tool" : "top";
    scrollToSection(target);
  };

  return (
    <Section
      id="audit-in-action"
      ai="audit-in-action"
      intent="Mostrare un esempio concreto di report affinché i visitatori comprendano i risultati dell'analisi gratuita prima di eseguire quella del proprio sito."
      labelledBy="audit-in-action-title"
      className="border-y border-ink-line bg-ink-2 py-14 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            L'analisi in pratica
          </p>
          <h2
            id="audit-in-action-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            Scopri cosa restituisce davvero un'analisi gratuita.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Punteggio, dettaglio per categoria e problemi prioritari, seguiti da un passo successivo chiaro. Esempio rappresentativo di un'attività locale. Avvia la tua analisi qui sopra per ottenere dati reali.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-ink-line bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-paper">
                  {step}
                </span>
                {i < FLOW.length - 1 ? (
                  <span aria-hidden="true" className="text-ink-soft">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="mt-10">
            <ReportChrome label="prismwave-studio · esempio di report">
              <div className="flex items-center justify-between border-b border-ink-line px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Indirizzo di esempio · homepage di un'attività locale
                </span>
                <span className="rounded-full border border-ink-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  Esempio
                </span>
              </div>

              <div className="grid gap-8 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-8">
                <div className="flex flex-col items-center justify-center gap-6 rounded-xl border border-ink-line bg-ink-2/60 p-6">
                  <ScoreGauge label="Totale" score={48} size={120} />
                  <div className="w-full space-y-3">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        <div className="mb-1 flex items-center justify-between font-mono text-[11px] uppercase tracking-wide">
                          <span className="text-ink-soft">{cat.label}</span>
                          <span className="text-paper">{cat.score}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-ink-line">
                          <div
                            className="h-full rounded-full transition-[width] duration-700"
                            style={{
                              width: `${cat.score}%`,
                              backgroundColor: barColor(cat.score),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                    Risultati prioritari
                  </p>
                  <ul className="mt-4 flex flex-1 flex-col gap-3">
                    {FINDINGS.map((item) => (
                      <li
                        key={item.title}
                        className="rounded-xl border border-ink-line bg-ink-2/40 p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${impactClass(
                              item.impact
                            )}`}
                          >
                            {item.impact}
                          </span>
                          <h3 className="font-display text-sm font-semibold text-paper">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs leading-relaxed text-ink-soft">
                    Dopo l'analisi effettiva: una revisione di 15 minuti e un piano scritto con ambito definito — interventi di ripristino o riprogettazione completa — e un prezzo chiaro prima di qualsiasi acconto.
                  </p>
                </div>
              </div>
            </ReportChrome>
          </div>
        </Reveal>

        <Reveal delay={3}>
          <div className="mt-10">
            <p className="text-center font-mono text-[12px] uppercase tracking-widest text-ink-soft">
              Come può apparire il rinnovamento di un sito
            </p>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-ink-soft">
              Lo stesso settore, due soluzioni: un sito vetrina datato e un layout chiaro, progettato per ricevere richieste. Solo progetto dimostrativo.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <figure>
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    Prima · progetto dimostrativo
                  </span>
                  <span className="font-mono text-[10px] text-coral">Score ~48</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-ink-line shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-ink-line bg-ink-2 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="ml-2 truncate font-mono text-[10px] text-ink-soft">
                      northside-electrical.example
                    </span>
                  </div>
                  <BeforeSiteMock />
                </div>
                <figcaption className="mt-2 px-1 text-xs leading-relaxed text-ink-soft">
                  Offerta poco chiara, layout mobile debole e contatti difficili da trovare.
                </figcaption>
              </figure>

              <div className="hidden text-center md:block">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
                  Site Rescue
                </span>
                <span className="mt-1 block font-mono text-[10px] text-ink-soft">progetto dimostrativo</span>
              </div>

              <figure>
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    Dopo · progetto dimostrativo
                  </span>
                  <span className="font-mono text-[10px] text-amber">Orientato alle richieste</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-ink-line shadow-sm">
                  <div className="flex items-center gap-1.5 border-b border-ink-line bg-ink-2 px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="h-2 w-2 rounded-full bg-ink-line" aria-hidden="true" />
                    <span className="ml-2 truncate font-mono text-[10px] text-ink-soft">
                      northside-electrical.example
                    </span>
                  </div>
                  <AfterSiteMock />
                </div>
                <figcaption className="mt-2 px-1 text-xs leading-relaxed text-ink-soft">
                  Offerta chiara, pulsante per chiamare e servizi su cui i visitatori possono agire.
                </figcaption>
              </figure>
            </div>

            <p className="mt-4 text-center text-xs text-ink-soft">
              Esempio illustrativo di rinnovamento per un'attività artigiana: non è un caso studio di un cliente. Il lavoro effettivo viene definito solo dopo l'analisi e la revisione.
            </p>
          </div>
        </Reveal>

        <Reveal delay={4} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={goToAudit}
            className="rounded-full px-8 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
            }}
          >
            Analizza il mio sito
          </button>
          <button
            type="button"
            onClick={() => {
              trackAction("cta_click", {
                metadata: { label: "Prenota una revisione di 15 minuti", location: "audit-in-action" },
              });
              scrollToSection("contact");
            }}
            className="rounded-full border border-ink-line px-8 py-3 font-display text-sm font-semibold text-paper transition-colors hover:border-amber active:scale-[0.98]"
          >
            Prenota una revisione di 15 minuti
          </button>
        </Reveal>
      </div>
    </Section>
  );
}