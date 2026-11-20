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
        title="Analisi, modernizzazione e sistemi aziendali | PrismWave Studio"
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
            Servizi
          </p>
          <h1 className="font-display text-[clamp(2rem,6vw,3.25rem)] font-semibold leading-[1.1] tracking-tight text-paper">
            Il tuo sito lavora quanto te?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            I visitatori decidono in pochi secondi. Un sito lento o datato li perde prima ancora che tu riceva un
            messaggio. Possiamo individuare cosa limita il tuo sito oppure realizzare quello che
            rimandi da tempo.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-ink-line bg-ink-2/60 p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-amber">
                Ho già un sito
              </p>
              <p className="mt-2 text-ink-soft">
                Rispetta gli standard attuali o appare ormai datato? Richiedi una verifica gratuita e trasparente.
              </p>
              <div className="mt-5">
                <Cta to={LINKS.audit} primary>Richiedi un'analisi gratuita</Cta>
              </div>
            </div>
            <div className="rounded-3xl border border-ink-line bg-ink-2/60 p-6">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
                Ho un'idea, ma non ancora un sito
              </p>
              <p className="mt-2 text-ink-soft">
                Un negozio, un'attività, una startup o un sito di classifiche: raccontaci cosa hai in mente e
                ti spiegheremo come potremmo realizzarlo.
              </p>
              <div className="mt-5">
                <Cta to={LINKS.contact}>Raccontaci la tua idea</Cta>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            I segnali che indicano che il tuo sito è datato
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
            Riconosci almeno due di questi segnali? L'analisi gratuita ti mostra da dove iniziare.
          </p>
        </section>

        <section id="tiers" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-semibold text-paper sm:text-3xl">
            Tre modi in cui possiamo aiutarti
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
                  Cosa analizziamo
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
                  Cosa ricevi
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
            Come funziona
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ['1. Valutazione iniziale', 'Misuriamo velocità, esperienza da smartphone e metadati prima di intervenire.'],
              ['2. Intervento', 'Risolviamo prima il problema principale, con un ambito definito e concordato.'],
              ['3. Verifica', 'Ripetiamo i controlli e ti mostriamo il prima e il dopo, così puoi verificare il risultato.'],
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
            Vuoi sapere a che punto sei?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Inviaci il tuo sito o raccontaci la tua idea. Ti risponderemo indicando da dove inizieremmo.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta to={LINKS.audit} primary>Richiedi un'analisi gratuita</Cta>
            <Cta to={LINKS.contact}>Avvia il mio progetto</Cta>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}