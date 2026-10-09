import { Resend } from "resend";
import { isClientRateLimited } from "./_lib/rateLimit.js";

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "PrismWave Studio <onboarding@resend.dev>";
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

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

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

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey && process.env.NODE_ENV !== "development") {
    console.error("RESEND_API_KEY is missing; refusing to report an audit lead as delivered.");
    return res.status(503).json({
      error: "The audit email service is temporarily unavailable. Please try again shortly.",
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
      message: `Requested full audit report for ${siteUrl}.`,
      audit_score: auditScore ?? 0,
      audit_findings: auditFindings || [],
      status: "new",
    });
    if (leadError) throw leadError;
  } catch (dbErr) {
    console.warn("Supabase audit lead persistence failed:", dbErr);
    if (process.env.NODE_ENV === "production") {
      return res.status(503).json({
        error: "We couldn't save your audit request just now. Please try again shortly.",
      });
    }
  }

  if (!resend) {
    return res.status(200).json({ ok: true, note: "Development only — no email was sent." });
  }

  const topFindings =
    auditFindings.length > 0 ? auditFindings.slice(0, 5) : ([] as string[]);

  const findingsBlock =
    topFindings.length > 0
      ? topFindings.map((f, i) => `${i + 1}. ${f}`).join("\n")
      : "No major issues were flagged in this automated pass.";

  const visitorText = `Thanks for running the free audit on ${siteUrl}.

Overall score: ${auditScore}/100

From the automated pass, the highest-impact items to look at first are:
${findingsBlock}

---
What this means
These are the issues the tool flagged as most likely to hurt clarity, speed, or how people (and AI tools) read your site.

Want a human read?
Reply to this email for a free 15-min review. We'll walk through the findings and, if it makes sense, outline a fixed-scope option (price + timeline). No obligation.

— Yoichi
PrismWave Studio
${SITE_URL}
`;

  try {
    const { error: visitorEmailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      ...(TO_OWNER ? { replyTo: TO_OWNER } : {}),
      subject: `Your audit for ${siteUrl} — ${auditScore}/100`,
      text: visitorText,
    });
    if (visitorEmailError) {
      console.error("Audit report email delivery failed:", visitorEmailError);
      return res.status(502).json({ error: "We couldn't send your audit report. Please try again shortly." });
    }

    if (TO_OWNER && TO_OWNER !== email) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_OWNER,
          subject: `[PrismWave lead] Audit report requested — ${siteUrl} (${auditScore}/100)`,
          text: `New audit lead

Email: ${email}
Site: ${siteUrl}
Score: ${auditScore}/100

Findings:
${findingsBlock}

They already received the automated report + 15-min review invite.
Reply from your inbox if you want to follow up personally.
`,
        });
      } catch (notifyErr) {
        console.warn("Owner notify failed:", notifyErr);
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Audit lead dispatch failed:", err);
    const message = err instanceof Error ? err.message : "Could not dispatch audit lead.";
    return res.status(500).json({ error: message });
  }
}