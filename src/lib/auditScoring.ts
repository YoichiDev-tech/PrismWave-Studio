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
      `Il server ha impiegato ${(s.responseTimeMs / 1000).toFixed(1)} secondi per rispondere durante questo controllo. Il risultato può variare tra una visita e l'altra.`
    );
  }

  if (s.pageWeightKb < 300) score += 40;
  else if (s.pageWeightKb < 800) score += 30;
  else if (s.pageWeightKb < 1500) score += 18;
  else {
    score += 6;
    findings.push(
      `La risposta HTML aveva una dimensione di ${s.pageWeightKb} KB. Questa misurazione non include tutte le risorse che il browser potrebbe caricare.`
    );
  }

  return { key: "speed", label: "Velocità di caricamento", score: clamp(score), findings };
}

function scoreModernism(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.isHttps) {
    score += 25;
  } else {
    findings.push(
      "L'indirizzo verificato non utilizza HTTPS. HTTPS contribuisce a proteggere le connessioni ed è uno standard atteso per i siti web."
    );
  }

  if (s.hasMetaDescription) {
    score += 25;
  } else {
    findings.push(
      "Non è stata rilevata una meta description. I motori di ricerca potrebbero generare autonomamente gli estratti mostrati nei risultati."
    );
  }

  if (s.titleLength >= 10 && s.titleLength <= 60) {
    score += 25;
  } else if (s.titleLength > 0) {
    score += 10;
    findings.push(
      `Il titolo della pagina contiene ${s.titleLength} caratteri. La sua adeguatezza dipende dal contenuto e da come viene visualizzato nei risultati di ricerca.`
    );
  } else {
    findings.push("Nel codice HTML verificato non è stato rilevato alcun titolo di pagina.");
  }

  if (s.hasOpenGraph) {
    score += 25;
  } else {
    findings.push(
      "Non sono stati rilevati metadati Open Graph. Alcune piattaforme potrebbero disporre di meno informazioni per generare l'anteprima del collegamento condiviso."
    );
  }

  return { key: "modernism", label: "Modernità dell'interfaccia", score: clamp(score), findings };
}

function scoreMobile(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.hasViewportMeta) {
    score += 70;
  } else {
    findings.push(
      "Non è stato rilevato il meta tag viewport. Questo può influire sulla scala iniziale della pagina sui dispositivi mobili."
    );
  }

  if (s.hasMediaQueries) {
    score += 20;
  } else {
    score += 8;
    findings.push(
      "Nei fogli di stile incorporati verificati non sono stati rilevati punti di interruzione responsive. I fogli di stile esterni non sono stati analizzati completamente: questo dato, da solo, non dimostra che il sito non sia adattivo."
    );
  }

  score += 10;

  return { key: "mobile", label: "Adattamento ai dispositivi mobili", score: clamp(score), findings };
}

function scoreAiReadability(s: AuditSignals): AuditCategory {
  const findings: string[] = [];
  let score = 0;

  if (s.hasSemanticLandmarks) {
    score += 25;
  } else {
    findings.push(
      "Questo controllo non ha rilevato elementi semantici comuni come header, main o footer. Questi elementi aiutano le tecnologie assistive e i sistemi automatici a comprendere la struttura della pagina."
    );
  }

  if (s.h1Count === 1) {
    score += 25;
  } else if (s.h1Count === 0) {
    findings.push(
      "Non è stato rilevato alcun titolo H1. Un titolo principale chiaro aiuta visitatori e sistemi automatici a comprendere l'argomento della pagina."
    );
  } else {
    score += 10;
    findings.push(
      `Sono stati rilevati ${s.h1Count} titoli H1. La presenza di più titoli H1 non costituisce automaticamente un errore, ma può essere utile verificare la gerarchia dei titoli.`
    );
  }

  if (s.hasStructuredData) {
    score += 25;
  } else {
    findings.push(
      "Questo controllo non ha rilevato dati strutturati. I dati strutturati possono descrivere contenuti idonei ai motori di ricerca e ad altri sistemi compatibili."
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
        `${s.imagesMissingAlt} immagini su ${s.imageCount} verificate non contengono un testo alternativo. La necessità del testo alternativo dipende dalla funzione di ciascuna immagine.`
      );
    }
  }

  return { key: "aiReadability", label: "Leggibilità per i sistemi AI", score: clamp(score), findings };
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