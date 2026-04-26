# Layout

Every AKIRA app uses the same outer shell. This document is the contract: if you're tempted to invent a different layout, don't — adopt the standard one and add new components inside it.

## The standard shell

```
┌────────────────────────────────────────────────────────────┐
│ ImpersonationBanner       (optional, hidden by default)    │
├──────────┬─────────────────────────────────────────────────┤
│ LeftRail │ TopBar  [appName]  [SearchBar]   [Toolbelt]     │
│  brand   ├─────────────────────────────────────────────────┤
│  links   │                                                 │
│  ⋮       │  page content                                   │
│  footer  │                                                 │
└──────────┴─────────────────────────────────────────────────┘
```

In code:

```tsx
<AppShell
  rail={<LeftRail … />}
  topBar={<TopBar … />}
  impersonation={<ImpersonationBanner /* default hidden */ />}
>
  page content
</AppShell>
```

`AppShell` does the grid; the named slots (`rail`, `topBar`, `impersonation`, `children`) make the structure self-describing for any agent reading the code.

## LeftRail — the navigation surface

- Fixed width (240px), sticky to viewport.
- Header: app name + uppercase subtitle.
- Body: a list of `RailLink`s, optionally grouped by `RailSectionTitle`.
- Footer (optional): version tag, sign-out, etc. The standard AKIRA OS template leaves this empty because the avatar in the top-right covers those needs.

The active `RailLink` shows a Heritage Red dot — that dot is **theme-independent** on purpose, because it's an AKIRA brand marker. Don't swap it for `--color-accent`.

## TopBar — the always-visible header

The TopBar has three named slots:

- **`start`** — far-left content. Almost always omitted on desktop. On mobile, this is where the hamburger button goes.
- **`center`** — almost always a `<SearchBar />`.
- **`end`** — almost always a `<Toolbelt />`.

There is also an `appName` shortcut for the most common left-aligned label. Apps with a logo should put the logo image in `start` and leave `appName` undefined.

## Toolbelt — the canonical right cluster

```
[Appearance]  [Settings]  [Profile avatar]
```

This order was chosen 2026-04-23 and is recorded in our brand skill. Do not reorder it. Apps that don't need one of the three can omit the corresponding prop:

- `appearance={false}` to hide the gear (rare — most apps want the theme picker).
- Omit `settings` to hide the cog.
- Omit `profile` to hide the avatar (e.g. on signed-out screens).

## Impersonation banner

Hidden by default. Pass `<ImpersonationBanner visible targetName="…" />` only when an admin is currently acting as another user. The banner appears **above** the TopBar so it's the first visual cue that "this isn't your normal session."

If your app doesn't support impersonation, simply omit the `impersonation` prop on `AppShell` — the banner code never runs and the bundle stays small.

## Tile grids

Page content is mostly grids of `<Tile />`. Wrap them in `<div className="akira-tile-grid">` — that class gives you `repeat(auto-fill, minmax(260px, 1fr))` and a 16px gap, which works on every breakpoint without media queries.

Pinned shortcuts go in a `<PinStrip>` with `<PinChip>`s inside. The strip is horizontally scrollable and includes the right vertical padding for chip drop shadows (don't try to roll your own — `overflow-x: auto` clips on Y too, so without enough Y padding the shadow gets sliced).

## Section breaks

Use `<SectionHeader title="…" subtitle="…" actions={…} />` between groups of tiles. The `actions` slot is for "View all" links or filter chips.

## What NOT to invent

- **Don't reinvent the rail.** The 240px fixed width works on every screen ≥ 1024px; below that, hide it via media query and put a hamburger in `TopBar.start`.
- **Don't reorder the Toolbelt.**
- **Don't add a separate "user info" footer in the rail** when the avatar menu in the top right already covers that. The brand skill records this decision.
- **Don't hardcode colors.** Use semantic CSS variables.
