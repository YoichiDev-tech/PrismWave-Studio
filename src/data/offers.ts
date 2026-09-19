import type { Intent } from "../pages/Home";

// One source of truth for everything price-related on the home page.
// Previously the static pricing cards and the sprint configurator each kept
// their own (slightly different) numbers — edit prices and timelines here only.

export interface Plan {
  id: string;
  label: string;
  price: number;
  weeks: number;
  /** Which contact-form variant a visitor lands on after choosing this plan. */
  intent: Intent;
  blurb: string;
  includes: string[];
  /** What is deliberately NOT included — shown as fine print when selected. */
  excludes: string;
}

export interface Addon {
  id: string;
  label: string;
  price: number;
  weeks: number;
}

export const PLANS: Plan[] = [
  {
    id: "landing",
    label: "Landing Page",
    price: 350,
    weeks: 1,
    intent: "build",
    blurb: "One page, one conversion goal.",
    includes: ["Mobile-first responsive design", "Basic SEO setup", "Up to 2 revision rounds"],
    excludes: "Hosting, domain, and copywriting are not included.",
  },
  {
    id: "redesign",
    label: "Website Redesign",
    price: 800,
    weeks: 2, // TODO: confirm — no timeline existed for this plan before
    intent: "audit",
    blurb: "A full rebuild of your existing site.",
    includes: ["Modern UI + improved UX", "Performance optimization", "Up to 2 revision rounds"],
    excludes: "Hosting/domain migration and content rewriting are not included.",
  },
  {
    id: "business",
    label: "Small Business Site",
    price: 1000,
    weeks: 2,
    intent: "build",
    blurb: "3-6 pages, ready to take enquiries.",
    includes: ["Navigation + responsive layout", "Contact form + email integration", "Up to 3 revision rounds"],
    excludes: "Hosting, domain, and brand/logo design are not included.",
  },
  {
    id: "saas",
    label: "Full-Stack SaaS MVP",
    price: 3500,
    weeks: 5,
    intent: "build",
    blurb: "A working product: frontend, backend logic, database.",
    includes: ["Custom UI + user flows", "Serverless backend logic", "Database behind it"],
    excludes: "Hosting and third-party service fees are not included.",
  },
];

export const ADDONS: Addon[] = [
  { id: "supabase-auth", label: "Auth + database setup", price: 600, weeks: 1 },
  { id: "custom-api", label: "Custom API / backend logic", price: 800, weeks: 1.5 },
  { id: "speed-pass", label: "Performance speed pass", price: 250, weeks: 0.5 },
];

export function formatWeeks(weeks: number): string {
  return weeks === 1 ? "1 week" : `${weeks % 1 === 0 ? weeks : weeks.toFixed(1)} weeks`;
}
