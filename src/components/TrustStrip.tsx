const ITEMS = [
  {
    label: "Analisi gratuita iniziale",
    detail: "Individua i problemi prima di spendere",
  },
  {
    label: "Confronto di 15 minuti",
    detail: "Risultati scritti e prossimi passi chiari",
  },
  {
    label: "Prezzo definito",
    detail: "Importo concordato prima di iniziare",
  },
  {
    label: "Il codice è tuo",
    detail: "Consegna completa, senza vincoli",
  },
];

/*
 Elementi di fiducia basati su un processo trasparente, senza testimonianze inventate
 */
export default function TrustStrip() {
  return (
    <div
      aria-label="Come lavorare con PrismWave"
      className="border-y border-ink-line bg-ink-2/80"
    >
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink-line lg:py-7">
        {ITEMS.map((item) => (
          <div key={item.label} className="lg:px-6">
            <p className="font-display text-sm font-semibold text-paper">
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft sm:text-sm">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}