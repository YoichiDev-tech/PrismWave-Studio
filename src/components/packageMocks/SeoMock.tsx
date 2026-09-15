import BrowserChrome from "../Badge";

export default function SeoMock() {
  return (
    <BrowserChrome bg="#10182b">
      <div className="flex h-full flex-col p-5 text-paper">
        <p className="font-mono text-[9px] uppercase tracking-widest text-paper/50">Before &rarr; After</p>
        <h4 className="mt-2 font-display text-lg font-semibold">On-Page SEO Fix</h4>
        <div className="mt-4 flex flex-1 items-end gap-3">
          {[
            { before: 30, after: 88 },
            { before: 45, after: 92 },
            { before: 20, after: 80 },
          ].map((bar, i) => (
            <div key={i} className="flex flex-1 items-end gap-1">
              <div
                className="flex-1 rounded-sm bg-white/10"
                style={{ height: `${bar.before}%` }}
              />
              <div
                className="flex-1 rounded-sm"
                style={{ height: `${bar.after}%`, background: "#FFB84D" }}
              />
            </div>
          ))}
        </div>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-wide text-paper/40">
          Speed · Structure · Local search
        </p>
      </div>
    </BrowserChrome>
  );
}