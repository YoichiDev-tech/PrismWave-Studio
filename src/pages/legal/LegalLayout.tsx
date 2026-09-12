import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  updated: string;
  /** Route path, e.g. "/privacy" — used for the canonical URL and OG tags */
  path: string;
  /** One-line meta description for this specific legal page */
  description: string;
  children: ReactNode;
}

export default function LegalLayout({ eyebrow, title, updated, path, description, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <SEO title={title} description={description} path={path} noIndex />
      <header className="border-b border-ink-line">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight text-paper">
            PrismWave
          </Link>
          <Link to="/" className="font-mono text-[11px] uppercase tracking-wide text-ink-soft transition-colors hover:text-paper">
            Back to studio
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-mono text-[12px] uppercase tracking-widest text-amber">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">Last updated: {updated}</p>
        <div className="legal-copy mt-12 space-y-10 text-sm leading-7 text-ink-soft">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-paper">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}