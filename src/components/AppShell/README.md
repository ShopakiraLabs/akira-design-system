# AppShell

Outermost layout for any AKIRA app. Two-column grid: rail on the left, main column on the right. Renders an optional impersonation banner above the top bar.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `rail` | `ReactNode` | — | Pass a `<LeftRail>` |
| `topBar` | `ReactNode` | — | Pass a `<TopBar>` |
| `impersonation` | `ReactNode?` | not rendered | Pass an `<ImpersonationBanner>` if needed |
| `children` | `ReactNode?` | — | Page content |
| `className` | `string?` | — | Appended to root |

## Usage

```tsx
import { AppShell, LeftRail, TopBar } from '@akira/design-system';

<AppShell rail={<LeftRail … />} topBar={<TopBar … />}>
  <h1>Dashboard</h1>
</AppShell>
```
