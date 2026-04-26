# ProfileMenu

Avatar trigger that opens an account menu. The header shows the user's name and email; the body is a list of items the app passes in.

## Props

| Prop | Type | Notes |
|---|---|---|
| `name` | `string` | Display name |
| `email` | `string?` | Shown under the name |
| `initials` | `string?` | Override the computed initials |
| `items` | `{ label, icon?, onClick?, href?, divider? }[]` | Account-menu rows |
| `ariaLabel` | `string?` | Defaults to `"Account"` |

## Usage

```tsx
import { User, Sliders, LogOut } from 'lucide-react';

<ProfileMenu
  name="Rick Walter"
  email="rwalter@shopakira.com"
  items={[
    { label: 'Your profile',  icon: <User size={14} /> },
    { label: 'Preferences',   icon: <Sliders size={14} /> },
    { label: 'Sign out',      icon: <LogOut size={14} />, divider: true, onClick: signOut },
  ]}
/>
```
