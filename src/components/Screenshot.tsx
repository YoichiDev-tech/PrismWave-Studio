import { useState } from "react";

interface ScreenshotProps {
  src?: string;
  label: string;
}

export default function Screenshot({ src, label }: ScreenshotProps) {
  const [failed, setFailed] = useState(false);

  // If the image is missing or fails to load, show a labeled placeholder
  // instead of the browser's broken-image icon — this is what let
  // /images/bloom/hero.png ship silently broken in the first place
  if (!src || failed) {
    return (
      <figure className="mt-8">
        <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-paper/20 bg-ink-2/40 text-center">
          <p className="max-w-xs px-6 font-mono text-[11px] uppercase tracking-wide text-paper/40">
            {label || "Immagine"} — immagine non disponibile
          </p>
        </div>
      </figure>
    );
  }

  return (
    <figure className="mt-8">
      <img
        src={src}
        alt={label || "Immagine"}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full rounded-lg border border-paper/10 shadow-lg"
      />
      {label && (
        <figcaption className="mt-2 text-sm text-paper/60">
          {label}
        </figcaption>
      )}
    </figure>
  );
}