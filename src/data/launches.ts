/**
 * Studio launch history — milestones, project launches, relaunches.
 * Static until Supabase; keep entries honest (concepts labeled as such).
 */

export type LaunchType = "milestone" | "project" | "relaunch" | "internal";

export interface LaunchEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  description?: string;
  type: LaunchType;
  /** Optional link to project detail or template */
  href?: string;
}

export const LAUNCHES: LaunchEvent[] = [
  {
    id: "studio-online",
    date: "2026-08-01",
    title: "PrismWave Studio è online",
    description: "Sito pubblico pubblicato su Vercel con analisi gratuita e servizi ad ambito definito.",
    type: "milestone",
    href: "/",
  },
  {
    id: "fielding-launch",
    date: "2026-08-12",
    title: "Pubblicato il concept Fielding & Rye",
    description: "Modello per un panificio con stile editoriale e flusso interattivo di prenotazione anticipata.",
    type: "project",
    href: "/projects/fielding-and-rye",
  },
  {
    id: "nova-launch",
    date: "2026-08-20",
    title: "Pubblicato il concept Nova Cloud",
    description: "Sito per un prodotto SaaS di monitoraggio, con raccolta delle richieste di prova e interfaccia con metriche in tempo reale.",
    type: "project",
    href: "/projects/nova-cloud",
  },
  {
    id: "bloom-launch",
    date: "2026-09-01",
    title: "Pubblicato il concept Bloom Market",
    description: "Pagina di presentazione per una boutique e relativo caso studio.",
    type: "project",
    href: "/projects/bloom-market",
  },
  {
    id: "audit-path",
    date: "2026-09-24",
    title: "Ottimizzazione del percorso di analisi",
    description: "Risultati immediati, invio automatico del report via email e invito a una revisione di 15 minuti.",
    type: "internal",
    href: "/changelog",
  },
  {
    id: "projects-system",
    date: "2026-09-25",
    title: "Sistema di progetti, cronologia e aggiornamenti",
    description: "Sezione pubblica dei progetti e pagine dedicate alla trasparenza dello studio.",
    type: "milestone",
    href: "/projects",
  },
];

export function getLaunchesNewestFirst(): LaunchEvent[] {
  return [...LAUNCHES].sort((a, b) => (a.date < b.date ? 1 : -1));
}