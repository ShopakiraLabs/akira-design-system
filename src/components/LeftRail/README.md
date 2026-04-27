# LeftRail

Vertical navigation rail. Sticky 240px wide column with a header (app name + optional subtitle), a scrollable body of `RailLink`s, and an optional footer.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `appName` | `string \| ReactNode` | — | Brand mark / app name shown at top |
| `subtitle` | `string?` | — | Uppercase eyebrow under the app name |
| `children` | `ReactNode?` | — | Typically a list of `RailLink`s grouped by `RailSectionTitle` |
| `footer` | `ReactNode?` | — | Optional footer slot |

Also exports `<RailSectionTitle>` for grouping links.

## Two-tone wordmark (automatic)

When `appName` is a **string with a space**, the first word renders in
the primary text color and bold weight; everything after the first space
renders in the muted color. This is the canonical AKIRA brand treatment.

```tsx
<LeftRail appName="AKIRA OS" />            // → AKIRA + muted " OS"
<LeftRail appName="AKIRA NetSuite Tools"/> // → AKIRA + muted " NetSuite Tools"
<LeftRail appName="Settings" />            // → Settings (single tone, nothing to split)
```

To opt out of the auto-split (e.g. you want every word the same tone),
pass a ReactNode instead of a plain string:

```tsx
<LeftRail appName={<>AKIRA OS</>} />  // → AKIRA OS, all primary
```

## Usage

```tsx
import { LeftRail, RailSectionTitle, RailLink } from '@akira/design-system';

<LeftRail appName="AKIRA OS" subtitle="Internal Apps">
  <RailSectionTitle>Workspace</RailSectionTitle>
  <RailLink label="Home" active />
  <RailLink label="Reports" />
</LeftRail>
```
