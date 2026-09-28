// Persists a computed audit result so it can be shared via a public,
// unguessable /audit/:id link — called by AuditWidget right after
// scoreAudit() runs client-side. Scoring logic stays in one place
// (src/lib/auditScoring.ts); this endpoint only stores its output.
// Fire-and-forget from the caller's side: a failure here never blocks
// or breaks the widget's own score display, which has already rendered
// by the time this is called

import { randomBytes } from "node:crypto";
import { isClientRateLimited } from "./_lib/rateLimit.js";
import type { Json } from "./_lib/supabaseAdmin.js";

interface VercelLikeRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

interface CategoryPayload {
  key: string;
  label: string;
  score: number;
  findings: string[];
}

interface SavePayload {
  url: string;
  finalUrl: string;
  overall: number;
  categories: CategoryPayload[];
  signals?: Record<string, unknown>;
  sessionId?: string;
}

function isPayload(data: unknown): data is SavePayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.url === "string" &&
    d.url.trim().length > 0 &&
    typeof d.finalUrl === "string" &&
    d.finalUrl.trim().length > 0 &&
    typeof d.overall === "number" &&
    Array.isArray(d.categories)
  );
}

function sanitizeCategories(raw: CategoryPayload[]): CategoryPayload[] {
  return raw.slice(0, 10).map((c) => ({
    key: String(c.key ?? "").slice(0, 40),
    label: String(c.label ?? "").slice(0, 80),
    score: Math.max(0, Math.min(100, Math.round(Number(c.score) || 0))),
    findings: Array.isArray(c.findings)
      ? c.findings.slice(0, 10).map((f) => String(f).slice(0, 300))
      : [],
  }));
}

// Short, URL-safe, non-sequential. Not itself a security boundary —
// reports hold no PII — this just keeps links from being guessable
// or trivially enumerable
function generateId(): string {
  return randomBytes(9).toString("base64url"); // 12 chars
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (await isClientRateLimited(req.headers, { bucket: "audit-save", limit: 20, windowSeconds: 60 })) {
    res.status(429).json({ error: "Too many requests — try again in a minute." });
    return;
  }

  const payload = req.body;
  if (!isPayload(payload)) {
    res.status(400).json({ error: "Missing or invalid audit data." });
    return;
  }

  const overall = Math.max(0, Math.min(100, Math.round(payload.overall)));
  const categories = sanitizeCategories(payload.categories);
  const id = generateId();

  try {
    const { getSupabaseAdmin } = await import("./_lib/supabaseAdmin.js");
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("audits").insert({
      id,
      url: payload.url.slice(0, 500),
      final_url: payload.finalUrl.slice(0, 500),
      overall_score: overall,
      categories: categories as unknown as Json,
      signals: (payload.signals ?? {}) as unknown as Json,
      session_id: payload.sessionId ?? null,
    });

    if (error) throw error;

    res.status(200).json({ ok: true, id });
  } catch (err) {
    console.error("Audit save failed:", err);
    res.status(500).json({ error: "Couldn't save a shareable link right now." });
  }
}