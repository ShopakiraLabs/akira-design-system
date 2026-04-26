# AKIRA Design System

Shared React component library, design tokens, and layout for AKIRA internal apps. One source of truth — the same `AppShell` + `Tile` + `Toolbelt` shows up in every AKIRA app, automatically themed via CSS variables.

**Repo:** [github.com/ShopakiraLabs/akira-design-system](https://github.com/ShopakiraLabs/akira-design-system)
**Reference app:** [github.com/ShopakiraLabs/akira-os](https://github.com/ShopakiraLabs/akira-os)

## Install

The design system is distributed via GitHub — no npm publish step. Add it to any React app's `package.json`:

```json
{
  "dependencies": {
    "@akira/design-system": "github:ShopakiraLabs/akira-design-system"
  }
}
```

Run `npm install`, then in your app entry point:

```tsx
// main.tsx
import '@akira/design-system/src/tokens/tokens.css';
import '@akira/design-system/src/tokens/components.css';
import { AppShell, LeftRail, RailLink, TopBar, SearchBar, Toolbelt, Tile } from '@akira/design-system';
```

## The 60-second tour

```tsx
import { Home, BarChart3, Box, User, LogOut } from 'lucide-react';
import {
  AppShell, LeftRail, RailLink,
  TopBar, SearchBar, Toolbelt,
  SectionHeader, Tile,
} from '@akira/design-system';

export function App() {
  return (
    <AppShell
      rail={
        <LeftRail appName="AKIRA OS" subtitle="Internal Apps">
          <RailLink label="Home"    icon={<Home size={16} />}    active />
          <RailLink label="Reports" icon={<BarChart3 size={16} />} />
          <RailLink label="Catalog" icon={<Box size={16} />} />
        </LeftRail>
      }
      topBar={
        <TopBar
          appName="AKIRA OS"
          center={<SearchBar placeholder="Search apps…" />}
          end={
            <Toolbelt
              profile={{
                name: 'Rick Walter',
                email: 'rwalter@shopakira.com',
                items: [
                  { label: 'Your profile', icon: <User size={14} /> },
                  { label: 'Sign out',    icon: <LogOut size={14} />, divider: true },
                ],
              }}
            />
          }
        />
      }
    >
      <SectionHeader title="Pinned for you" subtitle="What you've starred" />
      <div className="akira-tile-grid">
        <Tile kicker="Home Office" title="Employee Directory" description="Find anyone at AKIRA." href="/directory" />
        <Tile kicker="Warehouse"    title="Wire Schedule"     description="Today's wires & ETAs."    href="/wire" />
      </div>
    </AppShell>
  );
}
```

That's it. Styling is themeable from the `Toolbelt`'s built-in `ThemePicker` — every color, radius, and shadow flows through CSS variables.

## Layout pattern

Every AKIRA app uses the same outer shell:

```
┌────────────────────────────────────────────────────────────┐
│ ImpersonationBanner       (optional, hidden by default)    │
├──────────┬─────────────────────────────────────────────────┤
│ LeftRail │ TopBar  [appName] [SearchBar]  [Toolbelt]       │
│  brand   ├─────────────────────────────────────────────────┤
│  links   │                                                 │
│  ⋮       │  page content                                   │
│          │                                                 │
└──────────┴─────────────────────────────────────────────────┘
```

The `Toolbelt` always has the same right-to-left order: **Appearance · Settings · Profile**. This is the canonical pattern recorded in our brand skill — apps should not reorder it.

## Tokens

All visual properties flow through CSS variables defined in `src/tokens/tokens.css`. Use the semantic tokens — never a raw hex value — so theme switching keeps working.

### Color tokens

| Token | What to use it for |
|---|---|
| `--color-bg` | Page background |
| `--color-card` | Tile / card / modal background |
| `--color-surface` | Elevated surfaces — inputs, hover states, secondary buttons |
| `--color-text-primary` | Default readable text |
| `--color-text-muted` | Secondary text, labels, kickers |
| `--color-accent` | Brand/primary action color. Buttons, chart highlights, active states. **Changes per theme.** |
| `--color-border` | Card + panel + input borders |
| `--akira-heritage-red` | **Reserved.** Always `#D92028`. Use only for AKIRA brand indicators (e.g. the active-rail-link dot). Never substitute for `--color-accent`. |

### Structural tokens

| Token | Used by |
|---|---|
| `--radius-card` | Large radius — cards, tiles, modals |
| `--radius-base` | Medium radius — inputs, buttons, chips |
| `--radius-bar` | Small radius — bar chart bars, progress fills |
| `--shadow-card` | Card / modal shadow |
| `--border-thickness` | Border width (1px Modern · 0 Material · 2px Brutalist) |

## Themes

Switch via `data-theme="<slug>"` on `<html>`. The `default` theme uses no attribute. Use the `ThemePicker` component or the `useAkiraTheme()` hook to switch.

| Slug | Name | Mode | Accent |
|---|---|---|---|
| _(none / `default`)_ | **AKIRA Red** — the brand default | Dark | `#D92028` (Heritage Red) |
| `akira-dark` | AKIRA Dark | Dark | `#EC4899` |
| `midnight` | Midnight | Dark | `#8B5CF6` |
| `forest` | Forest | Dark | `#22C55E` |
| `coral-dark` | Dark Coral | Dark | `#F97316` |
| `ocean` | Ocean | Light | `#0EA5E9` |
| `coral` | Coral | Light | `#F97316` |

## Structural styles

Switch via `data-style="<slug>"` on `<html>`.

| Slug | Name | Vibe |
|---|---|---|
| _(none / `modern`)_ | Modern | Rounded corners, soft shadows, 1px borders (iOS/web feel) |
| `material` | Material | Less rounding, elevation-style shadows, no borders (Material 3) |
| `flat` | Brutalist | Square corners, hard block shadows, 2px borders |

## Components

Every component lives in `src/components/<Name>/` with its own `README.md`. Names are stable — reference them in your bolt.new prompts to get the right component first try.

| Component | Purpose |
|---|---|
| [`AppShell`](src/components/AppShell/README.md) | Outermost two-column layout |
| [`LeftRail`](src/components/LeftRail/README.md) | Vertical navigation rail |
| [`RailLink`](src/components/RailLink/README.md) | Single nav row in the rail |
| [`TopBar`](src/components/TopBar/README.md) | Horizontal app header |
| [`SearchBar`](src/components/SearchBar/README.md) | Top-bar search input |
| [`Toolbelt`](src/components/Toolbelt/README.md) | The Appearance · Settings · Profile cluster |
| [`ThemePicker`](src/components/ThemePicker/README.md) | Gear button + theme/style popover |
| [`SettingsMenu`](src/components/SettingsMenu/README.md) | Cog button + sectioned dropdown |
| [`ProfileMenu`](src/components/ProfileMenu/README.md) | Avatar button + account dropdown |
| [`ImpersonationBanner`](src/components/ImpersonationBanner/README.md) | Yellow strip when admin acts as another user (default hidden) |
| [`Tile`](src/components/Tile/README.md) | Canonical card primitive |
| [`PinChip`](src/components/PinChip/README.md) | Pinned-item chip + scroll strip |
| [`SectionHeader`](src/components/SectionHeader/README.md) | Header above a tile grid |

## Brand rules

These are non-negotiable across every AKIRA app:

- **AKIRA in copy is always all-caps.** Exception: the URL `akira.com`.
- **`--akira-heritage-red` (`#D92028`) is reserved.** Do not substitute it for `--color-accent`. The `default` theme happens to use Heritage Red as its accent because that theme _is_ the brand; other themes get their own accent.
- **System fonts only in product UI.** No Google Fonts. (Bebas Neue / Open Sans still apply to marketing + print.)
- **Toolbelt order is fixed:** Appearance → Settings → Profile.

## Local development

```bash
npm install
npm run dev        # opens the example app at /examples/basic
```

## Adding a new theme

1. Add a `[data-theme="your-slug"]` block in `src/tokens/tokens.css` with all 7 semantic color slots.
2. Add a matching entry to `THEMES` in `src/tokens/tokens.ts`.
3. The `ThemePicker` automatically picks it up.

## Adding a new structural style

1. Add a `[data-style="your-slug"]` block in `tokens.css` with all 5 structural slots.
2. Add a matching entry to `STYLES` in `tokens.ts`.
3. If your style sets `--border-thickness: 0`, also add a `[data-style="your-slug"] .akira-tile:hover` rule that uses `box-shadow` for the accent (border-color hover is invisible at 0 width).

## Using with bolt.new

See [`docs/prompting-bolt.md`](docs/prompting-bolt.md) for the canonical "apply AKIRA design system to my app" prompt.

## Versioning

`v0.x` while we iterate. Once consumer apps stabilize on v1 we'll cut a tag and consumers can pin via `github:ShopakiraLabs/akira-design-system#v1.0.0`.
