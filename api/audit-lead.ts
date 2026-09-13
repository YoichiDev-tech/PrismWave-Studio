import { Resend } from "resend";
import { getSupabaseAdmin, type Json } from "./_lib/supabaseAdmin.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "PrismWave Studio <onboarding@resend.dev>";

type AuditLeadPayload = {
  email: string;
  siteUrl: string;
  auditScore: number;
  auditFindings: string[];
  sessionId?: string;
  attribution?: Json;
};

interface VercelLikeRequest {
  method?: string;
  body?: unknown;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

function isPayload(data: unknown): data is AuditLeadPayload {
  if (typeof data !== "object" || data === null) return false;
  const value = data as Record<string, unknown>;
  return (
    typeof value.email === "string" &&
    typeof value.siteUrl === "string" &&
    typeof value.auditScore === "number" &&
    Array.isArray(value.auditFindings) &&
    value.auditFindings.every((finding) => typeof finding === "string")
  );
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    res.status(500).json({ error: "Report delivery isn't configured yet." });
    return;
  }

  if (!isPayload(req.body)) {
    res.status(400).json({ error: "A valid email and audit result are required." });
    return;
  }

  const email = req.body.email.trim();
  const siteUrl = req.body.siteUrl.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email) || !siteUrl || req.body.auditScore < 0 || req.body.auditScore > 100) {
    res.status(400).json({ error: "Enter a valid email to receive the report." });
    return;
  }

  const findings = req.body.auditFindings.slice(0, 5);

  try {
    const supabase = getSupabaseAdmin();
    const lead = {
      intent: "audit",
      name: "Audit lead",
      email,
      site_url: siteUrl,
      message: `Requested the full audit report for ${siteUrl}.`,
      session_id: req.body.sessionId ?? null,
      audit_score: req.body.auditScore,
      audit_findings: findings,
      attribution: req.body.attribution ?? {},
    };
    const { data: existingLead, error: lookupError } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .eq("site_url", siteUrl)
      .maybeSingle();

    if (lookupError) {
      console.error("Audit lead lookup error:", lookupError);
      res.status(500).json({ error: "The report could not be prepared. Please try again." });
      return;
    }

    const { error: leadError } = existingLead
      ? await supabase.from("leads").update(lead).eq("id", existingLead.id)
      : await supabase.from("leads").insert({ ...lead, status: "new" });

    if (leadError) {
      console.error("Audit lead persistence error:", leadError);
      res.status(500).json({ error: "The report could not be prepared. Please try again." });
      return;
    }

    const { error: emailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your PrismWave audit report for ${siteUrl}`,
      text: [
        "Hi,",
        "",
        `Your PrismWave Studio audit for ${siteUrl} is ready. Your overall score was ${req.body.auditScore}/100.`,
        "",
        "Prioritized findings:",
        ...(findings.length ? findings.map((finding) => `- ${finding}`) : ["- No major issues detected in this pass."]),
        "",
        "If you want a human read on what to fix first, reply to this email or request the full teardown on the site.",
        "",
        "PrismWave Studio",
      ].join("\n"),
    });

    if (emailError) {
      console.error("Audit report email error:", emailError);
      res.status(502).json({ error: "The report could not be emailed. Please try again." });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Unexpected audit lead error:", error);
    res.status(500).json({ error: "Unexpected server error." });
  }
}
