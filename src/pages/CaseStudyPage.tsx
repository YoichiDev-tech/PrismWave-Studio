import { Link, useParams } from 'react-router-dom';
import { CASE_STUDIES } from '../data/proof';
import { LINKS } from '../data/services';
import MetricRow from '../components/services/MetricRow';
import SEO from '../components/SEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import type { Intent } from './Home';

interface CaseStudyPageProps {
  onSelectIntent?: (intent: Intent) => void;
}

export default function CaseStudyPage({ onSelectIntent }: CaseStudyPageProps) {
  const { slug } = useParams();
  const c = CASE_STUDIES.find((x) => x.slug === slug);
  const setIntent = onSelectIntent ?? (() => {});

  if (!c) {
    return (
      <div className="grain min-h-screen bg-ink">
        <Nav onSelectIntent={setIntent} />
        <main className="px-6 py-32 text-center">
          <p className="text-ink-soft">Case study not found.</p>
          <Link
            to="/services"
            className="mt-4 inline-block font-display text-sm font-semibold text-amber hover:text-paper"
          >
            Back to services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="grain min-h-screen bg-ink">
      <SEO
        title={`${c.client} case study | PrismWave Studio`}
        description={c.summary}
        path={`/case-studies/${c.slug}`}
      />

      <Nav onSelectIntent={setIntent} />

      <main>
        <article className="mx-auto max-w-3xl px-6 py-24">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            {c.industry}
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
            {c.client}
          </h1>
          <p className="mt-3 text-lg text-ink-soft">{c.summary}</p>

          <h2 className="mt-10 font-display text-xl font-semibold text-paper">The problem</h2>
          <p className="mt-2 text-ink-soft">{c.problem}</p>

          <h2 className="mt-8 font-display text-xl font-semibold text-paper">What we changed</h2>
          <p className="mt-2 text-ink-soft">{c.fix}</p>

          <h2 className="mt-8 font-display text-xl font-semibold text-paper">Results</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {c.metrics.map((m) => (
              <MetricRow key={m.label} m={m} />
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] text-ink-soft">
            Measured with: {c.measuredWith}
          </p>

          {c.quote && (
            <blockquote className="mt-8 border-l-2 border-amber pl-4 text-paper/90">
              “{c.quote.text}”
              <footer className="mt-1 font-mono text-[12px] text-ink-soft">
                {c.quote.name}, {c.quote.business}
              </footer>
              {c.quote.videoUrl && (
                <video
                  className="mt-4 w-full rounded-xl border border-ink-line"
                  src={c.quote.videoUrl}
                  controls
                  preload="metadata"
                  playsInline
                />
              )}
            </blockquote>
          )}

          <a
            href={LINKS.audit}
            className="mt-10 inline-block rounded-full px-6 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
            style={{ background: 'linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)' }}
          >
            Get the same check for your site
          </a>
        </article>
      </main>

      <Footer />
    </div>
  );
}