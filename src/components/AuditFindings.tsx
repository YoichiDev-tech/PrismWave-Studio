import Reveal from "./Reveal";
import Section from "./Section";

const FINDING_TYPES = [
  {
    type: "Dettaglio dei punteggi",
    desc: "Mostriamo il punteggio complessivo e quelli delle singole categorie: velocità, esperienza da smartphone, metadati della pagina e leggibilità per i sistemi AI.",
  },
  {
    type: "Elementi rilevati",
    desc: "Mostriamo gli elementi rilevati durante l'analisi e spieghiamo cosa potrebbero indicare, senza presentare ipotesi come problemi aziendali dimostrati.",
  },
  {
    type: "Contesto aziendale",
    desc: "Spieghiamo perché un risultato potrebbe meritare attenzione. Una scansione, da sola, non può determinare l'impatto completo su conversioni, visibilità nei motori di ricerca o ricavi.",
  },
  {
    type: "Revisione facoltativa",
    desc: "Offriamo una revisione gratuita per discutere quali risultati siano più importanti e se sia opportuno intervenire.",
  },
];

export default function AuditFindings() {
  return (
    <Section
      id="audit-findings"
      ai="audit-findings"
      intent="Explain the format and limitations of the automated website audit."
      labelledBy="audit-findings-title"
      className="grain relative overflow-hidden bg-ink py-16 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[480px] w-[720px] translate-x-[35%] rounded-full opacity-20 blur-[130px]"
        style={{ background: "radial-gradient(circle, #FFB84D 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Cosa ricevi
          </p>

          <h2
            id="audit-findings-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            Scopri cosa è emerso e quali aspetti approfondire.
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Mostriamo il punteggio misurato, gli elementi rilevati e gli aspetti che meritano un approfondimento. L'analisi è un punto di partenza, non una valutazione completa del sito o delle sue prestazioni commerciali.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FINDING_TYPES.map((item) => (
              <div
                key={item.type}
                className="rounded-2xl border border-ink-line bg-ink-2/60 p-5 transition-colors hover:border-amber"
              >
                <h3 className="font-display text-base font-semibold text-paper">
                  {item.type}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}