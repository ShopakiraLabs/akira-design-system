# PinChip · PinStrip

Pill-shaped clickable chip used in the "Pinned" strip at the top of a page. Wrap a list of `PinChip`s in `PinStrip` (or `<div className="akira-pinstrip">`) to get horizontal scroll + correct padding for the shadow.

## PinChip props

| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | |
| `icon` | `ReactNode?` | Typically a lucide icon |
| `href` | `string?` | Renders as `<a>` if set |
| `onClick` | `(e) => void` | |

## Usage

```tsx
import { Star } from 'lucide-react';
import { PinStrip, PinChip } from '@akira/design-system';

<PinStrip>
  <PinChip label="Q4 Planning" icon={<Star size={12} />} href="/docs/q4" />
  <PinChip label="Wire schedule"  href="/wire" />
</PinStrip>
```
