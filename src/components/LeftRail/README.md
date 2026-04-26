# LeftRail

Vertical navigation rail. Sticky 240px wide column with a header (app name + optional subtitle), a scrollable body of `RailLink`s, and an optional footer.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `appName` | `string` | — | Brand mark / app name shown at top |
| `subtitle` | `string?` | — | Uppercase eyebrow under the app name |
| `children` | `ReactNode?` | — | Typically a list of `RailLink`s grouped by `RailSectionTitle` |
| `footer` | `ReactNode?` | — | Optional footer slot |

Also exports `<RailSectionTitle>` for grouping links.

## Usage

```tsx
import { LeftRail, RailSectionTitle, RailLink } from '@akira/design-system';

<LeftRail appName="AKIRA OS" subtitle="Internal Apps">
  <RailSectionTitle>Workspace</RailSectionTitle>
  <RailLink label="Home" active />
  <RailLink label="Reports" />
</LeftRail>
```
