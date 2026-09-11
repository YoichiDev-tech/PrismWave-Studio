import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Intent } from "../pages/Home";
import Reveal from "./Reveal";
import { getAttribution, getSessionIdForLead, trackAction } from "../lib/track";

// A pending hand-off from another section (AuditWidget, SprintConfigurator)
// that wants to pre-fill this form instead of leaving it blank
// nonce forces the sync below to re-apply even if the same site sends the same
// content twice in a row (e.g. re-running the audit on the same URL)
export interface ContactPrefill {
  message?: string;
  siteUrl?: string;
  auditScore?: number;
  auditFindings?: string[];
  scopeEstimate?: string;
  nonce: number;
}

interface FormState {
  name: string;
  email: string;
  business: string;
  siteUrl: string;
  idea: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  business: "",
  siteUrl: "",
  idea: "",
  message: "",
};

const COPY: Record<Intent, { eyebrow: string; heading: string; sub: string }> = {
  audit: {
    eyebrow: "Free website audit",
    heading: "Let's take a look at what you've got.",
    sub: "Share your current site and tell us where it's falling short. We'll reply within one business day with next steps — no obligation.",
  },
  build: {
    eyebrow: "New build",
    heading: "Let's build your idea from scratch.",
    sub: "Tell us what you're picturing and who it's for. We'll reply within one business day with next steps — no obligation.",
  },
};

interface ContactProps {
  intent: Intent | null;
  onIntentChange: (intent: Intent) => void;
  prefill?: ContactPrefill | null;
}

export default function Contact({ intent, onIntentChange, prefill }: ContactProps) {
  const activeIntent: Intent = intent ?? "audit";
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  // Apply a hand-off from AuditWidget/SprintConfigurator: merge in whatever
  // fields it sent without clobbering anything the visitor already typed
  // Done during render (React's documented pattern for syncing state from a
  // changed prop) rather than in a useEffect, which avoids an extra
  // render pass and the associated "setState in effect" lint warning
  const [appliedNonce, setAppliedNonce] = useState<number | null>(null);
  if (prefill && prefill.nonce !== appliedNonce) {
    setAppliedNonce(prefill.nonce);
    setForm((prev) => ({
      ...prev,
      message: prefill.message ?? prev.message,
      siteUrl: prefill.siteUrl ?? prev.siteUrl,
    }));
  }

  const update = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const selectIntent = (next: Intent) => {
    onIntentChange(next);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          intent: activeIntent,
          sessionId: getSessionIdForLead(),
          attribution: getAttribution(),
          auditScore: prefill?.auditScore,
          auditFindings: prefill?.auditFindings,
          scopeEstimate: prefill?.scopeEstimate,
        }),
      });

      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }

      trackAction("contact_submitted", { intent: activeIntent });
      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setStatus("idle");
    }
  };

  const copy = COPY[activeIntent];


  return (
    <section id="contact" className="bg-ink py-24 md:py-32 cursor-default">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Get in touch</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-paper md:text-[2.75rem]">
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-sm text-ink-soft">{copy.sub}</p>

          <div className="mt-10 space-y-4 font-mono text-[13px] text-ink-soft">
            <p>yoichi_dev@proton.me</p>
            <p>Mon-Fri, 9:00am-5:30pm</p>
          </div>
          <div className="mt-8 max-w-sm border-l border-amber pl-4 text-sm leading-relaxed text-ink-soft">
            <p className="font-display font-semibold text-paper">No pressure after you reach out.</p>
            <p className="mt-2">You will get a clear reply within one business day. We confirm fit and scope before any payment or project commitment.</p>
          </div>
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-6 md:p-9 transition-transform hover:scale-[1.02] hover:bg-ink-2 hover:border-amber">
            {status === "sent" ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber text-amber">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-paper">Message sent</h3>
                <p className="mt-2 max-w-xs text-sm text-ink-soft">
                  Thanks for reaching out — we'll get back to you within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-mono text-[12px] uppercase tracking-wide text-amber underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                {/* Intent toggle — routes the visitor and the fields below */}
                <div className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">I want to</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => selectIntent("audit")}
                      aria-pressed={activeIntent === "audit"}
                      className={`rounded-lg border px-4 py-3 text-left font-display text-sm font-semibold transition-colors ${
                        activeIntent === "audit"
                          ? "border-amber bg-amber/10 text-paper"
                          : "border-ink-line text-ink-soft hover:border-ink-soft"
                      }`}
                    >
                      Improve an existing site
                    </button>
                    <button
                      type="button"
                      onClick={() => selectIntent("build")}
                      aria-pressed={activeIntent === "build"}
                      className={`rounded-lg border px-4 py-3 text-left font-display text-sm font-semibold transition-colors ${
                        activeIntent === "build"
                          ? "border-amber bg-amber/10 text-paper"
                          : "border-ink-line text-ink-soft hover:border-ink-soft"
                      }`}
                    >
                      Build something new
                    </button>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Name</span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Jordan Blake"
                      autoComplete="name"
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Email</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="jordan@business.com"
                      autoComplete="email"
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                    {activeIntent === "audit" ? "Business name" : "Project or business name (if you have one)"}
                  </span>
                  <input
                    type="text"
                    value={form.business}
                    onChange={update("business")}
                    placeholder="Blake & Co."
                    autoComplete="organization"
                    className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                  />
                </label>

                {activeIntent === "audit" ? (
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Current website URL</span>
                    <input
                      type="text"
                      value={form.siteUrl}
                      onChange={update("siteUrl")}
                      placeholder="yourbusiness.com"
                      autoComplete="url"
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                    />
                  </label>
                ) : (
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">What are you dreaming up?</span>
                    <input
                      type="text"
                      value={form.idea}
                      onChange={update("idea")}
                      placeholder="e.g. an anime ranking site, a barbershop booking page, a supermarket site"
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Message</span>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    placeholder={
                      activeIntent === "audit"
                        ? "Tell us about your business and what isn't working with your current site."
                        : "Tell us more about the idea — who it's for, what it should do, any sites you like the feel of."
                    }
                    rows={5}
                    className="resize-none rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper placeholder:text-ink-soft/60 transition-colors focus:border-amber"
                  />
                </label>

                {error && <p className="font-mono text-[12px] text-coral">{error}</p>}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                  style={{ background: "linear-gradient(100deg, #FFB84D 0%, #FF7A59 100%)" }}
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}