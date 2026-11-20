# Technical setup — Italian SMB launch branch

## Stack
React, TypeScript and Vite frontend; Express API; PostgreSQL via pg; Zod validation; Helmet headers; Resend HTTP API for internal enquiry notifications.

## Prerequisites
- Node.js 22 or newer.
- PostgreSQL database.
- Resend account and a sender domain verified by Resend.

## Local setup
1. Copy .env.example to .env.
2. Configure DATABASE_URL, IP_HASH_SALT, RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL.
3. Set ALLOWED_ORIGINS to the exact local and production frontend origins.
4. Run server/schema.sql against PostgreSQL.
5. Run npm install to install dependencies and synchronise package-lock.json.
6. Run npm run dev; Vite normally starts on port 5173 and the API on port 4000.
7. Check GET http://localhost:4000/api/health and submit a synthetic test enquiry.

## Production deployment
Deploy the frontend and API behind HTTPS. If they use separate origins, set VITE_API_BASE_URL at frontend build time and add the exact frontend origin to ALLOWED_ORIGINS on the API.

Configure all secrets in the hosting provider, never in source control. Use a restricted PostgreSQL application role. Do not give the public browser database credentials or direct database access.

The API stores the lead first, then attempts an email notification. A successful form response confirms persistence, not guaranteed inbox delivery. Monitor notification failures and test sender delivery before launch.

## Security notes and limitations
- Server-side Zod validation and 20 KB request body limit.
- Helmet baseline security headers.
- PostgreSQL-backed rate limiting keyed by a hashed IP identifier.
- IP_HASH_SALT must be a long random secret.
- Maintain database backups and test restoration.
- Define and implement retention/deletion automation before real customer data is collected.
- No authenticated lead-management dashboard is included in this initial launch slice.
- Keep demo data synthetic.

## Commands
- npm run dev — frontend and API.
- npm run typecheck — TypeScript checks.
- npm run build — TypeScript and Vite production build.
- npm run lint — ESLint.
- npm start — run compiled API server.
