import BrowserChrome from "../Badge"; 

export default function BloomMock() {
  return (
    <BrowserChrome bg="#FFE8D6">
      <div className="relative h-full overflow-hidden p-5">
        <div
          aria-hidden="true"
          className="absolute -right-6 -top-10 h-28 w-28 rounded-[45%] rotate-12"
          style={{ background: "#FF6FA8" }}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-8 left-8 h-20 w-20 rounded-[45%] -rotate-6"
          style={{ background: "#FFD23F" }}
        />
        <div className="relative">
          <p className="font-display text-[9px] font-semibold uppercase tracking-widest" style={{ color: "#7A2E4D" }}>
            Bloom Market
          </p>
          <h4 className="mt-2 font-display text-3xl font-bold leading-[0.95]" style={{ color: "#3A1220" }}>
            Fiori freschi
            <br />
            ogni
            <br />
            settimana
          </h4>
        </div>
        <span
          className="absolute bottom-0 right-1 rounded-full px-3 py-1.5 font-display text-[10px] font-bold"
          style={{ background: "#3A1220", color: "#FFE8D6" }}
        >
          Acquista ora
        </span>
      </div>
    </BrowserChrome>
  );
}