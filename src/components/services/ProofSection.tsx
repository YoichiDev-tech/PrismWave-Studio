import { Link } from 'react-router-dom';
import { CASE_STUDIES, QUOTES } from '../../data/proof';
import { LINKS } from '../../data/services';
import MetricRow from './MetricRow';

function Video({ src }: { src: string }) {
  return (
    <video
      className="mt-4 w-full rounded-xl border border-ink-line"
      src={src}
      controls
      preload="metadata"
      playsInline
    />
  );
}

export default function ProofSection() {
  const hasCases = CASE_STUDIES.length > 0;
  const hasQuotes = QUOTES.length > 0;

  if (!hasCases && !hasQuotes) {
    return (
      <section id="proof" className="grain bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-ink-line bg-ink-2/60 p-6 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-widest text-amber">
              Founding clients
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-paper sm:text-3xl">
              Proof you can verify, not numbers we made up
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              We are building our first public case studies right now. We audit your site, fix
              one real bottleneck for free, and measure it before and after. In return you give
              an honest review and let us publish the result. Nothing appears here until it is real.
            </p>
            <a
              href={LINKS.audit}
              className="mt-6 inline-block rounded-full px-6 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: 'linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)' }}
            >
              Claim a founding audit
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="proof" className="grain bg-ink py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
          Results, measured
        </h2>
        <div className="mt-8 space-y-10">
          {CASE_STUDIES.map((c) => (
            <article
              key={c.slug}
              className="rounded-3xl border border-ink-line bg-ink-2/60 p-5 sm:p-8"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                {c.industry}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold text-paper">{c.client}</h3>
              <p className="mt-2 text-ink-soft">{c.summary}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {c.metrics.map((m) => (
                  <MetricRow key={m.label} m={m} />
                ))}
              </div>
              <p className="mt-3 font-mono text-[11px] text-ink-soft">
                Measured with: {c.measuredWith}
              </p>
              {c.quote && (
                <blockquote className="mt-5 border-l-2 border-amber pl-4 text-paper/90">
                  “{c.quote.text}”
                  <footer className="mt-1 font-mono text-[12px] text-ink-soft">
                    {c.quote.name}, {c.quote.business}
                  </footer>
                  {c.quote.videoUrl && <Video src={c.quote.videoUrl} />}
                </blockquote>
              )}
              <Link
                to={`/case-studies/${c.slug}`}
                className="mt-5 inline-block font-display text-sm font-semibold text-amber transition-colors hover:text-paper"
              >
                Read the full case study →
              </Link>
            </article>
          ))}

          {QUOTES.map((q) => (
            <blockquote
              key={q.name}
              className="rounded-3xl border border-ink-line bg-ink-2/60 p-5 text-paper/90"
            >
              “{q.text}”
              <footer className="mt-1 font-mono text-[12px] text-ink-soft">
                {q.name}, {q.business}
              </footer>
              {q.videoUrl && <Video src={q.videoUrl} />}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}