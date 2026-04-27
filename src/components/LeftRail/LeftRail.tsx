/**
 * LeftRail · vertical navigation rail.
 *
 * Header at top (brand mark / app name), scrollable middle (RailLinks
 * grouped by section), optional footer at the bottom. Most apps put the
 * sign-out / org switcher / version tag in the footer; the AKIRA OS template
 * leaves it empty because the avatar menu in the TopBar covers those needs.
 *
 * The wordmark is two-tone by default: the FIRST word renders in primary
 * text color and bold weight, every subsequent word renders in the muted
 * text color. Pass `appName="AKIRA OS"` and you get "AKIRA" bold + " OS"
 * muted. Pass a single word and you get a single tone. To opt out and
 * render the whole name in one color, pass `appName` as a ReactNode (e.g.
 * `appName={<>Custom Brand</>}`) — anything that's not a plain string is
 * rendered verbatim with no split.
 */
import type { ReactNode } from "react";

export interface LeftRailProps {
  /**
   * Brand text shown at the top of the rail (usually the app name).
   * - String with a space → first word primary, rest muted (two-tone).
   * - Single-word string → primary tone only.
   * - ReactNode → rendered verbatim, no auto-split.
   */
  appName: string | ReactNode;
  /** Optional subtitle below the app name (uppercase eyebrow). */
  subtitle?: string;
  /** Rail body — typically a list of `<RailLink>` and `<RailSectionTitle>` rows. */
  children?: ReactNode;
  /** Optional footer slot. Leave undefined to omit. */
  footer?: ReactNode;
  /** Optional className appended to the rail. */
  className?: string;
}

function renderWordmark(appName: string | ReactNode): ReactNode {
  if (typeof appName !== "string") return appName;
  const trimmed = appName.trim();
  const firstSpace = trimmed.indexOf(" ");
  if (firstSpace === -1) return trimmed;
  const head = trimmed.slice(0, firstSpace);
  const tail = trimmed.slice(firstSpace); // includes the leading space
  return (
    <>
      {head}
      <span className="akira-rail-brand-accent">{tail}</span>
    </>
  );
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
        <div className="akira-rail-brand">{renderWordmark(appName)}</div>
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
