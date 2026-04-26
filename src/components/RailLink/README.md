# RailLink

A single nav row in the `LeftRail`. Renders an `<a>` if `href` is set, otherwise a `<button>`.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Visible label |
| `icon` | `ReactNode?` | — | Optional icon (typically a lucide-react component) |
| `active` | `boolean?` | `false` | Shows a Heritage Red dot — theme-independent |
| `href` | `string?` | — | Renders as `<a>` |
| `onClick` | `(e) => void` | — | Click handler |

## Usage

```tsx
import { Home } from 'lucide-react';
import { RailLink } from '@akira/design-system';

<RailLink label="Home" icon={<Home size={16} />} active href="/" />
```
