import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { getChangelogNewestFirst } from "../data/changelog";

const TAG_LABEL: Record<string, string> = {
  feature: "Feature",
  fix: "Fix",
  improvement: "Improvement",
};

export default function Changelog() {
  const entries = getChangelogNewestFirst();

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Changelog"
        description="What changed in PrismWave Studio — features, fixes, and improvements."
        path="/changelog"
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
            to="/roadmap"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Roadmap →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Changelog</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          What we shipped.
        </h1>
        <p className="mt-4 text-ink-soft">
          Public feed of improvements. No marketing fluff — just what changed.
        </p>

        <ol className="mt-12 space-y-10">
          {entries.map((item) => (
            <li key={`${item.date}-${item.title}`} className="border-l border-ink-line pl-6">
              <div className="flex flex-wrap items-center gap-3">
                <time className="font-mono text-[12px] text-ink-soft">{item.date}</time>
                {item.tag && (
                  <span className="rounded-full border border-ink-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                    {TAG_LABEL[item.tag] ?? item.tag}
                  </span>
                )}
              </div>
              <h2 className="mt-2 font-display text-xl font-semibold text-paper">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
            </li>
          ))}
        </ol>
      </main>

      <Footer />
    </div>
  );
}