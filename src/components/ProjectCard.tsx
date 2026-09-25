import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import ProjectPreview from "./ProjectPreview";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-ink-line bg-ink-2/60 p-4 transition-colors hover:border-amber hover:bg-ink-2"
    >
      <div className="relative overflow-hidden rounded-xl">
        <div className="transition-transform duration-500 group-hover:scale-[1.02]">
          <ProjectPreview slug={project.slug} screenshot={project.screenshot} />
        </div>
        {project.status === "concept" && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-ink-line bg-ink/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-paper/70 backdrop-blur-sm">
            Concept
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">{project.category}</p>
        <h2 className="mt-1 font-display text-lg font-semibold text-paper">{project.title}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{project.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-ink-soft">
          <span>Launched {project.launched}</span>
          {project.relaunched && <span>· Relaunched {project.relaunched}</span>}
          <span className="ml-auto text-paper/50 transition-transform group-hover:translate-x-0.5">→</span>
        </div>
      </div>
    </Link>
  );
}