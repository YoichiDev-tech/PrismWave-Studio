import type { Metric } from '../../data/proof';
import { improvement } from './metric-utils';

export default function MetricRow({ m }: { m: Metric }) {
  const max = Math.max(m.before, m.after, 1);
  const gain = improvement(m);
  const unit = m.unit ?? '';

  return (
    <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-display text-sm font-semibold text-paper">{m.label}</p>
        {gain > 0 && (
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-amber">
            {gain}% better
          </span>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <div>
          <div className="mb-1 flex justify-between font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            <span>Before</span>
            <span>{m.before}{unit}</span>
          </div>
          <div className="h-1.5 rounded-full bg-ink-line">
            <div
              className="h-1.5 rounded-full bg-ink-soft/50"
              style={{ width: `${(m.before / max) * 100}%` }}
            />
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            <span>After</span>
            <span>{m.after}{unit}</span>
          </div>
          <div className="h-1.5 rounded-full bg-ink-line">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${(m.after / max) * 100}%`,
                background: 'linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}