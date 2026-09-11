import { Resend } from "resend";
import { getSupabaseAdmin, type Json } from "./_lib/supabaseAdmin";

const resend = new Resend(process.env.RESEND_API_KEY);

// Where inquiries land. Override with a CONTACT_TO_EMAIL env var if needed.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hello@prismwavestudio.com";

// Must be an address on a domain you've verified in Resend
// Until a domain is verified, Resend's shared onboarding@resend.dev
// address works for testing (delivery limits apply — see Resend's docs).
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "PrismWave Studio <onboarding@resend.dev>";

type Intent = "audit" | "build";

interface ContactPayload {
  intent: Intent;
  name: string;
  email: string;
  business: string;
  siteUrl: string;
  idea: string;
  message: string;
  sessionId?: string;
  attribution?: Json;
  auditScore?: number;
  auditFindings?: string[];
  scopeEstimate?: string;
}

// Minimal structural types for Vercel's Node.js request/response objects.
// Vercel augments plain Node req/res with .body, .method, .status(), .json()
// at runtime regardless of which types you import — these just describe
// that shape for the type checker, without pulling in @vercel/node
interface VercelLikeRequest {
  method?: string;
  body?: unknown;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

function isContactPayload(data: unknown): data is ContactPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    (d.intent === "audit" || d.intent === "build") &&
    typeof d.name === "string" &&
    typeof d.email === "string" &&
    typeof d.message === "string" &&
    typeof d.business === "string" &&
    typeof d.siteUrl === "string" &&
    typeof d.idea === "string"
  );
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    res.status(500).json({ error: "Email sending isn't configured yet." });
    return;
  }

  // Vercel auto-parses JSON bodies into req.body when Content-Type is
  // application/json, so there's no need to read/parse a stream here
  const payload = req.body;

  if (!isContactPayload(payload)) {
    res.status(400).json({ error: "Malformed request." });
    return;
  }

  const intent = payload.intent;
  const name = payload.name.trim();
  const email = payload.email.trim();
  const business = payload.business.trim();
  const siteUrl = payload.siteUrl.trim();
  const idea = payload.idea.trim();
  const message = payload.message.trim();

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required." });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    res.status(400).json({ error: "Enter a valid email address." });
    return;
  }

  const intentLabel = intent === "audit" ? "Free audit request" : "New build inquiry";

  const detailLines =
    intent === "audit"
      ? [`Current site: ${siteUrl || "—"}`]
      : [`Idea: ${idea || "—"}`];

  const auditLines =
    typeof payload.auditScore === "number"
      ? [
          `Audit score: ${payload.auditScore}/100`,
          `Top findings: ${(payload.auditFindings ?? []).join(" | ") || "None reported"}`,
        ]
      : [];

  try {
    const supabase = getSupabaseAdmin();
    const lead = {
      intent,
      name,
      email,
      business: business || null,
      site_url: siteUrl || null,
      idea: idea || null,
      message,
      session_id: payload.sessionId ?? null,
      attribution: payload.attribution ?? {},
      ...(typeof payload.auditScore === "number" ? { audit_score: payload.auditScore } : {}),
      ...(payload.auditFindings?.length ? { audit_findings: payload.auditFindings } : {}),
      ...(payload.scopeEstimate ? { scope_estimate: payload.scopeEstimate } : {}),
    };
    let leadLookup = supabase
      .from("leads")
      .select("id")
      .eq("email", email);
    leadLookup = siteUrl ? leadLookup.eq("site_url", siteUrl) : leadLookup.is("site_url", null);
    const { data: existingLead, error: lookupError } = await leadLookup.maybeSingle();

    if (lookupError) {
      console.error("Lead lookup error:", lookupError);
      res.status(500).json({ error: "Your message could not be recorded. Please try again." });
      return;
    }

    const { error: leadError } = existingLead
      ? await supabase.from("leads").update(lead).eq("id", existingLead.id)
      : await supabase.from("leads").insert({
          ...lead,
          audit_score: typeof payload.auditScore === "number" ? payload.auditScore : null,
          audit_findings: payload.auditFindings ?? [],
          scope_estimate: payload.scopeEstimate ?? null,
          status: "new",
        });

    if (leadError) {
      console.error("Lead persistence error:", leadError);
      res.status(500).json({ error: "Your message could not be recorded. Please try again." });
      return;
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `${intentLabel} from ${name}${business ? ` — ${business}` : ""}`,
      text: [
        `Type: ${intentLabel}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${business || "—"}`,
        ...detailLines,
        ...auditLines,
        `Scope estimate: ${payload.scopeEstimate || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      res.status(502).json({ error: "The message could not be sent. Please try again." });
      return;
    }

    const confirmation = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: TO_EMAIL,
      subject: "We received your PrismWave Studio inquiry",
      text: [
        `Hi ${name},`,
        "",
        "Thanks for reaching out to PrismWave Studio. Your message is in, and we'll reply within one business day with next steps.",
        "",
        `Request type: ${intentLabel}`,
        ...detailLines,
        ...auditLines,
        `Scope estimate: ${payload.scopeEstimate || "—"}`,
        "",
        "No action is needed from you right now.",
        "",
        "PrismWave Studio",
      ].join("\n"),
    });

    if (confirmation.error) console.error("Confirmation email error:", confirmation.error);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    res.status(500).json({ error: "Unexpected server error." });
  }
}