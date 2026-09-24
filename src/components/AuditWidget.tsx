import { useState } from "react";
import type { FormEvent } from "react";
import ScoreGauge from "./ScoreGauge";
import { scoreAudit } from "../lib/auditScoring";
import type { AuditResult } from "../lib/auditScoring";
import type { AuditSignals } from "../types/audit";
import { getAttribution, getSessionIdForLead, trackAction } from "../lib/track";

interface AuditWidgetProps {
  onRequestFullTeardown: (context: { siteUrl: string; score: number; findings: string[] }) => void;
}

type Status = "idle" | "loading" | "done" | "error";

// Card body only — the surrounding section/card lives in StartCard (Hero).
// Changes for first-sale conversion:
// - Show 2–3 findings immediately after score (value first, no gate)
// - Gate the full prioritized list + clearer next step behind email
// - Stronger, lower-risk CTA after lead capture
// Tracking events and endpoints are unchanged
export default function AuditWidget({ onRequestFullTeardown }: AuditWidgetProps) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [signals, setSignals] = useState<AuditSignals | null>(null);
  const [email, setEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "sending" | "captured" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Enter a site URL to analyze.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setLeadStatus("idle");
    setError(null);
    setResult(null);
    trackAction("audit_run", { intent: "audit", metadata: { url: url.trim() } });

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        setError(
          "The audit service didn't respond with data — if you're running `npm run dev`, the /api routes only work under `vercel dev`."
        );
        setStatus("error");
        return;
      }

      const data: { ok?: boolean; signals?: AuditSignals; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok || !data.signals) {
        setError(data.error ?? "Something went wrong analyzing that site.");
        setStatus("error");
        return;
      }

      setSignals(data.signals);
      const auditResult = scoreAudit(data.signals);
      setResult(auditResult);
      setEmail("");
      setStatus("done");
      trackAction("audit_completed", {
        intent: "audit",
        metadata: { url: data.signals.finalUrl, overallScore: auditResult.overall },
      });
    } catch {
      setError("Couldn't reach the audit service. Check your connection and try again.");
      setStatus("error");
    }
  };

  const handleUnlock = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signals || !result || !email.trim()) return;

    setLeadStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/audit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          siteUrl: signals.finalUrl,
          auditScore: result.overall,
          auditFindings: result.categories.flatMap((category) => category.findings).slice(0, 5),
          sessionId: getSessionIdForLead(),
          attribution: getAttribution(),
        }),
      });

      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        setError(
          "The report service didn't respond with data — if you're running `npm run dev`, the /api routes only work under `vercel dev`."
        );
        setLeadStatus("error");
        return;
      }

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error ?? "We couldn't send the report. Please try again.");
        setLeadStatus("error");
        return;
      }

      setLeadStatus("captured");
      trackAction("audit_lead_captured", {
        intent: "audit",
        metadata: { url: signals.finalUrl, overallScore: result.overall },
      });
    } catch {
      setError("Couldn't reach the report service. Check your connection and try again.");
      setLeadStatus("error");
    }
  };

  const allFindings = result ? result.categories.flatMap((category) => category.findings) : [];
  const previewFindings = allFindings.slice(0, 3);
  const topFindings = allFindings.slice(0, 5);

  return (
    <div>
      <p className="font-display text-xl font-semibold leading-snug text-paper">How does your site score?</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        Speed, mobile, design and AI-readability — scored in seconds. No account needed.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5 sm:flex-row" noValidate>
        <label htmlFor="audit-url" className="sr-only">
          Your website address
        </label>
        <input
          id="audit-url"
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="yourbusiness.com"
          autoComplete="url"
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-ink-line bg-transparent px-4 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          {status === "loading" ? "Analyzing…" : "Analyze my site"}
        </button>
      </form>

      <div aria-live="polite">
        {error && status === "error" && <p className="mt-3 font-mono text-[12px] text-coral">{error}</p>}
        {status === "loading" && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            Fetching page, checking structure, measuring response time…
          </p>
        )}
      </div>

      {result && signals && (
        <div className="mt-6 border-t border-ink-line pt-6">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Overall score</p>
            <p className="font-display text-5xl font-semibold text-paper">{result.overall}</p>
            <p className="mt-1 break-all text-xs text-ink-soft">
              Results for <span className="text-paper">{signals.finalUrl}</span>
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            {result.categories.map((category) => (
              <ScoreGauge key={category.key} label={category.label} score={category.score} size={72} />
            ))}
          </div>

          {/* Immediate value: show 2–3 findings without email gate */}
          {previewFindings.length > 0 && leadStatus !== "captured" && (
            <div className="mt-6 border-t border-ink-line pt-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Quick findings
              </p>
              <ul className="mt-3 space-y-2">
                {previewFindings.map((finding, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral" aria-hidden="true" />
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
                  Your prioritized findings
                </p>
                <ul className="mt-3 space-y-2">
                  {topFindings.map((finding, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral" aria-hidden="true" />
                      {finding}
                    </li>
                  ))}
                  {topFindings.length === 0 && (
                    <li className="text-sm text-ink-soft">No major issues detected in this pass — nice work.</li>
                  )}
                </ul>
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-ink-soft">
                  Report sent. Want a human read on what to fix first — and a fixed-scope plan if it makes sense?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    trackAction("audit_teardown_requested", {
                      metadata: { url: signals.finalUrl, overallScore: result.overall },
                    });
                    onRequestFullTeardown({
                      siteUrl: signals.finalUrl,
                      score: result.overall,
                      findings: topFindings,
                    });
                  }}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                  style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
                >
                  Get a free 15-min review
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </button>
                <p className="text-xs text-ink-soft">No obligation. We reply within one business day.</p>
              </div>
            </>
          ) : (
            <form onSubmit={handleUnlock} className="mt-6 border-t border-ink-line pt-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Get the full prioritized report
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Enter your email for the complete findings and clear next steps. One email — no newsletter, no sequence.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <label htmlFor="audit-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="audit-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@business.com"
                  autoComplete="email"
                  className="min-h-12 rounded-lg border border-ink-line bg-transparent px-4 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                />
                <button
                  type="submit"
                  disabled={leadStatus === "sending"}
                  className="inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display text-sm font-semibold text-ink disabled:opacity-60"
                  style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
                >
                  {leadStatus === "sending" ? "Sending report…" : "Email me the full report"}
                </button>
              </div>
              {leadStatus === "error" && error && (
                <p className="mt-3 font-mono text-[12px] text-coral">{error}</p>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}