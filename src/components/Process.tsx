import Reveal from "./Reveal";
import Section from "./Section";

const STEPS = [
  {
    title: "Analisi o breve chiamata",
    desc: "Analisi gratuita del sito o confronto di 15 minuti. Ricevi risultati chiari e una proposta realistica: correggere, rifare o non intervenire.",
  },
  {
    title: "Riepilogo scritto del progetto",
    desc: "Un documento semplice con pagine, funzionalità, tempistiche e attività incluse o escluse. Nessuna proposta vaga.",
  },
  {
    title: "Accordo e acconto",
    desc: "Ricevi un accordo sintetico che definisce prezzo, acconto, revisioni e proprietà del lavoro. Lo sviluppo inizia solo dopo la firma e il pagamento dell'acconto.",
  },
  {
    title: "Sviluppo e revisioni",
    desc: "Realizziamo il progetto secondo l'ambito e le tempistiche concordati per iscritto. Sono incluse le revisioni previste, senza ore o attività aggiuntive a sorpresa.",
  },
  {
    title: "Pubblicazione e consegna",
    desc: "Pubblichiamo il sito, colleghiamo il dominio se necessario e consegniamo codice e risorse complete. La proprietà è tua. L'assistenza successiva è facoltativa.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      ai="process"
      intent="Mostrare il percorso con ambito definito, dal primo contatto all'accordo scritto, allo sviluppo e alla consegna."
      labelledBy="process-title"
      className="border-y border-ink-line bg-ink-2 py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Come funziona
          </p>
          <h2
            id="process-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            Ambito definito. Accordi scritti. Nessuna sorpresa.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Ogni progetto segue un percorso chiaro: risultati comprensibili, un riepilogo scritto
            del progetto, un accordo semplice e poi lo sviluppo. Conosci
            exact scope and price before any work or deposit begins.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-4 rounded-2xl border border-ink-line bg-ink/60 p-5 transition-colors hover:border-amber lg:flex-col lg:gap-3"
              >
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-ink-line font-mono text-[12px] text-amber">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-paper">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={2} className="mt-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-ink-line bg-ink/60 px-6 py-5 text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-paper">Come funziona il pagamento:</span>{" "}
              35% deposit to start after the agreement is signed, 65% on delivery.
              L'ambito viene definito prima dell'inizio. Le attività non comprese nell'accordo
              summary is quoted separately — never billed as surprise hours.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}