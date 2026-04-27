# RailLink

A single nav row in the `LeftRail`. Renders an `<a>` if `href` is set, otherwise a `<button>`.

Layout: **dot · icon · label · optional count**.

The dot is **always rendered** (muted gray when inactive, AKIRA Heritage Red when active). The Heritage Red dot is theme-independent on purpose — it's a brand marker, not a substitute for the variable accent color.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | Visible label |
| `icon` | `ReactNode?` | — | Optional icon (typically a lucide-react component) |
| `active` | `boolean?` | `false` | Switches the always-visible dot to Heritage Red |
| `href` | `string?` | — | Renders as `<a>` |
| `onClick` | `(e) => void` | — | Click handler |
| `count` | `number \| string?` | — | Optional small tally rendered on the right. **Numbers** are zero-padded to 2 digits (`5` → `"05"`, `12` → `"12"`, `0` → `"00"`). **Strings** render verbatim. Omit to hide the count column. |

## Usage

```tsx
import { Home, Users } from 'lucide-react';
import { RailLink } from '@akira/design-system';

// Basic — always shows the muted dot
<RailLink label="Home" icon={<Home size={16} />} active href="/" />

// With a count — useful for showing how many tiles a section has
<RailLink label="Home Office" icon={<Users size={16} />} href="#section-home-office" count={5} />

// String count — render verbatim (e.g. "99+", "—", "NEW")
<RailLink label="Notifications" count="99+" />
```
