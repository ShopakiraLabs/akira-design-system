# Foundations

The visual foundation of the AKIRA Design System. Every color, radius, and shadow flows through CSS variables — when you switch themes, all components reskin in unison.

## Architecture

```
                   ┌──────────────────┐
                   │ <html>           │
                   │   data-theme=…   │   color tokens
                   │   data-style=…   │   structural tokens
                   └────────┬─────────┘
                            ▼
                  CSS variables in scope
                            ▼
                  ┌─────────────────────┐
                  │ All AKIRA components │
                  │  read tokens via     │
                  │  var(--color-…)      │
                  └─────────────────────┘
```

There is no second styling system. Components do not import any other theming library; they reference CSS variables directly. This means:

- Switching themes is instant and global — no React re-render cascade required.
- Apps that don't use this design system can still adopt the tokens by importing `tokens.css`.
- The same components render correctly in dark and light modes without a per-mode codepath.

## Color tokens (semantic, not literal)

| Token | What to use it for |
|---|---|
| `--color-bg` | Page background. |
| `--color-card` | Tile / card / modal / panel background. |
| `--color-surface` | Elevated or interactive surfaces — form inputs, hover states, secondary buttons. |
| `--color-text-primary` | Default readable text. |
| `--color-text-muted` | Secondary text — labels, kickers, captions. |
| `--color-accent` | Brand/primary action color. Buttons, chart highlights, active states. **Changes per theme.** |
| `--color-border` | Card / panel / input borders. |
| `--akira-heritage-red` | **Reserved.** `#D92028`. AKIRA brand indicator only — e.g. the active-rail-link dot. Do not substitute for `--color-accent`. |

### How to pick the right one

- "Where the user is reading" → `--color-text-primary`.
- "Subtle helper text" → `--color-text-muted`.
- "Background of the whole page" → `--color-bg`.
- "Background of the cards on top of the page" → `--color-card`.
- "Background of an input or button on top of those cards" → `--color-surface`.
- "Big colored thing the user should click" → `--color-accent`.

## Structural tokens

| Token | Used by |
|---|---|
| `--radius-card` | Large radius — cards, tiles, modals. |
| `--radius-base` | Medium radius — inputs, buttons, chips. |
| `--radius-bar` | Small radius — bar chart bars, progress fills. |
| `--shadow-card` | Card / modal shadow. |
| `--border-thickness` | Border width. **Modern: 1px · Material: 0 · Brutalist: 2px.** |

## Typography

System fonts only in product UI:

```css
font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
```

The brand kit (Bebas Neue, Open Sans) applies to marketing and print only, not product UI. This keeps internal apps fast (no Google Fonts request on every page load) and respects the user's OS settings.

## Spacing & sizing

Spacing is via Tailwind-style multiples of 4 (`4px`, `8px`, `12px`, `16px`, `24px`, …). The components ship with sensible defaults; reach for the same step values when extending.

## Smooth theme transitions

Add `className="akira-themed"` to any element that should animate smoothly when the user switches theme. Without it, color/radius changes are instant — fine for small elements, but visually jarring for large cards. The class is defined in `tokens.css`.

## Adding a new theme

1. Add a `[data-theme="your-slug"]` block in `src/tokens/tokens.css` defining all 7 semantic colors.
2. Add a matching entry to the `THEMES` array in `src/tokens/tokens.ts`.
3. The `ThemePicker` picks it up automatically.

## Adding a new structural style

1. Add a `[data-style="your-slug"]` block in `tokens.css` defining all 5 structural tokens.
2. Add a matching entry to `STYLES` in `tokens.ts`.
3. **If your style uses `--border-thickness: 0`**, also add a `[data-style="your-slug"] .akira-tile:hover` rule using a `box-shadow` ring — border-color hover is invisible at 0 width. (See the existing Material override.)
