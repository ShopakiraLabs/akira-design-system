# Updating an existing bolt project to a newer design-system version

When the AKIRA Design System ships a fix or feature (e.g. the two-tone
wordmark, the always-on settings gear), bolt projects already using the
system don't pick it up automatically — they cache `node_modules` at
the version pinned in `package-lock.json`. Use the prompt below in the
project's bolt chat to update.

## The prompt

Paste this as a single chat message inside any existing bolt project:

```
Update the AKIRA Design System to the latest version and apply any new
behaviors that affect this app's layout. Do this in order, in one pass.

STEP 1 — Reinstall the design system from GitHub at HEAD:

  npm uninstall @akira/design-system
  npm install github:ShopakiraLabs/akira-design-system

STEP 2 — Re-read the docs so you know what changed:

  cat node_modules/@akira/design-system/llms.txt
  cat node_modules/@akira/design-system/docs/layout.md

STEP 3 — Apply these specific updates:

1. WORDMARK — In the LeftRail, set `appName` to the full two-word brand
   string for this app (e.g. "AKIRA OS", "AKIRA NetSuite Tools",
   "AKIRA Wire Schedule"). The design system now auto-splits the first
   word vs. the rest into a two-tone wordmark — primary color for
   "AKIRA", muted color for the rest. Do NOT manually wrap parts of the
   name in <span>. Do NOT split the name into appName + subtitle.
   The `subtitle` prop is for an optional uppercase eyebrow BELOW the
   wordmark — leave it off unless this app actually needs one.

2. SETTINGS COG — In the Toolbelt, ensure the settings cog is visible.
   The design system now renders the gear by default with placeholder
   items (Notifications, Keyboard shortcuts, Help & feedback). If you
   previously passed `settings={false}` or omitted the gear visually,
   remove that. If you have your own settings items for this app, pass
   them as the `settings` prop array. Otherwise, just omit the prop and
   the defaults will render.

3. TOOLBELT ORDER — Confirm the order is Appearance → Settings →
   Profile, left-to-right. The Toolbelt component handles this
   automatically.

What you should NOT touch:
- Backend / data fetching code
- Routing structure
- Form validation or business logic
- Tests

After updating, briefly list:
- The exact `LeftRail` and `Toolbelt` JSX before vs. after
- Any other cleanup you did to remove now-redundant manual wordmark
  styling
```

## When to use it

Re-run this prompt any time the design system ships a backwards-compatible
update that changes default rendering. Keep it minimal — large catch-up
prompts get lost in the chat. If the changes are big enough that a
piecemeal update would break things, prefer to start a fresh bolt
project from the canonical `prompting-bolt.md` redesign prompt instead.
