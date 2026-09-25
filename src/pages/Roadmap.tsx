import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { ROADMAP, type RoadmapStatus } from "../data/roadmap";

const COLUMNS: { status: RoadmapStatus; label: string; blurb: string }[] = [
  { status: "now", label: "Now", blurb: "In progress" },
  { status: "next", label: "Next", blurb: "Coming up" },
  { status: "later", label: "Later", blurb: "On the horizon" },
];

export default function Roadmap() {
  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Roadmap"
        description="What PrismWave Studio is building next — clear, minimal, and focused."
        path="/roadmap"
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Back to studio
          </Link>
          <Link
            to="/changelog"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Changelog →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Roadmap</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          What we are building next.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          A clear view of studio improvements — so you always know where the product is headed.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {COLUMNS.map((col) => {
            const items = ROADMAP.filter((i) => i.status === col.status);
            return (
              <section key={col.status}>
                <h2 className="font-display text-lg font-semibold text-paper">{col.label}</h2>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">{col.blurb}</p>
                <ul className="mt-6 space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="rounded-2xl border border-ink-line bg-ink-2/50 p-5"
                    >
                      <h3 className="font-display text-base font-semibold text-paper">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}