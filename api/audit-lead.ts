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
    return res.status(405).json({ error: "Method not allowed." });
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
      .json({ error: "Too many requests. Try again in a few minutes." });
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
      .json({ error: "Email and website URL are required." });
  }

  if (!EMAIL_RE.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  if (!isValidHttpUrl(siteUrl)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid HTTP or HTTPS website URL." });
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
        "The audit email service is temporarily unavailable. Please try again shortly.",
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
      message: `Requested the full audit findings for ${siteUrl}.`,
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
          "We couldn't save your audit request just now. Please try again shortly.",
      });
    }
  }

  if (!resend) {
    return res
      .status(200)
      .json({ ok: true, note: "Development only. No email was sent." });
  }

  const findingsBlock =
    auditFindings.length > 0
      ? auditFindings
          .map((finding, index) => `${index + 1}. ${finding}`)
          .join("\n")
      : "This automated pass did not flag any findings in the checks it ran.";

  const visitorText = `Thanks for running the free website audit on ${siteUrl}.

Overall score: ${auditScore}/100

What the scan detected:
${findingsBlock}

What this means
These findings describe the signals detected by the automated checks. They can help identify areas worth reviewing, but they do not establish the full impact on conversions, revenue, search visibility, or AI recommendations.

The scan is not a complete manual review. Some checks use limited signals, and the results should be considered in context before making changes.

Want a human review?
Reply to this email to discuss a free 15-minute review. We can walk through the findings with you and help determine what is worth investigating first. If paid work makes sense, we will explain the proposed scope, price, and timeline before anything begins. There is no obligation.

PrismWave Studio
${SITE_URL}
`;

  try {
    const { error: visitorEmailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      ...(TO_OWNER ? { replyTo: TO_OWNER } : {}),
      subject: `Your website audit — ${auditScore}/100`,
      text: visitorText,
    });

    if (visitorEmailError) {
      console.error("Audit report email delivery failed:", visitorEmailError);

      return res.status(502).json({
        error:
          "We couldn't send your audit report. Please try again shortly.",
      });
    }

    if (TO_OWNER && TO_OWNER.toLowerCase() !== email.toLowerCase()) {
      try {
        const { error: ownerEmailError } = await resend.emails.send({
          from: FROM_EMAIL,
          to: TO_OWNER,
          subject: `[PrismWave lead] Audit report requested — ${siteUrl} (${auditScore}/100)`,
          text: `New audit lead

Email: ${email}
Site: ${siteUrl}
Score: ${auditScore}/100

Findings:
${findingsBlock}

The visitor received the automated report and an invitation to request a free 15-minute review.
You can follow up personally by replying to the visitor.
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
        "We couldn't deliver your audit report right now. Please try again shortly.",
    });
  }
}
