import { useEffect, useState } from 'react';
import { Stars } from './Stars';

type Item = {
  id: string;
  name: string | null;
  business: string | null;
  rating: number;
  text: string;
  featured: boolean;
};

export default function TestimonialsWall() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch('/api/testimonials', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j: { items?: Item[] }) => setItems(j.items ?? []))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (!items.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((t) => (
        <figure
          key={t.id}
          className={`rounded-3xl border p-5 ${
            t.featured
              ? 'border-amber/40 bg-ink-2/80'
              : 'border-ink-line bg-ink-2/60'
          }`}
        >
          <Stars value={t.rating} />
          <blockquote className="mt-3 text-paper/90">“{t.text}”</blockquote>
          <figcaption className="mt-3 font-mono text-[12px] text-ink-soft">
            {[t.name ?? 'Anonymous client', t.business].filter(Boolean).join(', ')}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}