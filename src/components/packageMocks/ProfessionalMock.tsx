import BrowserChrome from "../Badge";

export default function ProfessionalMock() {
  return (
    <BrowserChrome bg="#10182b">
      <div className="flex h-full flex-col p-5 text-paper">
        <div
          className="h-9 w-9 rounded-full"
          style={{ background: "linear-gradient(135deg, #6C63FF, #FF7A59)" }}
        />
        <h4 className="mt-3 font-display text-lg font-semibold">Elena Marchetti</h4>
        <p className="text-[10px] text-paper/60">Brand &amp; Marketing Consultant</p>
        <div className="mt-3 flex-1 space-y-1.5 text-[10px] text-paper/70">
          <p className="rounded-md border border-white/10 bg-white/5 px-2 py-1">10+ years, 40+ clients</p>
          <p className="rounded-md border border-white/10 bg-white/5 px-2 py-1">"Turned our launch around" — client</p>
        </div>
        <span
          className="mt-3 inline-block rounded-full px-3 py-1.5 text-center font-display text-[10px] font-semibold text-white"
          style={{ background: "#6C63FF" }}
        >
          Get in Touch
        </span>
      </div>
    </BrowserChrome>
  );
}