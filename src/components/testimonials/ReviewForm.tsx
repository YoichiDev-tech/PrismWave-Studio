import { useState } from 'react';
import { StarInput } from './Stars';

const field =
  'mt-1 w-full rounded-xl border border-ink-line bg-ink-2/40 px-4 py-2.5 text-paper placeholder:text-ink-soft/50 transition-colors focus:border-amber focus:outline-none';

export default function ReviewForm() {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) {
      setError('Please choose a star rating.');
      setState('error');
      return;
    }
    setState('sending');
    setError('');
    try {
      const r = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, business, rating, message, consent, website }),
      });
      if (!r.ok) {
        const j = (await r.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Something went wrong.');
      }
      setState('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <div className="rounded-3xl border border-ink-line bg-ink-2/60 p-6">
        <p className="font-display font-semibold text-paper">Thank you.</p>
        <p className="mt-1 text-ink-soft">
          Your review was received. It is checked personally before anything is shown publicly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-3xl border border-ink-line bg-ink-2/60 p-6"
    >
      <label className="block text-sm text-ink-soft">
        Your name
        <input
          className={field}
          value={name}
          maxLength={80}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="block text-sm text-ink-soft">
        Business name
        <input
          className={field}
          value={business}
          maxLength={120}
          required
          onChange={(e) => setBusiness(e.target.value)}
        />
      </label>

      <div className="text-sm text-ink-soft">
        Rating
        <div className="mt-1">
          <StarInput value={rating} onChange={setRating} />
        </div>
      </div>

      <label className="block text-sm text-ink-soft">
        Your experience
        <textarea
          className={field}
          rows={4}
          value={message}
          minLength={10}
          maxLength={600}
          required
          onChange={(e) => setMessage(e.target.value)}
        />
        <span className="mt-1 block font-mono text-[11px] text-ink-soft/60">
          {message.length}/600
        </span>
      </label>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <label className="flex items-start gap-2 text-sm text-ink-soft">
        <input
          type="checkbox"
          className="mt-1 accent-amber"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
        />
        <span>
          I agree PrismWave Studio may publish this review after approval. Parts of it may be
          shortened or shown without my name or business.
        </span>
      </label>

      {state === 'error' && <p className="text-sm text-amber">{error}</p>}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="rounded-full px-6 py-3 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50"
        style={{ background: 'linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)' }}
      >
        {state === 'sending' ? 'Sending…' : 'Send my review'}
      </button>
    </form>
  );
}