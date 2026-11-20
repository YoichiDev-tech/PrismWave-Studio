import { ArrowRight, ArrowUpRight, Boxes, Clock3, Network } from "lucide-react";
import { Link } from "react-router-dom";
import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

const outcomes = [
  { value: "23 ore → 11 min", label: "Tempo mediano di risposta ai contatti", detail: "Qualificazione più chiara e responsabilità definite per ogni richiesta." },
  { value: "21 giorni → 6 giorni", label: "Ciclo di distribuzione del progetto pilota", detail: "Verifiche ripetibili di preparazione e visibilità condivisa sulla capacità." },
  { value: "32% → 47%", label: "Conversione da progetto pilota a contratto", detail: "Meno ostacoli tra convalida tecnica e attività successive." },
  { value: "$42k → $65k", label: "Ricavi ricorrenti mensili", detail: "Risultato simulato derivante da un maggior numero di progetti pilota qualificati portati in produzione." },
];

const priorities = [
  { icon: Clock3, title: "Qualificare prima le richieste", body: "Indirizzare le richieste più interessanti in base alla compatibilità tecnica, assegnare responsabilità chiare e rendere visibile la prossima azione prima che l'interesse diminuisca." },
  { icon: Boxes, title: "Ridurre i tempi per arrivare in produzione", body: "Riunire requisiti dei carichi di lavoro, preparazione alla distribuzione e capacità degli acceleratori in un unico flusso pilota ripetibile." },
  { icon: Network, title: "Collegare i team commerciali e tecnici", body: "Offrire a entrambi i team una visione condivisa dello stato delle opportunità, dei limiti di capacità e degli elementi necessari per procedere." },
];

const demoUrl = "https://opsrook-vi.vercel.app";

export default function OpsRookCaseStudy() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO title="OpsRook-VI — Caso studio sull'infrastruttura di IA" description="Come PrismWave Studio ha affrontato il posizionamento del prodotto, la qualificazione dei contatti e gli ostacoli nel passaggio dai progetti pilota alla produzione in un progetto dimostrativo di infrastruttura di IA." path="/work/opsrook-vi/case-study" />
      <AiMetadata map={["Caso studio OpsRook-VI", "Colli di bottiglia aziendali", "Strategia di prodotto", "Risultati simulati", "Demo interattiva del prodotto"]} intent="Mostrare come PrismWave Studio colleghi progettazione del prodotto, flussi operativi e priorità aziendali in un progetto dimostrativo di infrastruttura di IA." tags={["caso studio", "infrastruttura di IA", "SaaS", "strategia di prodotto", "flusso di conversione", "PrismWave Studio"]} extract={{ title: "Caso studio OpsRook-VI", audience: "Fondatori SaaS, team tecnici e aziende in crescita", primaryActions: "Esplorare la demo del prodotto o discutere una sfida simile" }} />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
          <Link to="/case-studies" className="font-mono text-[11px] uppercase tracking-wide text-paper/60 hover:text-paper">← Casi studio</Link>
          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-amber px-4 py-2 font-display text-xs font-semibold text-ink">Esplora la demo <ArrowUpRight className="h-4 w-4" /></a>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <section className="max-w-4xl" aria-labelledby="opsrook-title">
          <AiIntent id="opsrook-hero-intent">Presentare OpsRook-VI come progetto dimostrativo di prodotto per infrastrutture AI e spiegare il problema aziendale alla base del progetto.</AiIntent>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">Infrastruttura AI · Strategia di prodotto · Progettazione dei flussi</p>
          <h1 id="opsrook-title" className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Trasforma le capacità tecniche in crescita commerciale.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-paper/65">OpsRook-VI affronta una sfida di crescita comune per i team SaaS con solide competenze tecniche: arrivano richieste qualificate, ma i contatti si bloccano durante la valutazione e i progetti pilota più promettenti impiegano troppo tempo per arrivare in produzione.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-amber px-6 py-3 font-display text-sm font-semibold text-ink">Esplora OpsRook-VI <ArrowUpRight className="h-4 w-4" /></a>
            <Link to="/#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink-line px-6 py-3 font-display text-sm font-semibold text-paper hover:border-amber">Parliamo di una sfida simile <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">Collaborazione con PrismWave Studio</p>
        </section>
        <section className="mt-16 rounded-2xl border border-ink-line bg-ink-2/60 p-6 sm:p-8" aria-labelledby="challenge-heading">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
            <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">La sfida</p><h2 id="challenge-heading" className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Due passaggi stavano rallentando la crescita.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-ink-line bg-ink p-5"><Clock3 className="h-5 w-5 text-amber" /><h3 className="mt-4 font-display text-lg font-semibold">I contatti più interessati si raffreddavano</h3><p className="mt-2 text-sm leading-relaxed text-paper/65">Qualificazione, compatibilità tecnica e responsabilità del follow-up non erano collegate: i potenziali clienti restavano in attesa e il lavoro commerciale era disperso.</p></div>
              <div className="rounded-xl border border-ink-line bg-ink p-5"><Boxes className="h-5 w-5 text-amber" /><h3 className="mt-4 font-display text-lg font-semibold">I progetti pilota si bloccavano prima della produzione</h3><p className="mt-2 text-sm leading-relaxed text-paper/65">Requisiti dei carichi di lavoro, preparazione alla distribuzione e visibilità della capacità erano gestiti in flussi separati, allungando i tempi per ottenere valore.</p></div>
            </div>
          </div>
        </section>
        <section className="mt-20" aria-labelledby="approach-heading">
          <div className="max-w-2xl"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">L'approccio</p><h2 id="approach-heading" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Migliorare il sistema operativo intorno al prodotto.</h2><p className="mt-4 leading-relaxed text-paper/65">L'esperienza collega posizionamento, qualificazione, preparazione dei progetti pilota e segnali di capacità in un unico flusso operativo chiaro, supportato da un sito di prodotto coerente e da un'interfaccia di controllo interattiva.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{priorities.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-2xl border border-ink-line bg-ink-2/60 p-6"><div className="flex items-center justify-between"><span className="font-mono text-xs text-amber">Approccio PrismWave</span><Icon className="h-5 w-5 text-amber" /></div><h3 className="mt-5 font-display text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-paper/65">{body}</p></article>)}</div>
        </section>
        <section className="mt-20" aria-labelledby="outcomes-heading">
          <div className="max-w-2xl"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">Risultati simulati</p><h2 id="outcomes-heading" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Rendi misurabili i miglioramenti.</h2><p className="mt-4 leading-relaxed text-paper/65">La demo del prodotto illustra come la riduzione degli ostacoli operativi potrebbe influire sulla velocità di risposta, sul numero di progetti pilota completati e sui risultati commerciali.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{outcomes.map((outcome) => <article key={outcome.label} className="rounded-xl border border-ink-line bg-ink-2/60 p-5"><p className="font-display text-2xl font-semibold tracking-tight text-paper">{outcome.value}</p><h3 className="mt-3 text-sm font-semibold">{outcome.label}</h3><p className="mt-2 text-xs leading-relaxed text-ink-soft">{outcome.detail}</p></article>)}</div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-soft">Questi dati sono risultati simulati a scopo illustrativo per questo progetto dimostrativo, non risultati misurati su clienti.</p>
        </section>
        <section className="mt-20 grid gap-8 rounded-2xl border border-amber/30 bg-amber/5 p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="font-mono text-[11px] uppercase tracking-widest text-amber">Il risultato</p><h2 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">Un percorso più chiaro dal primo contatto alla produzione.</h2><p className="mt-4 max-w-2xl leading-relaxed text-paper/65">OpsRook-VI trasforma un'offerta tecnica complessa in un'esperienza di prodotto più coerente, con priorità aziendali chiare, flussi collegati e un'interfaccia progettata per rendere più semplice agire sui segnali operativi.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col"><a href={demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-amber px-5 py-3 font-display text-sm font-semibold text-ink">Visualizza la demo <ArrowUpRight className="h-4 w-4" /></a><Link to="/#contact" className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink-line px-5 py-3 font-display text-sm font-semibold text-paper hover:border-amber">Collabora con PrismWave</Link></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
