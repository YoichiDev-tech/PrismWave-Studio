import { Resend } from "resend";
import { isClientRateLimited } from "./_lib/rateLimit.js";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "PrismWave Studio <onboarding@resend.dev>";
const TO_OWNER = process.env.CONTACT_TO_EMAIL ?? "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL = "https://prismwave-studio.vercel.app";

interface VercelLikeRequest {
  method?: string;
  body?: Record<string, unknown>;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

function sanitizeFindings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((finding): finding is string => typeof finding === "string")
    .map((finding) => finding.trim())
    .filter((finding) => finding.length > 0)
    .map((finding) => finding.slice(0, 500))
    .slice(0, 20);
}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function handler(
  req: VercelLikeRequest,
  res: VercelLikeResponse
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito." });
  }

  if (
    await isClientRateLimited(req.headers, {
      bucket: "audit-lead",
      limit: 5,
      windowSeconds: 300,
    })
  ) {
    return res
      .status(429)
      .json({ error: "Troppe richieste. Riprova tra qualche minuto." });
  }

  const body = req.body || {};
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const siteUrl = typeof body.siteUrl === "string" ? body.siteUrl.trim() : "";
  const auditScore =
    typeof body.auditScore === "number" &&
    Number.isFinite(body.auditScore)
      ? Math.max(0, Math.min(100, Math.round(body.auditScore)))
      : 0;
  const auditFindings = sanitizeFindings(body.auditFindings);

  if (!email || !siteUrl) {
    return res
      .status(400)
      .json({ error: "Email e indirizzo del sito sono obbligatori." });
  }

  if (!EMAIL_RE.test(email)) {
    return res
      .status(400)
      .json({ error: "Inserisci un indirizzo email valido." });
  }

  if (!isValidHttpUrl(siteUrl)) {
    return res
      .status(400)
      .json({ error: "Inserisci un indirizzo web valido che utilizzi HTTP o HTTPS." });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (
    (!resendApiKey || !contactFromEmail) &&
    process.env.NODE_ENV !== "development"
  ) {
    console.error(
      "RESEND_API_KEY or CONTACT_FROM_EMAIL is missing; refusing to report an audit lead as delivered."
    );

    return res.status(503).json({
      error:
        "Il servizio email per l'analisi non è temporaneamente disponibile. Riprova tra poco.",
    });
  }

  const resend = resendApiKey ? new Resend(resendApiKey) : null;

  try {
    const { getSupabaseAdmin } = await import("./_lib/supabaseAdmin.js");
    const supabase = getSupabaseAdmin();

    const { error: leadError } = await supabase.from("leads").insert({
      name: "Audit tool lead",
      email,
      site_url: siteUrl,
      intent: "audit",
      message: `Richiesto il report completo dell'analisi per ${siteUrl}.`,
      audit_score: auditScore,
      audit_findings: auditFindings,
      status: "new",
    });

    if (leadError) throw leadError;
  } catch (dbError) {
    console.warn("Supabase audit lead persistence failed:", dbError);

    if (process.env.NODE_ENV === "production") {
      return res.status(503).json({
        error:
          "Non è stato possibile salvare la richiesta di analisi. Riprova tra poco.",
      });
    }
  }

  if (!resend) {
    return res
      .status(200)
      .json({ ok: true, note: "Solo ambiente di sviluppo. Non è stata inviata alcuna email." });
  }

  const findingsBlock =
    auditFindings.length > 0
      ? auditFindings
          .map((finding, index) => `${index + 1}. ${finding}`)
          .join("\n")
      : "I controlli automatici eseguiti non hanno rilevato criticità.";

  const visitorText = `Thanks for running the free website audit on ${siteUrl}.

Punteggio complessivo: ${auditScore}/100

Risultati rilevati dall'analisi:
${findingsBlock}

Cosa significano questi risultati
Questi risultati descrivono gli elementi individuati dai controlli automatici. Possono aiutare a riconoscere gli aspetti da approfondire, ma non determinano l'impatto complessivo su conversioni, ricavi, visibilità sui motori di ricerca o raccomandazioni dei sistemi AI.

L'analisi non equivale a una revisione manuale completa. Alcuni controlli utilizzano segnali limitati e i risultati devono essere valutati nel loro contesto prima di apportare modifiche.

Vuoi una valutazione da parte di una persona?
Rispondi a questa email per concordare una revisione gratuita di 15 minuti. Possiamo esaminare insieme i risultati e individuare le priorità. Se sarà opportuno svolgere un lavoro a pagamento, ti illustreremo ambito, prezzo e tempistiche prima di iniziare. Senza alcun obbligo.

PrismWave Studio
${SITE_URL}
`;

  try {
    const { error: visitorEmailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      ...(TO_OWNER ? { replyTo: TO_OWNER } : {}),
      subject: `Analisi del tuo sito — ${auditScore}/100`,
      text: visitorText,
    });

    if (visitorEmailError) {
      console.error("Audit report email delivery failed:", visitorEmailError);

      return res.status(502).json({
        error:
          "Non è stato possibile inviare il report di analisi. Riprova tra poco.",
      });
    }

    if (TO_OWNER && TO_OWNER.toLowerCase() !== email.toLowerCase()) {
      try {
        const { error: ownerEmailError } = await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_OWNER,
          subject: `[PrismWave contatto] Report di analisi richiesto — ${siteUrl} (${auditScore}/100)`,
          text: `Nuovo contatto per l'analisi

Email: ${email}
Sito: ${siteUrl}
Punteggio: ${auditScore}/100

Risultati:
${findingsBlock}

Il visitatore ha ricevuto il report automatico e un invito a richiedere una revisione gratuita di 15 minuti.
Puoi ricontattare direttamente il visitatore rispondendo alla sua email.
`,
        });

        if (ownerEmailError) {
          console.warn("Owner notification failed:", ownerEmailError);
        }
      } catch (notifyError) {
        console.warn("Owner notification failed:", notifyError);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Audit lead dispatch failed:", error);

    return res.status(500).json({
      error:
        "Non è stato possibile recapitare il report di analisi. Riprova tra poco.",
    });
  }
}
