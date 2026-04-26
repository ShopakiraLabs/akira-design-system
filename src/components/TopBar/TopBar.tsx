/**
 * TopBar · the horizontal app header.
 *
 * Layout (left → right): app name, search, spacer, toolbelt (Appearance ·
 * Settings · Profile). The toolbelt is rendered separately as `<Toolbelt>`
 * so apps can swap any cluster.
 *
 * For mobile, the rail is typically hidden; the TopBar then becomes the
 * primary navigation surface. We don't implement a hamburger here — apps
 * can pass any control they want via the `start` slot.
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
