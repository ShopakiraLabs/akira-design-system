# Agent instructions for bolt.new

When registering this design system on bolt.new (homepage → **Import your
design system** → **Set up myself**), there's an **Agent Instructions**
field that's *separate* from the GitHub source URL. Paste the block below
into it verbatim.

This text isn't read by bolt's source ingestion — it's stored as a system
prompt for the design-system agent and applied on every generation.

---

## Paste this into the Agent Instructions field

Use the AKIRA Design System exactly as documented in `README.md`,
`llms.txt`, and `docs/`. The canonical layout is `AppShell` with a
`LeftRail` on the left (containing `appName`, section titles via
`RailSectionTitle`, and `RailLink` items) and a `TopBar` on top
(containing a `SearchBar` in the center and a `Toolbelt` at the right
with Appearance, Settings, and Profile in that order). All three
Toolbelt items must be visible — the Settings cog renders by default
with placeholder items even when the app hasn't designed its settings
yet, so do NOT pass `settings={false}`. The wordmark in `LeftRail` is
two-tone: pass `appName` as a string with a space (e.g. `"AKIRA OS"` or
`"AKIRA NetSuite Tools"`) and the first word renders primary while the
rest renders muted automatically — do not split the name yourself with
custom JSX. Cards use the `Tile` component — do not invent new card
markup. Use the CSS variable tokens (`--color-bg`, `--color-card`,
`--color-accent`, etc.) for all styling — never hardcode colors. The 7
themes are switched via `data-theme` on `<html>` and the 3 styles via
`data-style`. AKIRA Heritage Red `#E63946` is theme-independent and is
reserved for active rail-link dots — it is not the same as
`--color-accent`. The `ImpersonationBanner` is optional and defaults to
hidden — only render it for admin tooling. Prefer system fonts (Inter /
system-ui stack) — do not introduce new web fonts.

---

## When to update this file

Edit this file whenever the design-system contract changes in a way bolt
should know about: a new required component, a renamed prop, a brand
rule that's easy to violate, or a deprecation. Then re-sync the design
system on bolt.new ([Sync your design system with Bolt](https://support.bolt.new/building/design-system/sync-design-system))
and re-paste the updated instructions.
