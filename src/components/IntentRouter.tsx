import { useNavigate } from "react-router-dom";
import { ScanSearch, Sparkles } from "lucide-react";

export default function IntentRouter() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft text-center mb-4">
        Inizia da qui
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          type="button"
          aria-label="Avvia un'analisi gratuita del sito"
          onClick={() => navigate("/audit")}
          className="group relative text-left rounded-2xl border border-ink-line bg-paper p-6 
                     hover:border-coral hover:shadow-md hover:shadow-ink-soft/20 
                     transition-all cursor-pointer active:scale-[0.99]
                     focus-visible:ring focus-visible:ring-coral/40"
        >
          <ScanSearch size={22} className="text-coral mb-3" />
          <p className="font-display text-base font-semibold text-ink">
            Ho già un sito
          </p>
          <p className="font-inter text-sm text-ink-soft mt-1 leading-relaxed">
            Scopri se il tuo sito è ancora attuale e funziona come dovrebbe: analisi gratuita, senza impegno commerciale.
          </p>
          <span className="font-mono text-xs text-coral mt-4 inline-block group-hover:translate-x-1 transition-transform">
            Avvia l'analisi gratuita →
          </span>
        </button>

        <button
          type="button"
          aria-label="Avvia la realizzazione di un nuovo sito"
          onClick={() => navigate("/start")}
          className="group relative text-left rounded-2xl border border-ink-line bg-paper p-6 
                     hover:border-violet hover:shadow-md hover:shadow-ink-soft/20 
                     transition-all cursor-pointer active:scale-[0.99]
                     focus-visible:ring focus-visible:ring-violet/40"
        >
          <Sparkles size={22} className="text-violet mb-3" />
          <p className="font-display text-base font-semibold text-ink">
            Ho un'idea, ma non ancora un sito
          </p>
          <p className="font-inter text-sm text-ink-soft mt-1 leading-relaxed">
            Un negozio, un supermercato o un progetto personale: raccontaci di cosa si tratta e cosa vuoi realizzare.
          </p>
          <span className="font-mono text-xs text-violet mt-4 inline-block group-hover:translate-x-1 transition-transform">
            Avvia il mio progetto →
          </span>
        </button>
      </div>
    </div>
  );
}
