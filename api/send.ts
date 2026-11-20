import { Resend } from "resend";
import { isClientRateLimited } from "./_lib/rateLimit.js";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@prismwavestudio.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface VercelLikeRequest {
  method?: string;
  body?: Record<string, unknown>;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metodo non consentito." });
  }

  // Tighter than audit-lead: this is the real contact form and every hit
  // sends an email to your inbox, so it's the endpoint most worth capping.
  if (await isClientRateLimited(req.headers, { bucket: "send", limit: 5, windowSeconds: 300 })) {
    return res.status(429).json({ error: "Troppe richieste: riprova tra qualche minuto." });
  }

  const body = req.body || {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const intent = typeof body.intent === "string" ? body.intent : "";
  const siteUrl = typeof body.siteUrl === "string" ? body.siteUrl.trim() : "";
  const idea = typeof body.idea === "string" ? body.idea.trim() : "";
  const business = typeof body.business === "string" ? body.business.trim() : "";
  const auditScore = typeof body.auditScore === "number" ? body.auditScore : null;
  const auditFindings = Array.isArray(body.auditFindings) ? (body.auditFindings as string[]) : [];
  const scopeEstimate = typeof body.scopeEstimate === "string" ? body.scopeEstimate : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Nome, email e messaggio sono obbligatori." });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Inserisci un indirizzo email valido." });
  }

  // Safe Supabase attempt — won't crash execution if table or keys are missing
  try {
    const { getSupabaseAdmin } = await import("./_lib/supabaseAdmin.js");
    const supabase = getSupabaseAdmin();
    const { error: leadError } = await supabase.from("leads").insert({
      name,
      email,
      intent: intent || "audit",
      site_url: siteUrl || null,
      idea: idea || null,
      business: business || null,
      message,
      audit_score: typeof auditScore === "number" ? auditScore : null,
      audit_findings: auditFindings || [],
      scope_estimate: scopeEstimate || null,
      status: "new",
    });
    if (leadError) {
      console.error("Supabase contact lead insertion failed:", leadError);
    }
  } catch (dbErr) {
    console.error("Supabase contact lead insertion failed:", dbErr);
  }

  // Email provider configuration is checked before constructing the SDK client.
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey || !process.env.CONTACT_FROM_EMAIL) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Email provider configuration is incomplete. Returning a local-only form test response; no email was sent.");
      return res.status(200).json({ ok: true, note: "Local development only — no email was sent." });
    }

    console.error("RESEND_API_KEY or CONTACT_FROM_EMAIL is missing; refusing to report a contact submission as delivered.");
    return res.status(503).json({
      error: "Il servizio email per i contatti non è configurato completamente. Scrivi a hello@prismwavestudio.com oppure prenota una chiamata gratuita di 15 minuti.",
    });
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Nuova richiesta (${intent || "contatto"}) da ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nMessaggio: ${message}\nSito: ${siteUrl || "Non indicato"}\nIdea: ${idea || "Non indicata"}`,
    });

    if (emailError) {
      console.error("Resend delivery failed:", emailError);
      return res.status(502).json({ error: "Non è stato possibile recapitare il messaggio. Riprova tra poco." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Fatal send error:", err);
    return res.status(502).json({ error: "Non è stato possibile recapitare il messaggio. Riprova tra poco." });
  }
}