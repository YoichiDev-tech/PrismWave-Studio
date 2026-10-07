import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import Section from "./Section";

/*
  Homepage proof from approved audit feedback only.
  Renders nothing until I have approved items — no empty social-proof shell.
*/

type Item = {
  id: string;
  name: string | null;
  business: string | null;
  rating: number;
  text: string;
  featured: boolean;
  source?: string;
};

export default function AuditUserVoice() {
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/testimonials", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((j: { items?: Item[] }) => {
        const list = (j.items ?? []).filter(
          (t) => !t.source || t.source === "audit" || t.source === "general" || t.source === "client"
        );
        setItems(list.slice(0, 6));
      })
      .catch(() => setItems([]));
    return () => ctrl.abort();
  }, []);

  if (!items || items.length === 0) return null;

  return (
    <Section
      id="user-voice"
      ai="user-voice"
      intent="Show approved feedback from people who ran the free audit or worked with the studio."
      labelledBy="user-voice-title"
      className="border-y border-ink-line bg-ink py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">
            See what other users think
          </p>
          <h2
            id="user-voice-title"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-4xl"
          >
            Feedback from people who ran the audit.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">
            Only notes we have checked and been allowed to show. Nothing is auto-published.
          </p>
        </Reveal>

        <Reveal delay={1}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <figure
                key={t.id}
                className={`rounded-2xl border p-5 ${
                  t.featured
                    ? "border-amber/40 bg-ink-2/80"
                    : "border-ink-line bg-ink-2/50"
                }`}
              >
                <p className="font-mono text-[11px] tracking-wide text-amber" aria-label={`${t.rating} out of 5`}>
                  {"★".repeat(t.rating)}
                  <span className="text-ink-soft/40">{"★".repeat(5 - t.rating)}</span>
                </p>
                <blockquote className="mt-3 text-sm leading-relaxed text-paper">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] text-ink-soft">
                  {[t.name ?? "Anonymous", t.business].filter(Boolean).join(" · ")}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-center">
          <a
            href="/reviews"
            className="font-mono text-[12px] uppercase tracking-wide text-ink-soft underline underline-offset-4 hover:text-amber"
          >
            See all approved feedback →
          </a>
        </p>
      </div>
    </Section>
  );
}