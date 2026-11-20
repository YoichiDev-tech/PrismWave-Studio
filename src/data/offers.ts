import type { Intent } from "../pages/Home";

export interface Plan {
  id: string;
  label: string;
  price: number;
  weeks: number;
  intent: Intent;
  blurb: string;
  includes: string[];
  excludes: string;
}

export interface Addon {
  id: string;
  label: string;
  price: number;
  weeks: number;
}

/**
 * First-sale pricing (0 clients / 0 testimonials).
 * Goal: remove price as the blocker, deliver well, collect proof, then raise.
 * Currency: same unit as the live site today (treat as USD display;
 * for UK outreach state GBP clearly in the Project Summary / Agreement)
 */
export const PLANS: Plan[] = [
  {
    id: "landing",
    label: "Pagina di presentazione",
    price: 350,
    weeks: 1,
    intent: "build",
    blurb: "Una pagina chiara e mirata per trasformare le visite in richieste di contatto o prenotazioni.",
    includes: [
      "Design adattivo, progettato prima per smartphone",
      "SEO di base e modulo di contatto",
      "Fino a 2 cicli di revisione",
    ],
    excludes: "Non sono inclusi testi, progettazione del logo, hosting e dominio.",
  },
  {
    id: "site-rescue",
    label: "Rinnovamento del sito",
    price: 750,
    weeks: 2,
    intent: "audit",
    blurb:
      "I risultati dell'analisi diventano interventi mirati o una ricostruzione con ambito definito, per migliorare il funzionamento e i contatti.",
    includes: [
      "Applicazione degli interventi prioritari emersi dall'analisi",
      "Interfaccia moderna e prestazioni su dispositivi mobili",
      "Percorso di contatto e richiesta ottimizzato",
      "Fino a 2 cicli di revisione",
    ],
    excludes:
      "Non sono inclusi il completo rinnovamento del marchio, la redazione continuativa dei contenuti e l'hosting.",
  },
  {
    id: "business",
    label: "Sito per piccole imprese",
    price: 1100,
    weeks: 5,
    intent: "build",
    blurb:
      "Sito da 3 a 6 pagine, pronto a ricevere richieste, per artigiani, attività ricettive e servizi locali.",
    includes: [
      "Navigazione e layout adattivo",
      "Modulo di contatto e integrazione email",
      "Pagine principali definite nel riepilogo",
      "Fino a 3 cicli di revisione",
    ],
    excludes:
      "Non sono inclusi progettazione del logo, fotografia, hosting e dominio.",
  },
  {
    id: "saas-mvp",
    label: "SaaS / Avvio prodotto",
    price: 1800,
    weeks: 7,
    intent: "build",
    blurb:
      "Un sito promozionale chiaro e un'interfaccia essenziale per permettere ai primi utenti di comprendere e provare il prodotto.",
    includes: [
      "Interfaccia su misura e flussi utente principali",
      "Backend di base secondo l'ambito concordato",
      "Fino a 2 cicli di revisione",
    ],
    excludes:
      "Non sono inclusi costi ricorrenti di hosting, servizi SaaS di terze parti e nuove funzionalità successive al lancio.",
  },
  {
    id: "fintech-lite",
    label: "Pagina per servizi finanziari e fintech",
    price: 950,
    weeks: 2,
    intent: "build",
    blurb:
      "Una pagina chiara per fondatori indipendenti e prodotti in fase iniziale che devono comunicare affidabilità.",
    includes: [
      "Layout orientato alla fiducia",
      "Sviluppo adattivo, progettato prima per smartphone",
      "Percorso di contatto o lista d'attesa",
      "Fino a 2 cicli di revisione",
    ],
    excludes:
      "Non sono incluse verifiche di conformità, redazione di testi legali e integrazioni di pagamento, salvo accordo separato.",
  },
];

export const ADDONS: Addon[] = [
  { id: "supabase-auth", label: "Configurazione accessi e database", price: 300, weeks: 1 },
  { id: "custom-api", label: "API personalizzate e logica backend", price: 450, weeks: 1 },
  { id: "speed-pass", label: "Ottimizzazione delle prestazioni", price: 150, weeks: 0.5 },
];

export function formatWeeks(weeks: number): string {
  return weeks === 1
    ? "1 settimana"
    : `${weeks % 1 === 0 ? weeks : weeks.toFixed(1)} settimane`;
}