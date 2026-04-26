# ThemePicker

Gear-icon button that opens a popover for switching theme + structural style. Persists to `localStorage` (`akira:theme`, `akira:style`) so the choice survives across sessions and across apps that use this design system.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `ariaLabel` | `string?` | `"Appearance"` | a11y name on the trigger button |
| `className` | `string?` | — | Appended to the trigger button |

## Usage

```tsx
<TopBar end={<ThemePicker />} />
```

Or use the underlying `useAkiraTheme` hook to drive a custom UI.
