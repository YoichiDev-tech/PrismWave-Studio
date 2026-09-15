import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { packages } from "../data/packages";
import type { Accent } from "../data/packages";

const ACCENT_BORDER: Record<Accent, string> = {
  amber: "hover:border-amber",
  coral: "hover:border-coral",
  violet: "hover:border-violet",
  gradient: "hover:border-violet",
};

const ACCENT_PRICE: Record<Accent, CSSProperties> = {
  amber: { color: "#FFB84D" },
  coral: { color: "#FF7A59" },
  violet: { color: "#6C63FF" },
  gradient: {
    backgroundImage: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 50%, #6C63FF 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
};

export default function Packages() {
  return (
    <section id="packages" className="bg-ink py-24 text-paper md:py-32 cursor-default">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-xl">
          <p className="font-mono text-[12px] uppercase tracking-widest text-paper/50">Fixed-price packages</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Five packages. One fixed price each.
          </h2>
          <p className="mt-4 text-paper/60">
            No quotes, no back-and-forth — pick a package, see exactly what's
            included, and know the price before you reach out. Click a card
            to open the full page.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {packages.map((pkg, i) => {
            const Mock = pkg.mock;
            return (
              <Reveal key={pkg.slug} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <Link
                  to={`/packages/${pkg.slug}`}
                  aria-label={`View the full ${pkg.name} package`}
                  className={`group block h-full rounded-2xl border border-ink-line bg-ink-2/60 p-4 transition-transform hover:scale-[1.02] hover:bg-ink-2 ${ACCENT_BORDER[pkg.accent]}`}
                >
                  <div
                    className={
                      pkg.hover === "slide"
                        ? "relative transition-transform duration-500 group-hover:-translate-y-1.5"
                        : pkg.hover === "scan"
                          ? "relative transition-transform duration-500 group-hover:scale-[1.02]"
                          : "relative transition-transform duration-500 group-hover:rotate-[0.5deg] group-hover:scale-[1.02]"
                    }
                  >
                    <Mock />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-ink/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span className="translate-y-2 rounded-full bg-paper px-4 py-2 font-display text-xs font-semibold text-ink shadow-lg transition-transform duration-300 group-hover:translate-y-0">
                        View full package &rarr;
                      </span>
                    </div>
                  </div>
                  <div className="p-2 pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold">{pkg.name}</h3>
                      <div className="text-right">
                        <p className="font-display text-sm font-semibold" style={ACCENT_PRICE[pkg.accent]}>
                          {pkg.price}
                        </p>
                        {pkg.priceNote && (
                          <p className="font-mono text-[9px] uppercase tracking-wide text-paper/40">
                            {pkg.priceNote}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-paper/40">{pkg.category}</p>
                    <p className="mt-3 text-sm leading-relaxed text-paper/65">{pkg.desc}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}