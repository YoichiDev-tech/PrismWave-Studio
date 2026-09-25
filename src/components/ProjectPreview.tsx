import type { ReactElement } from "react";
import BrowserChrome from "./Badge";
import BloomMock from "./portfolioMocks/BloomMock";


function FieldingMock() {
  return (
    <BrowserChrome bg="#F1EBDF">
      <div className="flex h-full flex-col p-5" style={{ color: "#2B2416" }}>
        <p className="text-[9px] uppercase tracking-[0.25em]" style={{ fontFamily: "Georgia, serif" }}>
          Est. 2019 — Fielding &amp; Rye
        </p>
        <h4 className="mt-2 text-2xl leading-none" style={{ fontFamily: "Georgia, serif" }}>
          The Weekly
          <br />
          Loaf.
        </h4>
        <div className="mt-3 h-px w-full" style={{ background: "#C7401F", opacity: 0.4 }} />
        <div
          className="mt-3 grid flex-1 grid-cols-3 gap-3 text-[9px] leading-snug"
          style={{ fontFamily: "Georgia, serif" }}
        >
          <p className="col-span-2 border-r pr-3" style={{ borderColor: "rgba(43,36,22,0.15)" }}>
            Sourdough baked fresh each morning, delivered to five neighborhoods by nine. Order ahead
            for weekend pickup.
          </p>
          <div className="flex flex-col justify-between">
            <span
              className="inline-block rounded-full px-2 py-1 text-center"
              style={{ background: "#C7401F", color: "#F1EBDF" }}
            >
              Order
            </span>
            <span className="text-[8px] opacity-60">No. 04 / Bakery</span>
          </div>
        </div>
      </div>
    </BrowserChrome>
  );
}

function NovaMock() {
  return (
    <BrowserChrome bg="#0B1220">
      <div className="relative h-full p-5 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
          style={{ background: "#37E6C4" }}
        />
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/50">
          Nova Cloud — dashboard
        </p>
        <h4 className="mt-2 font-mono text-xl font-semibold">Uptime 99.98%</h4>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[70, 45, 90].map((h, idx) => (
            <div key={idx} className="flex h-16 items-end rounded-md bg-white/5 p-1.5">
              <div
                className="w-full rounded-sm"
                style={{ height: `${h}%`, background: "linear-gradient(180deg, #37E6C4, #2AA9FF)" }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-[9px] text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#37E6C4]" />
          All systems operational
        </div>
      </div>
    </BrowserChrome>
  );
}

const PREVIEWS: Record<string, () => ReactElement> = {
  "fielding-and-rye": FieldingMock,
  "nova-cloud": NovaMock,
  "bloom-market": BloomMock,
};

interface ProjectPreviewProps {
  slug: string;
  screenshot?: string;
  className?: string;
}

export default function ProjectPreview({ slug, screenshot, className = "" }: ProjectPreviewProps) {
  const Mock = PREVIEWS[slug];

  if (Mock) {
    return (
      <div className={`overflow-hidden rounded-xl ${className}`}>
        <Mock />
      </div>
    );
  }

  if (screenshot) {
    return (
      <div className={`overflow-hidden rounded-xl border border-ink-line bg-ink ${className}`}>
        <img src={screenshot} alt="" className="aspect-[16/10] h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`flex aspect-[16/10] items-center justify-center rounded-xl border border-ink-line bg-ink-2 font-mono text-[11px] text-ink-soft ${className}`}
    >
      No preview
    </div>
  );
}