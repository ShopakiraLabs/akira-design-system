/**
 * TopBar · the horizontal app header.
 *
 * Layout (left → right): app name, search, spacer, toolbelt (Appearance ·
 * Settings · Profile). The toolbelt is rendered separately as `<Toolbelt>`
 * so apps can swap any cluster.
 *
 * For mobile (< --bp-mobile / 768px), the rail is automatically collapsed
 * to an off-canvas drawer by AppShell. Apps should drop `<MenuButton />`
 * into the `start` slot — it auto-toggles the drawer via AkiraShellContext
 * and is CSS-hidden on desktop. Apps that want a custom hamburger can
 * still wire their own button to `useAkiraShell()`.
 */
import type { ReactNode } from "react";

export interface TopBarProps {
  /** App name shown on the far left. */
  appName?: string;
  /** Optional left-side slot (e.g. a hamburger button on mobile). Rendered before the appName. */
  start?: ReactNode;
  /** Center slot — typically a `<SearchBar>`. */
  center?: ReactNode;
  /** Right-side slot — typically a `<Toolbelt>`. */
  end?: ReactNode;
  className?: string;
}

export function TopBar({ appName, start, center, end, className }: TopBarProps) {
  return (
    <header className={`akira-topbar${className ? ` ${className}` : ""}`}>
      {start}
      {appName ? <span className="akira-topbar-name">{appName}</span> : null}
      {center}
      <div className="akira-topbar-spacer" />
      {end}
    </header>
  );
}
