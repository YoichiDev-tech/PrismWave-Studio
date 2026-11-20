# Technical setup — Italian SMB launch branch

## Stack

- React + TypeScript + Vite frontend.
- Express 5 API.
- PostgreSQL persistence through the `pg` driver.
- Resend HTTP API for internal new-lead notifications.
- Vite proxies `/api` to `http://localhost:4000` in local development.

## Prerequisites

- Node.js 22 or newer.
- PostgreSQL database.
- Resend account and a sender domain verified by Resend.

## First-time setup

1. Copy `.env.example` to `.env`.
2. Fill in `DATABASE_URL`, `IP_HASH_SALT`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`.
3. Set `ALLOWED_ORIGINS` to the exact local and production origins that should be allowed to call the API.
4. Run `server/schema.sql` against the PostgreSQL database.
5. Run `npm install` to install dependencies and synchronise `package-lock.json`.
6. Run `npm run dev`; Vite starts on port 5173 and the API on port 4000.
7. Check `GET /api/health` and submit a test enquiry using synthetic data.

## Production deployment

Deploy the frontend and API behind one HTTPS origin where possible. If they are separate origins, set `VITE_API_BASE_URL` to the API origin and add the exact frontend origin to `ALLOWED_ORIGINS`.

Configure all environment variables in the hosting provider, not in source control. Use a restricted PostgreSQL application role that can insert leads and update only the operational fields needed by the API. Do not give the public browser database credentials or direct database access.

The API stores the lead first, then attempts an email notification. A successful form response confirms persistence, not guaranteed inbox delivery. Monitor notification failures and test the sender before launch.

## Security notes and known limitations

- Request validation is server-side with Zod.
- Request body size is capped.
- Helmet sets baseline HTTP security headers.
- Rate limiting is stored in PostgreSQL using hashed IP identifiers.
- Configure `IP_HASH_SALT` as a long random secret and protect it like any other credential.
- Restrict database access to the API service and maintain backups.
- The health endpoint reports configuration; verify database connectivity and email delivery in a deployment smoke test.
- Add retention/deletion automation and an authenticated lead-management interface before operating at scale.
- Do not place actual client data in demo fixtures or screenshots.

## Commands

- `npm run dev` — local frontend and API.
- `npm run typecheck` — TypeScript checks.
- `npm run build` — TypeScript and Vite production build.
- `npm run lint` — ESLint.
- `npm start` — run compiled API server.
