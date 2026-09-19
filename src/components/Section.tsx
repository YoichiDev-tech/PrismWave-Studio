import type { ReactNode } from "react";
import { AiIntent } from "./AiMetadata";

interface SectionProps {
  /** Anchor id — other pages link to these (/#contact, /#audit-tool, /#work). Keep stable */
  id: string;
  /** Value for data-ai, read by AI crawlers */
  ai: string;
  /** One-sentence purpose of the section, rendered as a hidden AI-INTENT block */
  intent: string;
  /** id of the section's <h2>, giving the region an accessible name */
  labelledBy: string;
  className?: string;
  children: ReactNode;
}

// Every home-page section goes through here so the semantics live in ONE place:
// a single landmark per section (no wrapper-inside-section nesting), a valid
// aria-labelledby, the AI metadata block, and a scroll offset so the fixed nav
// never covers a heading after an anchor jump
export default function Section({ id, ai, intent, labelledBy, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-describedby={`${id}-intent`}
      data-ai={ai}
      className={`scroll-mt-20 cursor-default ${className}`}
    >
      <AiIntent id={`${id}-intent`}>{intent}</AiIntent>
      {children}
    </section>
  );
}