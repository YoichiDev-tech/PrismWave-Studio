import type { SiteContent } from "./siteExtract.js";
import { escapeHtml } from "./previewHtml.js";

const FALLBACK_ACCENT = "#6c63ff"; // PrismWave violet

function readableOn(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.62 ? "#0a0e1a" : "#ffffff";
}

function initials(name: string): string {
  const letters = name
    .split(/\s+/)
    .map((w) => w.replace(/^[^\p{L}\p{N}]+/u, ""))
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return letters || "•";
}

/**
 * Builds a clean, modern homepage from the extracted content. No AI involved,
 * so it always works and is fully predictable. Every value is escaped.
 */
export function renderTemplate(c: SiteContent): string {
  const accent = /^#[0-9a-f]{6}$/i.test(c.accent) ? c.accent : FALLBACK_ACCENT;
  const onAccent = readableOn(accent);
  const e = escapeHtml;

  const headline = c.h1 || c.sections[0]?.heading || c.title || c.siteName;
  const sub = c.description || c.paragraphs[0] || c.sections[0]?.text || "";
  const primaryCta = c.ctas[0] || "Get in touch";
  const secondaryCta = c.ctas[1] || "See what we offer";

  const navItems = c.navLinks.slice(0, 4);
  const cards = (c.sections.length ? c.sections : c.paragraphs.map((p) => ({ heading: "", text: p })))
    .filter((s) => s.heading || s.text)
    .slice(0, 6);
  const [heroImage, ...gallery] = c.images;
  const galleryImages = gallery.slice(0, 3);

  const contactBits = [c.phone && `Call ${c.phone}`, c.email].filter(Boolean) as string[];

  const heroVisual = heroImage
    ? `<div class="visual"><img src="${e(heroImage)}" alt="" loading="eager"></div>`
    : `<div class="visual mark" aria-hidden="true"><span>${e(initials(c.siteName))}</span></div>`;

  const cardsHtml = cards
    .map(
      (s, i) => `<article class="card"><span class="num">${String(i + 1).padStart(2, "0")}</span>${
        s.heading ? `<h3>${e(s.heading)}</h3>` : ""
      }${s.text ? `<p>${e(s.text)}</p>` : ""}</article>`
    )
    .join("");

  const galleryHtml = galleryImages.length
    ? `<section class="gallery">${galleryImages.map((src) => `<img src="${e(src)}" alt="" loading="lazy">`).join("")}</section>`
    : "";

  return `<!doctype html>
<html lang="${e(c.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(c.siteName)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&display=swap">
<style>
:root{--accent:${accent};--on-accent:${onAccent};--ink:#0f1424;--soft:#5b6478;--line:#e6e8ef;--bg:#fbfbfd}
*{box-sizing:border-box;margin:0}
body{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:var(--ink);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}
h1,h2,h3,.brand{font-family:Sora,Inter,ui-sans-serif,system-ui,sans-serif;letter-spacing:-.02em}
img{display:block;max-width:100%}
.wrap{max-width:1120px;margin:0 auto;padding:0 28px}
nav{position:sticky;top:0;z-index:5;background:rgba(251,251,253,.86);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
nav .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px;height:68px}
.brand{font-weight:700;font-size:19px;display:flex;align-items:center;gap:10px}
.brand i{width:28px;height:28px;border-radius:9px;background:var(--accent);display:inline-block}
nav ul{display:flex;gap:26px;list-style:none;padding:0;font-size:14px;color:var(--soft)}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 24px;border-radius:999px;font-weight:600;font-size:15px;text-decoration:none;background:var(--accent);color:var(--on-accent);border:2px solid var(--accent)}
.btn.ghost{background:transparent;color:var(--ink);border-color:var(--line)}
nav .btn{min-height:40px;padding:0 18px;font-size:14px}
.hero{padding:76px 0 60px}
.hero .wrap{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.eyebrow{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:18px}
h1{font-size:clamp(34px,4.6vw,58px);line-height:1.06;font-weight:700}
.lead{margin-top:22px;font-size:18px;color:var(--soft);max-width:34em}
.actions{margin-top:32px;display:flex;flex-wrap:wrap;gap:12px}
.visual{aspect-ratio:4/3;border-radius:28px;overflow:hidden;background:linear-gradient(135deg,var(--accent),color-mix(in srgb,var(--accent) 40%,#0f1424));box-shadow:0 30px 60px -25px color-mix(in srgb,var(--accent) 55%,transparent)}
.visual img{width:100%;height:100%;object-fit:cover}
.visual.mark{display:flex;align-items:center;justify-content:center}
.visual.mark span{font:700 96px Sora,sans-serif;color:var(--on-accent);opacity:.9}
.contact{border-block:1px solid var(--line);background:#fff}
.contact .wrap{display:flex;flex-wrap:wrap;gap:12px 36px;padding-top:18px;padding-bottom:18px;font-size:14px;color:var(--soft);font-weight:500}
.section{padding:84px 0 24px}
.section h2{font-size:clamp(26px,3vw,38px);line-height:1.15;margin-bottom:34px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.card{background:#fff;border:1px solid var(--line);border-radius:22px;padding:28px}
.card .num{font:600 12px Inter,sans-serif;color:var(--accent);letter-spacing:.12em}
.card h3{font-size:19px;margin:14px 0 8px}
.card p{font-size:15px;color:var(--soft)}
.gallery{max-width:1120px;margin:56px auto 0;padding:0 28px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.gallery img{width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:22px}
.band{margin:84px 0 0;padding:64px 0;background:var(--ink);color:#fff}
.band .wrap{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px}
.band h2{font-size:clamp(24px,3vw,34px);max-width:18em}
footer{padding:28px 0;font-size:13px;color:var(--soft)}
@media(max-width:820px){.hero .wrap{grid-template-columns:1fr;gap:36px}.cards,.gallery{grid-template-columns:1fr 1fr}nav ul{display:none}.hero{padding-top:44px}}
@media(max-width:480px){.cards,.gallery{grid-template-columns:1fr}.wrap{padding:0 20px}h1{font-size:34px}}
</style>
</head>
<body>
<nav><div class="wrap"><span class="brand"><i></i>${e(c.siteName)}</span>${
    navItems.length ? `<ul>${navItems.map((n) => `<li>${e(n)}</li>`).join("")}</ul>` : ""
  }<a class="btn" href="#contact">${e(primaryCta)}</a></div></nav>
<header class="hero"><div class="wrap"><div>
<span class="eyebrow">${e(c.host)}</span>
<h1>${e(headline)}</h1>
${sub ? `<p class="lead">${e(sub)}</p>` : ""}
<div class="actions"><a class="btn" href="#contact">${e(primaryCta)}</a><a class="btn ghost" href="#services">${e(secondaryCta)}</a></div>
</div>${heroVisual}</div></header>
${contactBits.length ? `<div class="contact"><div class="wrap">${contactBits.map((b) => `<span>${e(b)}</span>`).join("")}</div></div>` : ""}
${cardsHtml ? `<section class="section" id="services"><div class="wrap"><h2>What ${e(c.siteName)} offers</h2><div class="cards">${cardsHtml}</div></div></section>` : ""}
${galleryHtml}
<section class="band" id="contact"><div class="wrap"><h2>${e(headline)}</h2><a class="btn" href="#contact">${e(primaryCta)}</a></div></section>
<footer><div class="wrap">© ${e(c.siteName)} · Concept preview by PrismWave Studio</div></footer>
</body>
</html>`;
}
