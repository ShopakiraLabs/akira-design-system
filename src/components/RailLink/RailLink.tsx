/**
 * RailLink · single nav row inside the LeftRail.
 *
 * Either renders an `<a>` (when `href` is set) or a `<button>` (when only
 * `onClick` is set).
 *
 * Layout: dot · icon · label · optional count badge.
 *
 * The dot is ALWAYS rendered (muted gray when inactive, Heritage Red when
 * active). The Heritage Red dot is theme-independent on purpose, per the
 * brand spec: it's an AKIRA brand marker, not the variable accent color.
 *
 * The optional `count` prop renders a small monospace tally on the right
 * — useful for showing how many tiles live in a section, how many users
 * are pending, etc. Omit the prop entirely to hide the count column.
 */
import type { MouseEventHandler, ReactNode } from "react";

export interface RailLinkProps {
  /** Visible label. */
  label: string;
  /** Optional icon, typically a lucide-react component. */
  icon?: ReactNode;
  /** True if this represents the current route. */
  active?: boolean;
  /** Anchor target. If set, renders as `<a>`. */
  href?: string;
  /** Click handler. Used when `href` is not provided. */
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  /**
   * Optional small numeric tally rendered on the right side of the row.
   * Pass a number for a zero-padded 2-digit display ("05", "12", "00"),
   * or a string to render verbatim. Omit to hide.
   */
  count?: number | string;
}

function formatCount(count: number | string): string {
  if (typeof count === "string") return count;
  return count.toString().padStart(2, "0");
}

export function RailLink({ label, icon, active, href, onClick, count }: RailLinkProps) {
  const className = `akira-rail-link${active ? " is-active" : ""}`;
  const inner = (
    <>
      <span className="akira-rail-link-dot" aria-hidden="true" />
      {icon ? <span className="akira-rail-link-icon" aria-hidden="true">{icon}</span> : null}
      <span className="akira-rail-link-label">{label}</span>
      {count !== undefined ? (
        <span className="akira-rail-link-count" aria-hidden="true">{formatCount(count)}</span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a className={className} href={href} onClick={onClick as MouseEventHandler<HTMLAnchorElement>}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={className} onClick={onClick as MouseEventHandler<HTMLButtonElement>}>
      {inner}
    </button>
  );
}
