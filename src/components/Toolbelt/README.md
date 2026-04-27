# Toolbelt

The canonical right-side cluster of the `TopBar`. Renders, in order:

1. `ThemePicker` (Appearance gear) — on by default
2. `SettingsMenu` (cog) — on by default with sensible placeholder items
3. `ProfileMenu` (avatar) — only renders when `profile` is passed

This is the standard AKIRA OS layout. Use it unless you have a reason to deviate.

## Defaults

To keep the visual layout consistent across every AKIRA app, the
appearance gear AND the settings cog render by default. The settings cog
ships with a small set of placeholder items (Notifications, Keyboard
shortcuts, Help & feedback) that you should override with your app's own
items as it grows. Pass `settings={false}` to hide the gear entirely if
your app really doesn't need one.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `appearance` | `boolean?` | `true` | Pass `false` to hide the appearance gear |
| `settings` | `SettingsMenuSection[] \| SettingsMenuItem[] \| false` | placeholder defaults | Override with your own items, or pass `false` to hide |
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
