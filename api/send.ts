import { Resend } from "resend";
import { isClientRateLimited } from "./_lib/rateLimit.js";

const resend = new Resend(process.env.RESEND_API_KEY);
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
    return res.status(405).json({ error: "Method not allowed." });
  }

  // Tighter than audit-lead: this is the real contact form and every hit
  // sends an email to your inbox, so it's the endpoint most worth capping.
  if (await isClientRateLimited(req.headers, { bucket: "send", limit: 5, windowSeconds: 300 })) {
    return res.status(429).json({ error: "Too many requests — try again in a few minutes." });
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
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // Safe Supabase attempt — won't crash execution if table or keys are missing
  try {
    const { getSupabaseAdmin } = await import("./_lib/supabaseAdmin.js");
    const supabase = getSupabaseAdmin();
    await supabase.from("leads").insert({
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
  } catch (dbErr) {
    console.warn("Supabase lead insertion skipped or failed:", dbErr);
  }

  // Send Email via Resend
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY missing. Bypassing email dispatch for local testing.");
    return res.status(200).json({ ok: true, note: "Form accepted (email mock mode)" });
  }

  try {
    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New ${intent || "contact"} request from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nSite: ${siteUrl || "N/A"}\nIdea: ${idea || "N/A"}`,
    });

    if (emailError) {
      console.error("Resend delivery failed:", emailError);
      return res.status(500).json({ error: emailError.message || "Failed to deliver email." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Fatal send error:", err);
    const message = err instanceof Error ? err.message : "Internal server error.";
    return res.status(500).json({ error: message });
  }
}