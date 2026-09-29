export const LINKS = {
  audit: '/#audit-tool',
  contact: '/#contact',
  packages: '/packages',
  services: '/services',
  reviews: '/reviews',
} as const;

export const SITE = 'https://prismwave-studio.vercel.app'; // swap to prismwavestudio.com once live

export type Tier = {
  id: string;
  step: string;
  name: string;
  outcome: string;
  forWho: string;
  scope: string[];
  deliverables: string[];
  cta: { label: string; to: string };
};

export const TIERS: Tier[] = [
  {
    id: 'audit',
    step: 'Start here',
    name: 'Speed & SEO Audit',
    outcome: 'Find out exactly what is quietly costing you visitors and enquiries.',
    forWho: 'You already have a site and suspect it looks or feels dated, or loads slowly on phones.',
    scope: [
      'Core Web Vitals and page speed',
      'Titles, descriptions, social share and schema metadata',
      'Mobile layout and readability',
      'Accessibility and AI/search readability',
    ],
    deliverables: [
      'Baseline scores you can check yourself',
      'The 2–3 biggest fixable bottlenecks, in plain language',
      'A prioritised fix list with clear scope',
    ],
    cta: { label: 'Get my free audit', to: LINKS.audit },
  },
  {
    id: 'modernise',
    step: 'Fix or build',
    name: 'UI Modernization & Custom Web Apps',
    outcome: 'A site that looks current, loads fast and turns visitors into enquiries.',
    forWho: 'Your site works but looks old, or you have an idea (a shop, a barber, a ranking site, a startup) with no site yet.',
    scope: [
      'Redesign or build from zero',
      'Fast, responsive, accessible front end',
      'Conversion-focused structure and copy hooks',
      'Fixed-scope packages with clear timelines',
    ],
    deliverables: [
      'Deployed, production-ready site',
      'Before/after metrics against your audit baseline',
      'Handover so you are never locked in',
    ],
    cta: { label: 'See fixed-price packages', to: LINKS.packages },
  },
  {
    id: 'systems',
    step: 'Grow',
    name: 'Custom Business Systems',
    outcome: 'Your site stops being a brochure and starts doing the work.',
    forWho: 'You take bookings, payments or leads by hand and want that automated.',
    scope: [
      'Database integrations',
      'Payment handling',
      'Automated lead routing and notifications',
      'Booking engines',
    ],
    deliverables: [
      'Working system connected to your site',
      'Documentation for how it runs',
      'Scoped and quoted per project, after a conversation',
    ],
    cta: { label: 'Tell us your idea', to: LINKS.contact },
  },
];

export const OLD_SITE_SIGNS = [
  'It takes more than a couple of seconds to appear on your phone',
  'Text is tiny or buttons are hard to tap on mobile',
  'Sharing your link on WhatsApp or social shows no preview image',
  'Nobody can tell in five seconds what you do or how to contact you',
  'It was built before you had your current services or branding',
  'Google finds competitors before it finds you',
];