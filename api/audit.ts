// Fetches a prospect's site server-side (avoids browser CORS)
// and returns raw, honest signals about it

import { assertPublicHttpUrl } from "./_lib/ssrfGuard.js";
import { isClientRateLimited } from "./_lib/rateLimit.js";

interface VercelLikeRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
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

function analyzeHtml(html: string, hasMediaQueries = false): Omit<AuditSignals, "finalUrl" | "isHttps" | "responseTimeMs" | "pageWeightKb"> {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const imgTags = html.match(/<img\b[^>]*>/gi) ?? [];
  const imagesMissingAlt = imgTags.filter((tag) => !/\balt\s*=\s*["'][^"']*["']/i.test(tag)).length;
  const styleBlocks = html.match(/<style[^>]*>[\s\S]*?<\/style>/gi) ?? [];

  // Robust meta description check handling attribute order
  const hasMetaDesc = /<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["'][^"']{20,}["']/i.test(html) ||
                     /<meta\b[^>]*\bcontent=["'][^"']{20,}["'][^>]*\bname=["']description["']/i.test(html);

  // Flexible Open Graph check for title or type
  const hasOg = /<meta\b[^>]*\b(property|name)=["']og:(title|type|image)["']/i.test(html);

  return {
    hasViewportMeta: /<meta\b[^>]*\bname=["']viewport["']/i.test(html),
    hasMetaDescription: hasMetaDesc,
    titleLength: titleMatch ? titleMatch[1].trim().length : 0,
    h1Count: (html.match(/<h1\b/gi) ?? []).length,
    hasSemanticLandmarks: /<header\b/i.test(html) && /<main\b/i.test(html) && /<footer\b/i.test(html),
    hasStructuredData: /<script\b[^>]*\btype=["']application\/ld\+json["']/i.test(html),
    imageCount: imgTags.length,
    imagesMissingAlt,
    hasMediaQueries: hasMediaQueries || styleBlocks.some((block) => /@media/i.test(block)),
    hasOpenGraph: hasOg,
  };
}

async function hasResponsiveStyles(html: string, pageUrl: string, signal: AbortSignal): Promise<boolean> {
  if (/<style[^>]*>[\s\S]*?@media/i.test(html)) return true;

  const stylesheetUrls = [...html.matchAll(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)]
    .map(([tag]) => tag.match(/\bhref=["']([^"']+)["']/i)?.[1])
    .filter((href): href is string => Boolean(href))
    .slice(0, 5); // Limit to top 5 external stylesheets to keep response fast

  for (const href of stylesheetUrls) {
    try {
      const stylesheetUrl = new URL(href, pageUrl).toString();
      await assertPublicHttpUrl(stylesheetUrl); // stylesheet links are attacker-influenced too
      const response = await fetch(stylesheetUrl, {
        signal,
        headers: { "User-Agent": "PrismWaveStudio-AuditBot/1.0 (+https://prismwavestudio.com)" },
      });
      if (response.ok && /@media\b/i.test(await response.text())) return true;
    } catch {
      // Ignore stylesheet failures (including blocked/unsafe targets) to
      // prevent blocking the main flow
    }
  }

  return false;
}

/**
 * Fetches targetUrl, following redirects manually so every hop — not just
 * the first URL — gets SSRF-checked before we request it. `fetch()`'s
 * built-in `redirect: "follow"` would happily chase a redirect straight
 * into a private IP after the first check passed.
 */
async function fetchFollowingRedirects(
  startUrl: string,
  signal: AbortSignal,
  maxRedirects = 3
): Promise<{ response: Response; finalUrl: string }> {
  let currentUrl = startUrl;

  for (let hop = 0; hop <= maxRedirects; hop++) {
    await assertPublicHttpUrl(currentUrl);

    const response = await fetch(currentUrl, {
      signal,
      redirect: "manual",
      headers: { "User-Agent": "PrismWaveStudio-AuditBot/1.0 (+https://prismwavestudio.com)" },
    });

    const isRedirect = response.status >= 300 && response.status < 400;
    const location = response.headers.get("location");

    if (isRedirect && location) {
      currentUrl = new URL(location, currentUrl).toString();
      continue;
    }

    return { response, finalUrl: currentUrl };
  }

  throw new Error("Too many redirects.");
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  if (await isClientRateLimited(req.headers, { bucket: "audit", limit: 10, windowSeconds: 60 })) {
    res.status(429).json({ error: "Too many audit requests — try again in a minute." });
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

  try {
    await assertPublicHttpUrl(targetUrl);
  } catch {
    res.status(400).json({ error: "That URL can't be audited." });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const started = Date.now();
    const { response, finalUrl } = await fetchFollowingRedirects(targetUrl, controller.signal);
    const responseTimeMs = Date.now() - started;

    if (!response.ok) {
      clearTimeout(timeout);
      res.status(502).json({ error: `That site responded with a ${response.status} error.` });
      return;
    }

    const html = await response.text();
    const pageWeightKb = Math.round(new TextEncoder().encode(html).length / 1024);

    // Process external styles while timeout is still active
    const hasMedia = await hasResponsiveStyles(html, finalUrl, controller.signal);
    clearTimeout(timeout);

    const analyzed = analyzeHtml(html, hasMedia);

    const signals: AuditSignals = {
      finalUrl,
      isHttps: finalUrl.startsWith("https://"),
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