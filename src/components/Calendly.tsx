import { useEffect } from "react";
import Reveal from "./Reveal";
import { trackAction } from "../lib/track";

function handleCalendlyMessage(event: MessageEvent) {
  if (event.origin !== "https://calendly.com") return;
  if (typeof event.data === "object" && event.data?.event === "calendly.event_scheduled") {
    trackAction("booking_completed", { metadata: { source: "calendly_embed" } });
  }
}

export default function Calendly() {
  useEffect(() => {
    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return (
    <section id="calendly" className="grain relative overflow-hidden bg-ink py-24 md:py-32 cursor-default">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] will-change-transform transform-gpu"
        style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            Book a Call
          </p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-5xl">
            Prefer talking instead of typing?
          </h2>
          <p className="mt-5 text-ink-soft">
            Schedule a free 15-minute call. No pressure, no commitments — just a quick chat
            to understand your project and see if we're a good fit to work together.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-16 flex justify-center">
          <div className="w-full max-w-3xl rounded-2xl border border-ink-line bg-ink-2/60 p-6">
            <iframe
              src="https://calendly.com/hello-prismwave-studio/new-meeting"
              className="w-full h-[600px] rounded-xl border border-ink-line"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}