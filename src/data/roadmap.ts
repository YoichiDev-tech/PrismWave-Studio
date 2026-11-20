export type RoadmapStatus = "now" | "next" | "later";

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
}

export const ROADMAP: RoadmapItem[] = [
  {
    id: "delivery",
    title: "Consegne più rapide con ambito definito",
    description: "Un percorso più snello dall'analisi iniziale alla pubblicazione, con tempistiche chiare per ogni progetto.",
    status: "now",
  },
  {
    id: "projects-polish",
    title: "Schede progetto più complete",
    description: "Casi studio più approfonditi, anteprime migliori e collegamenti più chiari ai modelli interattivi.",
    status: "now",
  },
  {
    id: "audit-depth",
    title: "Analisi gratuita più approfondita",
    description: "Risultati più utili e indicazioni più chiare sui passi successivi dopo ogni analisi.",
    status: "next",
  },
  {
    id: "production-domain",
    title: "Dominio e email professionali",
    description: "Presenza dello studio su un dominio dedicato e utilizzo di un indirizzo email professionale.",
    status: "next",
  },
  {
    id: "project-cms",
    title: "Sistema di gestione dei contenuti dei progetti",
    description: "Pubblicazione più semplice di nuovi progetti e aggiornamenti man mano che il portfolio cresce.",
    status: "later",
  },
  {
    id: "client-stories",
    title: "Storie dei clienti",
    description: "Risultati documentati e commenti relativi a incarichi completati.",
    status: "later",
  },
  {
    id: "indiemakerstack",
    title: "Strumenti IndieMakerStack",
    description: "Directory di strumenti per fondatori che hanno bisogno di più di un semplice sito web.",
    status: "later",
  },
];

export function getRoadmapByStatus(status: RoadmapStatus): RoadmapItem[] {
  return ROADMAP.filter((item) => item.status === status);
}