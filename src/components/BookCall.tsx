import { useEffect, useState } from "react";
import { CALENDLY_EMBED_URL, CALENDLY_URL } from "../config/site";
import { trackAction } from "../lib/track";

function handleCalendlyMessage(event: MessageEvent) {
  if (event.origin !== "https://calendly.com") return;
  if (typeof event.data === "object" && event.data?.event === "calendly.event_scheduled") {
    trackAction("booking_completed", { metadata: { source: "calendly_embed" } });
  }
}

// Replaces the always-on 600px Calendly iframe (~1,100px of mobile scroll plus
// a third-party load for every visitor). The embed now mounts only when asked,
// and the booking_completed listener lives exactly as long as the embed does
export default function BookCall() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, [open]);

  return (
    <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-5">
      <p className="font-display text-base font-semibold text-paper">Preferisci parlare invece di scrivere?</p>
      <p className="mt-1 text-sm text-ink-soft">Una chiamata gratuita di 15 minuti, senza pressioni né impegno.</p>

      {!open ? (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            trackAction("cta_click", { metadata: { label: "Book a free 15-min call", location: "contact" } });
          }}
          className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full border border-amber px-6 font-display text-sm font-semibold text-amber transition-colors hover:bg-amber hover:text-ink"
        >
          Scegli un orario
        </button>
      ) : (
        <div className="mt-4">
          <iframe
            src={CALENDLY_EMBED_URL}
            title="Prenota una chiamata gratuita di 15 minuti"
            className="h-[640px] w-full rounded-xl border border-ink-line"
          />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-mono text-[12px] uppercase tracking-wide text-ink-soft underline underline-offset-4 hover:text-paper"
          >
            Apri in una nuova scheda
          </a>
        </div>
      )}
    </div>
  );
}