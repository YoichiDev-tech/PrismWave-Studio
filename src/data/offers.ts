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

/**
 * First-sale pricing (0 clients / 0 testimonials).
 * Goal: remove price as the blocker, deliver well, collect proof, then raise.
 * Currency: same unit as the live site today (treat as USD display;
 * for UK outreach state GBP clearly in the Project Summary / Agreement)
 */
export const PLANS: Plan[] = [
  {
    id: "landing",
    label: "Landing Page",
    price: 350,
    weeks: 1,
    intent: "build",
    blurb: "One clear page built to turn visitors into enquiries or bookings.",
    includes: [
      "Mobile-first responsive design",
      "Basic SEO + contact form",
      "Up to 2 revision rounds",
    ],
    excludes: "Copywriting, logo design, hosting and domain are not included.",
  },
  {
    id: "site-rescue",
    label: "Site Rescue",
    price: 750,
    weeks: 2,
    intent: "audit",
    blurb:
      "Audit findings turned into a fixed-scope fix or rebuild so the site works and converts.",
    includes: [
      "Prioritised audit findings applied",
      "Modern UI + mobile performance",
      "Contact / enquiry path fixed",
      "Up to 2 revision rounds",
    ],
    excludes:
      "Full brand redesign, ongoing content writing, and hosting are not included.",
  },
  {
    id: "business",
    label: "Small Business Site",
    price: 1100,
    weeks: 5,
    intent: "build",
    blurb:
      "3-6 page site ready to take enquiries — for trades, hospitality and local services.",
    includes: [
      "Navigation + responsive layout",
      "Contact form + email integration",
      "Core pages agreed in the summary",
      "Up to 3 revision rounds",
    ],
    excludes:
      "Logo design, photography, hosting and domain are not included.",
  },
  {
    id: "saas-mvp",
    label: "SaaS / Product starter",
    price: 1800,
    weeks: 7,
    intent: "build",
    blurb:
      "Clean marketing site + core product surface so early users can understand and try the product.",
    includes: [
      "Custom UI + key user flows",
      "Basic backend as scoped",
      "Up to 2 revision rounds",
    ],
    excludes:
      "Ongoing hosting fees, third-party SaaS costs, and post-launch feature work are not included.",
  },
  {
    id: "fintech-lite",
    label: "Trust / fintech landing",
    price: 950,
    weeks: 2,
    intent: "build",
    blurb:
      "High-clarity landing for solo founders and early products that need to look credible fast.",
    includes: [
      "Trust-focused layout",
      "Mobile-first responsive build",
      "Contact or waitlist path",
      "Up to 2 revision rounds",
    ],
    excludes:
      "Compliance review, legal copy, and payment integrations are not included unless scoped separately.",
  },
];

export const ADDONS: Addon[] = [
  { id: "supabase-auth", label: "Auth + database setup", price: 300, weeks: 1 },
  { id: "custom-api", label: "Custom API / backend logic", price: 450, weeks: 1 },
  { id: "speed-pass", label: "Performance speed pass", price: 150, weeks: 0.5 },
];

export function formatWeeks(weeks: number): string {
  return weeks === 1
    ? "1 week"
    : `${weeks % 1 === 0 ? weeks : weeks.toFixed(1)} weeks`;
}