/**
 * AKIRA Design System · Token metadata
 *
 * The actual CSS variables live in tokens.css. This file gives JS/TS code
 * (e.g., the ThemePicker) the same theme + style metadata so dropdowns and
 * swatches can be rendered without duplicating brand data.
 *
 * Adding a theme: add a [data-theme="<slug>"] block in tokens.css AND a
 * matching entry in THEMES below. They must stay in sync.
 */

export type ThemeMode = "dark" | "light";

export interface AkiraTheme {
  /** Slug applied as `data-theme="..."` on `<html>`. The "default" slug uses no attribute. */
  slug: string;
  /** Human-readable label shown in the theme picker. */
  label: string;
  /** Approximate accent hex for swatches (matches `--color-accent` for the theme). */
  accent: string;
  /** Whether the theme is dark- or light-mode by intent. */
  mode: ThemeMode;
  /** True only for the canonical AKIRA Red (Heritage Red) theme. */
  isBrand?: boolean;
}

export interface AkiraStyle {
  /** Slug applied as `data-style="..."` on `<html>`. The "modern" slug uses no attribute. */
  slug: string;
  /** Human-readable label. */
  label: string;
  /** One-line description. */
  hint: string;
}

export const THEMES: AkiraTheme[] = [
  { slug: "default",    label: "AKIRA Red",  accent: "#D92028", mode: "dark",  isBrand: true },
  { slug: "akira-dark", label: "AKIRA Dark", accent: "#EC4899", mode: "dark"  },
  { slug: "midnight",   label: "Midnight",   accent: "#8B5CF6", mode: "dark"  },
  { slug: "forest",     label: "Forest",     accent: "#22C55E", mode: "dark"  },
  { slug: "coral-dark", label: "Dark Coral", accent: "#F97316", mode: "dark"  },
  { slug: "ocean",      label: "Ocean",      accent: "#0EA5E9", mode: "light" },
  { slug: "coral",      label: "Coral",      accent: "#F97316", mode: "light" },
];

export const STYLES: AkiraStyle[] = [
  { slug: "modern",   label: "Modern",    hint: "Rounded · soft shadows" },
  { slug: "material", label: "Material",  hint: "Elevated · minimal borders" },
  { slug: "flat",     label: "Brutalist", hint: "Square · hard block shadows" },
];

/** Reserved AKIRA Heritage Red. Not the variable accent — only for AKIRA brand markers. */
export const AKIRA_HERITAGE_RED = "#D92028";
