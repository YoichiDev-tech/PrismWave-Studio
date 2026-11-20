import Reveal from "./Reveal";
import Section from "./Section";

const CHECKS = [
  {
    title: "Velocità di caricamento",
    desc: "Tempo di risposta del server e dimensioni della pagina HTML. I visitatori si aspettano caricamenti rapidi: oltre 3 secondi le probabilità di abbandono aumentano.",
  },
  {
    title: "Adattamento ai dispositivi mobili",
    desc: "Verifica del meta tag viewport e dei punti di interruzione responsive. Il sito deve essere leggibile e utilizzabile da smartphone, non una versione desktop rimpicciolita.",
  },
  {
    title: "Fondamenti SEO",
    desc: "Sicurezza HTTPS, meta description, tag title e metadati Open Graph per le anteprime sui social.",
  },
  {
    title: "Leggibilità per i sistemi AI",
    desc: "Struttura semantica, gerarchia dei titoli, dati strutturati (JSON-LD) e testi alternativi delle immagini, utili all'accessibilità e ai sistemi automatici.",
  },
];

export default function AuditDetails() {
  return (
    <Section
      id="audit-details"
      ai="audit-details"
      intent="Explain what the free website audit actually checks across four categories."
      labelledBy="audit-details-title"
      className="border-y border-ink-line bg-ink-2 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Cosa analizza la verifica</p>
          <h2 id="audit-details-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Quattro aspetti tecnici importanti per il tuo sito.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            L'analisi gratuita esamina prestazioni, adattamento ai dispositivi mobili, SEO e leggibilità per i sistemi AI. Controlla tempi di risposta, dimensioni della pagina, configurazione viewport, struttura semantica e dati strutturati per individuare problemi concreti.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHECKS.map((check) => (
              <div
                key={check.title}
                className="rounded-2xl border border-ink-line bg-ink/60 p-5 transition-colors hover:border-amber"
              >
                <h3 className="font-display text-base font-semibold text-paper">{check.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{check.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
