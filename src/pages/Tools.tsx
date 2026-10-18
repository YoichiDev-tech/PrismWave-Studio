import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AiMetadata from "../components/AiMetadata";
import folioMark from "/images/folio/pw-ig-mark.svg";

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

  const folioUrl = import.meta.env.VITE_FOLIO_URL?.trim();
  const folioHref = (() => {
    if (!folioUrl) return undefined;
    try {
      const parsedUrl = new URL(folioUrl);
      const isSecure = parsedUrl.protocol === "https:";
      const isLocalDevelopment = parsedUrl.protocol === "http:" && parsedUrl.hostname === "localhost";
      return isSecure || isLocalDevelopment ? parsedUrl.href : undefined;
    } catch {
      return undefined;
    }
  })();

  const run = async () => {
    setError(null);
    setMeta(null);
    setHeaders(null);
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Enter a website URL.");
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
        setError(typeof data.error === "string" ? data.error : "Request failed.");
        return;
      }
      if (active === "meta") setMeta(data as MetaResult);
      else setHeaders(data as HeadersResult);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Free website tools"
        description="Free website diagnostics and Folio, the invoice workspace from PrismWave Studio."
        path="/tools"
      />
      <AiMetadata
        map={["Tools introduction", "Folio invoice workspace", "Tool runner", "Results", "Studio footer"]}
        intent="Let visitors open Folio, the PrismWave Studio invoice workspace, or run free website diagnostics."
        tags={["website tools", "invoice generator", "Folio", "SEO check", "security headers", "site audit"]}
        extract={{
          title: "PrismWave Studio Tools",
          audience: "Founders and small businesses",
          primaryActions: "Run a tool or free full audit",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Back to studio
          </Link>
          <Link
            to="/#audit-tool"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Full site audit →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Studio tools</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Free checks that run on real infrastructure.
        </h1>
        <p className="mt-4 text-ink-soft">
          Server-side diagnostics — not screenshots of a brochure. Paste a URL, get signals you can act on.
        </p>

        <section className="mt-10 flex flex-col gap-5 rounded-2xl border border-ink-line bg-ink-2/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <img src={folioMark} alt="" className="h-14 w-14 shrink-0 rounded-xl bg-white p-2" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">PrismWave product</p>
              <h2 className="mt-1 font-display text-xl font-semibold">Folio — Invoice Generator</h2>
              <p className="mt-2 max-w-xl text-sm text-ink-soft">
                Create, manage, and export invoices for freelance and small-studio work.
              </p>
            </div>
          </div>
          {folioHref ? (
            <a
              href={folioHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-ink-line px-5 font-display text-sm font-semibold text-paper transition-colors hover:border-amber"
            >
              Open Folio <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-ink-line px-5 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
              Preview not configured
            </span>
          )}
        </section>

        <div className="mt-10 flex flex-wrap gap-2">
          {(
            [
              { id: "meta" as const, label: "Meta & Open Graph" },
              { id: "headers" as const, label: "Security headers" },
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
            Website URL
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="tool-url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://yoursite.com"
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
              {loading ? "Running…" : "Run check"}
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-coral">{error}</p>}
        </div>

        {meta && (
          <div className="mt-8 space-y-4 rounded-2xl border border-ink-line bg-ink/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Results — meta</p>
            <p className="text-sm text-ink-soft">Resolved: {meta.finalUrl}</p>
            <dl className="mt-4 space-y-3 text-sm">
              {(
                [
                  ["Title", meta.title],
                  ["Description", meta.description],
                  ["OG title", meta.ogTitle],
                  ["OG description", meta.ogDescription],
                  ["OG image", meta.ogImage],
                  ["Canonical", meta.canonical],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="border-b border-ink-line pb-3">
                  <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{label}</dt>
                  <dd className="mt-1 break-all text-paper">{value || "—"}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-4 space-y-1 font-mono text-[12px] text-ink-soft">
              <li>{meta.hasViewport ? "✓" : "✗"} Viewport meta</li>
              <li>{meta.hasTwitterCard ? "✓" : "✗"} Twitter card</li>
            </ul>
          </div>
        )}

        {headers && (
          <div className="mt-8 space-y-4 rounded-2xl border border-ink-line bg-ink/60 p-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Results — headers</p>
            <p className="text-sm text-ink-soft">
              {headers.finalUrl} · HTTP {headers.status} · {headers.isHttps ? "HTTPS" : "Not HTTPS"}
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
          <h2 className="font-display text-lg font-semibold">Need the full picture?</h2>
          <p className="mt-2 text-sm text-ink-soft">
            The free site audit combines speed, structure, SEO signals, and a short report to your inbox.
          </p>
          <Link
            to="/#audit-tool"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-ink-line px-6 font-display text-sm font-semibold text-paper transition-colors hover:border-amber"
          >
            Run full free audit →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}