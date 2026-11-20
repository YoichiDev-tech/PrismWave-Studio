# PrismWave Studio

PrismWave Studio is an independent digital studio focused on practical digital workflows for Italian small businesses.

## Initial market focus

**Installation and maintenance businesses in Italy.**

The initial customer problem we are exploring: enquiries arrive through calls, WhatsApp, email and other channels, while the business needs a clearer way to collect, organise and follow up each request.

The proposed service is a **custom-scoped request-management workflow**, not a pre-existing off-the-shelf SaaS product. We begin with discovery, confirm the real process, then agree a small and testable scope.

## What the current website demonstrates

- Italian-language landing page focused on the initial business segment.
- Interactive concept UI showing a possible request list and statuses.
- Contact form for businesses that want to discuss their workflow.
- Express API for validating and storing submitted enquiries in PostgreSQL.
- Optional internal email notification through Resend.

**Important:** The request dashboard is a concept demonstration using fictional sample data. It is not a deployed customer system, does not connect to a real business inbox, and must not be represented as a completed client project.

## Current technology

- React 19, TypeScript, Vite
- Tailwind CSS 4
- Express 5
- PostgreSQL (pg)
- Zod request validation
- Helmet security headers
- Resend HTTP API for internal enquiry notifications

## Local development

Requirements: Node.js 22+, PostgreSQL, and (for email testing) a Resend account with a verified sender domain.

1. Copy .env.example to .env.
2. Configure DATABASE_URL, IP_HASH_SALT, and Resend variables.
3. Run server/schema.sql against the PostgreSQL database.
4. Run npm install to install dependencies and synchronise the npm lockfile.
5. Run npm run dev.
6. Open the Vite URL shown in the terminal (normally http://localhost:5173).
7. Check http://localhost:4000/api/health.

See docs/TECHNICAL-SETUP.md.

## Environment variables

See .env.example. All database credentials and email API keys are server-side secrets. Never commit .env, expose database credentials through a VITE_ variable, or place secrets in browser code.

For a separate frontend/API deployment:
- Set VITE_API_BASE_URL to the public API origin at frontend build time.
- Set ALLOWED_ORIGINS on the API to the exact frontend origin.
- Configure PostgreSQL and Resend variables on the API host.

## Italian market launch material

- docs/LAUNCH-CHECKLIST.md
- docs/ITALIAN-OUTREACH-PLAYBOOK.md
- docs/SALES-KIT-ITALIA.md
- docs/TECHNICAL-SETUP.md
- company/README.md

## Proof and honesty policy

PrismWave does not invent client logos, testimonials, case studies, certifications, performance metrics, or delivery history. Concept demonstrations are labelled as such. Client names, logos, quotations, screenshots and results may only be published with permission.

Services are offered only after technical feasibility, scope, support obligations, security and cost have been reviewed. The initial pilot must be agreed in writing before work starts.

## Launch status

This branch is a launch candidate and must pass its build, lint, typecheck, database, email, responsive, accessibility and security smoke tests before production release. Business identity and legal pages contain details that the owner must complete and have professionally reviewed before commercial launch.

The production branch is not changed by this work. Merge and deployment require the CEO's explicit approval.

## Company

The CEO / Founder retains final authority over strategy, positioning, service promises, pricing, budgets, contracts, hiring, material risk acceptance and production release. The COO coordinates operations; the CTO coordinates technical delivery. See the company governance documentation.
