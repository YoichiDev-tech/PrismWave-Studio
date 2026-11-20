import AiMetadata, { AiIntent } from "../../components/AiMetadata";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";
import { Link } from "react-router-dom";

const caseStudies = [
  { title: "OpsRook-VI", category: "Infrastruttura AI · Strategia di prodotto", description: "Un concept di prodotto e flussi operativi che collega qualificazione dei contatti, preparazione dei progetti pilota e gestione della capacità.", to: "/work/opsrook-vi/case-study" },
  { title: "Bloom Market", category: "Commercio al dettaglio · Gestione intelligente delle scorte", description: "Monitoraggio delle scorte, previsione degli sprechi e riordino automatico per piccoli rivenditori.", to: "/work/bloom-market/case-study" },
  { title: "Appointment Workflow", category: "Concept · Modernizzazione operativa", description: "Un concept per semplificare le prenotazioni e ridurre la gestione manuale degli appuntamenti.", to: "/work/appointment-workflows/concept" },
];

export default function CaseStudiesIndex() {
  return <div className="min-h-screen bg-ink text-paper">
    <SEO title="Casi studio" description="Una selezione di casi studio PrismWave Studio su strategia di prodotto, SaaS e flussi operativi." path="/case-studies" />
    <AiMetadata map={["Casi studio", "OpsRook-VI", "Bloom Market"]} intent="Help visitors review PrismWave Studio case studies and the problems behind each project." tags={["case studies", "product design", "SaaS", "PrismWave Studio"]} extract={{ title: "PrismWave Studio Case Studies", audience: "Prospective clients and product teams", primaryActions: "Open a case study" }} />
    <header className="border-b border-ink-line"><div className="mx-auto max-w-5xl px-6 py-6"><Link to="/" className="font-mono text-xs uppercase tracking-wide text-paper/60">← Torna allo studio</Link></div></header>
    <main className="mx-auto max-w-5xl px-6 py-20">
      <AiIntent id="case-studies-intent">Introduce selected PrismWave Studio case studies and direct visitors to project breakdowns.</AiIntent>
      <p className="font-mono text-[11px] uppercase tracking-widest text-amber">Progetti selezionati</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">Casi studio</h1>
      <p className="mt-5 max-w-2xl leading-relaxed text-paper/65">Uno sguardo più approfondito alle sfide affrontate: dal posizionamento ai percorsi dei clienti, fino a processi operativi più integrati.</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">{caseStudies.map((study) => <article key={study.title} className="group rounded-2xl border border-ink-line bg-ink-2/60 p-6 transition-colors hover:border-amber/60 hover:bg-ink-2">
        <p className="font-mono text-[10px] uppercase tracking-widest text-amber">{study.category}</p><h2 className="mt-3 font-display text-2xl font-semibold">{study.title}</h2><p className="mt-3 text-sm leading-relaxed text-paper/65">{study.description}</p>
        <Link to={study.to} className="mt-6 inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-amber group-hover:translate-x-1">{study.title === "Appointment Workflow" ? "Esplora il concept" : "Leggi il caso studio"} →</Link>
      </article>)}</div>
      <div className="mt-12 rounded-2xl border border-amber/40 bg-amber/5 p-8 text-center"><p className="font-mono text-[11px] uppercase tracking-widest text-amber">Hai un problema simile?</p><h2 className="mt-3 font-display text-2xl font-semibold">Troviamo insieme il prossimo passo giusto per il tuo sito.</h2><a href="/#audit-tool" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-amber px-6 py-3 font-display text-sm font-semibold text-ink">Avvia un'analisi gratuita del sito →</a></div>
    </main>
    <footer><Footer /></footer>
  </div>;
}
