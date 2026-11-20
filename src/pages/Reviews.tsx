import ReviewForm from '../components/testimonials/ReviewForm';
import TestimonialsWall from '../components/testimonials/TestimonialsWall';
import SEO from '../components/SEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import type { Intent } from './Home';

interface RecensioniProps {
  onSelectIntent?: (intent: Intent) => void;
}

export default function Recensioni({ onSelectIntent }: RecensioniProps) {
  const setIntent = onSelectIntent ?? (() => {});

  return (
    <div className="grain min-h-screen bg-ink">
      <SEO
        title="Recensioni | PrismWave Studio"
        description="Recensioni dei clienti di PrismWave Studio e possibilità di inviare la tua. Ogni recensione viene letta e approvata manualmente."
        path="/reviews"
      />

      <Nav onSelectIntent={setIntent} />

      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          Recensioni
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Hai lavorato con noi? Raccontaci com'è andata.
        </h1>
        <p className="mt-3 text-ink-soft">
          Ogni recensione viene letta e approvata manualmente prima di essere mostrata. Non pubblichiamo nulla
          senza il tuo consenso e la nostra verifica.
        </p>

        <div className="mt-10">
          <TestimonialsWall />
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-paper">
            Lascia una recensione
          </h2>
          <ReviewForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}