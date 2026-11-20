import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AiMetadata from "../components/AiMetadata";
import ProjectPreview from "../components/ProjectPreview";
import { getProjectBySlug } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="grain flex min-h-screen flex-col bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-1 flex-col px-6 py-20">
          <h1 className="font-display text-3xl font-semibold">Progetto non trovato</h1>
          <p className="mt-3 text-ink-soft">L'identificativo non corrisponde ad alcun progetto pubblicato.</p>
          <Link to="/projects" className="mt-8 font-mono text-sm text-amber underline underline-offset-4">
            ← Tutti i progetti
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title={project.title}
        description={project.description}
        path={`/projects/${project.slug}`}
      />
      <AiMetadata
        map={["Panoramica del progetto", "Date di pubblicazione", "Etichette", "Collegamento al modello interattivo"]}
        intent={`Presentare il progetto ${project.title} e indirizzare i visitatori al modello interattivo o a un'analisi gratuita.`}
        tags={project.tags}
        extract={{
          title: project.title,
          audience: "Fondatori che stanno valutando PrismWave Studio",
          primaryActions: "Aprire il modello interattivo o avviare un progetto",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/projects"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Tutti i progetti
          </Link>
          {project.status === "concept" && (
            <span className="rounded-full border border-ink-line px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
              Concept
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-14 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">{project.category}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px] text-ink-soft">
          <span>Launched {project.launched}</span>
          {project.relaunched && <span>Relaunched {project.relaunched}</span>}
        </div>

        <div className="mt-10 max-w-2xl">
          <ProjectPreview slug={project.slug} screenshot={project.screenshot} />
        </div>

        <section className="mt-14 max-w-2xl">
          <h2 className="font-display text-xl font-semibold">Panoramica</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{project.overview}</p>
        </section>

        {project.pricingNote && (
          <section className="mt-10 max-w-2xl rounded-2xl border border-ink-line bg-ink-2/50 p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Prezzi</h2>
            <p className="mt-2 text-sm leading-relaxed text-paper/80">{project.pricingNote}</p>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">Etichette</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-ink-line px-3 py-1.5 font-mono text-[11px] text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-ink-line pt-10">
          <h2 className="font-display text-xl font-semibold">Prossimo passo</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">
            Ti piace questa direzione? Inizia con un'analisi gratuita o raccontaci il tuo progetto: 
            reply with clear, fixed-scope options.
          </p>
        </section>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          {project.livePath && (
            <Link
              to={project.livePath}
              className="inline-flex min-h-12 items-center justify-center rounded-full px-7 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
              style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
            >
              Apri il modello interattivo →
            </Link>
          )}
          <Link
            to="/#audit-tool"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink-line px-7 font-display text-sm font-semibold text-paper transition-colors hover:border-amber"
          >
            Richiedi un'analisi gratuita
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}