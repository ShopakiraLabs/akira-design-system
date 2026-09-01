# AKIRA Design System — repo conventions for Claude

> Shared AKIRA app conventions are in `../CLAUDE.md` and load automatically
> before this file. **Only what's true of THIS app belongs here.**
> Scaffolded 2026-09-01 from `AKIRA/docs/templates/REPO_CLAUDE_TEMPLATE.md`.

---

## What this app is

Shared React component library, design tokens and layout for every AKIRA app. Distributed via GitHub — **no npm publish step**.

(Fuller description in `README.md` — kept there, not duplicated here.)

| | |
|---|---|
| Repo | `ShopakiraLabs/akira-design-system` |
| Clone | `~/Development/AKIRA/repos/akira-design-system` |
| Branch / last commit | `main` · 2026-07-31 |
| Bolt | not recorded — add it when known |
| Supabase | none |
| Knowledge / specs | Drive `AKIRA/apps/Design System/` |

## Read these first

- `README.md`
- `PUSH.md`

## App-specific notes

- A change here ships to every app that pulls `github:ShopakiraLabs/akira-design-system`. Treat it as a breaking-change surface.
- Consuming apps alias the package to its TS source in `vite.config.ts` — keep that working.
- Pending/patch work is staged in Drive `AKIRA/apps/design-system-updates/`. Dark-theme contrast v0.3.0 and the Ocean default + collapsible rail changes are recorded in project memory.

## Domain rules — load-bearing, don't re-derive

**TBD — not yet captured.** Fill this in as rules surface: calendar logic,
what a status value really means, formula definitions, which location id is
what. Cite where each was decided and by whom. An empty heading is honest;
a plausible guess is a landmine.

## Verification

**TBD — not yet captured.** Record the page to open and the number that must
tie out, with real figures from a real run. Never invent a regression value.
