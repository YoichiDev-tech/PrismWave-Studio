// Pulls the parts of a page a redesign actually needs. Regex-based on purpose
// (same approach as api/audit.ts) so there's no HTML-parser dependency.
// Nothing here is trusted for security — the iframe sandbox is the boundary.

export interface SiteSection {
  heading: string;
  text: string;
}

export interface SiteContent {
  url: string;
  host: string;
  lang: string;
  title: string;
  siteName: string;
  description: string;
  h1: string;
  sections: SiteSection[];
  paragraphs: string[];
  navLinks: string[];
  ctas: string[];
  images: string[];
  phone: string;
  email: string;
  accent: string;
  /** Visible-text length of the raw HTML. Tiny = the site paints itself with JavaScript. */
  textLength: number;
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&ndash;": "–",
  "&mdash;": "—",
  "&rsquo;": "’",
  "&lsquo;": "‘",
  "&rdquo;": "”",
  "&ldquo;": "“",
  "&hellip;": "…",
  "&copy;": "©",
};

function decodeEntities(input: string): string {
  return input
    .replace(/&#(\d+);/g, (_m, code: string) => {
      const n = Number(code);
      return n > 0 && n < 0x110000 ? String.fromCodePoint(n) : " ";
    })
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex: string) => {
      const n = parseInt(hex, 16);
      return n > 0 && n < 0x110000 ? String.fromCodePoint(n) : " ";
    })
    .replace(/&[a-z]+;/gi, (m) => ENTITIES[m.toLowerCase()] ?? " ");
}

export function cleanText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
}

function stripNonContent(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|template|svg|iframe)\b[\s\S]*?<\/\1>/gi, " ");
}

function attr(tag: string, name: string): string {
  const m = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(tag);
  return decodeEntities(m?.[1] ?? m?.[2] ?? m?.[3] ?? "").trim();
}

function metaContent(html: string, key: string): string {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = (attr(tag, "name") || attr(tag, "property")).toLowerCase();
    if (name === key) return attr(tag, "content");
  }
  return "";
}

function absolute(href: string, base: string): string {
  try {
    const u = new URL(href, base);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : "";
  } catch {
    return "";
  }
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function uniq<T>(items: T[]): T[] {
  return [...new Set(items)];
}

// ---- accent colour ---------------------------------------------------------

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
}

function isBrandLike([r, g, b]: [number, number, number]): boolean {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  const lightness = (max + min) / 2;
  const saturation = max === min ? 0 : (max - min) / (1 - Math.abs(2 * lightness - 1));
  return saturation > 0.35 && lightness > 0.22 && lightness < 0.7;
}

function pickAccent(html: string): string {
  const theme = metaContent(html, "theme-color");
  const themeRgb = /^#[0-9a-f]{3,6}$/i.test(theme) ? hexToRgb(theme) : null;
  if (themeRgb && isBrandLike(themeRgb)) return theme.length === 4 ? `#${theme.slice(1).split("").map((c) => c + c).join("")}` : theme;

  const styleText = [
    ...(html.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) ?? []),
    ...(html.match(/\sstyle\s*=\s*"[^"]*"/gi) ?? []),
  ].join(" ");

  const counts = new Map<string, number>();
  for (const m of styleText.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)) {
    const hex = `#${m[1].toLowerCase()}`;
    const rgb = hexToRgb(hex);
    if (rgb && isBrandLike(rgb)) counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }

  let best = "";
  let bestCount = 0;
  for (const [hex, count] of counts) {
    if (count > bestCount) {
      best = hex;
      bestCount = count;
    }
  }
  if (!best) return "";
  return best.length === 4 ? `#${best.slice(1).split("").map((c) => c + c).join("")}` : best;
}


const GENERIC_TITLE_PART = /^(home|homepage|home page|welcome|welcome to|index|main|official site|official website|website|start|startseite|accueil|inicio|casa)$/i;

function alnum(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function pickSiteName(ogSite: string, title: string, host: string): string {
  if (ogSite && ogSite.length <= 48) return ogSite;
  const root = alnum(host.split(".")[0] ?? "");
  const parts = title
    .split(/\s[|–—\-·:•]\s|\s[|•]\s?|[|•]/)
    .map((p) => p.trim())
    .filter((p) => p && !GENERIC_TITLE_PART.test(p));

  // Prefer the part that matches the domain ("Iron & Oak Gym" ↔ ironoak.example)
  const matching = parts.find((p) => root.length >= 3 && (alnum(p).includes(root) || root.includes(alnum(p))) && alnum(p).length >= 3);
  if (matching && matching.length <= 48) return matching;

  // Otherwise brands usually come last in "Page | Brand" titles
  const last = parts[parts.length - 1];
  if (last && last.length <= 48) return last;
  return host;
}

// ---- main ------------------------------------------------------------------

const CTA_WORDS = /\b(book|call|contact|get|start|join|order|reserve|schedule|quote|free|buy|shop|sign|subscribe|try|request|visit|learn|enquire|inquire|apply|donate|register)\b/i;
const IMAGE_SKIP = /(\.svg|\.gif|sprite|pixel|tracking|spacer|1x1|blank|loader|placeholder|favicon|emoji|badge|payment)/i;

export function extractSiteContent(rawHtml: string, pageUrl: string): SiteContent {
  const host = new URL(pageUrl).hostname.replace(/^www\./, "");
  const html = rawHtml;
  const body = stripNonContent(html.replace(/^[\s\S]*?<body\b/i, "<body"));

  const title = cleanText(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] ?? "");
  const ogSite = metaContent(html, "og:site_name");
  const description = metaContent(html, "description") || metaContent(html, "og:description");
  const h1 = cleanText(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(body)?.[1] ?? "");
  const lang = /<html\b[^>]*\blang\s*=\s*["']?([a-z-]+)/i.exec(html)?.[1] ?? "en";

  // Brand name: og:site_name, else the brand-looking part of a "Page | Brand" title, else the host
  const siteName = pickSiteName(ogSite, title, host);

  // Sections: each h2/h3 with the first meaningful paragraph that follows it
  const sections: SiteSection[] = [];
  const headingRe = /<(h[23])\b[^>]*>([\s\S]*?)<\/\1>/gi;
  const matches = [...body.matchAll(headingRe)];
  matches.forEach((m, i) => {
    const heading = cleanText(m[2]);
    if (heading.length < 3 || heading.length > 80) return;
    const start = (m.index ?? 0) + m[0].length;
    const end = matches[i + 1]?.index ?? Math.min(body.length, start + 2500);
    const chunk = body.slice(start, end);
    const para = [...chunk.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((p) => cleanText(p[1])).find((t) => t.length >= 30);
    sections.push({ heading, text: (para ?? "").slice(0, 220) });
  });

  const paragraphs = uniq(
    [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((p) => cleanText(p[1])).filter((t) => t.length >= 40)
  )
    .slice(0, 6)
    .map((t) => t.slice(0, 260));

  // Navigation labels
  const navBlock = /<nav\b[\s\S]*?<\/nav>/i.exec(body)?.[0] ?? /<header\b[\s\S]*?<\/header>/i.exec(body)?.[0] ?? "";
  const navLinks = uniq(
    [...navBlock.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((a) => cleanText(a[1])).filter((t) => t.length >= 2 && t.length <= 24)
  ).slice(0, 6);

  // Calls to action: short button/link text that sounds like an action
  const ctaCandidates = [
    ...[...body.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)].map((m) => cleanText(m[1])),
    ...[...body.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)].map((m) => cleanText(m[1])),
  ];
  const ctas = uniq(ctaCandidates.filter((t) => t.length >= 3 && t.length <= 32 && CTA_WORDS.test(t)))
    // "Book a free trial" makes a better primary button than a bare "Call"
    .sort((a, b) => Number(b.split(" ").length > 1) - Number(a.split(" ").length > 1))
    .slice(0, 3);

  // Images: og:image first, then content images that look real
  const images: string[] = [];
  const og = metaContent(html, "og:image");
  if (og) images.push(absolute(og, pageUrl));
  for (const tag of body.match(/<img\b[^>]*>/gi) ?? []) {
    const src = attr(tag, "src") || attr(tag, "data-src") || attr(tag, "data-lazy-src");
    if (!src || src.startsWith("data:") || IMAGE_SKIP.test(src)) continue;
    const w = Number(attr(tag, "width"));
    const h = Number(attr(tag, "height"));
    if ((w && w < 120) || (h && h < 80)) continue;
    images.push(absolute(src, pageUrl));
  }
  const cleanImages = uniq(images.filter((u) => u.startsWith("https://"))).slice(0, 6);

  const phone = /href\s*=\s*["']tel:([^"']+)["']/i.exec(body)?.[1]?.trim() ?? "";
  const email = /href\s*=\s*["']mailto:([^"'?]+)/i.exec(body)?.[1]?.trim() ?? "";

  return {
    url: pageUrl,
    host,
    lang,
    title,
    siteName,
    description: description.slice(0, 260),
    h1: h1.slice(0, 140),
    sections: sections.slice(0, 6),
    paragraphs,
    navLinks,
    ctas,
    images: cleanImages,
    phone: safeDecode(phone).slice(0, 32),
    email: email.slice(0, 80),
    accent: pickAccent(html),
    textLength: cleanText(body).length,
  };
}
