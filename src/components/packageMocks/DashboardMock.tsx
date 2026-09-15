import BrowserChrome from "../Badge";

export default function DashboardMock() {
  return (
    <BrowserChrome bg="#0a0e1a">
      <div className="relative h-full p-5 text-paper">
        <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/30 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wide text-paper/60">
          Sample Data
        </span>
        <p className="font-mono text-[9px] uppercase tracking-widest text-paper/50">Overview</p>
        <h4 className="mt-2 font-display text-xl font-semibold">Weekly signups +18%</h4>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[55, 80, 40].map((h, idx) => (
            <div key={idx} className="flex h-16 items-end rounded-md bg-white/5 p-1.5">
              <div
                className="w-full rounded-sm"
                style={{ height: `${h}%`, background: "linear-gradient(180deg, #6C63FF, #FF7A59)" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-[9px] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#6C63FF" }} />
          Filters: Last 30 days
        </div>
      </div>
    </BrowserChrome>
  );
}