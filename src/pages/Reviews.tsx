import ReviewForm from '../components/testimonials/ReviewForm';
import TestimonialsWall from '../components/testimonials/TestimonialsWall';
import SEO from '../components/SEO';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import type { Intent } from './Home';

interface ReviewsProps {
  onSelectIntent?: (intent: Intent) => void;
}

export default function Reviews({ onSelectIntent }: ReviewsProps) {
  const setIntent = onSelectIntent ?? (() => {});

  return (
    <div className="grain min-h-screen bg-ink">
      <SEO
        title="Client reviews | PrismWave Studio"
        description="Reviews from PrismWave Studio clients, and a way to leave your own. Every review is read and approved by hand."
        path="/reviews"
      />

      <Nav onSelectIntent={setIntent} />

      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
          </span>
          Reviews
        </p>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Worked with us? Tell us how it went.
        </h1>
        <p className="mt-3 text-ink-soft">
          Every review is read and approved by hand before it appears here. Nothing is published
          without your consent and our check.
        </p>

        <div className="mt-10">
          <TestimonialsWall />
        </div>

        <div className="mt-12">
          <h2 className="mb-4 font-display text-xl font-semibold text-paper">
            Leave a review
          </h2>
          <ReviewForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}