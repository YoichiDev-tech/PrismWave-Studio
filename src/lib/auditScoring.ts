import type { AuditSignals } from "../types/audit";

export interface AuditCategory {
  key: "speed" | "modernism" | "mobile" | "aiReadability";
  label: string;
  score: number; // 0-100
  findings: string[]; // things that hurt the score, in priority order
}

export interface AuditResult {
  overall: number; // average of the 4 category scores, 0-100
  categories: AuditCategory[];
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function scoreSpeed(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  // Response time — 60 pts
  if (s.responseTimeMs < 300) score += 60;
  else if (s.responseTimeMs < 800) score += 48;
  else if (s.responseTimeMs < 1500) score += 34;
  else if (s.responseTimeMs < 3000) score += 18;
  else {
    score += 6;
    findings.push(`Server response took ${(s.responseTimeMs / 1000).toFixed(1)}s — visitors expect under 1s.`);
  }

  // Page weight — 40 pts
  if (s.pageWeightKb < 300) score += 40;
  else if (s.pageWeightKb < 800) score += 30;
  else if (s.pageWeightKb < 1500) score += 18;
  else {
    score += 6;
    findings.push(`HTML payload is ${s.pageWeightKb}KB — likely unoptimized markup or inline assets.`);
  }

  return { key: "speed", label: "Page Speed", score: clamp(score), findings };
}

function scoreModernism(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.isHttps) score += 25;
  else findings.push("Site isn't served over HTTPS — a trust and SEO penalty.");

  if (s.hasMetaDescription) score += 25;
  else findings.push("No meta description found — search results show a poor auto-generated snippet.");

  if (s.titleLength >= 10 && s.titleLength <= 60) score += 25;
  else if (s.titleLength > 0) {
    score += 10;
    findings.push(`Page title is ${s.titleLength} characters — outside the ~10-60 sweet spot.`);
  } else {
    findings.push("No <title> tag content found.");
  }

  if (s.hasOpenGraph) score += 25;
  else findings.push("No Open Graph tags — links shared on social/Slack/iMessage won't show a preview card.");

  return { key: "modernism", label: "UI/UX Modernism", score: clamp(score), findings };
}

function scoreMobile(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.hasViewportMeta) score += 70;
  else findings.push("No viewport meta tag — the page will render as a zoomed-out desktop layout on phones.");

  if (s.hasMediaQueries) {
    score += 20;
  } else {
    // Best-effort only: most sites load CSS from external files we don't fetch,
    // so this is a soft signal, not a hard fail — worded accordingly
    score += 8;
    findings.push("No responsive breakpoints detected in inline styles (external stylesheets weren't checked).");
  }

  score += 10; // baseline for reaching this far without a hard failure above

  return { key: "mobile", label: "Mobile Responsiveness", score: clamp(score), findings };
}

function scoreAiReadability(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.hasSemanticLandmarks) score += 25;
  else findings.push("Missing semantic landmarks (<header>/<main>/<footer>) — harder for AI crawlers to parse page structure.");

  if (s.h1Count === 1) score += 25;
  else if (s.h1Count === 0) findings.push("No <h1> found — no clear topic signal for search or AI summarization.");
  else {
    score += 10;
    findings.push(`${s.h1Count} <h1> tags found — multiple top-level headings dilute the page's main topic.`);
  }

  if (s.hasStructuredData) score += 25;
  else findings.push("No structured data (JSON-LD) — AI answer engines lean on this to understand what the page offers.");

  if (!s.imageCount || s.imageCount === 0) {
    score += 25;
  } else {
    const altCoverage = 1 - Math.min(s.imagesMissingAlt, s.imageCount) / s.imageCount;
    score += Math.round(altCoverage * 25);
    if (s.imagesMissingAlt > 0) {
      findings.push(`${s.imagesMissingAlt} of ${s.imageCount} images are missing alt text.`);
    }
  }

  return { key: "aiReadability", label: "AI Readability", score: clamp(score), findings };
}

export function scoreAudit(signals: AuditSignals): AuditResult {
  const categories = [scoreSpeed(signals), scoreModernism(signals), scoreMobile(signals), scoreAiReadability(signals)];
  const overall = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);
  return { overall, categories };
}