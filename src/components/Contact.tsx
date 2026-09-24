import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Intent } from "../pages/Home";
import Reveal from "./Reveal";
import Section from "./Section";
import BookCall from "./BookCall";

export interface ContactPrefill {
  message?: string;
  siteUrl?: string;
  idea?: string;
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

interface ContactProps {
  intent: Intent | null;
  onIntentChange: (intent: Intent) => void;
  prefill?: ContactPrefill | null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ intent, onIntentChange, prefill }: ContactProps) {
  const activeIntent: Intent = intent ?? "audit";
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const [appliedNonce, setAppliedNonce] = useState<number | null>(null);
  if (prefill && prefill.nonce !== appliedNonce) {
    setAppliedNonce(prefill.nonce);
    setForm((prev) => ({
      ...prev,
      message: prefill.message ?? prev.message,
      siteUrl: prefill.siteUrl ?? prev.siteUrl,
      idea: prefill.idea ?? prev.idea,
    }));
  }

  const update =
    (field: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const message = form.message.trim() || form.idea.trim();

    if (!form.name.trim() || !form.email.trim() || !message) {
      setError("Name, email, and a short message are required.");
      return;
    }

    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          message,
          intent: activeIntent,
          auditScore: prefill?.auditScore,
          auditFindings: prefill?.auditFindings,
          scopeEstimate: prefill?.scopeEstimate,
        }),
      });

      const contentType = res.headers.get("content-type") ?? "";
      if (!contentType.includes("application/json")) {
        setError(
          "The contact service didn't respond with data — if you're running `npm run dev`, the /api routes only work under `vercel dev`."
        );
        setStatus("idle");
        return;
      }

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setError(data?.error || "Failed to send message. Please try again.");
        setStatus("idle");
        return;
      }

      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch {
      setError("Couldn't reach the server. Please check your connection.");
      setStatus("idle");
    }
  };

  return (
    <Section
      id="contact"
      ai="cta"
      intent="Capture a project inquiry with the visitor's selected intent and scope, or let them book a call."
      labelledBy="contact-title"
      className="bg-ink py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Reveal className="space-y-8">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Get in touch</p>
            <h2
              id="contact-title"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-[2.5rem]"
            >
              {activeIntent === "audit"
                ? "Let's take a look at what you've got."
                : "Let's build your idea from scratch."}
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Share your details and we'll reply within one business day with next steps — no obligation.
            </p>
          </div>
          <BookCall />
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-6 md:p-8">
            {status === "sent" ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <h3 className="font-display text-xl font-semibold text-paper">Message sent</h3>
                <p className="mt-2 text-sm text-ink-soft">We'll get back to you within one business day.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-mono text-[12px] uppercase text-amber underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                <div className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">I want to</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => onIntentChange("audit")}
                      className={`rounded-lg border px-4 py-3 text-left font-display text-sm font-semibold ${
                        activeIntent === "audit"
                          ? "border-amber bg-amber/10 text-paper"
                          : "border-ink-line text-ink-soft"
                      }`}
                    >
                      Improve an existing site
                    </button>
                    <button
                      type="button"
                      onClick={() => onIntentChange("build")}
                      className={`rounded-lg border px-4 py-3 text-left font-display text-sm font-semibold ${
                        activeIntent === "build"
                          ? "border-amber bg-amber/10 text-paper"
                          : "border-ink-line text-ink-soft"
                      }`}
                    >
                      Build something new
                    </button>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase text-ink-soft">Name</span>
                    <input
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update("name")}
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase text-ink-soft">Email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update("email")}
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                    />
                  </label>
                </div>

                {activeIntent === "audit" ? (
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase text-ink-soft">Current website URL</span>
                    <input
                      type="text"
                      value={form.siteUrl}
                      onChange={update("siteUrl")}
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                    />
                  </label>
                ) : (
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase text-ink-soft">What are you dreaming up?</span>
                    <input
                      type="text"
                      value={form.idea}
                      onChange={update("idea")}
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase text-ink-soft">Message</span>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    placeholder={
                      activeIntent === "build" ? "Optional if you filled in the idea above" : undefined
                    }
                    className="resize-none rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                  />
                </label>

                {error && (
                  <p role="alert" className="font-mono text-[12px] text-coral">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="min-h-12 rounded-full bg-amber px-7 font-display text-sm font-semibold text-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
