import type { ReactElement } from "react";
import Reveal from "./Reveal";

interface Segment {
  eyebrow: string;
  title: string;
  desc: string;
  proof: string;
  accent: "amber" | "coral" | "violet";
  icon: ReactElement;
}

const accentClasses: Record<
  Segment["accent"],
  { ring: string; text: string; dot: string; glow: string }
> = {
  amber: {
    ring: "group-hover:border-amber",
    text: "group-hover:text-amber",
    dot: "bg-amber",
    glow: "rgba(255,184,77,0.18)",
  },
  coral: {
    ring: "group-hover:border-coral",
    text: "group-hover:text-coral",
    dot: "bg-coral",
    glow: "rgba(255,122,89,0.18)",
  },
  violet: {
    ring: "group-hover:border-violet",
    text: "group-hover:text-violet",
    dot: "bg-violet",
    glow: "rgba(108,99,255,0.18)",
  },
};

const segments: Segment[] = [
  {
    eyebrow: "Chi costruisce da solo",
    title: "Fondatori indipendenti",
    desc: "Stai sviluppando il prodotto e ti occupi anche di tutto il resto. Ti serve un sito credibile, capace di spiegare subito il valore di ciò che fai e trasformare le visite in conversazioni, senza aggiungere un altro strumento da gestire.",
    proof: "Una homepage chiara e un percorso di contatto semplice, senza lunghe presentazioni.",
    accent: "amber",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Attività locali e di servizi",
    title: "Piccole e medie imprese",
    desc: "Artigiani, attività ricettive e servizi professionali: ti servono richieste e prenotazioni, non una semplice brochure. Realizziamo siti con ambito definito, veloci, ottimizzati per smartphone e semplici da usare.",
    proof: "Un sito facile da trovare e contattare, che non richiede continue attenzioni settimanali.",
    accent: "coral",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 21V10l8-6 8 6v11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    eyebrow: "Team orientati al prodotto",
    title: "SaaS e prodotti in fase iniziale",
    desc: "Ti serve un sito promozionale o un'interfaccia essenziale che comunichi chiaramente il valore del prodotto e il passo successivo. Un'interfaccia pulita, prezzi o accesso alla prova ben visibili e una base pronta a evolversi.",
    proof: "Una pagina che trasforma la credibilità tecnica in iscrizioni o prenotazioni di demo.",
    accent: "violet",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3.5"
          y="4.5"
          width="17"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 14h3M8 17h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

interface WhoWeHelpProps {
  onSelectAudience?: (segment: string) => void;
}

export default function WhoWeHelp({ onSelectAudience }: WhoWeHelpProps) {
  return (
    <section id="who-we-help" className="bg-ink py-24 md:py-32 cursor-default">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-xl">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            A chi ci rivolgiamo
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Fondatori indipendenti. PMI. Team SaaS.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Per tutti il percorso è lo stesso: analisi gratuita o breve confronto, ambito, prezzo e tempistiche di consegna definiti per iscritto. Un sito che svolge una funzione concreta, non soltanto un progetto dall'aspetto curato.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-line bg-ink-line lg:grid-cols-3">
          {segments.map((segment, i) => {
            const accent = accentClasses[segment.accent];
            return (
              <Reveal
                key={segment.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col bg-ink p-8 transition-colors duration-300 hover:bg-ink-2">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(200px circle at 40px 30px, ${accent.glow}, transparent 70%)`,
                    }}
                  />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                        {segment.eyebrow}
                      </span>
                    </div>

                    <div
                      className={`mt-5 flex h-11 w-11 items-center justify-center rounded-full border border-ink-line text-paper transition-colors duration-300 ${accent.ring} ${accent.text}`}
                    >
                      <div className="h-5 w-5">{segment.icon}</div>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-semibold text-paper">
                      {segment.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {segment.desc}
                    </p>

                    <p className="mt-5 border-t border-ink-line pt-4 text-xs leading-relaxed text-ink-soft">
                      {segment.proof}
                    </p>

                    <button
                      type="button"
                      onClick={() => onSelectAudience?.(segment.title)}
                      className={`mt-auto flex items-center gap-2 pt-6 text-left font-mono text-[12px] uppercase tracking-widest text-paper transition-colors duration-300 ${accent.text}`}
                    >
                      Inizia da qui
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}