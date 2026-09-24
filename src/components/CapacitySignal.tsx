const SLOTS_TOTAL = 3;
const SLOTS_TAKEN = 0; // manual for now

export default function CapacitySignal() {
  const isFree = SLOTS_TAKEN === 0;

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-ink-line px-4 py-2 shadow-sm"
      style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
    >
      <span className="relative flex h-2 w-2 select-none">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-60" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-violet" />
      </span>

      <span
        className="font-mono text-xs md:text-[11px] text-ink whitespace-nowrap transition-transform hover:translate-x-[2px]"
        aria-live="polite"
      >
        {isFree
          ? "Open for new website projects this month"
          : `Currently taking on ${SLOTS_TAKEN} client build${SLOTS_TAKEN === 1 ? "" : "s"}`}
      </span>
    </div>
  );
}
