/**
 * LeftRail · vertical navigation rail.
 *
 * Header at top (brand mark / app name), scrollable middle (RailLinks
 * grouped by section), optional footer at the bottom. Most apps put the
 * sign-out / org switcher / version tag in the footer; the AKIRA OS template
 * leaves it empty because the avatar menu in the TopBar covers those needs.
 */
import type { ReactNode } from "react";

export interface LeftRailProps {
  /** Brand text shown at the top of the rail (usually the app name). */
  appName: string;
  /** Optional subtitle below the app name (uppercase eyebrow). */
  subtitle?: string;
  /** Rail body — typically a list of `<RailLink>` and `<RailSectionTitle>` rows. */
  children?: ReactNode;
  /** Optional footer slot. Leave undefined to omit. */
  footer?: ReactNode;
  /** Optional className appended to the rail. */
  className?: string;
}

export function LeftRail({
  appName,
  subtitle,
  children,
  footer,
  className,
}: LeftRailProps) {
  return (
    <aside className={`akira-rail${className ? ` ${className}` : ""}`}>
      <div className="akira-rail-header">
        <div className="akira-rail-brand">{appName}</div>
        {subtitle ? <div className="akira-rail-brand-sub">{subtitle}</div> : null}
      </div>
      <nav className="akira-rail-body">{children}</nav>
      {footer ? <div className="akira-rail-footer">{footer}</div> : null}
    </aside>
  );
}

/** Small uppercase divider between groups of links. */
export function RailSectionTitle({ children }: { children: ReactNode }) {
  return <div className="akira-rail-section-title">{children}</div>;
}
