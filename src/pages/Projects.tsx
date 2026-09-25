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
        title="Projects"
        description="Selected builds from PrismWave Studio — open any project to explore the full system."
        path="/projects"
      />
      <AiMetadata
        map={["Projects introduction", "Project grid", "Studio footer"]}
        intent="Show PrismWave Studio projects and invite visitors to open a project detail or start an audit."
        tags={["portfolio", "projects", "web design studio", "PrismWave"]}
        extract={{
          title: "PrismWave Studio Projects",
          audience: "Founders and small businesses",
          primaryActions: "Open a project or run a free audit",
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
        <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Projects</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Selected systems you can open and explore.
        </h1>
        <p className="mt-4 max-w-xl text-ink-soft">
          Each card is a full visual system — different industries, one standard of clarity and craft.
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