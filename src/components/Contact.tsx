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
      setError("Nome, email e un breve messaggio sono obbligatori.");
      return;
    }

    if (!EMAIL_RE.test(form.email.trim())) {
      setError("Inserisci un indirizzo email valido.");
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
          "Il servizio di contatto non ha restituito dati. Se stai usando `npm run dev`, gli endpoint /api funzionano solo con `vercel dev`."
        );
        setStatus("idle");
        return;
      }

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setError(data?.error || "Invio del messaggio non riuscito. Riprova.");
        setStatus("idle");
        return;
      }

      setStatus("sent");
      setForm(EMPTY_FORM);
    } catch {
      setError("Impossibile raggiungere il server. Controlla la connessione.");
      setStatus("idle");
    }
  };

  return (
    <Section
      id="contact"
      ai="cta"
      intent="Raccogliere una richiesta di progetto in base all'esigenza e all'ambito selezionati dal visitatore, oppure permettere di prenotare una chiamata."
      labelledBy="contact-title"
      className="bg-ink py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
        <Reveal className="space-y-8">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-widest text-ink-soft">Contattaci</p>
            <h2
              id="contact-title"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-paper md:text-[2.5rem]"
            >
              {activeIntent === "audit"
                ? "Analizziamo insieme il tuo sito."
                : "Realizziamo la tua idea da zero."}
            </h2>
            <p className="mt-4 max-w-sm text-ink-soft">
              Lasciaci i tuoi recapiti: ti risponderemo entro un giorno lavorativo indicandoti i prossimi passi, senza impegno.
            </p>
          </div>
          <BookCall />
        </Reveal>

        <Reveal delay={1}>
          <div className="rounded-2xl border border-ink-line bg-ink-2/60 p-6 md:p-8">
            {status === "sent" ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <h3 className="font-display text-xl font-semibold text-paper">Messaggio inviato</h3>
                <p className="mt-2 text-sm text-ink-soft">Ti risponderemo entro un giorno lavorativo.</p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 font-mono text-[12px] uppercase text-amber underline"
                >
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-5">
                <div className="grid gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">Vorrei</span>
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
                      Migliorare un sito esistente
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
                      Realizzare qualcosa di nuovo
                    </button>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase text-ink-soft">Nome</span>
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
                    <span className="font-mono text-[11px] uppercase text-ink-soft">Indirizzo del sito attuale</span>
                    <input
                      type="text"
                      value={form.siteUrl}
                      onChange={update("siteUrl")}
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                    />
                  </label>
                ) : (
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase text-ink-soft">Che cosa vorresti realizzare?</span>
                    <input
                      type="text"
                      value={form.idea}
                      onChange={update("idea")}
                      className="rounded-lg border border-ink-line bg-transparent px-4 py-3 text-paper"
                    />
                  </label>
                )}

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase text-ink-soft">Messaggio</span>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={4}
                    placeholder={
                      activeIntent === "build" ? "Facoltativo se hai già descritto la tua idea qui sopra" : undefined
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
                  {status === "sending" ? "Invio in corso…" : "Invia il messaggio"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
