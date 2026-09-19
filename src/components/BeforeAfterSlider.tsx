import { useRef, useState, useCallback } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  // Remember WHICH source failed instead of a true/false flag. When the src
  // prop changes, the failed value no longer matches and the image is retried
  // automatically — no reset effect needed.
  const [failedBefore, setFailedBefore] = useState<string | null>(null);
  const [failedAfter, setFailedAfter] = useState<string | null>(null);
  const beforeBroken = failedBefore === beforeSrc;
  const afterBroken = failedAfter === afterSrc;

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Safely ignore capture release edge cases
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      onKeyDown={handleKeyDown}
      className="relative w-full aspect-[16/9] overflow-hidden rounded-lg select-none touch-none cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-amber"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After (base layer) */}
      {afterBroken ? (
        <div className="absolute inset-0 flex items-center justify-center bg-ink-2 text-center text-xs font-mono text-ink-soft px-4">
          This preview is still being finished — check back soon.
        </div>
      ) : (
        <img
          src={afterSrc}
          alt={afterLabel}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
          onError={() => setFailedAfter(afterSrc)}
        />
      )}
      <span className="absolute top-3 right-3 text-xs font-mono tracking-wide bg-ink/80 text-paper px-2 py-1 rounded">
        {afterLabel}
      </span>

      {/* Before layer with clip-path */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeBroken ? (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-2 text-center text-xs font-mono text-ink-soft px-4">
            This preview is still being finished — check back soon.
          </div>
        ) : (
          <img
            src={beforeSrc}
            alt={beforeLabel}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
            onError={() => setFailedBefore(beforeSrc)}
          />
        )}
      </div>
      <span className="absolute top-3 left-3 text-xs font-mono tracking-wide bg-ink/80 text-paper px-2 py-1 rounded">
        {beforeLabel}
      </span>

      {/* Divider line & handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-paper shadow-md"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 rounded-full bg-paper shadow-lg flex items-center justify-center text-ink text-sm font-bold">
          ⟨ ⟩
        </div>
      </div>
    </div>
  );
}