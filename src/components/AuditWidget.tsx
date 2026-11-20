import { useState } from "react";
import type { FormEvent } from "react";
import ScoreGauge from "./ScoreGauge";
import PackageSuggestion from "./PackageSuggestion";
import { scoreAudit } from "../lib/auditScoring";
import type { AuditResult } from "../lib/auditScoring";
import type { AuditSignals } from "../types/audit";
import {
  getAttribution,
  getSessionIdForLead,
  trackAction,
} from "../lib/track";
import AuditFeedback from "./AuditFeedback";

interface AuditWidgetProps {
  onRequestFullTeardown: (context: {
    siteUrl: string;
    score: number;
    findings: string[];
  }) => void;
}

type Status = "idle" | "loading" | "done" | "error";
type LeadStatus = "idle" | "sending" | "captured" | "error";

export default function AuditWidget({
  onRequestFullTeardown,
}: AuditWidgetProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [signals, setSignals] = useState<AuditSignals | null>(null);
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<LeadStatus>("idle");
  const [reportId, setReportId] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");
  // I increment this after each completed scan so the feedback form resets for the new result.
  const [runId, setRunId] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!url.trim()) {
      setError("Inserisci l'indirizzo del sito da analizzare.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setLeadStatus("idle");
    setError(null);
    setResult(null);
    setSignals(null);
    setReportId(null);
    setCopyStatus("idle");

    trackAction("audit_run", {
      intent: "audit",
      metadata: { url: url.trim() },
    });

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        setError(
          "Il servizio di analisi non ha restituito dati. Se stai usando npm run dev, le route /api richiedono vercel dev."
        );
        setStatus("error");
        return;
      }

      const data: {
        ok?: boolean;
        signals?: AuditSignals;
        error?: string;
      } = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok || !data.signals) {
        setError(data.error ?? "Si è verificato un errore durante l'analisi del sito.");
        setStatus("error");
        return;
      }

      const auditResult = scoreAudit(data.signals);

      setSignals(data.signals);
      setResult(auditResult);
      setRunId((current) => current + 1);
      setEmail("");
      setStatus("done");

      trackAction("audit_completed", {
        intent: "audit",
        metadata: {
          url: data.signals.finalUrl,
          overallScore: auditResult.overall,
        },
      });

      // I save the result in the background so the visitor can share a report without waiting for the save request.
      fetch("/api/audit-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          finalUrl: data.signals.finalUrl,
          overall: auditResult.overall,
          categories: auditResult.categories,
          signals: data.signals,
          sessionId: getSessionIdForLead(),
        }),
      })
        .then((saveResponse) =>
          saveResponse.ok ? saveResponse.json() : null
        )
        .then((saved: { ok?: boolean; id?: string } | null) => {
          if (saved?.ok && saved.id) {
            setReportId(saved.id);
          }
        })
        .catch(() => {
          // I keep the completed audit usable even when saving a shareable report fails.
        });
    } catch {
      setError(
        "Impossibile raggiungere il servizio di analisi. Controlla la connessione e riprova."
      );
      setStatus("error");
    }
  };

  const allFindings = result
    ? result.categories.flatMap((category) => category.findings)
    : [];

  const previewFindings = allFindings.slice(0, 3);
  const reportFindings = allFindings.slice(0, 20);

  const handleUnlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!signals || !result || !email.trim()) return;

    setLeadStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/audit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          siteUrl: signals.finalUrl,
          auditScore: result.overall,
          auditFindings: reportFindings,
          sessionId: getSessionIdForLead(),
          attribution: getAttribution(),
        }),
      });

      const contentType = response.headers.get("content-type") ?? "";

      if (!contentType.includes("application/json")) {
        setError(
          "Il servizio del report non ha restituito dati. Se stai usando npm run dev, le route /api richiedono vercel dev."
        );
        setLeadStatus("error");
        return;
      }

      const data: { ok?: boolean; error?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Non è stato possibile inviare il report. Riprova.");
        setLeadStatus("error");
        return;
      }

      setLeadStatus("captured");

      trackAction("audit_lead_captured", {
        intent: "audit",
        metadata: {
          url: signals.finalUrl,
          overallScore: result.overall,
        },
      });
    } catch {
      setError(
        "Impossibile raggiungere il servizio del report. Controlla la connessione e riprova."
      );
      setLeadStatus("error");
    }
  };

  const handleReviewRequest = () => {
    if (!signals || !result) return;

    trackAction("cta_click", {
      metadata: {
        label: "Parliamo dei risultati dell'analisi",
        location: "audit_result",
        overallScore: result.overall,
      },
    });

    trackAction("audit_teardown_requested", {
      metadata: {
        url: signals.finalUrl,
        overallScore: result.overall,
      },
    });

    onRequestFullTeardown({
      siteUrl: signals.finalUrl,
      score: result.overall,
      findings: [
        "Richiesta una revisione dei risultati dell'analisi da parte di una persona",
        ...reportFindings,
      ],
    });
  };

  const handlePackageSelect = (planLabel: string) => {
    if (!signals || !result) return;

    trackAction("cta_click", {
      metadata: {
        label: "Parliamo dei risultati dell'analisi",
        location: "audit_result",
        plan: planLabel,
        overallScore: result.overall,
      },
    });

    onRequestFullTeardown({
      siteUrl: signals.finalUrl,
      score: result.overall,
      findings: [
        `Interessato a discutere: ${planLabel}`,
        ...reportFindings,
      ],
    });
  };

  return (
    <div>
      <p className="font-display text-xl font-semibold leading-snug text-paper">
        Che punteggio ottiene il tuo sito?
      </p>

      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        Verifichiamo alcuni indicatori relativi a velocità, esperienza da smartphone, metadati della pagina e leggibilità per i sistemi AI. L'analisi richiede pochi secondi e non serve creare un account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-2.5 sm:flex-row"
        noValidate
      >
        <label htmlFor="audit-url" className="sr-only">
          Indirizzo del tuo sito web
        </label>

        <input
          id="audit-url"
          type="text"
          inputMode="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="tuazienda.it"
          autoComplete="url"
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-ink-line bg-transparent px-4 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          style={{
            background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
          }}
        >
          {status === "loading" ? "Analisi in corso…" : "Analizza il mio sito"}
        </button>
      </form>

      <div aria-live="polite">
        {error && status === "error" && (
          <p className="mt-3 font-mono text-[12px] text-coral">{error}</p>
        )}

        {status === "loading" && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            Caricamento della pagina, verifica della struttura e misurazione dei tempi di risposta…
          </p>
        )}
      </div>

      {result && signals && (
        <div className="mt-6 border-t border-ink-line pt-6">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              Punteggio complessivo
            </p>

            <p className="font-display text-5xl font-semibold text-paper">
              {result.overall}
            </p>

            <p className="mt-1 break-all text-xs text-ink-soft">
              Risultati per <span className="text-paper">{signals.finalUrl}</span>
            </p>

            {reportId && (
              <button
                type="button"
                onClick={() => {
                  const link = `${window.location.origin}/audit/${reportId}`;

                  navigator.clipboard
                    .writeText(link)
                    .then(() => {
                      setCopyStatus("copied");
                      window.setTimeout(() => setCopyStatus("idle"), 2000);
                    })
                    .catch(() => {
                      // I leave the report available at its URL when clipboard access is blocked.
                    });

                  trackAction("audit_report_link_copied", {
                    metadata: { url: signals.finalUrl },
                  });
                }}
                className="mt-3 font-mono text-[11px] uppercase tracking-wide text-ink-soft underline underline-offset-4 hover:text-amber"
              >
                {copyStatus === "copied"
                  ? "Collegamento copiato"
                  : "Copia il collegamento al report"}
              </button>
            )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            {result.categories.map((category) => (
              <ScoreGauge
                key={category.key}
                label={category.label}
                score={category.score}
                size={72}
              />
            ))}
          </div>

          {previewFindings.length > 0 && leadStatus !== "captured" && (
            <div className="mt-6 border-t border-ink-line pt-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Risultati rilevati
              </p>

              <ul className="mt-3 space-y-2">
                {previewFindings.map((finding, index) => (
                  <li
                    key={`${index}-${finding}`}
                    className="flex gap-2.5 text-sm text-ink-soft"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral"
                      aria-hidden="true"
                    />
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {leadStatus === "captured" ? (
            <>
              <div className="mt-6 border-t border-ink-line pt-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Tutti i risultati
                </p>

                <ul className="mt-3 space-y-2">
                  {reportFindings.map((finding, index) => (
                    <li
                      key={`${index}-${finding}`}
                      className="flex gap-2.5 text-sm text-ink-soft"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral"
                        aria-hidden="true"
                      />
                      {finding}
                    </li>
                  ))}

                  {reportFindings.length === 0 && (
                    <li className="text-sm text-ink-soft">
                      I controlli automatici eseguiti non hanno rilevato criticità.
                    </li>
                  )}
                </ul>

                <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                  Questi risultati descrivono ciò che è stato rilevato dai controlli automatici. Non determinano l'impatto complessivo sull'attività né stabiliscono da soli quali modifiche siano necessarie per il tuo sito.
                </p>
              </div>

              <PackageSuggestion
                score={result.overall}
                onSelect={handlePackageSelect}
              />

              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-ink-soft">
                  Posso esaminare questi risultati insieme a te e aiutarti a individuare gli aspetti da approfondire per primi.
                </p>

                <button
                  type="button"
                  onClick={handleReviewRequest}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                  style={{
                    background:
                      "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
                  }}
                >
                  Richiedi una revisione gratuita di 15 minuti
                  <span className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>

                <p className="text-xs text-ink-soft">
                  Senza impegno. Ti risponderò entro un giorno lavorativo.
                </p>
              </div>
            </>
          ) : (
            <>
              <PackageSuggestion
                score={result.overall}
                onSelect={handlePackageSelect}
              />

              <form
                onSubmit={handleUnlock}
                className="mt-6 border-t border-ink-line pt-5"
              >
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  Inviami tutti i risultati via email
                </p>

                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Ti invierò i risultati rilevati e ti spiegherò cosa può e non può indicare l'analisi automatizzata. Non riceverai newsletter né sequenze di email.
                </p>

                <div className="mt-4 flex flex-col gap-2.5">
                  <label htmlFor="audit-email" className="sr-only">
                    Il tuo indirizzo email
                  </label>

                  <input
                    id="audit-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="tu@azienda.it"
                    autoComplete="email"
                    className="min-h-12 rounded-lg border border-ink-line bg-transparent px-4 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                  />

                  <button
                    type="submit"
                    disabled={leadStatus === "sending"}
                    className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display text-sm font-semibold text-ink disabled:opacity-60"
                    style={{
                      background:
                        "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
                    }}
                  >
                    {leadStatus === "sending"
                      ? "Invio del report in corso…"
                      : "Inviami tutti i risultati via email"}
                  </button>
                </div>

                {leadStatus === "error" && error && (
                  <p className="mt-3 font-mono text-[12px] text-coral">
                    {error}
                  </p>
                )}
              </form>
            </>
          )}

          <AuditFeedback
            key={runId}
            auditScore={result.overall}
            siteUrl={signals.finalUrl}
          />
        </div>
      )}
    </div>
  );
}