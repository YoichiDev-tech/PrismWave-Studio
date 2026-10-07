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
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (rating < 1) {
      setError("Pick a star rating.");
      return;
    }
    if (message.trim().length < 10) {
      setError("One short sentence is enough — a bit longer than that, please.");
      return;
    }
    if (!consent) {
      setError("Tick the box if we may show this after review.");
      return;
    }

    setState("sending");
    try {
      const r = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anonymous",
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
        throw new Error(j.error || "Could not send");
      }
      trackAction("cta_click", {
        metadata: { label: "audit_feedback_sent", location: "audit-widget", rating },
      });
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (state === "sent") {
    return (
      <div className="mt-6 rounded-xl border border-ink-line bg-ink-2/50 p-4">
        <p className="font-display text-sm font-semibold text-paper">Thanks — noted.</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">
          If you allowed publishing, it only goes live after a manual check. Nothing
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
          Was this audit useful? Leave optional feedback →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mt-6 space-y-3 rounded-xl border border-ink-line bg-ink-2/50 p-4"
    >
      <p className="font-display text-sm font-semibold text-paper">Quick feedback</p>
      <p className="text-xs leading-relaxed text-ink-soft">
        Optional. Helps other visitors and helps us improve the tool. Published only
        after personal review — never auto-posted.
      </p>

      <div className="flex gap-1" role="group" aria-label="Rating">
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
        <span className="sr-only">Your first name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First name (optional)"
          maxLength={80}
          className="min-h-11 w-full rounded-lg border border-ink-line bg-transparent px-3 text-sm text-paper placeholder:text-ink-soft/50 focus:border-amber"
        />
      </label>

      <label className="block">
        <span className="sr-only">Role</span>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Role — e.g. Developer (optional)"
          maxLength={120}
          className="min-h-11 w-full rounded-lg border border-ink-line bg-transparent px-3 text-sm text-paper placeholder:text-ink-soft/50 focus:border-amber"
        />
      </label>

      <label className="block">
        <span className="sr-only">Feedback</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="One sentence on whether the findings were clear or useful…"
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
          You may show this on the PrismWave site after manual approval (I can stay
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
          {state === "sending" ? "Sending…" : "Send feedback"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-mono text-[11px] uppercase tracking-wide text-ink-soft hover:text-paper"
        >
          Not now
        </button>
      </div>
    </form>
  );
}