# SearchBar

Text input sized for the `TopBar` center slot. Controlled or uncontrolled.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `placeholder` | `string?` | `"Search…"` | |
| `value` | `string?` | — | Controlled value |
| `defaultValue` | `string?` | — | Uncontrolled default |
| `onChange` | `(value) => void` | — | Fires per keystroke |
| `onSubmit` | `(value) => void` | — | Fires on Enter |
| `hideIcon` | `boolean?` | `false` | Hides the leading magnifier |
| `ariaLabel` | `string?` | `"Search"` | |

## Usage

```tsx
<SearchBar placeholder="Search apps…" onSubmit={(q) => console.log(q)} />
```
