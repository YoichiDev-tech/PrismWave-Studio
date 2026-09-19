import { Resend } from "resend";
import { isClientRateLimited } from "./_lib/rateLimit.js";

const resend = new Resend(process.env.RESEND_API_KEY);
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

  // Looser than /api/send since this is a lower-intent, one-field capture,
  // but still capped — this is what stops someone from using your Resend
  // quota as a free email-sending relay.
  if (await isClientRateLimited(req.headers, { bucket: "audit-lead", limit: 5, windowSeconds: 300 })) {
    return res.status(429).json({ error: "Too many requests — try again in a few minutes." });
  }

  const body = req.body || {};
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const siteUrl = typeof body.siteUrl === "string" ? body.siteUrl.trim() : "";
  const auditScore = typeof body.auditScore === "number" ? body.auditScore : 0;
  const auditFindings = Array.isArray(body.auditFindings) ? (body.auditFindings as string[]) : [];

  if (!email || !siteUrl) {
    return res.status(400).json({ error: "Email and website URL are required." });
  }

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  // Safe Supabase logging
  try {
    const { getSupabaseAdmin } = await import("./_lib/supabaseAdmin.js");
    const supabase = getSupabaseAdmin();
    await supabase.from("leads").insert({
      name: "Audit tool lead",
      email,
      site_url: siteUrl,
      intent: "audit",
      message: `Requested full audit report for ${siteUrl}.`,
      audit_score: auditScore ?? 0,
      audit_findings: auditFindings || [],
      status: "new",
    });
  } catch (dbErr) {
    console.warn("Supabase audit logging skipped or failed:", dbErr);
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(200).json({ ok: true, note: "Audit lead saved (mock email)" });
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your audit report for ${siteUrl}`,
      text: `Audit score: ${auditScore}/100\n\nFindings:\n${(auditFindings || []).join("\n")}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Audit lead dispatch failed:", err);
    const message = err instanceof Error ? err.message : "Could not dispatch audit lead.";
    return res.status(500).json({ error: message });
  }
}