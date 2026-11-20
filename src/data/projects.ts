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
      "An editorial, broadsheet-inspired site for a neighborhood bakery — hairline rules, serif type, and a menu that reads like a printed page.",
    overview:
      "A complete visual system for a local bakery: weekly bake schedule, order-ahead flow, and a warm paper-and-ink identity built to feel both timeless and modern.",
    livePath: "/work/fielding-and-rye",
    launched: "2026-08-12",
    relaunched: null,
    tags: ["Attività locale", "Stile editoriale", "Prenotazione anticipata", "Concept"],
    status: "concept",
    pricingNote:
      "I concept mostrano direzione e qualità del lavoro. Il tuo progetto avrà ambito e prezzo definiti dopo un breve confronto, senza costi a sorpresa.",
  },
  {
    slug: "nova-cloud",
    title: "Nova Cloud",
    category: "SaaS — sito di prodotto",
    description:
      "A dark, data-forward dashboard-style site for a monitoring startup — built to make technical credibility legible at a glance.",
    overview:
      "Un sistema promozionale per prodotti con metriche interattive per area geografica, scelta dei piani e raccolta delle richieste di prova, pensato per i team SaaS.",
    livePath: "/work/nova-cloud",
    launched: "2026-08-20",
    relaunched: null,
    tags: ["SaaS", "Interfaccia scura", "Prezzi", "Concept"],
    status: "concept",
    pricingNote:
      "I concept mostrano direzione e qualità del lavoro. Il tuo progetto avrà ambito e prezzo definiti dopo un breve confronto, senza costi a sorpresa.",
  },
  {
    slug: "bloom-market",
    title: "Bloom Market",
    category: "Boutique — pagina di presentazione",
    description:
      "A playful, maximalist landing page for a flower and gift shop — big type, organic shapes, and a palette built to be shared.",
    overview:
      "A retail landing system focused on emotion and conversion — bold type, organic shapes, and a brand palette designed to be remembered.",
    livePath: "/work/bloom-market",
    launched: "2026-09-01",
    relaunched: null,
    tags: ["Vendita al dettaglio", "Pagina di presentazione", "Marchio", "Concept"],
    status: "concept",
    pricingNote:
      "I concept mostrano direzione e qualità del lavoro. Il tuo progetto avrà ambito e prezzo definiti dopo un breve confronto, senza costi a sorpresa.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => (a.launched < b.launched ? 1 : -1));
}