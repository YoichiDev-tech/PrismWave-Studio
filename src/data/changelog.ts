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
    title: "Projects system + launch history",
    description:
      "Public /projects grid, project detail pages, /history timeline, and shared static data ready for a future Supabase backend.",
    tag: "feature",
  },
  {
    date: "2026-09-24",
    title: "Automated audit report email",
    description:
      "Full report + 15-min review invite sent automatically; owner lead notification on every request.",
    tag: "feature",
  },
  {
    date: "2026-09-24",
    title: "Mobile scroll fix",
    description:
      "Replaced overflow-x-hidden on Hero with overflow-x-clip; root overflow-x clip for iOS first-gesture stickiness.",
    tag: "fix",
  },
  {
    date: "2026-09-24",
    title: "Homepage conversion cleanup",
    description:
      "Removed non-essential sections; kept audit, work, pricing, process, about, FAQ, contact.",
    tag: "improvement",
  },
  {
    date: "2026-09-23",
    title: "Interactive concept templates",
    description: "Fielding & Rye order flow and Nova Cloud trial/region interactions.",
    tag: "feature",
  },
];

export function getChangelogNewestFirst(): ChangelogEntry[] {
  return [...CHANGELOG].sort((a, b) => (a.date < b.date ? 1 : -1));
}