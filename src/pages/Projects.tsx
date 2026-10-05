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
        title="Concept demos"
        description="Concept demos from PrismWave Studio — speculative builds that show the quality a paying client receives. Not client work."
        path="/projects"
      />
      <AiMetadata
        map={["Projects introduction", "Project grid", "Studio footer"]}
        intent="Show PrismWave Studio concept demos and invite visitors to open a demo or start an audit."
        tags={[
          "portfolio",
          "concept demos",
          "web design studio",
          "PrismWave",
        ]}
        extract={{
          title: "PrismWave Studio Concept Demos",
          audience: "Founders and small businesses",
          primaryActions: "Open a demo or run a free audit",
        }}
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
            to="/history"
            className="font-mono text-[12px] uppercase tracking-wide text-paper/60 transition-colors hover:text-amber"
          >
            Launch history →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
          Concept demos
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Concept demos you can open and explore.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          These are speculative builds that show the standard a paying client
          receives — different industries, one level of craft. Not client work.
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