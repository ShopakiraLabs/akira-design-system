/**
 * RailLink · single nav row inside the LeftRail.
 *
 * Either renders an `<a>` (when `href` is set) or a `<button>` (when only
 * `onClick` is set). Active state shows a Heritage Red dot — that dot is
 * theme-independent on purpose, per the brand spec: it's an AKIRA brand
 * marker, not the variable accent color.
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
}

export function RailLink({ label, icon, active, href, onClick }: RailLinkProps) {
  const className = `akira-rail-link${active ? " is-active" : ""}`;
  const inner = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : <span className="akira-rail-link-dot" aria-hidden="true" />}
      <span className="akira-rail-link-label">{label}</span>
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
