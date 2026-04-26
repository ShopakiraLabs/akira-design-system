# SettingsMenu

Cog-icon button that opens a sectioned dropdown menu. Pass either `sections` (with group titles) or a flat `items` array.

## Props

| Prop | Type | Notes |
|---|---|---|
| `sections` | `{ title?, items: { label, icon?, onClick?, href? }[] }[]` | Sectioned form |
| `items` | `{ label, icon?, onClick?, href? }[]` | Flat form (used if `sections` not passed) |
| `ariaLabel` | `string?` | Defaults to `"Settings"` |
| `className` | `string?` | Appended to trigger button |

## Usage

```tsx
import { Bell, Plug, KeyRound } from 'lucide-react';

<SettingsMenu
  sections={[
    { title: 'Workspace', items: [
      { label: 'General', icon: <Cog size={14} />, onClick: () => navigate('/settings') },
      { label: 'Notifications', icon: <Bell size={14} /> },
      { label: 'Integrations', icon: <Plug size={14} /> },
    ]},
    { title: 'Admin', items: [
      { label: 'Keyboard shortcuts', icon: <KeyRound size={14} /> },
    ]},
  ]}
/>
```
