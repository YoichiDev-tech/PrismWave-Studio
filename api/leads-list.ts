import { getSupabaseAdmin } from "./_lib/supabaseAdmin.js";

interface VercelLikeRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

/** GET /api/leads-list — header x-ops-secret must match OPS_SECRET */
export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const secret = process.env.OPS_SECRET;
  const header = req.headers["x-ops-secret"];
  const provided = Array.isArray(header) ? header[0] : header;

  if (!secret || provided !== secret) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .select(
        "id, intent, name, email, business, site_url, idea, message, audit_score, audit_findings, scope_estimate, status, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return res.status(500).json({ error: "Could not load leads." });
    }

    return res.status(200).json({ leads: data ?? [] });
  } catch {
    return res.status(500).json({ error: "Server error." });
  }
}