# ImpersonationBanner

Yellow strip rendered above the `TopBar` to make it visually obvious when an admin is acting as another user. **Default is hidden** — pass `visible` to show it. Most AKIRA apps never render this; it lives in the design system primarily for AKIRA OS admin tooling.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `visible` | `boolean?` | `false` | When false, component returns `null` |
| `targetName` | `string` | — | The user being impersonated |
| `reason` | `string?` | — | Optional context, e.g. "support ticket #482" |
| `onExit` | `() => void` | — | Click handler for the exit button |
| `exitLabel` | `string?` | `"Stop impersonating"` | |

## Usage

```tsx
<AppShell
  rail={…}
  topBar={…}
  impersonation={
    <ImpersonationBanner
      visible={isImpersonating}
      targetName="Lisa Park"
      reason="support ticket #482"
      onExit={stopImpersonating}
    />
  }
>
  …
</AppShell>
```

## Bolt prompt note

If your app does not support impersonation, simply omit the `impersonation` prop on `AppShell` — no banner code is needed.
