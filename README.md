# Title

PrismWave Studio

## Screenshot

![alt text](image-2.png)

## Description

A fully custom, modern studio website built with React, TypeScript, Tailwind CSS and Vite.
Designed to show new/small/medium-sized business owners what a fast, handcrafted site looks and feels like.

## Project Purpose

This project serves as the official PrismWave Studio website. It showcases real sections,
real UX, real templates, and a real studio flow — giving prospects a clear sense of how I build,
how I communicate, and what working together looks like.

Beyond the marketing site itself, it's now also a working demo of what the studio can build:
a live audit tool, an instant pricing configurator, and an open component library — not just
copy describing the service, but the service running in the browser.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- react-helmet-async (per-route SEO and social share tags)
- Supabase (live — interaction tracking; testimonials engine still planned)
- Vercel Serverless Functions
- Resend (transactional email)

## Current Status

- Fully functional demo — builds and lints clean
- All sections implemented: Hero, Services, Process, Pricing, Sprint Configurator,
  Portfolio, Why Choose Us, FAQ, About, Contact, Footer
- 3 portfolio templates are live, clickable routes (`/work/...`), each a
  full standalone landing page
- 5 fixed-price packages are live, clickable routes (`/packages/...`) —
  same click-through-to-full-page pattern as the portfolio templates,
  now paired with a fixed price and a scoped included/not-included list
- Contact form is wired to a real backend via Resend (`/api/send`) — actually
  sends, not simulated
- AI-Ready Site Audit tool is live (`/api/audit`) — fetches a visitor's site
  server-side and scores it for real, no fake numbers
- Sprint Configurator hands its output straight into the Contact form, pre-filled
- The Lab (`/lab`) — a small open component showcase, copy-paste ready
- Legal pages live: Terms of Use, Privacy Notice, and Regulatory Information
  (`/terms`, `/privacy`, `/regulatory`) — Regulatory still carries a placeholder
  for the studio's formal business registration details, to be filled in once
  registered
- Every route now ships its own SEO metadata — title, meta description,
  canonical URL, and Open Graph/Twitter tags — instead of one shared set
  copied across every page
- No real client testimonials, case studies, or production assets yet —
  content is illustrative, and clearly labeled as such where numbers are shown
- Fixed a layout bug where the Crisp chat integration was letting the whole
  page drag sideways to reveal the chat icon — page is locked to vertical
  scroll only now
- Every visit and every meaningful action (contact submit, audit run, chat
  opened/messaged) now gets logged to Supabase via `/api/track` — feeds a
  separate private ops dashboard, not visible anywhere on this site

## Live Features

- AI-Ready Site Audit — instant, real heuristic scoring of any URL
  (speed, UI/UX modernism, mobile responsiveness, AI readability)
- Architecture & MVP Sprint Configurator — toggle-based scope + instant
  price/timeline estimate, feeds straight into Contact
- Fixed-price Packages (`/packages`) — 5 productized offers (local service
  landing page, restaurant/café landing page, professional one-pager, SEO
  adjustment, insights dashboard showcase), each with its own scoped page:
  what's included, what's not, turnaround, and a fixed price up front.
  The Insights Dashboard package is explicitly labeled as running on
  sample data in the UI itself, same disclosure pattern used elsewhere
  on the site for illustrative numbers
- The Lab — public, copyable component snippets with live previews
- Crisp live chat fully integrated and mobile-synced
- Real-time visitor tracking via Crisp
- Custom branded chatbox with welcome message
- Working contact form (Resend) with confirmation state
- Interaction tracking (pageviews + key actions) piped server-side into
  Supabase, no client-side keys involved — powers a separate private
  ops dashboard
- Structured lead records include contact intent, audit context, scope
  estimates, session attribution, and follow-up status
- Per-page SEO and social share metadata — each route serves its own
  title, description, canonical link, and OG/Twitter card
- Fully responsive across mobile, tablet, and desktop
- Production deployment on Vercel

## Next Steps

- Testimonials engine (hybrid: home preview + full `/testimonials` page,
  Supabase-backed — plan already written in `Updates.txt`)
- Instagram Growth Showcase using the official Instagram Graph API
- Add follower count + engagement metrics to the site
- Create a Facebook Page and link Instagram Business account
- Implement serverless API route for Instagram data
- Add caching layer for stable API performance
- Verify the site in Google Search Console and submit `sitemap.xml`; add a
  lightweight public analytics tool (e.g. Plausible) for traffic/SEO
  visibility — separate from the internal Supabase ops tracking, which is
  already live
- Build the actual "agent runs the outreach" job — the ops dashboard
  (separate project, `prismwave-ops`) already has the drafting +
  approval queue; still need the cron job that finds leads and the
  send-on-approval step
- Confirm real Threads/Instagram handles across Footer + Lab (currently placeholders)
- Fill in real business registration details on the Regulatory page once
  the studio is formally registered
- Write a first blog/content post to start building an organic search and
  authority channel
- Wire up checkout (Lemon Squeezy or Stripe Payment Links) for the 5
  Packages — pages and pricing are live, but "Get this package" still
  routes to Contact rather than taking payment directly
- Decide whether to also package the 3 portfolio templates (Bloom Market,
  Fielding & Rye, Nova Cloud) themselves as downloadable, priced products,
  separate from the service Packages above
- Build the real data-connection phase for the Insights Dashboard package
  once a client actually buys it (backend, auth, live source — explicitly
  out of scope on the sample-data version)

## End-Project Considerations

- Buy `prismwavestudio.com` and set up `hello@` on it
- Verify in Search Console and add public analytics before driving traffic to it
- Revisit copy once there's a first real client project to reference

## Sales pipeline setup

Run `supabase/schema.sql` in the same Supabase project used by the Studio
serverless functions and Ops dashboard. Studio requires `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `CONTACT_TO_EMAIL` as
server-side variables. Ops should use the same `SUPABASE_URL` and database,
with its own authenticated operator allowlist and server-side service role
key. Never expose the service role key with a `VITE_` prefix.

## Changelog

### 08/08/2026
- Updated spacing, layout, and UI polish across all sections
- Improved scroll behavior and button interactions
- Enhanced typography and visual hierarchy
- Cleaned component structure and removed unused code
- Verified Tailwind v4 configuration and build stability

### 10/08/2026

#### stack
- Crisp chat integration
- Calendly scheduling
- Supabase

#### current status
- Crisp chat integration added
- Calendly booking flow added
- Planned testimonials
- Fully responsive

#### live features
- Pricing section added
- FAQ section answering common questions
- About section

### 15/08/2026
- Full code review pass
- Fixed unconditional ReviewPopup rendering
- Removed placeholder testimonial content ahead of the real engine
- Added missing OG tags for social sharing
- Hover/animation polish across static sections
- Added social links (Threads, Instagram, GitHub) to Footer

### 16/08/2026
- Added AI-Ready Site Audit tool: real server-side fetch + honest heuristic
  scoring (speed, UI/UX modernism, mobile, AI readability), no fabricated data
- Added Architecture & MVP Sprint Configurator: toggle scope, instant
  price/timeline estimate, hands off straight into Contact pre-filled
- Added The Lab (`/lab`): open, copyable component showcase
- Extended Contact to accept a pre-filled hand-off from either new tool
- Added Lab link to Nav (desktop + mobile)

### 17/08/2026
- Added new hero screenshot (/public/images/bloom/hero.png) sourced from the Bloom Market template
- Integrated the hero screenshot into the Bloom Market case study hero section using the `<Screenshot />` component
- Ensured layout consistency with existing case study visual sections
- Resolved Git branch sync issues caused by empty feature branches
- Re‑applied missing case study changes and committed them to a new feature branch
- Successfully pushed the corrected branch and opened the PR for Issue #5

### 23/08/2026
- Fixed the horizontal-scroll bug introduced by the Crisp chat integration
  (`overflow-x: hidden` was quietly letting the page get dragged sideways
  on touch/trackpad — swapped for `overflow-x: clip`, which removes the
  scrollable region instead of just hiding its scrollbar)
- Wired up Crisp's `onChatOpened` / `onMessageSent` events instead of just
  configuring the widget and walking away
- Built the interaction tracking pipeline: `interaction_events` table in
  Supabase, `/api/track` (server-side write, service-role key never
  touches the client), `src/lib/track.ts` + `usePageTracking` on the
  client side
- Tracking now fires on: every route change, contact form submit, audit
  run + audit completed, chat opened, chat message sent
- Kicked off `prismwave-ops` — a fully separate, unlinked project (own
  repo, own Vercel deployment, own Supabase project) that reads this
  tracking data and shows three report windows (morning/evening/night)
  plus an AI-drafted outreach approval queue. Nothing about it lives in
  this repo on purpose — see that project's own README for why

### 12/09/2026
- Added per-route SEO via `react-helmet-async` and a shared `<SEO />`
  component: every page now ships its own title, meta description, and
  canonical URL, fixing a bug where the canonical tag pointed every route
  at the homepage instead of itself
- Added `lastmod` dates to `sitemap.xml` and included the previously
  missing Appointment Workflow concept URL
- Relabeled ServeSync's weekly savings figures as illustrative targets
  rather than measured results, matching the disclosure pattern already
  used on the Appointment Workflow concept, and added a closing
  "no fabricated testimonial" section
- Added payment clarity to Pricing: deposit split, accepted payment
  methods, currency, and how work beyond included revisions is handled
- Added TODO markers on the Regulatory page for real business
  registration details, ready to fill in once the studio is formally
  registered in Italy

### 15/09/2026
- Added Packages (`/packages`): 5 fixed-price, productized service
  offers — Local Service Landing Page, Restaurant/Café Landing Page,
  Professional One-Pager, SEO Adjustment, and Insights Dashboard
  Showcase — separate from the free `/work` portfolio templates
- Each package gets its own full route (`/packages/<slug>`) using the
  same click-a-card-to-open-the-full-page pattern as the portfolio
  templates: scoped included/not-included lists, turnaround time, and
  a fixed price up front instead of a custom quote
- Built one shared `PackagePageLayout` component driven off a single
  `packages.ts` data file, so every package page stays structurally
  consistent and a 6th package is one data entry + one route away
- Insights Dashboard Showcase built on sample data only, labeled as
  such on both the card and the full page (same disclosure standard
  already used for ServeSync and the Appointment Workflow concept);
  price bundles the build with the first maintenance cycle, real data
  connection scoped as a separate future phase
- Added "Packages" to Nav (desktop + mobile), positioned after "Work"
- Checkout not wired yet — "Get this package" currently routes to
  Contact, same as the portfolio template CTAs

## Author

Yoichi dev