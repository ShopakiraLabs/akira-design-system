# Tile

The canonical AKIRA card primitive. Renders as `<a>` if `href` is set, `<button>` if `onClick` is set, otherwise `<div>`.

Hover state uses the accent color: a border-color change in Modern/Brutalist styles, and a 2px accent ring (box-shadow) in Material — both produce a visible outline regardless of which structural style is active.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `kicker` | `string?` | — | Small uppercase eyebrow |
| `kickerIcon` | `ReactNode?` | — | Icon shown before the kicker |
| `title` | `string` | — | Card title |
| `description` | `string?` | — | One-line description |
| `cta` | `string?` | `"Open"` | Right-pointing CTA at bottom (set `""` to hide) |
| `href` | `string?` | — | Renders as `<a>` |
| `onClick` | `(e) => void` | — | Click handler |
| `children` | `ReactNode?` | — | Extra content between description and CTA |

## Usage

```tsx
import { Users } from 'lucide-react';

<Tile
  kicker="HOME OFFICE"
  kickerIcon={<Users size={14} />}
  title="Employee Directory"
  description="Find anyone at AKIRA."
  cta="Open"
  href="/directory"
/>
```

For a grid of tiles, wrap them in `<div className="akira-tile-grid">` (defined in `components.css`).
