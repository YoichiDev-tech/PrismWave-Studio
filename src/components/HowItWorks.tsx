import { Search, FileText, Hammer, CheckCircle2, Rocket } from "lucide-react";

const audit_path = [
  { icon: Search, label: "Analisi gratuita", desc: "Inviaci il tuo sito: verifichiamo velocità, usabilità da smartphone e capacità di generare contatti." },
  { icon: FileText, label: "Risultati e piano di intervento", desc: "Ricevi una spiegazione chiara di ciò che non è aggiornato e dei problemi che potrebbe causare." },
  { icon: Hammer, label: "Decidi tu", desc: "Puoi intervenire in autonomia seguendo il report oppure affidare il lavoro a noi. Senza pressioni." },
];

const build_path = [
  { icon: FileText, label: "Raccontaci la tua idea", desc: "Che si tratti di un negozio, un supermercato o un progetto personale, definiamo insieme cosa serve." },
  { icon: Hammer, label: "Prima il prototipo", desc: "Realizziamo un'anteprima funzionante prima di qualsiasi pagamento." },
  { icon: CheckCircle2, label: "Revisione e perfezionamento", desc: "Tu valuti, noi apportiamo le modifiche concordate. Nessuna revisione a sorpresa." },
  { icon: Rocket, label: "Pubblicazione", desc: "Il sito viene pubblicato sul tuo dominio e consegnato completo." },
];

function PathColumn({ title, steps, accent }: { title: string; steps: typeof audit_path; accent: string }) {
  return (
    <div className="flex-1 min-w-[280px]">
      <h3 className={`font-display text-lg md:text-xl font-semibold mb-6 ${accent}`}>{title}</h3>
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li
            key={s.label}
            aria-label={`${s.label} step`}
            className="flex gap-4 items-start cursor-default"
          >
            <div className="flex flex-col items-center">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper border border-ink-line select-none">
                <s.icon size={16} className={accent} />
              </span>
              {i < steps.length - 1 && <span className="w-px flex-1 bg-ink-line mt-1" />}
            </div>
            <div className="pb-4">
              <p className="font-display text-sm font-semibold text-ink">{s.label}</p>
              <p className="font-inter text-sm text-ink-soft mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Come funziona</p>
      <h2 className="font-display text-3xl font-bold text-ink mb-12">Due punti di partenza, un unico obiettivo.</h2>

      <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-16">
        <PathColumn title="Hai un sito che sembra superato?" steps={audit_path} accent="text-coral" />
        <PathColumn title="Hai un'idea ma non ancora un sito?" steps={build_path} accent="text-violet" />
      </div>
    </section>
  );
}
