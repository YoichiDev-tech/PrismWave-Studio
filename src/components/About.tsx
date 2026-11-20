import Reveal from "./Reveal";
import Section from "./Section";
import BrandReel from "./BrandReel";

// Merges the old About + Why Choose Us: the story (why hospitality matters)
// and the proof (what you can rely on) belong together
const PROMISES = [
  { label: "Tempo di risposta", value: "1 giorno lavorativo" },
  { label: "Proprietà del codice", value: "Interamente tuo" },
  { label: "Realizzato con", value: "React & TypeScript" },
  { label: "Prezzi", value: "Prezzo definito, senza sorprese" },
];

const STANDARDS = [
  { title: "Caricamento rapido", desc: "Codice essenziale e risorse ottimizzate." },
  { title: "Progettato prima per i dispositivi mobili", desc: "Pensato per lo smartphone che i tuoi clienti usano ogni giorno." },
  { title: "Ottimizzato per i motori di ricerca", desc: "Struttura semantica e codice ordinato." },
  { title: "Su misura", desc: "Nessun modello preconfezionato: ogni progetto parte dalla tua identità." },
];

export default function About() {
  return (
    <Section
      id="about"
      ai="about"
      intent="Explain who is behind PrismWave Studio and why founders can rely on it."
      labelledBy="about-title"
      className="grain relative overflow-hidden bg-ink py-16 md:py-24"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-center md:gap-14">
          <Reveal delay={1}>
            <BrandReel className="hidden aspect-[4/3] w-full md:flex" />
            <div className="grid grid-cols-2 gap-3 md:mt-5">
              {PROMISES.map((item) => (
                <div key={item.label} className="rounded-xl border border-ink-line bg-ink-2/60 px-4 py-3.5 transition-colors hover:border-amber">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-soft">{item.label}</p>
                  <p className="mt-1 font-display text-sm font-semibold text-paper">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Chi siamo</p>
            <h2 id="about-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl">
              Dall'ospitalità alla creazione di esperienze digitali.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Siamo PrismWave Studio, uno studio indipendente con radici nel settore dell'ospitalità e dei servizi. L'esperienza maturata a stretto contatto con
              i clienti ci ha insegnato come funzionano davvero le piccole imprese e quale ruolo debba avere un sito web per supportarle.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              PrismWave Studio progetta e sviluppa siti web moderni e veloci per le piccole imprese, con l'obiettivo di trasformare le visite in contatti. Offriamo analisi gratuite, prezzi definiti e tempistiche concordate in anticipo.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Per questo ogni progetto è pensato per essere chiaro e utile nella pratica: niente funzionalità superflue, pannelli di controllo complicati o proposte aggiuntive tipiche delle grandi agenzie. Non stai scegliendo semplicemente qualcuno che scrive codice.
            </p>

            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {STANDARDS.map((s) => (
                <li key={s.title} className="flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-amber">
                    ✓
                  </span>
                  <p className="text-sm text-ink-soft">
                    <span className="font-semibold text-paper">{s.title}.</span> {s.desc}
                  </p>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              Lavoriamo insieme
              <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}