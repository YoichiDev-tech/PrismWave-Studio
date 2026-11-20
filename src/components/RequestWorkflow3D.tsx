import { useState } from "react";

type Status = "nuova" | "in-lavorazione" | "completata";

const REQUESTS: { id: string; title: string; customer: string; area: string; status: Status; time: string }[] = [
  { id: "R-024", title: "Manutenzione caldaia", customer: "Cliente esempio", area: "Milano", status: "nuova", time: "09:42" },
  { id: "R-023", title: "Installazione climatizzatore", customer: "Cliente esempio", area: "Monza", status: "in-lavorazione", time: "Ieri" },
  { id: "R-022", title: "Controllo impianto", customer: "Cliente esempio", area: "Sesto S. G.", status: "completata", time: "Ieri" },
];

const LABELS: Record<Status, string> = {
  nuova: "Nuova",
  "in-lavorazione": "In gestione",
  completata: "Completata",
};

export default function RequestWorkflow3D() {
  const [filter, setFilter] = useState<Status | "tutte">("tutte");
  const visible = filter === "tutte" ? REQUESTS : REQUESTS.filter((request) => request.status === filter);

  return (
    <div className="request-scene relative mx-auto w-full max-w-[590px]" aria-label="Anteprima dimostrativa di un pannello per la gestione delle richieste">
      <div className="request-orbit request-orbit-one" aria-hidden="true" />
      <div className="request-orbit request-orbit-two" aria-hidden="true" />
      <div className="request-board relative z-10 overflow-hidden rounded-[1.4rem] border border-white/15 bg-[#111a2c]/95 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/15 text-amber">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><path d="M4 7.5h16M7 4v3.5M17 4v3.5M5 11h14v8.5H5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="m8 15 2 2 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Richieste clienti</p>
              <p className="text-[11px] text-slate-400">Anteprima interattiva · dati dimostrativi</p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-300">Esempio</span>
        </div>

        <div className="grid grid-cols-3 gap-2 border-b border-white/10 p-4">
          <div className="rounded-xl bg-white/[0.045] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Ricevute</p>
            <p className="mt-1 font-display text-2xl font-semibold text-white">03</p>
          </div>
          <div className="rounded-xl bg-white/[0.045] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Da seguire</p>
            <p className="mt-1 font-display text-2xl font-semibold text-amber">01</p>
          </div>
          <div className="rounded-xl bg-white/[0.045] p-3">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Completate</p>
            <p className="mt-1 font-display text-2xl font-semibold text-emerald-300">01</p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold text-white">Ultime richieste</p>
            <div className="flex flex-wrap gap-1" role="group" aria-label="Filtra le richieste dimostrative">
              {(["tutte", "nuova", "in-lavorazione", "completata"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  aria-pressed={filter === status}
                  className={`rounded-full px-2.5 py-1 text-[10px] transition-colors ${filter === status ? "bg-amber text-[#111827]" : "bg-white/[0.06] text-slate-400 hover:text-white"}`}
                >
                  {status === "tutte" ? "Tutte" : LABELS[status]}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2" aria-live="polite">
            {visible.map((request) => (
              <article key={request.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-3 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-slate-500">{request.id}</span>
                    <span className="truncate text-xs font-medium text-slate-100">{request.title}</span>
                  </div>
                  <p className="mt-1 truncate text-[10px] text-slate-400">{request.customer} · {request.area}</p>
                </div>
                <div className="flex flex-none flex-col items-end gap-1">
                  <span className={`rounded-full px-2 py-1 text-[9px] ${request.status === "nuova" ? "bg-amber/15 text-amber" : request.status === "in-lavorazione" ? "bg-sky-400/10 text-sky-300" : "bg-emerald-400/10 text-emerald-300"}`}>{LABELS[request.status]}</span>
                  <span className="text-[9px] text-slate-500">{request.time}</span>
                </div>
              </article>
            ))}
            {visible.length === 0 && <p className="rounded-xl border border-dashed border-white/10 p-5 text-center text-xs text-slate-400">Nessuna richiesta in questa categoria.</p>}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
          <span className="text-[10px] text-slate-500">Interfaccia concettuale, non un account operativo</span>
          <span className="font-mono text-[10px] text-amber">PRISMWAVE / DEMO</span>
        </div>
      </div>
      <div className="request-float-card absolute -right-2 top-12 z-20 hidden rounded-xl border border-white/15 bg-[#1c2940] px-4 py-3 shadow-xl sm:block">
        <p className="text-[9px] uppercase tracking-wider text-slate-400">Nuova richiesta</p>
        <p className="mt-1 text-xs font-semibold text-white">Intervento da pianificare</p>
        <p className="mt-1 text-[10px] text-emerald-300">Pronta per essere presa in carico</p>
      </div>
    </div>
  );
}
