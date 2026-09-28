// Public read endpoint for a saved audit report — powers /audit/:id
// (src/pages/AuditReport.tsx). Returns only what api/audit-save.ts
// stored: score, category breakdown, and the audited URL. No PII, no
// email — safe to serve to anonymous visitors and link-preview bots

interface VercelLikeRequest {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

// Matches generateId() in api/audit-save.ts (base64url, no separators)
const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

function getId(req: VercelLikeRequest): string | null {
  const raw = req.query?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  if (!id || !ID_RE.test(id)) return null;
  return id;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const id = getId(req);
  if (!id) {
    res.status(400).json({ error: "Missing or invalid report id." });
    return;
  }

  try {
    const { getSupabaseAdmin } = await import("./_lib/supabaseAdmin.js");
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("audits")
      .select("id, final_url, overall_score, categories, created_at")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      res.status(404).json({ error: "Report not found." });
      return;
    }

    res.status(200).json({
      ok: true,
      report: {
        id: data.id,
        finalUrl: data.final_url,
        overall: data.overall_score,
        categories: data.categories,
        createdAt: data.created_at,
      },
    });
  } catch (err) {
    console.error("Audit report fetch failed:", err);
    res.status(500).json({ error: "Couldn't load that report right now." });
  }
}