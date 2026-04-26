/**
 * AKIRA Design System · public API.
 *
 * Importers should treat this file as the source of truth. Anything not
 * re-exported here is internal and may change without notice.
 *
 * **CSS imports:** consumers must import the token + component stylesheets
 * once at app boot:
 *
 *   import '@akira/design-system/tokens.css';   // CSS variables
 *
 * The components also need component layout CSS — the simplest path is to
 * import `tokens.css` and pull in components via the bundled `dist`. For
 * the GitHub-direct install we ship CSS under `src/` so consumers can do:
 *
 *   import '@akira/design-system/src/tokens/tokens.css';
 *   import '@akira/design-system/src/tokens/components.css';
 */

// Tokens
export {
  THEMES,
  STYLES,
  AKIRA_HERITAGE_RED,
  type AkiraTheme,
  type AkiraStyle,
  type ThemeMode,
} from "./tokens/tokens";

// Hooks
export { useAkiraTheme } from "./hooks/useAkiraTheme";
export type { UseAkiraThemeReturn } from "./hooks/useAkiraTheme";

// Layout
export { AppShell } from "./components/AppShell/AppShell";
export type { AppShellProps } from "./components/AppShell/AppShell";

export { LeftRail, RailSectionTitle } from "./components/LeftRail/LeftRail";
export type { LeftRailProps } from "./components/LeftRail/LeftRail";

export { RailLink } from "./components/RailLink/RailLink";
export type { RailLinkProps } from "./components/RailLink/RailLink";

export { TopBar } from "./components/TopBar/TopBar";
export type { TopBarProps } from "./components/TopBar/TopBar";

export { SearchBar } from "./components/SearchBar/SearchBar";
export type { SearchBarProps } from "./components/SearchBar/SearchBar";

export { ImpersonationBanner } from "./components/ImpersonationBanner/ImpersonationBanner";
export type { ImpersonationBannerProps } from "./components/ImpersonationBanner/ImpersonationBanner";

export { ThemePicker } from "./components/ThemePicker/ThemePicker";
export type { ThemePickerProps } from "./components/ThemePicker/ThemePicker";

export { SettingsMenu } from "./components/SettingsMenu/SettingsMenu";
export type {
  SettingsMenuProps,
  SettingsMenuItem,
  SettingsMenuSection,
} from "./components/SettingsMenu/SettingsMenu";

export { ProfileMenu } from "./components/ProfileMenu/ProfileMenu";
export type {
  ProfileMenuProps,
  ProfileMenuItem,
} from "./components/ProfileMenu/ProfileMenu";

export { Toolbelt } from "./components/Toolbelt/Toolbelt";
export type { ToolbeltProps, ToolbeltProfile } from "./components/Toolbelt/Toolbelt";

// Content primitives
export { Tile } from "./components/Tile/Tile";
export type { TileProps } from "./components/Tile/Tile";

export { PinChip, PinStrip } from "./components/PinChip/PinChip";
export type { PinChipProps } from "./components/PinChip/PinChip";

export { SectionHeader } from "./components/SectionHeader/SectionHeader";
export type { SectionHeaderProps } from "./components/SectionHeader/SectionHeader";
