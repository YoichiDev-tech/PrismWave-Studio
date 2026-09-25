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

function pick(headers: Headers, name: string): string | null {
  return headers.get(name);
}

export default async function handler(req: VercelLikeRequest, res: VercelLikeResponse): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (await isClientRateLimited(req.headers, { bucket: "site-headers", limit: 15, windowSeconds: 300 })) {
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
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "PrismWaveStudio-Tools/1.0 (+https://prismwave-studio.vercel.app)",
      },
    });
    clearTimeout(timer);

    const h = response.headers;
    const finalUrl = response.url || target;
    const isHttps = finalUrl.startsWith("https://");

    const interesting = [
      "content-security-policy",
      "strict-transport-security",
      "x-frame-options",
      "x-content-type-options",
      "referrer-policy",
      "permissions-policy",
      "server",
    ];

    const headers: Record<string, string> = {};
    for (const name of interesting) {
      const v = pick(h, name);
      if (v) headers[name] = v;
    }

    const checks = [
      {
        id: "https",
        label: "HTTPS",
        pass: isHttps,
        detail: isHttps ? "Site is served over HTTPS." : "Site is not on HTTPS — browsers will warn visitors.",
      },
      {
        id: "hsts",
        label: "Strict-Transport-Security",
        pass: Boolean(pick(h, "strict-transport-security")),
        detail: pick(h, "strict-transport-security")
          ? pick(h, "strict-transport-security")!
          : "Missing HSTS — browsers may not force HTTPS on return visits.",
      },
      {
        id: "xfo",
        label: "X-Frame-Options / frame protection",
        pass: Boolean(pick(h, "x-frame-options") || /frame-ancestors/i.test(pick(h, "content-security-policy") || "")),
        detail:
          pick(h, "x-frame-options") ||
          (pick(h, "content-security-policy")?.match(/frame-ancestors[^;]*/i)?.[0] ??
            "Missing clickjacking protection (X-Frame-Options or CSP frame-ancestors)."),
      },
      {
        id: "xcto",
        label: "X-Content-Type-Options",
        pass: (pick(h, "x-content-type-options") || "").toLowerCase().includes("nosniff"),
        detail: pick(h, "x-content-type-options") || "Missing nosniff — browsers may MIME-sniff responses.",
      },
      {
        id: "referrer",
        label: "Referrer-Policy",
        pass: Boolean(pick(h, "referrer-policy")),
        detail: pick(h, "referrer-policy") || "No Referrer-Policy — referrers may leak full URLs to third parties.",
      },
      {
        id: "csp",
        label: "Content-Security-Policy",
        pass: Boolean(pick(h, "content-security-policy")),
        detail: pick(h, "content-security-policy")
          ? "CSP present (review directives for your app)."
          : "No CSP — XSS impact is harder to contain.",
      },
    ];

    return res.status(200).json({
      finalUrl,
      status: response.status,
      isHttps,
      headers,
      checks,
    });
  } catch {
    return res.status(502).json({ error: "Could not fetch that URL. Check it is public and try again." });
  }
}