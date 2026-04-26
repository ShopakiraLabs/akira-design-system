/**
 * AppShell · the canonical AKIRA layout.
 *
 * Two-column grid: a fixed-width LeftRail on the left, and a main column on
 * the right. The main column stacks an optional ImpersonationBanner, the
 * TopBar, and the page content. Most AKIRA apps should start from this
 * shape — bolt.new will reach for it whenever you mention "AKIRA layout."
 *
 * Slots are accepted as ReactNode props rather than children-only so the
 * structure is unambiguous when read by an LLM agent (no guessing which
 * child belongs where).
 */
import type { ReactNode } from "react";

export interface AppShellProps {
  /** The vertical navigation rail. Pass an `<LeftRail>`. */
  rail: ReactNode;
  /** The horizontal top bar. Pass a `<TopBar>`. */
  topBar: ReactNode;
  /** Optional impersonation strip rendered above the top bar. Default: not rendered. */
  impersonation?: ReactNode;
  /** Page content. */
  children?: ReactNode;
  /** Optional className appended to the root. */
  className?: string;
}

export function AppShell({
  rail,
  topBar,
  impersonation,
  children,
  className,
}: AppShellProps) {
  return (
    <div className={`akira-app akira-shell${className ? ` ${className}` : ""}`}>
      {rail}
      <div className="akira-shell-main">
        {impersonation}
        {topBar}
        <main className="akira-shell-content">{children}</main>
      </div>
    </div>
  );
}
