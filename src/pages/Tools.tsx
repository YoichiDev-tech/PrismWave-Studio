import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AiMetadata from "../components/AiMetadata";

type ToolId = "meta" | "headers";

interface MetaResult {
  finalUrl: string;
  title: string | null;
  description: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  canonical: string | null;
  hasViewport: boolean;
  hasTwitterCard: boolean;
}

interface HeadersResult {
  finalUrl: string;
  status: number;
  isHttps: boolean;
  headers: Record<string, string>;
  checks: { id: string; label: string; pass: boolean; detail: string }[];
}

export default function Tools() {
  const [active, setActive] = useState<ToolId>("meta");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<MetaResult | null>(null);
  const [headers, setHeaders] = useState<HeadersResult | null>(null);

  const run = async () => {
    setError(null);
    setMeta(null);
    setHeaders(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Inserisci l'indirizzo di un sito web.");
      return;
    }
    setLoading(true);
    try {
      const endpoint = active === "meta" ? "/api/site-meta" : "/api/site-headers";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Richiesta non riuscita.");
        return;
      }
      if (active === "meta") setMeta(data as MetaResult);
      else setHeaders(data as HeadersResult);
    } catch {
      setError("Errore di rete. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Strumenti gratuiti per siti web"
        description="Strumenti gratuiti di PrismWave Studio per analizzare metadati, intestazioni di sicurezza e siti web."
        path="/tools"
      />
      <AiMetadata
        map={["Introduzione agli strumenti", "Esecuzione dei controlli", "Risultati", "Piè di pagina dello studio"]}
        intent="Permettere ai visitatori di eseguire diagnosi gratuite dei siti web tramite gli strumenti di PrismWave Studio."
        tags={["strumenti per siti web", "controllo SEO", "intestazioni di sicurezza", "analisi del sito"]}
        extract={{
          title: "Strumenti PrismWave Studio",
          audience: "Fondatori e piccole imprese",
          primaryActions: "Eseguire un controllo o un'analisi completa gratuita",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Torna allo studio
          </Link>
          <Link
            to="/#audit-tool"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Analisi completa del sito →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Strumenti dello studio</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Controlli gratuiti eseguiti su un'infrastruttura reale.
        </h1>
        <p className="mt-4 text-ink-soft">
          Diagnostica eseguita lato server, non semplici schermate dimostrative. Inserisci l'indirizzo di un sito e ricevi indicazioni concrete.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {(
            [
              { id: "meta" as const, label: "Meta tag e Open Graph" },
              { id: "headers" as const, label: "Intestazioni di sicurezza" },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActive(t.id);
                setError(null);
                setMeta(null);
                setHeaders(null);
              }}
              className={`rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-wide transition-colors ${
                active === t.id
                  ? "border-amber bg-ink-2 text-paper"
                  : "border-ink-line text-ink-soft hover:border-amber hover:text-paper"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-ink-line bg-ink-2/40 p-6">
          <label htmlFor="tool-url" className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            Indirizzo del sito web
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="tool-url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://iltuosito.it"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void run();
              }}
              className="min-h-12 flex-1 rounded-xl border border-ink-line bg-ink px-4 text-sm text-paper placeholder:text-ink-soft/60 focus:border-amber focus:outline-none"
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => void run()}
              className="inline-flex min-h-12 items-center justify-center rounded-full px-7 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              {loading ? "Analisi in corso…" : "Avvia controllo"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-coral">{error}</p>}
        </div>

        {meta && (
          <div className="mt-8 space-y-4 rounded-2xl border border-ink-line bg-ink/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Risultati — meta tag</p>
            <p className="text-sm text-ink-soft">Resolved: {meta.finalUrl}</p>
            <dl className="mt-4 space-y-3 text-sm">
              {(
                [
                  ["Titolo", meta.title],
                  ["Descrizione", meta.description],
                  ["Titolo Open Graph", meta.ogTitle],
                  ["Descrizione Open Graph", meta.ogDescription],
                  ["Immagine Open Graph", meta.ogImage],
                  ["URL canonico", meta.canonical],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="border-b border-ink-line pb-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{label}</dt>
                  <dd className="mt-1 break-all text-paper">{value || "—"}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 space-y-1 font-mono text-[12px] text-ink-soft">
              <li>{meta.hasViewport ? "✓" : "✗"} Meta viewport</li>
              <li>{meta.hasTwitterCard ? "✓" : "✗"} Scheda Twitter</li>
            </ul>
          </div>
        )}

        {headers && (
          <div className="mt-8 space-y-4 rounded-2xl border border-ink-line bg-ink/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Risultati — header</p>
            <p className="text-sm text-ink-soft">
              {headers.finalUrl} · HTTP {headers.status} · {headers.isHttps ? "HTTPS" : "Senza HTTPS"}
            </p>
            <ul className="mt-4 space-y-3">
              {headers.checks.map((c) => (
                <li key={c.id} className="rounded-xl border border-ink-line px-4 py-3">
                  <p className="font-display text-sm font-semibold text-paper">
                    <span className={c.pass ? "text-amber" : "text-coral"}>{c.pass ? "✓" : "✗"}</span> {c.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-ink-line p-6">
          <h2 className="font-display text-lg font-semibold">Vuoi un quadro completo?</h2>
          <p className="mt-2 text-sm text-ink-soft">
            L'analisi gratuita del sito combina velocità, struttura e segnali SEO, inviandoti un breve report via email.
          </p>
          <Link
            to="/#audit-tool"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-ink-line px-6 font-display text-sm font-semibold text-paper transition-colors hover:border-amber"
          >
            Avvia l'analisi completa gratuita →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}