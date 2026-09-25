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
    category: "Bakery — full redesign",
    description:
      "An editorial, broadsheet-inspired site for a neighborhood bakery — hairline rules, serif type, and a menu that reads like a printed page.",
    overview:
      "A complete visual system for a local bakery: weekly bake schedule, order-ahead flow, and a warm paper-and-ink identity built to feel both timeless and modern.",
    livePath: "/work/fielding-and-rye",
    launched: "2026-08-12",
    relaunched: null,
    tags: ["Local business", "Editorial", "Order-ahead", "Concept"],
    status: "concept",
    pricingNote:
      "Concepts show direction and craft. Your build is fixed-scope and priced after a short review — no surprise fees.",
  },
  {
    slug: "nova-cloud",
    title: "Nova Cloud",
    category: "SaaS — product site",
    description:
      "A dark, data-forward dashboard-style site for a monitoring startup — built to make technical credibility legible at a glance.",
    overview:
      "A product marketing system with interactive region metrics, tier selection, and trial capture — made for SaaS teams that need clarity as much as polish.",
    livePath: "/work/nova-cloud",
    launched: "2026-08-20",
    relaunched: null,
    tags: ["SaaS", "Dark UI", "Pricing", "Concept"],
    status: "concept",
    pricingNote:
      "Concepts show direction and craft. Your build is fixed-scope and priced after a short review — no surprise fees.",
  },
  {
    slug: "bloom-market",
    title: "Bloom Market",
    category: "Boutique — landing page",
    description:
      "A playful, maximalist landing page for a flower and gift shop — big type, organic shapes, and a palette built to be shared.",
    overview:
      "A retail landing system focused on emotion and conversion — bold type, organic shapes, and a brand palette designed to be remembered.",
    livePath: "/work/bloom-market",
    launched: "2026-09-01",
    relaunched: null,
    tags: ["Retail", "Landing page", "Brand", "Concept"],
    status: "concept",
    pricingNote:
      "Concepts show direction and craft. Your build is fixed-scope and priced after a short review — no surprise fees.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAllProjects(): Project[] {
  return [...PROJECTS].sort((a, b) => (a.launched < b.launched ? 1 : -1));
}