import type { Metric } from '../../data/proof';

export function improvement(m: Metric): number {
  if (m.before === 0) return 0;
  const delta = m.lowerIsBetter ? m.before - m.after : m.after - m.before;
  return Math.round((delta / m.before) * 100);
}
