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
    title: "Faster fixed-scope delivery",
    description: "Tighter discovery-to-launch flow so every project ships on a clear timeline.",
    status: "now",
  },
  {
    id: "projects-polish",
    title: "Richer project pages",
    description: "Deeper case detail, better previews, and clearer links into live templates.",
    status: "now",
  },
  {
    id: "audit-depth",
    title: "Deeper free audit",
    description: "More actionable findings and clearer next-step recommendations after each run.",
    status: "next",
  },
  {
    id: "production-domain",
    title: "Production domain & email",
    description: "Studio presence on a dedicated domain with professional outbound email.",
    status: "next",
  },
  {
    id: "project-cms",
    title: "Project content system",
    description: "Easier publishing of new builds and launch history as the portfolio grows.",
    status: "later",
  },
  {
    id: "client-stories",
    title: "Client stories",
    description: "Published outcomes and feedback from completed engagements.",
    status: "later",
  },
  {
    id: "indiemakerstack",
    title: "IndieMakerStack tools",
    description: "Studio tools directory for founders who need more than a website alone.",
    status: "later",
  },
];

export function getRoadmapByStatus(status: RoadmapStatus): RoadmapItem[] {
  return ROADMAP.filter((item) => item.status === status);
}