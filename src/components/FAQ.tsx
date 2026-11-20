import { useState } from "react";
import Reveal from "./Reveal";
import Section from "./Section";

const FAQS = [
  {
    q: "Perché dovrei affidare il mio sito a PrismWave?",
    a: "Puoi valutare il nostro approccio prima di impegnarti: l'analisi si basa su dati reali del tuo sito, i prezzi sono chiari fin dall'inizio e il portfolio mostra progetti consultabili. Il codice finale resta tuo e ogni progetto parte da ambito e tempistiche definiti.",
  },
  {
    q: "Il sito sarà mio una volta completato?",
    a: "Sì. Sarai proprietario del codice, del design e di tutti i materiali consegnati. Nessun abbonamento obbligatorio o vincolo con piattaforme proprietarie.",
  },
  {
    q: "Quanto tempo richiede un progetto?",
    a: "La maggior parte delle landing page richiede 3–7 giorni. I siti per piccole imprese richiedono in genere 2–3 settimane, in base ai contenuti e alle revisioni.",
  },
  {
    q: "E se il progetto non fosse adatto alle mie esigenze?",
    a: "Iniziamo con una breve conversazione e definiamo l'ambito prima di cominciare. Se obiettivi, budget o tempistiche non sono compatibili, te lo dirò con trasparenza, senza pressioni.",
  },
  {
    q: "E se avessi bisogno di modifiche dopo il lancio?",
    a: "Puoi richiedere aggiornamenti anche dopo il lancio. Le piccole correzioni sono rapide; gli interventi più ampi possono essere pianificati come un nuovo incarico.",
  },
  {
    q: "Offrite hosting o manutenzione?",
    a: "Hosting e domini sono gestiti da fornitori come Vercel o Namecheap. Possiamo occuparci della manutenzione, ma mantieni sempre il pieno controllo.",
  },
  {
    q: "Di cosa avete bisogno per iniziare?",
    a: "Bastano una breve descrizione della tua attività, i tuoi obiettivi, i contenuti già disponibili e qualche esempio di siti che apprezzi.",
  },
  {
    q: "E se non avessi ancora un logo o un'identità visiva?",
    a: "Nessun problema: possiamo creare un'identità visiva essenziale oppure partire da uno stile neutro, da evolvere in seguito.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex((current) => (current === i ? null : i));

  return (
    <Section
      id="faq"
      ai="faq"
      intent="Answer common questions about the studio, process, pricing, and project fit."
      labelledBy="faq-title"
      className="border-t border-ink-line bg-ink-2 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Domande frequenti</p>
          <h2 id="faq-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
            Tutto quello che devi sapere prima di iniziare.
          </h2>
        </Reveal>

        <Reveal delay={1} className="mt-10 divide-y divide-ink-line overflow-hidden rounded-2xl border border-ink-line bg-ink/60">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    className="flex min-h-14 w-full items-center justify-between gap-6 px-6 py-4 text-left transition-colors hover:bg-ink-2/60 sm:px-8"
                  >
                    <span className="font-display text-base font-semibold text-paper">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink-line text-ink-soft transition-all duration-300 ${
                        isOpen ? "rotate-45 border-amber text-amber" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft sm:px-8">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </Section>
  );
}