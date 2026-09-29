import { Link } from 'react-router-dom';
import { LINKS, OLD_SITE_SIGNS, TIERS } from '../data/services';
import ProofSection from '../components/services/ProofSection';
import SEO from '../components/SEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import type { Intent } from './Home';

function Cta({
  to,
  children,
  primary,
}: {
  to: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const base =
    'inline-block rounded-full px-6 py-3 font-display text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98]';

  if (primary) {
    return to.startsWith('/') && !to.includes('#') ? (
      <Link
        to={to}
        className={`${base} text-ink`}
        style={{ background: 'linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)' }}
      >
        {children}
      </Link>
    ) : (
      <a
        href={to}
        className={`${base} text-ink`}
        style={{ background: 'linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)' }}
      >
        {children}
      </a>
    );
  }

  return to.startsWith('/') && !to.includes('#') ? (
    <Link
      to={to}
      className={`${base} border border-ink-line text-paper hover:border-amber`}
    >
      {children}
    </Link>
  ) : (
    <a
      href={to}
      className={`${base} border border-ink-line text-paper hover:border-amber`}
    >
      {children}
    </a>
  );
}

interface ServicesProps {
  onSelectIntent?: (intent: Intent) => void;
}

export default function Services({ onSelectIntent }: ServicesProps) {
  const setIntent = onSelectIntent ?? (() => {});

  return (
    <div className="grain min-h-screen bg-ink">
      <SEO
        title="Website audits, modernization & business systems | PrismWave Studio"
        description="Find out if your site looks and performs like it is 2026, or get the website you always wanted built. Free audit, fixed-price builds, custom business systems."
        path="/services"
      />

      <Nav onSelectIntent={setIntent} />

      <main className="pt-20">
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-12 md:pt-16">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
            <span className="relative flex h-1.5 w-1.5">
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
            </span>
            Services
          </p>
          <h1 className="font-display text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-paper">
            Does your website still work as hard as you do?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Visitors decide in seconds. A slow or dated site loses them before you ever get a
            message. Either we find out what is holding yours back, or we build the one you
            have been putting off.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink-line bg-ink-2/60 p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber">
                I already have a site
              </p>
              <p className="mt-2 text-ink-soft">
                Is it up to today's standards, or does it look and feel old? Get a free, honest check.
              </p>
              <div className="mt-5">
                <Cta to={LINKS.audit} primary>Get my free audit</Cta>
              </div>
            </div>
            <div className="rounded-3xl border border-ink-line bg-ink-2/60 p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                I have an idea, no site yet
              </p>
              <p className="mt-2 text-ink-soft">
                A barber shop, a store, a startup, a ranking site. Tell us what you picture and
                we tell you how we would build it.
              </p>
              <div className="mt-5">
                <Cta to={LINKS.contact}>Tell us my idea</Cta>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            Signs your site is showing its age
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {OLD_SITE_SIGNS.map((s) => (
              <li
                key={s}
                className="flex gap-3 rounded-2xl border border-ink-line bg-ink-2/40 p-4 text-ink-soft"
              >
                <span aria-hidden className="mt-0.5 shrink-0 text-amber">✕</span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">
            Recognise two or more? The free audit shows what to fix first.
          </p>
        </section>

        <section id="tiers" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            Three ways we help
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t) => (
              <article
                key={t.id}
                className="flex flex-col rounded-3xl border border-ink-line bg-ink-2/60 p-6"
              >
                <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber">
                  {t.step}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-paper">{t.name}</h3>
                <p className="mt-2 font-medium text-paper">{t.outcome}</p>
                <p className="mt-2 text-sm text-ink-soft">{t.forWho}</p>

                <h4 className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                  What we look at
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {t.scope.map((s) => (
                    <li key={s} className="flex gap-2">
                      <span className="text-amber">•</span>
                      {s}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                  You receive
                </h4>
                <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
                  {t.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-amber">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Cta to={t.cta.to} primary={t.id === 'audit'}>
                    {t.cta.label}
                  </Cta>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['1. Baseline', 'We measure your current speed, mobile experience and metadata before touching anything.'],
              ['2. Fix', 'We solve the biggest bottleneck first, in a fixed, agreed scope.'],
              ['3. Prove', 'We re-test and show you the before and after, so the result is checkable.'],
            ].map(([h, p]) => (
              <li key={h} className="rounded-2xl border border-ink-line bg-ink-2/40 p-5">
                <p className="font-display font-semibold text-amber">{h}</p>
                <p className="mt-1.5 text-sm text-ink-soft">{p}</p>
              </li>
            ))}
          </ol>
        </section>

        <ProofSection />

        <section className="mx-auto max-w-6xl px-6 pb-24 pt-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            Ready to know where you stand?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Send us your site, or your idea. We reply with what we would do first.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta to={LINKS.audit} primary>Get my free audit</Cta>
            <Cta to={LINKS.contact}>Start my project</Cta>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}