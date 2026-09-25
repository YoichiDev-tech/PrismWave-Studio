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

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function metaContent(html: string, nameOrProp: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${nameOrProp}["'][^>]+content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]+(?:name|property)=["']${nameOrProp}["'][^>]*>`,
    "i"
  );
  const m = html.match(re);
  return (m?.[1] || m?.[2] || "").trim() || null;
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (await isClientRateLimited(req.headers, { bucket: "site-meta", limit: 15, windowSeconds: 300 })) {
    return res.status(429).json({ error: "Too many requests — try again in a few minutes." });
  }

  const body = (req.body && typeof req.body === "object" ? req.body : {}) as Record<string, unknown>;
  const raw = typeof body.url === "string" ? body.url : "";
  if (!raw.trim()) {
    return res.status(400).json({ error: "URL is required." });
  }

  const target = normalizeUrl(raw);
  try {
    await assertPublicHttpUrl(target);
  } catch {
    return res.status(400).json({ error: "Enter a valid public http(s) URL." });
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(target, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "PrismWaveStudio-Tools/1.0 (+https://prismwave-studio.vercel.app)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timer);

    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : null;
    const canonicalMatch =
      html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) ||
      html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);

    return res.status(200).json({
      finalUrl: response.url || target,
      title,
      description: metaContent(html, "description"),
      ogTitle: metaContent(html, "og:title"),
      ogDescription: metaContent(html, "og:description"),
      ogImage: metaContent(html, "og:image"),
      canonical: canonicalMatch?.[1] ?? null,
      hasViewport: /<meta[^>]+name=["']viewport["']/i.test(html),
      hasTwitterCard: /name=["']twitter:card["']/i.test(html),
    });
  } catch {
    return res.status(502).json({ error: "Could not fetch that URL. Check it is public and try again." });
  }
}