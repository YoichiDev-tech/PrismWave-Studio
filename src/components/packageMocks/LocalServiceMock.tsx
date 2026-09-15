import BrowserChrome from "../Badge";

export default function LocalServiceMock() {
  return (
    <BrowserChrome bg="#10182b">
      <div className="flex h-full flex-col p-5 text-paper">
        <p className="font-mono text-[9px] uppercase tracking-widest text-paper/50">
          The Fade Room — Barber
        </p>
        <h4 className="mt-2 font-display text-xl font-semibold">Book your chair.</h4>
        <div className="mt-3 flex-1 space-y-2">
          {[
            ["Classic cut", "€25"],
            ["Beard trim", "€15"],
            ["Cut + beard", "€35"],
          ].map(([label, price]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-[10px]"
            >
              <span className="text-paper/80">{label}</span>
              <span className="font-mono text-amber">{price}</span>
            </div>
          ))}
        </div>
        <span
          className="mt-3 inline-block rounded-full px-3 py-1.5 text-center font-display text-[10px] font-semibold text-ink"
          style={{ background: "#FFB84D" }}
        >
          Book Now
        </span>
      </div>
    </BrowserChrome>
  );
}