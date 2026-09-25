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
    title: "PrismWave Studio went online",
    description: "Public site live on Vercel with free audit and fixed-scope positioning.",
    type: "milestone",
    href: "/",
  },
  {
    id: "fielding-launch",
    date: "2026-08-12",
    title: "Fielding & Rye concept launched",
    description: "Editorial bakery template with interactive order-ahead flow.",
    type: "project",
    href: "/projects/fielding-and-rye",
  },
  {
    id: "nova-launch",
    date: "2026-08-20",
    title: "Nova Cloud concept launched",
    description: "SaaS monitoring product site with trial capture and live metrics UI.",
    type: "project",
    href: "/projects/nova-cloud",
  },
  {
    id: "bloom-launch",
    date: "2026-09-01",
    title: "Bloom Market concept launched",
    description: "Boutique landing page and case-study write-up.",
    type: "project",
    href: "/projects/bloom-market",
  },
  {
    id: "audit-path",
    date: "2026-09-24",
    title: "Audit path conversion upgrade",
    description: "Immediate findings, auto report email, and 15-min review CTA.",
    type: "internal",
    href: "/changelog",
  },
  {
    id: "projects-system",
    date: "2026-09-25",
    title: "Projects, history & changelog system",
    description: "Public projects surface and studio transparency pages.",
    type: "milestone",
    href: "/projects",
  },
];

export function getLaunchesNewestFirst(): LaunchEvent[] {
  return [...LAUNCHES].sort((a, b) => (a.date < b.date ? 1 : -1));
}