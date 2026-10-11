import type { AuditSignals } from "../types/audit";

export interface AuditCategory {
  key: "speed" | "modernism" | "mobile" | "aiReadability";
  label: string;
  score: number;
  findings: string[];
}

export interface AuditResult {
  overall: number;
  categories: AuditCategory[];
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, n));
}

function scoreSpeed(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.responseTimeMs < 300) score += 60;
  else if (s.responseTimeMs < 800) score += 48;
  else if (s.responseTimeMs < 1500) score += 34;
  else if (s.responseTimeMs < 3000) score += 18;
  else {
    score += 6;
    findings.push(
      `The server response took ${(s.responseTimeMs / 1000).toFixed(1)} seconds in this check. This result may vary between visits.`
    );
  }

  if (s.pageWeightKb < 300) score += 40;
  else if (s.pageWeightKb < 800) score += 30;
  else if (s.pageWeightKb < 1500) score += 18;
  else {
    score += 6;
    findings.push(
      `The HTML response was ${s.pageWeightKb} KB. This measurement does not include every resource the browser may load.`
    );
  }

  return { key: "speed", label: "Page Speed", score: clamp(score), findings };
}

function scoreModernism(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.isHttps) {
    score += 25;
  } else {
    findings.push(
      "This page did not use HTTPS in the checked URL. HTTPS helps protect connections and is a standard expectation for websites."
    );
  }

  if (s.hasMetaDescription) {
    score += 25;
  } else {
    findings.push(
      "No meta description was detected. Search engines may generate their own result snippets instead."
    );
  }

  if (s.titleLength >= 10 && s.titleLength <= 60) {
    score += 25;
  } else if (s.titleLength > 0) {
    score += 10;
    findings.push(
      `The page title contains ${s.titleLength} characters. Its suitability depends on the page content and how it appears in search results.`
    );
  } else {
    findings.push("No page title text was detected in the checked HTML.");
  }

  if (s.hasOpenGraph) {
    score += 25;
  } else {
    findings.push(
      "No Open Graph metadata was detected. Some platforms may have less information available when generating a shared-link preview."
    );
  }

  return { key: "modernism", label: "UI/UX Modernism", score: clamp(score), findings };
}

function scoreMobile(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.hasViewportMeta) {
    score += 70;
  } else {
    findings.push(
      "No viewport meta tag was detected. This can affect how the page is initially scaled on mobile devices."
    );
  }

  if (s.hasMediaQueries) {
    score += 20;
  } else {
    score += 8;
    findings.push(
      "No responsive breakpoints were detected in the inline styles checked. External stylesheets were not fully evaluated, so this alone does not establish that the site is not responsive."
    );
  }

  score += 10;

  return { key: "mobile", label: "Mobile Responsiveness", score: clamp(score), findings };
}

function scoreAiReadability(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.hasSemanticLandmarks) {
    score += 25;
  } else {
    findings.push(
      "Common semantic landmarks such as header, main, or footer were not detected by this check. These elements can help communicate page structure to assistive technology and automated parsers."
    );
  }

  if (s.h1Count === 1) {
    score += 25;
  } else if (s.h1Count === 0) {
    findings.push(
      "No H1 heading was detected. A clear main heading can help visitors and automated systems understand the page topic."
    );
  } else {
    score += 10;
    findings.push(
      `${s.h1Count} H1 headings were detected. Multiple H1 headings are not automatically an error, but the page's heading hierarchy may be worth reviewing.`
    );
  }

  if (s.hasStructuredData) {
    score += 25;
  } else {
    findings.push(
      "No structured data was detected by this check. Structured data can describe eligible content to supported search engines and other systems."
    );
  }

  if (s.imageCount === 0) {
    score += 25;
  } else {
    const altCoverage =
      1 - Math.min(s.imagesMissingAlt, s.imageCount) / s.imageCount;

    score += Math.round(altCoverage * 25);

    if (s.imagesMissingAlt > 0) {
      findings.push(
        `${s.imagesMissingAlt} of ${s.imageCount} checked images were missing alt text. Whether alt text is needed depends on each image's purpose.`
      );
    }
  }

  return { key: "aiReadability", label: "AI Readability", score: clamp(score), findings };
}

export function scoreAudit(signals: AuditSignals): AuditResult {
  const categories = [
    scoreSpeed(signals),
    scoreModernism(signals),
    scoreMobile(signals),
    scoreAiReadability(signals),
  ];

  const overall = Math.round(
    categories.reduce((sum, category) => sum + category.score, 0) /
      categories.length
  );

  return { overall, categories };
}