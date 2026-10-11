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
      setError("Enter a site URL to analyze.");
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
          "The audit service didn't respond with data. If you're running npm run dev, the /api routes require vercel dev."
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
        setError(data.error ?? "Something went wrong analyzing that site.");
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
        "Couldn't reach the audit service. Check your connection and try again."
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
          "The report service didn't respond with data. If you're running npm run dev, the /api routes require vercel dev."
        );
        setLeadStatus("error");
        return;
      }

      const data: { ok?: boolean; error?: string } =
        await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        setError(data.error ?? "We couldn't send the report. Please try again.");
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
        "Couldn't reach the report service. Check your connection and try again."
      );
      setLeadStatus("error");
    }
  };

  const handleReviewRequest = () => {
    if (!signals || !result) return;

    trackAction("cta_click", {
      metadata: {
        label: "Discuss audit findings",
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
        "Requested a human review of the audit findings",
        ...reportFindings,
      ],
    });
  };

  const handlePackageSelect = (planLabel: string) => {
    if (!signals || !result) return;

    trackAction("cta_click", {
      metadata: {
        label: "Discuss audit findings",
        location: "audit_result",
        plan: planLabel,
        overallScore: result.overall,
      },
    });

    onRequestFullTeardown({
      siteUrl: signals.finalUrl,
      score: result.overall,
      findings: [
        `Interested in discussing: ${planLabel}`,
        ...reportFindings,
      ],
    });
  };

  return (
    <div>
      <p className="font-display text-xl font-semibold leading-snug text-paper">
        How does your site score?
      </p>

      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
        We check selected signals related to speed, mobile readiness, page
        metadata, and AI readability. The scan takes seconds and needs no
        account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-2.5 sm:flex-row"
        noValidate
      >
        <label htmlFor="audit-url" className="sr-only">
          Your website address
        </label>

        <input
          id="audit-url"
          type="text"
          inputMode="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="yourbusiness.com"
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
          {status === "loading" ? "Analyzing…" : "Analyze my site"}
        </button>
      </form>

      <div aria-live="polite">
        {error && status === "error" && (
          <p className="mt-3 font-mono text-[12px] text-coral">{error}</p>
        )}

        {status === "loading" && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            Fetching page, checking structure, measuring response time…
          </p>
        )}
      </div>

      {result && signals && (
        <div className="mt-6 border-t border-ink-line pt-6">
          <div className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              Overall score
            </p>

            <p className="font-display text-5xl font-semibold text-paper">
              {result.overall}
            </p>

            <p className="mt-1 break-all text-xs text-ink-soft">
              Results for <span className="text-paper">{signals.finalUrl}</span>
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
                  ? "Link copied"
                  : "Copy shareable report link"}
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
                Findings detected
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
                  Full findings
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
                      This scan did not flag any findings in the checks it ran.
                    </li>
                  )}
                </ul>

                <p className="mt-4 text-xs leading-relaxed text-ink-soft">
                  These findings describe what the automated checks detected.
                  They do not establish the full business impact or determine
                  which changes your website needs.
                </p>
              </div>

              <PackageSuggestion
                score={result.overall}
                onSelect={handlePackageSelect}
              />

              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-ink-soft">
                  I can review these findings with you and help identify what
                  is worth investigating first.
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
                  Get a free 15-min review
                  <span className="transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </button>

                <p className="text-xs text-ink-soft">
                  No obligation. I aim to reply within one business day.
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
                  Email me the full findings
                </p>

                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  I will send the detected findings and explain what the
                  automated scan can and cannot tell you. No newsletter or
                  email sequence.
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
                    style={{
                      background:
                        "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
                    }}
                  >
                    {leadStatus === "sending"
                      ? "Sending report…"
                      : "Email me the full findings"}
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