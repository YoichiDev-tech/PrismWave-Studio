import { Link } from "react-router-dom";

interface CaseStudyCardProps {
  title: string;
  category: string;
  description: string;
  to: string;
  image?: string;
}

export function CaseStudyCard({ title, category, description, to, image }: CaseStudyCardProps) {
  return (
    <Link
      to={to}
      aria-label={`View the ${title} case study`}
      className="card-interaction group block h-full rounded-2xl border border-ink-line bg-ink-2/60 p-7 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber"
    >
      {image && (
        <img
          src={image}
          alt={`${title} preview`}
          className="mb-5 w-full rounded-xl object-cover"
          loading="lazy"
        />
      )}

      <p className="font-mono text-[11px] uppercase tracking-widest text-paper/40">{category}</p>

      <h3 className="mt-3 font-display text-xl font-semibold text-paper">{title}</h3>

      <p className="mt-3 text-sm leading-relaxed text-paper/65">{description}</p>

      <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-paper/40 transition-colors duration-300 group-hover:text-amber">
        View case study
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          &rarr;
        </span>
      </div>
    </Link>
  );
}