import { AiIntent } from "../AiMetadata";

const INK = "#0A0E1A";
const PAPER = "#F3F4F1";
const LINE = "rgba(243,244,241,0.1)";
const DISPLAY = "'Sora', ui-sans-serif, sans-serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
const GRADIENT = "linear-gradient(135deg, #6C63FF 0%, #FF7A59 100%)";

const KPIS = [
  { label: "Weekly signups", value: "1,284", delta: "+18%" },
  { label: "Active users", value: "9,402", delta: "+6%" },
  { label: "Avg. session", value: "4m 12s", delta: "+11%" },
  { label: "Churn", value: "2.1%", delta: "-0.4%" },
];

const BARS = [40, 65, 52, 80, 58, 90, 70];
const TABLE = [
  { source: "Organic search", visits: "4,102", conv: "3.8%" },
  { source: "Direct", visits: "2,210", conv: "5.1%" },
  { source: "Referral", visits: "980", conv: "2.4%" },
  { source: "Social", visits: "740", conv: "1.9%" },
];

export default function DashboardShowcase() {
  return (
    <div style={{ background: INK, color: PAPER, fontFamily: DISPLAY }} className="cursor-default">
      {/* Header / filter bar */}
      <header style={{ borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <div className="flex items-center gap-3">
            <p className="text-[15px] font-semibold">Overview</p>
            <span
              className="rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide"
              style={{ borderColor: "rgba(243,244,241,0.2)", color: "rgba(243,244,241,0.6)", fontFamily: MONO }}
            >
              Sample Data
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px]" style={{ borderColor: LINE, color: "rgba(243,244,241,0.55)", fontFamily: MONO }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#6C63FF" }} />
            Last 30 days
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <AiIntent id="dashboard-intent">Show a working analytics dashboard interface built on sample data.</AiIntent>

        {/* KPI row */}
        <section aria-label="Key metrics" className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-xl p-4" style={{ border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.02)" }}>
              <p className="text-[11px]" style={{ color: "rgba(243,244,241,0.5)" }}>{k.label}</p>
              <p className="mt-2 text-2xl font-semibold">{k.value}</p>
              <p className="mt-1 font-mono text-[11px]" style={{ color: k.delta.startsWith("-") ? "#FF7A59" : "#8FD19E", fontFamily: MONO }}>
                {k.delta}
              </p>
            </div>
          ))}
        </section>

        {/* Charts */}
        <section aria-label="Trends" className="mt-6 grid gap-4 md:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl p-5" style={{ border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.02)" }}>
            <p className="text-[13px] font-semibold">Signups over time</p>
            <div className="mt-6 flex h-32 items-end gap-2">
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: GRADIENT, opacity: 0.4 + (h / 200) }} />
              ))}
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.02)" }}>
            <p className="text-[13px] font-semibold">Traffic mix</p>
            <div className="mt-6 flex items-center justify-center">
              <div
                className="h-28 w-28 rounded-full"
                style={{
                  background: `conic-gradient(#6C63FF 0deg 150deg, #FF7A59 150deg 230deg, #FFB84D 230deg 300deg, rgba(255,255,255,0.08) 300deg 360deg)`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Table */}
        <section aria-label="Traffic sources" className="mt-6 rounded-xl p-5" style={{ border: `1px solid ${LINE}`, background: "rgba(255,255,255,0.02)" }}>
          <p className="text-[13px] font-semibold">Traffic sources</p>
          <table className="mt-4 w-full text-[13px]">
            <thead>
              <tr style={{ color: "rgba(243,244,241,0.45)" }}>
                <th className="pb-2 text-left font-normal">Source</th>
                <th className="pb-2 text-right font-normal">Visits</th>
                <th className="pb-2 text-right font-normal">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {TABLE.map((row) => (
                <tr key={row.source} style={{ borderTop: `1px solid ${LINE}` }}>
                  <td className="py-2.5">{row.source}</td>
                  <td className="py-2.5 text-right" style={{ color: "rgba(243,244,241,0.7)" }}>{row.visits}</td>
                  <td className="py-2.5 text-right" style={{ color: "rgba(243,244,241,0.7)" }}>{row.conv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}