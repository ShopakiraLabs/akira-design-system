# TopBar

Horizontal app header with named slots (`start`, `center`, `end`) and an optional `appName`. The `end` slot is almost always a `Toolbelt` — see that component for the canonical right-side cluster.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `appName` | `string?` | — | Shown left of `start`-rendered content |
| `start` | `ReactNode?` | — | Far-left slot |
| `center` | `ReactNode?` | — | Typically a `SearchBar` |
| `end` | `ReactNode?` | — | Typically a `Toolbelt` |

## Usage

```tsx
<TopBar
  appName="AKIRA OS"
  center={<SearchBar />}
  end={<Toolbelt profile={{ name: 'Rick Walter', email: 'rwalter@shopakira.com' }} />}
/>
```
