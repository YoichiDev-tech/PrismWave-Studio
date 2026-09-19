import { useCallback, useEffect, useRef, useState } from "react";
import type { PreviewSource } from "../types/revamp";

interface BeforeAfterSliderProps {
  before: PreviewSource;
  after: PreviewSource;
  beforeLabel?: string;
  afterLabel?: string;
  virtualWidth?: number;
  aspectClass?: string;
}

interface Size {
  w: number;
  h: number;
}

const BROKEN_MESSAGE = "This preview couldn't be loaded — try generating it again.";

function HtmlFrame({ html, title, virtualWidth, size }: { html: string; title: string; virtualWidth: number; size: Size }) {
  if (!size.w || !size.h) return null;
  const scale = size.w / virtualWidth;
  return (
    <iframe
      title={title}
      sandbox=""
      srcDoc={html}
      referrerPolicy="no-referrer"
      tabIndex={-1}
      className="absolute left-0 top-0 border-0 bg-white"
      style={{
        width: virtualWidth,
        height: size.h / scale,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        pointerEvents: "none",
      }}
    />
  );
}

function PreviewLayer({
  source,
  label,
  size,
  virtualWidth,
}: {
  source: PreviewSource;
  label: string;
  size: Size;
  virtualWidth: number;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (source.type === "html") {
    return <HtmlFrame html={source.html} title={label} virtualWidth={virtualWidth} size={size} />;
  }

  if (failedSrc === source.src) {
    return source.fallbackHtml ? (
      <HtmlFrame html={source.fallbackHtml} title={label} virtualWidth={virtualWidth} size={size} />
    ) : (
      <div className="absolute inset-0 flex items-center justify-center bg-ink-2 px-4 text-center font-mono text-xs text-ink-soft">
        {BROKEN_MESSAGE}
      </div>
    );
  }

  return (
    <img
      src={source.src}
      alt={label}
      className="absolute inset-0 h-full w-full object-cover object-top"
      draggable={false}
      referrerPolicy="no-referrer"
      onError={() => setFailedSrc(source.src)}
    />
  );
}

export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  virtualWidth = 1280,
  aspectClass = "aspect-[16/9]",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
    } catch {}
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  const beforeKey = before.type === "image" ? `img:${before.src}` : "html:before";
  const afterKey = after.type === "image" ? `img:${after.src}` : "html:after";

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
      className={`relative w-full ${aspectClass} overflow-hidden rounded-lg select-none touch-none cursor-ew-resize bg-white focus:outline-none focus:ring-2 focus:ring-amber`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* After (base layer) */}
      <PreviewLayer key={afterKey} source={after} label={afterLabel} size={size} virtualWidth={virtualWidth} />

      {position < 50 ? null : (
        <span className="absolute right-3 top-3 z-10 rounded bg-ink/80 px-2 py-1 font-mono text-xs tracking-wide text-paper">
          {afterLabel}
        </span>
      )}

      {/* Before layer */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <PreviewLayer key={beforeKey} source={before} label={beforeLabel} size={size} virtualWidth={virtualWidth} />

        <span className="absolute left-3 top-3 z-10 rounded bg-ink/80 px-2 py-1 font-mono text-xs tracking-wide text-paper">
          {beforeLabel}
        </span>
      </div>

      {/* Divider */}
      <div className="absolute inset-y-0 z-10 w-0.5 bg-paper shadow-md" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-sm font-bold text-ink shadow-lg">
          ⟨ ⟩
        </div>
      </div>
    </div>
  );
}