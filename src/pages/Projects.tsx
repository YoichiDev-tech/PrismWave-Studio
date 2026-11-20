import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import AiMetadata from "../components/AiMetadata";
import { getAllProjects } from "../data/projects";

export default function Projects() {
  const projects = getAllProjects();

  return (
    <div className="grain min-h-screen bg-ink text-paper">
      <SEO
        title="Progetti dimostrativi"
        description="Progetti dimostrativi di PrismWave Studio: esempi che mostrano la qualità del lavoro. Non sono progetti realizzati per clienti."
        path="/projects"
      />
      <AiMetadata
        map={["Introduzione ai progetti", "Griglia dei progetti", "Piè di pagina dello studio"]}
        intent="Mostrare i progetti dimostrativi di PrismWave Studio e invitare i visitatori a esplorarli o ad avviare un'analisi."
        tags={[
          "portfolio",
          "concept demos",
          "web design studio",
          "PrismWave",
        ]}
        extract={{
          title: "Progetti dimostrativi PrismWave Studio",
          audience: "Fondatori e piccole imprese",
          primaryActions: "Aprire una demo o avviare un'analisi gratuita",
        }}
      />

      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link
            to="/"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-paper"
          >
            ← Torna allo studio
          </Link>
          <Link
            to="/history"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Cronologia dei rilasci →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
          Progetti dimostrativi
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Progetti dimostrativi da esplorare e consultare.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Questi progetti dimostrativi mostrano lo standard qualitativo previsto per un cliente:
          settori diversi, la stessa cura. Non si tratta di lavori commissionati da clienti.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}