interface BrandReelProps {
  className?: string;
}

// Waveform bar heights (0-1) — hand-tuned so the "signal" reads as organic
// rather than a perfect, robotic sine wave
const BARS = [0.35, 0.6, 0.4, 0.85, 0.55, 0.95, 0.5, 0.7, 0.4, 0.8, 0.45, 0.6];

// Animated brand signal panel — a lightweight, CSS-only
export default function BrandReel({ className = "" }: BrandReelProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-ink-line bg-ink-2/60 p-8 backdrop-blur-sm ${className}`}
    >
      {/* Slow-rotating ambient gradient ring, clipped to the panel */}
      <div className="reel-spin pointer-events-none absolute -inset-16 opacity-25">
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #FFB84D, #FF7A59, #6C63FF, transparent, #FFB84D)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* Wordmark, matching the Nav/Footer wave icon */}
        <div className="flex items-center gap-2.5 font-display text-base font-semibold text-paper">
          <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <path
              d="M2 15c2.5 0 2.5-6 5-6s2.5 6 5 6 2.5-6 5-6 2.5 6 5 6"
              stroke="url(#reel-wave)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="reel-wave" x1="2" y1="0" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFB84D" />
                <stop offset="0.5" stopColor="#FF7A59" />
                <stop offset="1" stopColor="#6C63FF" />
              </linearGradient>
            </defs>
          </svg>
          PrismWave
        </div>

        {/* Equalizer / signal bars */}
        <div className="flex h-24 items-end gap-1.5 sm:h-28">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="reel-bar block w-2 rounded-full sm:w-2.5"
              style={{
                height: "100%",
                background: "linear-gradient(180deg, #FFB84D 0%, #FF7A59 55%, #6C63FF 100%)",
                opacity: 0.85,
                ["--bar-min" as string]: `${Math.max(h - 0.35, 0.12)}`,
                ["--bar-max" as string]: `${h}`,
                animationDelay: `${i * 0.12}s`,
              }}
            />
          ))}
        </div>

        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft">
          Segnale — sempre attivo
        </p>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
      />
    </div>
  );
}