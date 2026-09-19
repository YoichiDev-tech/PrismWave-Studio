// Everything the preview iframes render passes through here.
//
// IMPORTANT: the real security boundary is NOT this regex cleanup. The client
// renders both documents in <iframe sandbox="" srcdoc=...> — no allow-scripts,
// no allow-same-origin — so even if a <script> slipped past these regexes it
// could not run, and the frame can't touch prismwavestudio.com's cookies,
// storage or DOM. The stripping + CSP below are defence in depth and keep the
// previews tidy (no autoplay, no redirects, no tracking pixels).
//
// (vercel.json's X-Frame-Options: DENY does not affect srcdoc iframes — they
// never make a request, so there is no response header to enforce.)

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const BEFORE_CSP =
  "default-src 'none'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:; media-src *";
const AFTER_CSP =
  "default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com";

function stripActiveContent(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|noscript|iframe|object|embed|applet|frame|frameset)\b[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<(script|iframe|object|embed|applet|frame|base|meta\s+http-equiv)\b[^>]*>/gi, "")
    .replace(/<link\b[^>]*rel\s*=\s*["']?(preload|prefetch|modulepreload|dns-prefetch|preconnect|manifest)[^>]*>/gi, "")
    .replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "")
    .replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "")
    .replace(/(href|src|action|formaction|xlink:href)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1=$2#$2');
}

function injectIntoHead(html: string, inject: string): string {
  if (/<head\b[^>]*>/i.test(html)) return html.replace(/<head\b[^>]*>/i, (m) => `${m}${inject}`);
  if (/<html\b[^>]*>/i.test(html)) return html.replace(/<html\b[^>]*>/i, (m) => `${m}<head>${inject}</head>`);
  return `<!doctype html><html><head>${inject}</head><body>${html}</body></html>`;
}

function truncateHtml(html: string, maxChars: number): string {
  if (html.length <= maxChars) return html;
  const cut = html.slice(0, maxChars);
  const lastTag = cut.lastIndexOf(">");
  return `${lastTag > 0 ? cut.slice(0, lastTag + 1) : cut}</body></html>`;
}

/**
 * The "before": the site's real HTML with scripts removed and a <base> tag so
 * its CSS, fonts and images still load from the original host.
 */
export function buildBeforeSnapshot(rawHtml: string, baseUrl: string): string {
  const cleaned = stripActiveContent(truncateHtml(rawHtml, 900_000));
  const inject =
    `<meta charset="utf-8">` +
    `<meta http-equiv="Content-Security-Policy" content="${BEFORE_CSP}">` +
    `<base href="${escapeHtml(baseUrl)}">` +
    // Freeze animations/carousels so the snapshot looks like a screenshot
    `<style>*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}html,body{overflow-x:hidden}</style>`;
  return injectIntoHead(cleaned, inject);
}

/** Cleans model output (or the template) and pins the strict CSP to it. */
export function sanitizeGeneratedHtml(rawHtml: string): string {
  const cleaned = stripActiveContent(rawHtml);
  const inject =
    `<meta charset="utf-8">` +
    `<meta name="viewport" content="width=device-width, initial-scale=1">` +
    `<meta http-equiv="Content-Security-Policy" content="${AFTER_CSP}">`;
  // The CSP <meta> above is re-added after stripping (stripActiveContent removes any the model wrote)
  return injectIntoHead(cleaned, inject);
}
