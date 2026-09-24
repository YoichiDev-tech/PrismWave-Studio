import type { Intent } from "../pages/Home";

export interface Plan {
  id: string;
  label: string;
  price: number;
  weeks: number;
  intent: Intent;
  blurb: string;
  includes: string[];
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
    blurb: "A clean, modern landing page built for one clear goal.",
    includes: [
      "Mobile-first responsive design",
      "Basic SEO setup",
      "Up to 2 revision rounds",
    ],
    excludes: "Copywriting, hosting, and domain are not included.",
  },

  {
    id: "redesign",
    label: "Website Redesign",
    price: 800,
    weeks: 2,
    intent: "audit",
    blurb: "A full rebuild of your existing site with improved UI and UX.",
    includes: [
      "Modern UI + improved UX",
      "Performance optimization",
      "Up to 2 revision rounds",
    ],
    excludes: "Content rewriting and hosting/domain migration are not included.",
  },

  {
    id: "business",
    label: "Small Business Site",
    price: 1000,
    weeks: 2,
    intent: "build",
    blurb: "A complete 3-6 page website ready to take enquiries.",
    includes: [
      "Navigation + responsive layout",
      "Contact form + email integration",
      "Up to 3 revision rounds",
    ],
    excludes: "Brand/logo design, hosting, and domain are not included.",
  },

  {
    id: "saas",
    label: "Full-Stack SaaS MVP",
    price: 2500,
    weeks: 8, // REALISTIC timeline for a solo founder doing all roles
    intent: "build",
    blurb: "A working MVP: frontend, backend logic, and database.",
    includes: [
      "Custom UI + user flows",
      "Serverless backend logic",
      "Database behind it",
    ],
    excludes: "Hosting and third-party service fees are not included.",
  },
];

export const ADDONS: Addon[] = [
  { id: "supabase-auth", label: "Auth + database setup", price: 400, weeks: 1 },
  { id: "custom-api", label: "Custom API / backend logic", price: 600, weeks: 1 },
  { id: "speed-pass", label: "Performance speed pass", price: 200, weeks: 0.5 },
];

export function formatWeeks(weeks: number): string {
  return weeks === 1 ? "1 week" : `${weeks % 1 === 0 ? weeks : weeks.toFixed(1)} weeks`;
}
