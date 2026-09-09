import { createHash } from "node:crypto";
import { getSupabaseAdmin, type Json } from "./_lib/supabaseAdmin";

interface VercelLikeRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

type EventKind = "pageview" | "action";

interface TrackPayload {
  kind: EventKind;
  eventName: string;
  path?: string;
  intent?: "audit" | "build";
  sessionId: string;
  metadata?: Json;
}

const ALLOWED_EVENT_NAMES = new Set([
  "pageview",
  "contact_submitted",
  "audit_run",
  "audit_completed",
  "audit_teardown_requested",
  "chat_opened",
  "chat_message_sent",
  "cta_click",
]);

function isTrackPayload(data: unknown): data is TrackPayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    (d.kind === "pageview" || d.kind === "action") &&
    typeof d.eventName === "string" &&
    ALLOWED_EVENT_NAMES.has(d.eventName) &&
    typeof d.sessionId === "string" &&
    d.sessionId.length > 0 &&
    d.sessionId.length < 128
  );
}

// Salted hash so we can spot abusive bursts from one IP without ever storing
// a raw IP address. Rotate SESSION_HASH_SALT periodically if you want old
// hashes to stop correlating with new ones
const SALT = process.env.SESSION_HASH_SALT ?? "prismwave-fallback-salt";

function hashIp(ip: string): string {
  return createHash("sha256").update(`${SALT}:${ip}`).digest("hex").slice(0, 32);
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const payload = req.body;
  if (!isTrackPayload(payload)) {
    // Fail quietly with 204-equivalent semantics — a malformed tracking
    // call should never surface an error to a real visitor
    res.status(200).json({ ok: true });
    return;
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  const ip = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(",")[0]?.trim();
  const userAgent = req.headers["user-agent"];

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("interaction_events").insert({
      kind: payload.kind,
      event_name: payload.eventName,
      path: payload.path ?? null,
      intent: payload.intent ?? null,
      session_id: payload.sessionId,
      metadata: payload.metadata ?? {},
      ip_hash: ip ? hashIp(ip) : null,
      user_agent: typeof userAgent === "string" ? userAgent.slice(0, 300) : null,
    });

    if (error) {
      console.error("track insert error:", error);
    }
  } catch (err) {
    // Tracking must never break the site Log and move on
    console.error("track handler error:", err);
  }

  res.status(200).json({ ok: true });
}