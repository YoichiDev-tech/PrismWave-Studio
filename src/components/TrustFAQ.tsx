import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Siete all'inizio: perché dovrei affidarvi il mio sito?", a: "È una domanda legittima. Non abbiamo ancora un lungo elenco di clienti: potresti essere tra i primi. In cambio avrai un contatto diretto con chi realizza il progetto, un prototipo funzionante prima di pagare e prezzi coerenti con questa fase iniziale. Consulta i pacchetti." },
  { q: "Devo pagare prima di vedere qualcosa?", a: "No. Per i primi contatti e per la maggior parte dei progetti iniziali realizziamo prima un prototipo funzionante. Si passa a un accordo a pagamento solo dopo che lo hai visto e hai deciso di proseguire." },
  { q: "E se la direzione proposta non mi convince?", a: "Ci confrontiamo e apportiamo gli adeguamenti previsti: fanno parte del processo. Prima dello sviluppo finale, il riepilogo del progetto definisce ambito, prezzo e tempistiche, evitando revisioni e costi imprevisti." },
  { q: "Che cosa possiederò al termine?", a: "Il sito completato, il relativo codice e la configurazione del dominio saranno tuoi. Non imponiamo abbonamenti per mantenerne il controllo; l'assistenza continuativa è facoltativa." },
  { q: "Do you only do one type of site?", a: "No — landing pages, e-commerce, dashboards, niche builds (we've scoped everything from restaurant sites to hobby-ranking platforms). If it's a real idea, we'll tell you honestly whether it's a fit." },
  { q: "Quanto tempo richiede un progetto?", a: "Dipende dall'ambito. I pacchetti indicano tempistiche definite (1–3 settimane); per i progetti su misura, i tempi vengono riportati nel riepilogo prima di qualsiasi impegno." },
];

export default function TrustFAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <p className="font-mono text-xs uppercase tracking-widest text-amber mb-2">Prima di iniziare</p>
      <h2 className="font-sora text-3xl font-bold text-ink mb-10">Risposte chiare</h2>
      <div className="divide-y divide-ink/10 border-t border-b border-ink/10">
        {faqs.map((item, i) => (
          <div key={item.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center py-5 text-left"
            >
              <span className="font-sora text-sm md:text-base font-medium text-ink pr-4">{item.q}</span>
              {open === i ? <Minus size={18} className="text-coral shrink-0" /> : <Plus size={18} className="text-ink/40 shrink-0" />}
            </button>
            {open === i && (
              <p className="font-inter text-sm text-ink/60 pb-5 pr-8">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}