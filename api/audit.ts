// Fetches a prospect's site server-side (avoids browser CORS)
// and returns raw, honest signals about it 
// No fake scores are computed here: the scoring happens client-side in AuditWidget.tsx
// from these real signals, so it's easy to see exactly what's being measured and why

// Types structure for vercel's node.js request/response objects
interface VercelLikeRequest {
  method?: string;
  body?: unknown;
}

interface VercelLikeResponse {
  status(code: number): VercelLikeResponse;
  json(body: Record<string, unknown>): void;
}

export interface AuditSignals {
  finalUrl: string;
  isHttps: boolean;
  responseTimeMs: number;
  pageWeightKb: number;
  hasViewportMeta: boolean;
  hasMetaDescription: boolean;
  titleLength: number;
  h1Count: number;
  hasSemanticLandmarks: boolean; // <header>/<nav>/<main>/<footer>
  hasStructuredData: boolean; // JSON-LD (application/ld+json)
  imageCount: number;
  imagesMissingAlt: number;
  hasMediaQueries: boolean; // inline styles or linked stylesheets
  hasOpenGraph: boolean;
}

function isPayload(data: unknown): data is { url: string } {
  return typeof data === "object" && data !== null && typeof (data as Record<string, unknown>).url === "string";
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// Cheap, dependency-free HTML sniffing
// This is intentionally not a full DOM parser — good enough to give honest,
// directional signals without pulling in a heavy parsing library for a lightweight edge function
function analyzeHtml(html: string, hasMediaQueries = false): Omit<AuditSignals, "finalUrl" | "isHttps" | "responseTimeMs" | "pageWeightKb"> {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imagesMissingAlt = imgTags.filter((tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)).length;
  const styleBlocks = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) ?? [];

  return {
    hasViewportMeta: /<meta[^>]+name=["']viewport["']/i.test(html),
    hasMetaDescription: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']{20,}["']/i.test(html),
    titleLength: titleMatch ? titleMatch[1].trim().length : 0,
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    hasSemanticLandmarks: /<header\b/i.test(html) && /<main\b/i.test(html) && /<footer\b/i.test(html),
    hasStructuredData: /<script[^>]+type=["']application\/ld\+json["']/i.test(html),
    imageCount: imgTags.length,
    imagesMissingAlt,
    hasMediaQueries: hasMediaQueries || styleBlocks.some((block) => /@media/i.test(block)),
    hasOpenGraph: /<meta[^>]+property=["']og:title["']/i.test(html),
  };
}

async function hasResponsiveStyles(html: string, pageUrl: string, signal: AbortSignal): Promise<boolean> {
  if (/<style[^>]*>[\s\S]*?@media/i.test(html)) return true;

  const stylesheetUrls = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)]
    .map(([tag]) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter((href): href is string => Boolean(href))
    .slice(0, 8);

  for (const href of stylesheetUrls) {
    try {
      const stylesheetUrl = new URL(href, pageUrl).toString();
      const response = await fetch(stylesheetUrl, {
        signal,
        headers: { "User-Agent": "PrismWaveStudio-AuditBot/1.0 (+https://prismwavestudio.com)" },
      });
      if (response.ok && /@media\b/i.test(await response.text())) return true;
    } catch {
      // A blocked stylesheet should not make the entire audit fail.
    }
  }

  return false;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const payload = req.body;
  if (!isPayload(payload) || !payload.url.trim()) {
    res.status(400).json({ error: "A site URL is required." });
    return;
  }

  const targetUrl = normalizeUrl(payload.url);

  try {
    new URL(targetUrl);
  } catch {
    res.status(400).json({ error: "That doesn't look like a valid URL." });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const started = Date.now();
    const response = await fetch(targetUrl, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        // Identify ourselves honestly — this is a one-off audit fetch, not a crawler
        "User-Agent": "PrismWaveStudio-AuditBot/1.0 (+https://prismwavestudio.com)",
      },
    });
    const responseTimeMs = Date.now() - started;
    clearTimeout(timeout);

    if (!response.ok) {
      res.status(502).json({ error: `That site responded with a ${response.status} error.` });
      return;
    }

    const html = await response.text();
    const pageWeightKb = Math.round(new TextEncoder().encode(html).length / 1024);
    const analyzed = analyzeHtml(html, await hasResponsiveStyles(html, response.url || targetUrl, controller.signal));

    const signals: AuditSignals = {
      finalUrl: response.url || targetUrl,
      isHttps: (response.url || targetUrl).startsWith("https://"),
      responseTimeMs,
      pageWeightKb,
      ...analyzed,
    };

    res.status(200).json({ ok: true, signals });
  } catch (err) {
    clearTimeout(timeout);
    const aborted = err instanceof Error && err.name === "AbortError";
    console.error("Audit fetch failed:", err);
    res.status(aborted ? 504 : 502).json({
      error: aborted
        ? "That site took too long to respond."
        : "Couldn't reach that site — check the URL and try again.",
    });
  }
}