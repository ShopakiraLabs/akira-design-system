# SectionHeader

Row above a tile grid or list. Title + optional subtitle on the left, optional actions on the right.

## Props

| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | |
| `subtitle` | `string?` | |
| `actions` | `ReactNode?` | Typically a "View all" link or filter chips |

## Usage

```tsx
<SectionHeader title="Pinned for you" subtitle="What you've starred" actions={<a href="/all">View all</a>} />
<div className="akira-tile-grid">
  …
</div>
```
