export function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden
          className={n <= value ? 'text-amber' : 'text-ink-soft/30'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Your rating" className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          onClick={() => onChange(n)}
          className={`text-3xl leading-none transition hover:text-amber ${
            n <= value ? 'text-amber' : 'text-ink-soft/30'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}