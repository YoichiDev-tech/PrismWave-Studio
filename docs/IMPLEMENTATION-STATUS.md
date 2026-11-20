# Italian platform and AI workforce — implementation status

## AI workforce delivered in this branch

- 20 role definitions mapped to the existing company charters.
- Local, on-demand CLI runner using the Anthropic Messages API.
- Role-specific tool allowlists: repository listing/reading/search, read-only Git status/diff, fixed quality checks, and operator-confirmed file writes for designated roles.
- Workflow playbooks for lead qualification, delivery, Italian content review, security/privacy escalation, finance/legal coordination, incidents, leadership reviews and capacity planning.
- No public AI endpoint, browser-exposed model key, arbitrary shell tool, production credentials, external messaging, payment, deploy, push, commit or merge capability.

The 20 roles are callable assistants, not 20 continuously running agents or human employees. They run only when the founder invokes the CLI. The founder remains the decision-maker. Legal, tax, accounting and regulated security conclusions require qualified professionals.

## Local setup required

1. Check out this branch and run `npm ci`.
2. Add `ANTHROPIC_API_KEY=...` to a local `.env` file (never commit it).
3. Run `npm run agents:list`.
4. Test one read-only role, for example:
   `npm run agent -- --role frontend-engineer --task "Review the homepage navigation and list remaining English UI copy."`
5. Review every proposed file write and every Git diff. Writes require typing `YES` in the terminal.

The runner uses Anthropic. API usage is billed by the provider. No API key or agent account has been created on the founder's behalf.

## Italian localisation — partial, not release-complete

Translated in this branch: primary navigation, homepage hero, trust strip, audience section labels, pricing headings, process headings, about copy, FAQ, contact labels/validation, booking labels, core audit widget messages, projects/tools page headings, history/changelog/roadmap/reviews page headings, and legal-page headings/navigation.

Still requiring a complete Italian pass and verification:

- Audit detail/findings/sample report, audit feedback, score labels, package suggestions and testimonial content/forms.
- Project detail pages, case studies, all three portfolio templates, revamp flow, audit report, history/changelog/roadmap data entries and other route-level content.
- Full legal-page body text (only headings/navigation were localised); have qualified counsel review the final Italian legal wording.
- All remaining form labels, placeholders, validation/success/error states, accessibility labels, SEO metadata, and dynamic copy.
- Transactional email templates and server/API error messages.
- AI-generated customer-facing copy and any externally hosted Crisp chat welcome text/locale settings.
- Final consistency pass on terminology, dates, currencies, punctuation, mobile layouts and text overflow.

Do not treat this branch as ready for production or claim that the whole product is Italian until these items are completed and checked.

## Verification status

The branch has not been built or linted in a local checkout by the assistant. GitHub Actions is configured for pull requests targeting `main` and pushes to `main`; it does not run merely because this feature branch was updated. Run locally:

```powershell
npm ci
npm run build
npm run lint
npm run agents:list
```

Fix any failures before opening a pull request. The founder retains responsibility for local review and opening the PR.
