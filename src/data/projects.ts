export type ProjectStatus = "concept" | "live" | "internal";

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  livePath?: string;
  screenshot?: string;
  launched: string;
  relaunched: string | null;
  tags: string[];
  status: ProjectStatus;
  pricingNote?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "fielding-and-rye",
    title: "Fielding & Rye",
    category: "Panificio — riprogettazione completa",
    description:
      "Un sito in stile editoriale per un panificio di quartiere, con linee sottili, caratteri serif e un menu che ricorda una pagina stampata.",
    overview:
      "Un sistema visivo completo per un panificio locale: programma settimanale delle preparazioni, prenotazioni anticipate e un'identità grafica ispirata alla carta e all'inchiostro, senza tempo e al contempo moderna.",
    livePath: "/work/fielding-and-rye",
    launched: "2026-08-12",
    relaunched: null,
    tags: ["Attività locale", "Stile editoriale", "Prenotazione anticipata", "Progetto dimostrativo"],
    status: "concept",
    pricingNote:
      "I progetti dimostrativi mostrano la direzione e la qualità del lavoro. Il tuo progetto avrà ambito e prezzo definiti dopo un breve confronto, senza costi a sorpresa.",
  },
  {
    slug: "nova-cloud",
    title: "Nova Cloud",
    category: "SaaS — sito di prodotto",
    description:
      "Un sito scuro, ricco di dati e ispirato ai pannelli di controllo, per una startup di monitoraggio: progettato per comunicare subito affidabilità tecnica.",
    overview:
      "Un sistema promozionale per prodotti con metriche interattive per area geografica, scelta dei piani e raccolta delle richieste di prova, pensato per i team SaaS.",
    livePath: "/work/nova-cloud",
    launched: "2026-08-20",
    relaunched: null,
    tags: ["SaaS", "Interfaccia scura", "Prezzi", "Progetto dimostrativo"],
    status: "concept",
    pricingNote:
      "I progetti dimostrativi mostrano la direzione e la qualità del lavoro. Il tuo progetto avrà ambito e prezzo definiti dopo un breve confronto, senza costi a sorpresa.",
  },
  {
    slug: "bloom-market",
    title: "Bloom Market",
    category: "Boutique — pagina di presentazione",
    description:
      "Una pagina di presentazione vivace e ricca di elementi visivi per un negozio di fiori e articoli da regalo, con caratteri ampi, forme organiche e una palette pensata per essere condivisa.",
    overview:
      "Un sistema di pagina promozionale per il commercio al dettaglio, orientato all'emozione e alle conversioni, con caratteri marcati, forme organiche e una palette pensata per lasciare il segno.",
    livePath: "/work/bloom-market",
    launched: "2026-09-01",
    relaunched: null,
    tags: ["Vendita al dettaglio", "Pagina di presentazione", "Marchio", "Progetto dimostrativo"],
    status: "concept",
    pricingNote:
      "I progetti dimostrativi mostrano la direzione e la qualità del lavoro. Il tuo progetto avrà ambito e prezzo definiti dopo un breve confronto, senza costi a sorpresa.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => (a.launched < b.launched ? 1 : -1));
}