const ITEMS = [
  {
    label: "Free audit first",
    detail: "See the problems before you pay for anything",
  },
  {
    label: "15-min review",
    detail: "Written findings and a clear next step",
  },
  {
    label: "Fixed-scope price",
    detail: "Number locked before work starts",
  },
  {
    label: "You own the code",
    detail: "Full handover — no lock-in",
  },
];

/*
 Honest process trust signals — no mock testimonials
 */
export default function TrustStrip() {
  return (
    <div
      aria-label="How working with PrismWave works"
      className="border-y border-ink-line bg-ink-2/80"
    >
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink-line lg:py-7">
        {ITEMS.map((item) => (
          <div key={item.label} className="lg:px-6">
            <p className="font-display text-sm font-semibold text-paper">
              {item.label}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft sm:text-sm">
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}