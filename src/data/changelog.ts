/**
 * Public studio changelog — trust through transparency.
 */

export interface ChangelogEntry {
  date: string; // YYYY-MM-DD
  title: string;
  description: string;
  tag?: "feature" | "fix" | "improvement";
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-09-25",
    title: "Sistema dei progetti e cronologia dei lanci",
    description:
      "Griglia pubblica dei progetti, schede di dettaglio, cronologia dei lanci e dati condivisi pronti per una futura integrazione con Supabase.",
    tag: "feature",
  },
  {
    date: "2026-09-24",
    title: "Invio automatico del report di analisi via email",
    description:
      "Invio automatico del report completo e invito a una revisione di 15 minuti; notifica al titolare per ogni richiesta.",
    tag: "feature",
  },
  {
    date: "2026-09-24",
    title: "Correzione dello scorrimento su dispositivi mobili",
    description:
      "Sostituito overflow-x-hidden con overflow-x-clip nella sezione principale e applicato il ritaglio orizzontale alla pagina per correggere lo scorrimento iniziale su iOS.",
    tag: "fix",
  },
  {
    date: "2026-09-24",
    title: "Ottimizzazione della homepage per le conversioni",
    description:
      "Rimosse le sezioni non essenziali; mantenute analisi, progetti, prezzi, processo, presentazione, domande frequenti e contatti.",
    tag: "improvement",
  },
  {
    date: "2026-09-23",
    title: "Modelli dimostrativi interattivi",
    description: "Flusso di prenotazione di Fielding & Rye e interazioni relative alla prova e alle aree geografiche di Nova Cloud.",
    tag: "feature",
  },
];

export function getChangelogNewestFirst(): ChangelogEntry[] {
  return [...CHANGELOG].sort((a, b) => (a.date < b.date ? 1 : -1));
}