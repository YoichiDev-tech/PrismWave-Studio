import type { ReactElement } from "react";

import LocalServiceMock from "../components/packageMocks/LocalServiceMock";
import RestaurantMock from "../components/packageMocks/RestaurantMock";
import ProfessionalMock from "../components/packageMocks/ProfessionalMock";
import SeoMock from "../components/packageMocks/SeoMock";
import DashboardMock from "../components/packageMocks/DashboardMock";

import LocalServiceShowcase from "../components/packageShowcases/LocalServiceShowcase";
import RestaurantShowcase from "../components/packageShowcases/RestaurantShowcase";
import ProfessionalShowcase from "../components/packageShowcases/ProfessionalShowcase";
import SeoShowcase from "../components/packageShowcases/SeoShowcase";
import DashboardShowcase from "../components/packageShowcases/DashboardShowcase";

export type Accent = "amber" | "coral" | "violet" | "gradient";

export interface PackageSummary {
  slug: string;
  name: string;
  category: string;
  desc: string;
  price: string;
  priceNote?: string;
  accent: Accent;
  mock: () => ReactElement;
  hover: "slide" | "scan" | "wiggle";
}

export interface PackageDetail extends PackageSummary {
  heroHeadline: string;
  heroDescription: string;
  included: string[];
  excluded: string[];
  turnaround: string;
  sampleData?: boolean;
  seoDescription: string;
  aiMap: string[];
  aiIntent: string;
  aiTags: string[];

  showcase: () => ReactElement;
}

export const packages: PackageDetail[] = [
  {
    slug: "local-service-landing-page",
    name: "Local Service Landing Page",
    category: "Barber & Salon — booking page",
    desc: "A booking-ready one-pager for local service businesses — services, gallery, and reviews laid out to turn a passing glance into an appointment.",
    price: "€350",
    accent: "amber",
    mock: LocalServiceMock,
    hover: "slide",

    showcase: LocalServiceShowcase,

    heroHeadline: "A page built to get the chair booked, not just admired.",
    heroDescription:
      "For barbers, salons, and studios that live on walk-ins and word of mouth. One scroll — services, pricing, gallery, reviews — and a booking link that's never more than a thumb's reach away.",
    included: [
      "Hero section with your name, specialty, and a primary booking CTA",
      "Services & pricing list",
      "Photo gallery (your work, your space)",
      "Reviews / testimonials section",
      "Hours, location, and embedded map",
      "Booking CTA linked to WhatsApp, Calendly, or your existing booking tool",
      "Mobile-first build, 1 round of revisions",
    ],
    excluded: [
      "A real in-page booking/payment backend",
      "Multi-language support",
      "Ongoing content updates after launch",
    ],
    turnaround: "5-7 days",
    seoDescription:
      "A fixed-price, booking-ready landing page package for barbers, salons, and local service businesses — built by PrismWave Studio.",
    aiMap: ["Hero", "Services & pricing", "Gallery", "Reviews", "Hours & location", "Booking CTA"],
    aiIntent:
      "Present the Local Service Landing Page package and its fixed price so a barber, salon, or studio owner can decide to buy it.",
    aiTags: ["barber website package", "salon landing page", "local service website", "fixed price web design"],
  },

  {
    slug: "restaurant-cafe-landing-page",
    name: "Restaurant / Café Landing Page",
    category: "Restaurant & Café — menu page",
    desc: "A menu-first landing page built for the second before someone decides where to eat — hours, location, and your best dishes, front and center.",
    price: "€390",
    accent: "coral",
    mock: RestaurantMock,
    hover: "scan",

    showcase: RestaurantShowcase,

    heroHeadline: "The page someone checks thirty seconds before they walk in.",
    heroDescription:
      "For restaurants and cafés that need one job done well: show the menu, prove you're open, make it obvious where to go. No clutter, no ten-page structure to get lost in.",
    included: [
      "Hero section with your signature dish or ambience",
      "Digital menu section (categories, items, prices)",
      "Photo gallery",
      "Hours, location, and embedded map",
      "Reservation / order CTA (linked to your existing tool or WhatsApp)",
      "Mobile-first build, 1 round of revisions",
    ],
    excluded: [
      "Online ordering or payment processing",
      "Real-time table booking system",
      "Menu updates after launch (available as a maintenance add-on)",
    ],
    turnaround: "5-7 days",
    seoDescription:
      "A fixed-price restaurant and café landing page package — digital menu, hours, and reservations, built by PrismWave Studio.",
    aiMap: ["Hero", "Digital menu", "Gallery", "Hours & location", "Reservation CTA"],
    aiIntent:
      "Present the Restaurant / Café Landing Page package and its fixed price so an owner can decide to buy it.",
    aiTags: ["restaurant website package", "cafe landing page", "digital menu website", "fixed price web design"],
  },

  {
    slug: "professional-one-pager",
    name: "Professional One-Pager",
    category: "Consultants & Freelancers — credibility page",
    desc: "A clean, credible online presence for solo professionals — built to make a stranger trust you in one scroll.",
    price: "€280",
    accent: "violet",
    mock: ProfessionalMock,
    hover: "wiggle",

    showcase: ProfessionalShowcase,

    heroHeadline: "Look established, even on day one.",
    heroDescription:
      "For consultants, coaches, and independent tradespeople who need a page that does the introducing for them — before the first call, not during it.",
    included: [
      "Hero section with your name, role, and a clear value statement",
      "Bio / credentials section",
      "Services or offerings list",
      "Testimonials section",
      "Contact form",
      "Mobile-first build, 1 round of revisions",
    ],
    excluded: [
      "Blog or multi-page structure",
      "Client portal or gated content",
      "Newsletter/email integration",
    ],
    turnaround: "4-6 days",
    seoDescription:
      "A fixed-price one-page website package for consultants, coaches, and independent professionals, built by PrismWave Studio.",
    aiMap: ["Hero", "Bio & credentials", "Services", "Testimonials", "Contact"],
    aiIntent:
      "Present the Professional One-Pager package and its fixed price so a solo professional can decide to buy it.",
    aiTags: ["freelancer website package", "consultant landing page", "personal brand website", "fixed price web design"],
  },

  {
    slug: "seo-adjustment",
    name: "SEO Adjustment Package",
    category: "Any site — on-page SEO",
    desc: "A focused audit-and-fix pass on what's already live — meta tags, headings, image alt text, speed basics, local search alignment.",
    price: "€180",
    priceNote: "€120 as an add-on to another package",
    accent: "amber",
    mock: SeoMock,
    hover: "scan",

    showcase: SeoShowcase,

    heroHeadline: "Fix what's already costing you search visibility.",
    heroDescription:
      "Most small-business sites lose visibility to a handful of fixable things — missing meta tags, no alt text, a slow first load, an unclaimed Google Business Profile. This package finds and fixes them.",
    included: [
      "On-page SEO audit (up to 5 pages)",
      "Meta titles & descriptions",
      "Heading structure review and fixes",
      "Image alt text",
      "Page speed basics (image compression, lazy loading)",
      "Basic schema markup",
      "Google Business Profile alignment check",
      "A short written report of what was found and fixed",
    ],
    excluded: [
      "Content writing or copywriting",
      "Ongoing SEO / link building",
      "Ranking guarantees of any kind",
    ],
    turnaround: "3-5 days",
    seoDescription:
      "A fixed-price on-page SEO audit and fix package for small business websites, delivered by PrismWave Studio.",
    aiMap: ["What's included", "Audit report", "Fix summary"],
    aiIntent:
      "Present the SEO Adjustment package and its fixed price so a site owner can decide to buy it.",
    aiTags: ["on-page seo package", "small business seo", "seo audit fixed price", "website seo fix"],
  },

  {
    slug: "insights-dashboard-showcase",
    name: "Insights Dashboard Showcase",
    category: "Analytics — sample-data preview",
    desc: "A working dashboard interface — charts, KPIs, filters — built on sample data today, ready to wire into your real numbers when you are.",
    price: "€650 initial",
    priceNote: "€90 / cycle after (cancel anytime)",
    accent: "gradient",
    mock: DashboardMock,
    hover: "scan",
    sampleData: true,

    showcase: DashboardShowcase,

    heroHeadline: "See your numbers the way they deserve to be seen.",
    heroDescription:
      "A fully designed analytics dashboard — KPIs, charts, filters — built first on realistic sample data so you can see exactly how it will look and feel. The initial price includes the build and your first maintenance cycle; connecting it to your real, live data is a separate, scoped phase once you're ready.",
    included: [
      "4-6 KPI / chart components (bar, line, or donut, matched to your data)",
      "Filter and date-range UI",
      "Fully responsive layout",
      "Built on realistic sample data, clearly labeled",
      "First maintenance cycle included in the initial price",
    ],
    excluded: [
      "Backend or live data connections (quoted separately, as a next phase)",
      "User authentication / multi-user access",
      "Data pipeline or warehouse setup",
    ],
    turnaround: "10-14 days",
    seoDescription:
      "A fixed-price analytics dashboard showcase package, built on sample data with a bundled maintenance cycle, by PrismWave Studio.",
    aiMap: ["Hero", "Dashboard preview (sample data)", "What's included", "Pricing"],
    aiIntent:
      "Present the Insights Dashboard Showcase package, make clear it uses sample data, and show its fixed price so a business owner can decide to buy it.",
    aiTags: ["analytics dashboard package", "kpi dashboard demo", "sample data dashboard", "fixed price dashboard design"],
  },
];

export function getPackageBySlug(slug: string): PackageDetail | undefined {
  return packages.find((p) => p.slug === slug);
}