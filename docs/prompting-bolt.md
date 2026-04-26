# Prompting bolt.new with the AKIRA Design System

Bolt.new's docs say the two biggest factors in design-system quality are (1) the source quality of the repo, and (2) how specifically you reference components by name in your prompts. This page is the playbook for both.

## Starting a new project

1. On the Bolt homepage, in the chat toolbar, click **Design System**.
2. Pick **AKIRA Design System**.
3. Enter your prompt and hit Build.

You can only choose a design system at project creation — Bolt cannot retrofit one onto an existing project (yet).

## Anchor prompt — start any AKIRA app from this

Paste this as your **first** message in any new bolt.new project that uses the AKIRA design system:

```
Build a [APP NAME] internal tool for AKIRA using the AKIRA Design System.

Layout: use <AppShell> with <LeftRail> on the left and <TopBar> on top.
The TopBar's `end` slot should be a <Toolbelt> with a profile menu populated
from the current user.

Use the standard AKIRA tokens — never hardcode colors. Read color from
var(--color-card), var(--color-text-primary), etc. The active rail-link
dot is Heritage Red (theme-independent) and is automatic — do not override.

The app is: [WHAT THE APP DOES].

The main page should be a tile grid. Pages I need:
1. [page A — describe with tile names]
2. [page B]
3. [page C]
```

Replace `[APP NAME]`, `[WHAT THE APP DOES]`, and the page list with your own. Bolt will scaffold a Vite + React app with the design system already wired in.

## Adding the design system to an existing app

> Bolt currently can't add a design system to an already-created project. The workflow below uses Bolt's GitHub integration to do it manually.

If you have an app that was started without a design system and you want it to look like the AKIRA system:

1. **Push the existing app to GitHub** (if it's not already there) using Bolt's GitHub integration.
2. **Clone it locally** or open it in another editor.
3. **Install the design system** by adding to `package.json`:
   ```json
   { "dependencies": { "@akira/design-system": "github:ShopakiraLabs/akira-design-system" } }
   ```
4. Run `npm install`.
5. **Paste this redesign prompt into bolt.new** (see next section) — the agent will do the actual conversion.

## The "redesign with AKIRA" prompt

Use this whenever you're converting an existing app's UI to the AKIRA design system:

```
I'm adding the AKIRA Design System to this app. The repo is github:ShopakiraLabs/akira-design-system. It's already in package.json as @akira/design-system.

Please update the app to use the AKIRA Design System with the following rules:

1. STYLES — Add these two imports to main.tsx:
     import '@akira/design-system/src/tokens/tokens.css';
     import '@akira/design-system/src/tokens/components.css';

2. LAYOUT — Wrap the app in <AppShell> with these slots:
     - rail:    <LeftRail appName="..." subtitle="...">RailLinks</LeftRail>
     - topBar:  <TopBar appName="..." center={<SearchBar/>}
                       end={<Toolbelt profile={...}/>}/>
   Do NOT include <ImpersonationBanner> unless this app needs admin impersonation.

3. NAV — Map every existing nav item to a <RailLink> with a lucide icon.
   Mark the current route with `active`.

4. CARDS — Replace any card-like components with <Tile>. Set:
     - kicker:      uppercase eyebrow (existing category/tag)
     - kickerIcon:  lucide icon
     - title:       existing title
     - description: existing description (one line)
     - cta:         "Open" (default) or the existing CTA text
     - href / onClick: keep existing route

5. TILE GRIDS — Wrap groups of <Tile>s in <div className="akira-tile-grid">.

6. SECTION HEADERS — Replace any "section title + subtitle + actions" rows
   with <SectionHeader title="..." subtitle="..." actions={...}/>.

7. SEARCH — Replace the existing top-bar search with <SearchBar/>.

8. COLORS — Replace every hardcoded color with the matching CSS variable:
     bg backgrounds      → var(--color-bg) or var(--color-card)
     primary text        → var(--color-text-primary)
     muted/labels        → var(--color-text-muted)
     primary actions     → var(--color-accent)
     borders             → var(--color-border)
     elevated surfaces   → var(--color-surface)
   Do NOT introduce new color palettes. Do NOT use Tailwind text-gray-* etc
   for any color that should be themeable.

9. FONTS — Remove any Google Fonts imports. Keep system font stack only.

10. AVATAR — Replace any "user info" footer/sidebar block with a
    <ProfileMenu> in the Toolbelt. Don't have both.

What you should NOT touch:
- Backend / data fetching code
- Routing structure (just rewrite the components in each route)
- Form validation or business logic
- Tests

After updating, briefly list the files you changed and any places where you
had to make a judgment call about which AKIRA component to use.
```

Save this prompt somewhere reusable. Most of it is constant — only point 3 (nav mapping) and the page-by-page tile mapping changes per app.

## Prompting tips (per Bolt's official guidance)

- **Reference components by name.** "Add a `<Tile>` for the new Reports page" beats "add a card."
- **Be specific about scope.** "Update the dashboard's tile titles to use sentence case, but don't change the layout" beats "make it look better."
- **Anchor on existing components.** If unsure what's available, browse this README first — every component has its slug + props listed.

## When something looks off

Common issues, in order of likelihood:

- **Hardcoded colors leaked back in.** Search for `text-gray-`, `bg-gray-`, hex codes in className/style. Replace with `var(--color-…)`.
- **Hover doesn't show accent on Material.** Add `[data-style="material"] .your-class:hover { box-shadow: 0 0 0 2px var(--color-accent), var(--shadow-card); }` — at 0 border, border-color hover is invisible.
- **PinChip shadows clipped at top/bottom.** The strip's wrapper needs vertical padding. Use `<PinStrip>` (it's right by default) or `padding: 12px 0` on `overflow-x: auto` containers.
