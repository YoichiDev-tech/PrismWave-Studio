const badges = [
  { name: "React", detail: "sviluppo a componenti" },
  { name: "TypeScript", detail: "tipizzazione sicura e meno errori" },
  { name: "Vite", detail: "strumenti moderni e veloci" },
  { name: "Tailwind CSS", detail: "sistema di design coerente" },
  { name: "Vercel", detail: "hosting adatto alla produzione" },
  { name: "Supabase", detail: "backend reale, non un semplice modello" },
];

export default function TrustBadges() {
  return (
    <div className="py-10 px-6 max-w-5xl mx-auto">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft text-center mb-6">
        Realizzato con strumenti usati anche nei progetti professionali
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {badges.map((b) => (
          <div
            key={b.name}
            aria-label={`${b.name} — ${b.detail}`}
            className="group relative rounded-lg border border-ink-line bg-amber/20 px-4 py-2 
                       cursor-default hover:shadow-md hover:shadow-ink-soft/40 transition-all"
          >
            <span className="font-display text-sm font-medium text-paper whitespace-nowrap select-none">
              {b.name}
            </span>

            <span
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-[200px] 
                         scale-0 group-hover:scale-100 transition-transform origin-top 
                         rounded-md bg-ink text-paper text-[11px] leading-tight font-inter 
                         px-2 py-1 z-10"
            >
              {b.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
