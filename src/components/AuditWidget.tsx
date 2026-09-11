import { useState } from "react";
import type { FormEvent } from "react";
import Reveal from "./Reveal";
import ScoreGauge from "./ScoreGauge";
import { scoreAudit } from "../lib/auditScoring";
import type { AuditResult } from "../lib/auditScoring";
import type { AuditSignals } from "../types/audit";
import { getAttribution, getSessionIdForLead, trackAction } from "../lib/track";
interface AuditWidgetProps {
  // Lets a "See my results" CTA hand off straight into the Contact form,
  // matching the intent-routing pattern already used across the page
  onRequestFullTeardown: (context: { siteUrl: string; score: number; findings: string[] }) => void;
}

type Status = "idle" | "loading" | "done" | "error";

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
      return;
    }

    setStatus("loading");
    setError(null);
    setResult(null);
    trackAction("audit_run", { intent: "audit", metadata: { url: url.trim() } });

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

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
      setLeadStatus("idle");
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

  return (
    <section id="audit-tool" className="grain relative overflow-hidden bg-ink py-24 md:py-32 cursor-default">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/2 top-0 h-[420px] w-[640px] translate-x-1/2 rounded-full opacity-20 blur-[130px] will-change-transform transform-gpu"
        style={{ background: "radial-gradient(circle, #FF7A59 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Free scan, no account required</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Is your site ready for AI search — and actual visitors?
          </h2>
          <p className="mt-5 text-ink-soft">
            Drop your URL below for an instant score across page speed, UI/UX modernism, mobile responsiveness,
            and AI readability. See the preview immediately, then email yourself the prioritized findings and next steps.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="yourbusiness.com"
              autoComplete="url"
              className="flex-1 rounded-lg border border-ink-line bg-transparent px-4 py-3.5 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              {status === "loading" ? "Analyzing…" : "Analyze my site"}
            </button>
          </form>
          {error && <p className="mt-3 font-mono text-[12px] text-coral">{error}</p>}
        </Reveal>

        {status === "loading" && (
          <div className="mt-14 flex justify-center">
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
              Fetching page, checking structure, measuring response time…
            </p>
          </div>
        )}

        {result && signals && (
          <Reveal className="mt-14">
            <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-8 md:p-10">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Overall score</p>
                <p className="font-display text-6xl font-semibold text-paper">{result.overall}</p>
                <p className="max-w-sm text-sm text-ink-soft">
                  Results for <span className="text-paper">{signals.finalUrl}</span>
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {result.categories.map((category) => (
                  <ScoreGauge key={category.key} label={category.label} score={category.score} />
                ))}
              </div>

              {leadStatus === "captured" ? (
                <>
                  <div className="mt-10 border-t border-ink-line pt-8">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Your prioritized findings</p>
                    <ul className="mt-4 space-y-2.5">
                      {result.categories.flatMap((category) => category.findings).slice(0, 5).map((finding, i) => (
                        <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                          <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral" aria-hidden="true" />
                          {finding}
                        </li>
                      ))}
                      {result.categories.every((category) => category.findings.length === 0) && (
                        <li className="text-sm text-ink-soft">No major issues detected in this pass — nice work.</li>
                      )}
                    </ul>
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-3 text-center">
                    <p className="text-sm text-ink-soft">Your report is on its way. Want a human read on what to fix first?</p>
                    <button
                      type="button"
                      onClick={() => {
                        trackAction("audit_teardown_requested", {
                          metadata: { url: signals.finalUrl, overallScore: result.overall },
                        });
                        onRequestFullTeardown({
                          siteUrl: signals.finalUrl,
                          score: result.overall,
                          findings: result.categories.flatMap((category) => category.findings).slice(0, 5),
                        });
                      }}
                      className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
                      style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
                    >
                      Request the full teardown
                      <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleUnlock} className="mt-10 border-t border-ink-line pt-8">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Unlock your full report</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                    Your score is ready. Enter your email to receive the prioritized findings and next-step summary for {signals.finalUrl}. No newsletter, no sales sequence.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@business.com"
                      autoComplete="email"
                      className="flex-1 rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                    />
                    <button
                      type="submit"
                      disabled={leadStatus === "sending"}
                      className="inline-flex items-center justify-center rounded-full px-6 py-3 font-display text-sm font-semibold text-ink disabled:opacity-60"
                      style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
                    >
                      {leadStatus === "sending" ? "Sending report…" : "Email me the report"}
                    </button>
                  </div>
                  {leadStatus === "error" && <p className="mt-3 font-mono text-[12px] text-coral">{error}</p>}
                </form>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}