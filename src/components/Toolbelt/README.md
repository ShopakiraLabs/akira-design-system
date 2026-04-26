# Toolbelt

The canonical right-side cluster of the `TopBar`. Renders, in order:

1. `ThemePicker` (Appearance gear) — toggleable
2. `SettingsMenu` (cog) — only renders when sections/items are passed
3. `ProfileMenu` (avatar) — only renders when `profile` is passed

This is the standard AKIRA OS layout. Use it unless you have a reason to deviate.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `appearance` | `boolean?` | `true` | Hide the gear with `appearance={false}` |
| `settings` | `SettingsMenuSection[] \| SettingsMenuItem[]?` | — | Menu structure for the cog. Omit to hide |
| `profile` | `{ name, email?, initials?, items }?` | — | Avatar menu config. Omit to hide |
| `extras` | `ReactNode?` | — | Optional extra controls rendered on the far left of the cluster |

## Usage

```tsx
<TopBar end={
  <Toolbelt
    profile={{
      name: 'Rick Walter',
      email: 'rwalter@shopakira.com',
      items: [
        { label: 'Your profile' },
        { label: 'Sign out', divider: true, onClick: signOut },
      ],
    }}
    settings={[
      { title: 'Workspace', items: [{ label: 'General' }, { label: 'Notifications' }] },
    ]}
  />
}/>
```
