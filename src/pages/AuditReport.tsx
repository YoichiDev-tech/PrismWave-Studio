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
  // Initial state covers the mount case; the lint rule here forbids
  // setState directly in the effect body, so on an id-to-id client nav
  // (rare — normally a fresh mount) the old report stays visible until
  // the new fetch resolves rather than flashing back to "loading"
  const [status, setStatus] = useState<Status>(id ? "loading" : "not-found");
  const [report, setReport] = useState<AuditReportData | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    fetch(`/api/audit-report?id=${encodeURIComponent(id)}`)
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 404) {
          setStatus("not-found");
          return;
        }
        if (!res.ok) {
          setStatus("error");
          return;
        }
        const data: { ok?: boolean; report?: AuditReportData } = await res.json().catch(() => ({}));
        if (!data.ok || !data.report) {
          setStatus("error");
          return;
        }
        setReport(data.report);
        setStatus("ready");
        trackAction("audit_report_viewed", { metadata: { url: data.report.finalUrl, overallScore: data.report.overall } });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const allFindings = report ? report.categories.flatMap((c) => c.findings) : [];

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title={report ? `Site audit — ${report.finalUrl} scored ${report.overall}/100` : "Site audit report"}
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
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Loading report…</p>
        )}

        {status === "not-found" && (
          <div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Not found</p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-paper">
              This report doesn't exist, or the link's wrong.
            </h1>
            <p className="mt-4 text-sm text-ink-soft">
              Reports are created by running a site through the free audit tool.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full px-6 font-display text-sm font-semibold text-ink"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              Run your own free audit
            </Link>
          </div>
        )}

        {status === "error" && (
          <p className="font-mono text-[12px] uppercase tracking-widest text-coral">
            Couldn't load that report right now — try again shortly.
          </p>
        )}

        {status === "ready" && report && (
          <>
            <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Site audit</p>
            <h1 className="mt-3 break-all font-display text-2xl font-semibold text-paper md:text-3xl">
              {report.finalUrl}
            </h1>

            <div className="mt-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Overall score</p>
              <p className="font-display text-6xl font-semibold text-paper">{report.overall}</p>
              <p className="mt-1 text-xs text-ink-soft">out of 100</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-5">
              {report.categories.map((category) => (
                <ScoreGauge key={category.key} label={category.label} score={category.score} size={80} />
              ))}
            </div>

            {allFindings.length > 0 && (
              <div className="mt-10 border-t border-ink-line pt-6">
                <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                  What's holding the score back
                </p>
                <ul className="mt-3 space-y-2">
                  {allFindings.map((finding, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-ink-soft">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-coral" aria-hidden="true" />
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-10 border-t border-ink-line pt-8">
              <p className="font-display text-lg font-semibold text-paper">Want this fixed?</p>
              <p className="mt-2 text-sm text-ink-soft">
                We'll walk through these findings and, if it makes sense, a fixed-scope plan — price and timeline
                up front.
              </p>
              <div className="mt-5">
                <BookCall />
              </div>
            </div>

            <p className="mt-8 text-xs text-ink-soft">
              Run on {new Date(report.createdAt).toLocaleDateString()}. Automated pass — not a full manual review.
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}