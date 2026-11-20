import { useState } from "react";
import { Link } from "react-router-dom";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const metrics = [
  { value: "+45%", label: "Obiettivo indicativo di conversione delle prenotazioni" },
  { value: "-60%", label: "Obiettivo indicativo di riduzione delle assenze" },
  { value: "10+ ore", label: "Risparmio settimanale indicativo di tempo amministrativo" },
  { value: "99/100", label: "Obiettivo indicativo su Lighthouse" },
];

function WorkflowPreview() {
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Anteprima interattiva del flusso</p>
          <p className="mt-2 text-sm text-paper/70">Scopri come un'esperienza più semplice trasforma un percorso complesso in un'unica azione di prenotazione.</p>
        </div>
        <div className="flex rounded-lg border border-ink-line p-1" role="tablist" aria-label="Stato del flusso">
          {(["before", "after"] as const).map((option) => (
            <button
              key={option === "before" ? "Prima" : "Dopo"}
              type="button"
              role="tab"
              aria-selected={view === option}
              onClick={() => setView(option)}
              className={`min-h-11 rounded-md px-4 font-mono text-[11px] uppercase tracking-wide transition-colors ${view === option ? "bg-amber text-ink" : "text-ink-soft hover:text-paper"}`}
            >
              {option === "before" ? "Prima" : "Dopo"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl border border-ink-line bg-ink p-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{view === "before" ? "Percorso frammentato" : "Percorso semplificato"}</p>
          <div className="mt-6 space-y-3 text-sm">
            {(view === "before"
              ? ["Cerca un numero di telefono", "Invia un'email", "Attendi una risposta", "Conferma manualmente" ]
              : ["Scegli un servizio", "Seleziona un orario disponibile", "Ricevi la conferma", "Ricevi un promemoria" ]
            ).map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-ink-line px-3 py-3 text-paper/80">
                <span className="font-mono text-[10px] text-amber">0{index + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-ink-line bg-ink p-5">
          <div className="flex items-center justify-between border-b border-ink-line pb-4">
            <span className="font-display font-semibold">Pannello degli appuntamenti</span>
            <span className="rounded-full bg-amber/15 px-3 py-1 font-mono text-[10px] uppercase text-amber">{view === "after" ? "Sincronizzato" : "Manuale"}</span>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-ink-2 p-4"><p className="font-mono text-[10px] text-ink-soft">Prossima disponibilità</p><p className="mt-2 font-display text-xl">Oggi, 16:30</p></div>
            <div className="rounded-lg bg-ink-2 p-4"><p className="font-mono text-[10px] text-ink-soft">Promemoria</p><p className="mt-2 font-display text-xl">{view === "after" ? "Attivo" : "Disattivato"}</p></div>
          </div>
          <button type="button" className="mt-4 min-h-11 w-full rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink">{view === "after" ? "Prenota un appuntamento" : "Contatta l'attività"}</button>
        </div>
      </div>
    </div>
  );
}

export default function AppointmentWorkflowConcept() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO
        title="Modernizzazione dei flussi di prenotazione — Progetto dimostrativo"
        description="Un concept chiaramente identificato per ridurre gli ostacoli alle prenotazioni e le assenze agli appuntamenti, a scopo illustrativo e non come risultato misurato su un cliente."
        path="/work/appointment-workflows/concept"
      />
      <AiMetadata
        map={["Caso studio dimostrativo", "Sfida aziendale", "Strategia tecnica", "Obiettivi indicativi", "Anteprima del flusso"]}
        intent="Mostrare come PrismWave potrebbe modernizzare la gestione degli appuntamenti per un'attività locale, specificando chiaramente che si tratta di un progetto dimostrativo e non di un risultato ottenuto per un cliente."
        tags={["caso studio dimostrativo", "gestione appuntamenti", "riprogettazione sito", "React", "Supabase"]}
        extract={{ title: "Modernizzazione dei flussi di prenotazione", audience: "Piccole imprese che lavorano su appuntamento", primaryActions: "Esaminare il progetto dimostrativo del flusso o avviare un'analisi gratuita" }}
      />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link to="/case-studies" className="font-mono text-[12px] uppercase tracking-wide text-paper/60 hover:text-paper">&larr; Casi studio</Link>
          <Link to="/#audit-tool" className="rounded-full bg-amber px-4 py-2.5 font-display text-xs font-semibold text-ink">Avvia un'analisi gratuita</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-amber">Concept / flusso dimostrativo</p>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">Modernizzare la gestione degli appuntamenti e ridurre il lavoro amministrativo.</h1>
          <AiIntent id="appointment-concept-intent">Presentare un concept chiaramente identificato che mostri come PrismWave potrebbe migliorare prenotazioni, promemoria e processi operativi.</AiIntent>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/65">Un concept per un'attività locale che perde tempo nella gestione delle prenotazioni, registra assenze agli appuntamenti e rende più difficile per i clienti completare la richiesta.</p>
        </section>

        <section className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Obiettivi indicativi">
          {metrics.map((metric) => <div key={metric.value} className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-display text-3xl font-semibold text-paper">{metric.value}</p><p className="mt-3 text-sm leading-relaxed text-ink-soft">{metric.label}</p></div>)}
        </section>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">Questi sono obiettivi di pianificazione per il concept, non risultati misurati su un cliente.</p>

        <section className="mt-20 grid gap-12 md:grid-cols-2">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">01 / La sfida</p><h2 className="mt-4 font-display text-3xl font-semibold">L'attività perde tempo tra il primo interesse e la conferma dell'appuntamento.</h2><p className="mt-5 leading-relaxed text-ink-soft">Promemoria manuali, strumenti di prenotazione separati, percorsi poco pratici da smartphone e pagine lente creano difficoltà sia per il cliente sia per il team che gestisce il calendario.</p></div>
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">02 / La strategia</p><h2 className="mt-4 font-display text-3xl font-semibold">Rendi chiara la prossima azione e automatizza il passaggio successivo.</h2><p className="mt-5 leading-relaxed text-ink-soft">L'esperienza proposta combina un'interfaccia veloce, progettata prima per smartphone, una scelta chiara dei servizi, disponibilità in tempo reale, conferma della prenotazione e promemoria automatici.</p></div>
        </section>

        <section className="mt-20"><WorkflowPreview /></section>

        <section className="mt-20 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">03 / Sviluppo e progettazione</p><h2 className="mt-4 font-display text-3xl font-semibold">Un sistema operativo essenziale, progettato per offrire un'esperienza semplice al cliente.</h2><p className="mt-5 leading-relaxed text-ink-soft">React e TypeScript supportano un'interfaccia adattiva, Tailwind CSS mantiene coerente il sistema visivo e Supabase può gestire disponibilità, registrazioni delle prenotazioni e dati operativi protetti. L'invio dei promemoria e la sincronizzazione del calendario verrebbero definiti in base agli strumenti già utilizzati dall'attività.</p></div>
          <div className="flex flex-wrap content-start gap-2"><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">React</span><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">TypeScript</span><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">Tailwind CSS</span><span className="rounded-full border border-ink-line px-4 py-2 font-mono text-xs text-paper/70">Supabase</span></div>
        </section>

        <section className="mt-20 rounded-2xl border border-amber/30 bg-amber/5 p-8 text-center md:p-12"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">Nessuna testimonianza inventata</p><h2 className="mt-4 font-display text-3xl font-semibold">Questo è un concept, pronto per diventare un progetto con risultati misurabili.</h2><p className="mx-auto mt-4 max-w-xl text-paper/65">A questo concept non sono ancora associate dichiarazioni di clienti o risultati ottenuti. Il prossimo passo è verificare il flusso con un'attività reale e misurare i cambiamenti.</p><Link to="/#contact" className="mt-7 inline-flex rounded-full bg-amber px-7 py-3.5 font-display text-sm font-semibold text-ink">Parliamo di un problema simile &rarr;</Link></section>
      </main>
      <Footer />
    </div>
  );
}