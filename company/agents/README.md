# PrismWave AI Workforce — Local Agent Runtime

This is an **operator-controlled AI assistant system**, not a claim that PrismWave employs 20 people or has 20 autonomous workers running continuously.

## What is included

- 20 role-specific agents mapped to the existing company role charters.
- A local command-line runner using the Anthropic Messages API.
- Role-scoped tools: repository listing, file reading, literal search, Git status/diff, quality checks, and explicitly approved file writes.
- Written authority boundaries, escalation rules, and human approval requirements.
- No public API endpoint, no browser-exposed AI key, no automatic deployment, no autonomous Git push/PR/merge, and no direct client, bank, tax, legal, or production-system access.

## Requirements

- Node.js 22+
- Dependencies installed with `npm ci`
- An Anthropic API key available locally as `ANTHROPIC_API_KEY` (in an untracked local `.env`, never committed)
- The repository checked out on a development branch

## Commands

```powershell
npm run agents:list
npm run agent -- --role frontend-engineer --task "Review the navigation component and propose an accessible Italian localisation."
```

Use any ID in `registry.json` for `--role`. The agent reads its role charter before acting. Set `AGENT_MODEL` locally only if you deliberately want a different Anthropic model.

## Tool permissions

| Tool | Behaviour |
|---|---|
| list_files | Lists tracked-worktree files while excluding dependencies, build output, Git metadata and environment files |
| read_file | Reads a repository file; environment files and secret-like paths are blocked |
| search_text | Literal text search in source/documentation files |
| git_status / git_diff | Read-only Git inspection |
| run_quality_check | Only `npm run build`, `npm run lint`, or `npm run typecheck` |
| write_file | Available only to designated roles; every write requires interactive operator confirmation |

The runner never accepts arbitrary shell commands. It cannot push, commit, merge, deploy, access production, read environment files, or approve its own changes. Review every generated change and run the project checks yourself.

## Operating rules

1. The human founder remains CEO and final decision-maker. The CEO agent is an adviser, not the CEO.
2. COO and CTO agents coordinate and recommend; they cannot overrule the founder.
3. Agents must distinguish verified facts, assumptions, estimates and unknowns.
4. No fabricated clients, reviews, credentials, metrics, certifications or revenue.
5. No legal, tax, accounting or regulated security sign-off by an AI agent. Qualified professionals remain responsible.
6. No external customer contact, financial transaction, contract, hiring decision, production access or release without explicit human approval.
7. The agent must stop and escalate if asked to exceed its listed tools or authority.
8. Do not put API keys, client records, private prospect data or secrets in prompts or repository files.

## Activation model

All 20 roles are available on demand. They are not background processes and do not run unless a human invokes the CLI. Multi-role workflows are coordinated by the operator using the workflow checklists in `company/workflows/`. This deliberately avoids pretending that unconfigured autonomous services, accounts or integrations exist.

## External integrations still require setup

The runtime currently has one model provider (Anthropic) and local repository tools. GitHub write operations, email, calendar, CRM, project management, accounting, analytics and hosting integrations are not enabled by this runner. Connect and permission those systems separately only when the founder chooses the provider, account, data scope and approval model.
