import type { ReactNode } from "react";

interface ReceiptFrameProps {
  label: string; // e.g. a URL, a filename, or a short caption printed at the top like a receipt header
  children: ReactNode;
  className?: string;
}

export function ReceiptFrame({ label, children, className = "" }: ReceiptFrameProps) {
  return (
    <div
      className={`relative mx-auto max-w-3xl ${className}`}
      style={{
        // fallbacks only used if the CSS vars aren't defined globally
        // @ts-expect-error -- CSS custom properties are valid inline style keys
        "--frame-cream": "var(--color-cream, #F7F3EC)",
        "--frame-espresso": "var(--color-espresso, #2B1D14)",
        "--frame-steam": "var(--color-steam, #EDE7DD)",
      }}
    >
      {/* Perforated top edge */}
      <div
        aria-hidden="true"
        className="flex justify-between overflow-hidden"
        style={{ height: "10px" }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="block rounded-full"
            style={{
              width: "8px",
              height: "8px",
              marginTop: "-4px",
              background: "var(--frame-steam)",
            }}
          />
        ))}
      </div>

      <div
        className="border border-[color:var(--frame-espresso)]/10 shadow-sm"
        style={{ background: "var(--frame-cream)" }}
      >
        <div className="flex items-center gap-2 border-b border-dashed border-[color:var(--frame-espresso)]/20 px-5 py-3">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.14em]"
            style={{ color: "var(--frame-espresso)", opacity: 0.55 }}
          >
            {label}
          </span>
        </div>
        <div className="overflow-hidden">{children}</div>
      </div>

      {/* Perforated bottom edge */}
      <div
        aria-hidden="true"
        className="flex justify-between overflow-hidden"
        style={{ height: "10px" }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="block rounded-full"
            style={{
              width: "8px",
              height: "8px",
              marginBottom: "-4px",
              background: "var(--frame-steam)",
            }}
          />
        ))}
      </div>
    </div>
  );
}