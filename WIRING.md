# Wiring these files into the existing repo

Drop the `src/` folder contents from this bundle into your repo at the
matching paths (they're new files — nothing gets overwritten). Then make
these two small edits to files that already exist.

## 1. `src/App.tsx`

Add these imports near the top, with the other page imports:

```tsx
import Packages from "./pages/Packages";
import LocalServiceLandingPage from "./pages/packages/LocalServiceLandingPage";
import RestaurantCafeLandingPage from "./pages/packages/RestaurantCafeLandingPage";
import ProfessionalOnePager from "./pages/packages/ProfessionalOnePager";
import SeoAdjustment from "./pages/packages/SeoAdjustment";
import InsightsDashboardShowcase from "./pages/packages/InsightsDashboardShowcase";
```

Add these routes inside `<Routes>`, near the `/work` routes:

```tsx
<Route path="/packages" element={<Packages />} />
<Route path="/packages/local-service-landing-page" element={<LocalServiceLandingPage />} />
<Route path="/packages/restaurant-cafe-landing-page" element={<RestaurantCafeLandingPage />} />
<Route path="/packages/professional-one-pager" element={<ProfessionalOnePager />} />
<Route path="/packages/seo-adjustment" element={<SeoAdjustment />} />
<Route path="/packages/insights-dashboard-showcase" element={<InsightsDashboardShowcase />} />
```

## 2. `src/components/Nav.tsx`

In the `LINKS` array, add a "Packages" entry (right after "Work" reads
well, since it's the natural next step after browsing templates):

```tsx
const LINKS: { label: string; href: string; intent?: Intent }[] = [
  { label: "Services", href: "#services" },
  { label: "Build", href: "#build", intent: "build" },
  { label: "Work", href: "/work" },
  { label: "Packages", href: "/packages" },   // <-- add this line
  { label: "Revamp", href: "/revamp" },
  { label: "Lab", href: "/lab" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];
```

No other changes needed — `Nav.tsx` already branches on `href.startsWith("/")`
to render a router `Link`, so "Packages" will work automatically in both
desktop and mobile menus.

## What you're getting in this bundle

```
src/data/packages.ts                          — single source of truth for all 5 packages
src/components/packageMocks/*.tsx              — 5 card preview mocks (brand tokens only)
src/components/Packages.tsx                    — the grid section (mirrors Portfolio.tsx)
src/components/PackagePageLayout.tsx           — shared full-page template
src/pages/Packages.tsx                         — /packages index page wrapper
src/pages/packages/*.tsx                       — 5 thin route pages
```

To add a 6th package later: add one object to `packages` in `data/packages.ts`,
build one small mock component, add one route line. Everything else — the
grid card, the full page, included/excluded lists, SEO tags, AI metadata —
is generated from that one data entry via `PackagePageLayout`.