import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { getLaunchesNewestFirst } from "../data/launches";

const TYPE_LABEL: Record<string, string> = {
  milestone: "Milestone",
  project: "Project",
  relaunch: "Relaunch",
  internal: "Studio",
};

export default function History() {
  const events = getLaunchesNewestFirst();

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Launch History"
        description="PrismWave Studio launch timeline — projects, relaunches, and studio milestones."
        path="/history"
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
            to="/projects"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Projects →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Launch history</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Every launch, in order.
        </h1>
        <p className="mt-4 text-ink-soft">
          A public timeline of projects, redesigns, and studio milestones.
        </p>

        <ol className="mt-12 space-y-8">
          {events.map((item) => (
            <li key={item.id} className="border-l border-ink-line pl-6">
              <div className="flex flex-wrap items-center gap-3">
                <time className="font-mono text-[12px] text-ink-soft">{item.date}</time>
                <span className="rounded-full border border-ink-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                  {TYPE_LABEL[item.type] ?? item.type}
                </span>
              </div>
              {item.href ? (
                <Link
                  to={item.href}
                  className="mt-2 block font-display text-xl font-semibold text-paper transition-colors hover:text-amber"
                >
                  {item.title}
                </Link>
              ) : (
                <h2 className="mt-2 font-display text-xl font-semibold text-paper">{item.title}</h2>
              )}
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              )}
            </li>
          ))}
        </ol>
      </main>

      <Footer />
    </div>
  );
}