import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookCall from "../components/BookCall";
import Footer from "../components/Footer";
import ScoreGauge from "../components/ScoreGauge";
import SEO from "../components/SEO";
import type { AuditReportData } from "../types/auditReport";
import { trackAction } from "../lib/track";

type Status = "loading" | "ready" | "not-found" | "error";

export default function AuditReport() {
  const { id } = useParams<{ id: string }>();

  // I initialize the status here to avoid an unnecessary loading-state update during the effect.
  const [status, setStatus] = useState<Status>("loading");
  const [report, setReport] = useState<AuditReportData | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let cancelled = false;

    fetch(`/api/audit-report?id=${encodeURIComponent(id)}`)
      .then(async (response) => {
        if (cancelled) return;

        if (response.status === 404) {
          setStatus("not-found");
          return;
        }

        if (!response.ok) {
          setStatus("error");
          return;
        }

        const data: {
          ok?: boolean;
          report?: AuditReportData;
        } = await response.json().catch(() => ({}));

        if (cancelled) return;

        if (!data.ok || !data.report) {
          setStatus("error");
          return;
        }

        setReport(data.report);
        setStatus("ready");

        trackAction("audit_report_viewed", {
          metadata: {
            url: data.report.finalUrl,
            overallScore: data.report.overall,
          },
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const allFindings = report
    ? report.categories.flatMap((category) => category.findings)
    : [];

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title={
          report
            ? `Site audit — ${report.finalUrl} scored ${report.overall}/100`
            : "Site audit report"
        }
        description={
          report
            ? `Automated audit of ${report.finalUrl}: ${report.overall}/100 on speed, mobile, design and AI-readability.`
            : "A shared PrismWave Studio site audit report."
        }
        path={id ? `/audit/${id}` : "/audit"}
        noIndex
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← PrismWave Studio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16 md:py-20">
        {status === "loading" && (
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Loading report…
          </p>
        )}

        {(!id || status === "not-found") && (
          <div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
              Not found
            </p>

            <h1 className="mt-3 font-display text-2xl font-semibold text-paper">
              This report doesn't exist, or the link is incorrect.
            </h1>

            <p className="mt-4 text-sm text-ink-soft">
              Reports are created by running a website through the free audit
              tool.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display text-sm font-semibold text-ink"
              style={{
                background:
                  "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)",
              }}
            >
              Run your own free audit
            </Link>
          </div>
        )}

        {status === "error" && (
          <p className="font-mono text-[12px] uppercase tracking-widest text-coral">
            Couldn't load that report right now. Please try again shortly.
          </p>
        )}

        {status === "ready" && report && (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              Site audit
            </p>

            <h1 className="mt-3 break-all font-display text-2xl font-semibold text-paper md:text-3xl">
              {report.finalUrl}
            </h1>

            <div className="mt-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                Overall score
              </p>

              <p className="font-display text-6xl font-semibold text-paper">
                {report.overall}
              </p>

              <p className="mt-1 text-xs text-ink-soft">out of 100</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">
              {report.categories.map((category) => (
                <ScoreGauge
                  key={category.key}
                  label={category.label}
                  score={category.score}
                  size={80}
                />
              ))}
            </div>

            <div className="mt-10 border-t border-ink-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                What the scan detected
              </p>

              {allFindings.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {allFindings.map((finding, index) => (
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
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  This scan did not flag any findings in the checks it ran.
                  That does not guarantee that the website has no issues.
                </p>
              )}
            </div>

            <div className="mt-8 border-t border-ink-line pt-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                What this report cannot tell you
              </p>

              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                I generated this report from automated checks. It is not a full
                manual review and cannot establish the exact effect of these
                findings on conversions, revenue, search visibility, or AI
                recommendations. Some checks use limited signals, so findings
                should be reviewed in context before making changes.
              </p>
            </div>

            <div className="mt-10 border-t border-ink-line pt-8">
              <p className="font-display text-lg font-semibold text-paper">
                Want help deciding what matters first?
              </p>

              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                I can review the findings with you and discuss suitable next
                steps. If paid work makes sense, I will explain the proposed
                scope, price, and timeline before anything begins.
              </p>

              <div className="mt-5">
                <BookCall />
              </div>
            </div>

            <p className="mt-8 text-xs text-ink-soft">
              Run on {new Date(report.createdAt).toLocaleDateString()}. This is
              an automated check, not a complete manual review.
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}