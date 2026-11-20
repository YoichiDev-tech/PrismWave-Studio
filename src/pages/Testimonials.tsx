import { testimonials } from "../data/testimonials";
import { useState } from "react";
import AiMetadata from "../components/AiMetadata";

export default function TestimonialsPage() {
  type Filter = "all" | "audit" | "build" | "general";
  const [filter, setFilter] = useState<Filter>("all");

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.intent === filter);

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white py-20 px-6">
      <AiMetadata
        map={["Panoramica delle testimonianze", "Commenti dei clienti", "Filtri dei commenti", "Invito a un progetto"]}
        intent="Condividere commenti autentici e approvati dei clienti di PrismWave Studio quando saranno disponibili."
        tags={["testimonianze", "commenti dei clienti", "riprova sociale", "PrismWave Studio"]}
        extract={{
          title: "PrismWave Studio — Commenti dei clienti",
          audience: "Potenziali clienti",
          primaryActions: "Discutere un progetto con PrismWave Studio",
          status: testimonials.length > 0 ? "Commenti dei clienti pubblicati" : "Nessuna testimonianza pubblicata",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-4">
          Lavoro autentico. Commenti reali.
        </h1>

        <p className="text-white/70 mb-10 max-w-3xl">
          PrismWave Studio migliora siti web esistenti e realizza esperienze digitali da zero. Pubblichiamo i commenti dei clienti solo quando sono autentici e autorizzati: mai recensioni segnaposto o risultati inventati.
        </p>

        {testimonials.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-4 mb-10">
              {(["all", "audit", "build", "general"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg border ${
                    filter === f
                      ? "bg-white text-black"
                      : "border-white/20 text-white/70"
                  }`}
                >
                  {(f === "all" ? "TUTTE" : f === "audit" ? "ANALISI" : f === "build" ? "SVILUPPO" : "GENERALI")}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10"
                >
                  <div className="text-yellow-400 mb-2">
                    {"⭐".repeat(t.rating)}
                  </div>
                  <p className="mb-4">{t.message}</p>
                  <p className="text-sm text-white/70">
                    {t.name && <span>{t.name}</span>}
                    {t.company && <span> — {t.company}</span>}
                  </p>
                  <span className="text-xs mt-2 inline-block px-2 py-1 bg-white/10 rounded">
                    {t.intent.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 max-w-3xl">
            <p className="text-lg font-medium mb-2">
              Questa pagina crescerà con i progetti reali dei clienti.
            </p>
            <p className="text-white/65">
              Nel frattempo, esplora i progetti e i concept del portfolio oppure raccontaci cosa vorresti realizzare. I concept del portfolio sono presentati come dimostrazioni, non come incarichi svolti per clienti.
            </p>
          </div>
        )}

        <a
          href="/#contact"
          className="inline-block mt-12 text-blue-400 hover:text-blue-300"
        >
          Vuoi avviare il tuo progetto? →
        </a>
      </div>
    </div>
  );
}
