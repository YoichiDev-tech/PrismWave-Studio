import { useState } from "react";
import type { FormEvent } from "react";
import { getSessionIdForLead, trackAction } from "../lib/track";

/*
  Optional ice-breaker after a free audit.
  Stores feedback as status=pending. Nothing is public until I approve it.
*/

interface AuditFeedbackProps {
  auditScore: number;
  siteUrl?: string;
}

export default function AuditFeedback({ auditScore, siteUrl }: AuditFeedbackProps) {
  const [open, setOpen] = useState(false);
  const [rating, setValutazione] = useState(0);
  const [name, setName] = useState("");
  const [role, setRuolo] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating < 1) {
      setError("Seleziona una valutazione in stelle.");
      return;
    }
    if (message.trim().length < 10) {
      setError("Scrivi almeno una breve frase.");
      return;
    }
    if (!consent) {
      setError("Seleziona la casella se possiamo pubblicare il commento dopo la revisione.");
      return;
    }

    setState("sending");
    try {
      const r = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonimo",
          business: role.trim(),
          rating,
          message: message.trim(),
          consent: true,
          source: "audit",
          auditScore,
          siteUrl: siteUrl ?? "",
          sessionId: getSessionIdForLead(),
          website,
        }),
      });
      if (!r.ok) {
        const j = (await r.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Invio non riuscito");
      }
      trackAction("cta_click", {
        metadata: { label: "audit_feedback_sent", location: "audit-widget", rating },
      });
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Si è verificato un errore.");
    }
  };

  if (state === "sent") {
    return (
      <div className="mt-6 rounded-xl border border-ink-line bg-ink-2/50 p-4">
        <p className="font-display text-sm font-semibold text-paper">Grazie, abbiamo ricevuto il tuo commento.</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          Se hai autorizzato la pubblicazione, il commento sarà visibile solo dopo una verifica manuale. Nulla
          is posted automatically.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="mt-6 border-t border-ink-line pt-5">
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            trackAction("cta_click", {
              metadata: { label: "audit_feedback_open", location: "audit-widget" },
            });
          }}
          className="font-mono text-[11px] uppercase tracking-wide text-ink-soft underline underline-offset-4 transition-colors hover:text-amber"
        >
          L'analisi ti è stata utile? Lascia un commento facoltativo →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 space-y-3 rounded-xl border border-ink-line bg-ink-2/50 p-4"
    >
      <p className="font-display text-sm font-semibold text-paper">Commento rapido</p>
      <p className="text-xs leading-relaxed text-ink-soft">
        Facoltativo. Aiuta altri visitatori e ci permette di migliorare lo strumento. Pubblicheremo il commento solo
        after personal review — never auto-posted.
      </p>

      <div className="flex gap-1" role="group" aria-label="Valutazione">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`text-lg transition-colors ${
              rating >= n ? "text-amber" : "text-ink-soft/40"
            }`}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>

      <label className="block">
        <span className="sr-only">Il tuo nome</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome (facoltativo)"
          maxLength={80}
          className="min-h-11 w-full rounded-lg border border-ink-line bg-transparent px-3 text-sm text-paper placeholder:text-ink-soft/50 focus:border-amber"
        />
      </label>

      <label className="block">
        <span className="sr-only">Ruolo</span>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Ruolo, ad esempio sviluppatore (facoltativo)"
          maxLength={120}
          className="min-h-11 w-full rounded-lg border border-ink-line bg-transparent px-3 text-sm text-paper placeholder:text-ink-soft/50 focus:border-amber"
        />
      </label>

      <label className="block">
        <span className="sr-only">Feedback</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="In una frase, racconta se i risultati sono stati chiari o utili…"
          rows={3}
          maxLength={600}
          required
          className="w-full rounded-lg border border-ink-line bg-transparent px-3 py-2 text-sm text-paper placeholder:text-ink-soft/50 focus:border-amber"
        />
      </label>

      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <label className="flex items-start gap-2 text-xs text-ink-soft">
        <input
          type="checkbox"
          className="mt-0.5 accent-amber"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>
          Puoi pubblicare questo commento sul sito PrismWave dopo una revisione manuale (posso restare
          anonymous).
        </span>
      </label>

      {error && <p className="text-xs text-coral">{error}</p>}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-full px-5 py-2.5 font-display text-sm font-semibold text-ink disabled:opacity-60"
          style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
        >
          {state === "sending" ? "Invio in corso…" : "Invia il commento"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-mono text-[11px] uppercase tracking-wide text-ink-soft hover:text-paper"
        >
          Non ora
        </button>
      </div>
    </form>
  );
}