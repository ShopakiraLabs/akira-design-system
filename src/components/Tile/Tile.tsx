/**
 * Tile · the canonical AKIRA card primitive.
 *
 * Renders an `<a>` if `href` is set (so the whole card is clickable as a
 * link); otherwise a `<button>` if `onClick` is set; otherwise a `<div>`.
 * Hover state shows the accent color via border-color (Modern/Brutalist) or
 * a 2px accent ring via box-shadow (Material — see components.css and the
 * brand-skill lesson dated 2026-04-23).
 */
import type { MouseEventHandler, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export interface TileProps {
  /** Small uppercase eyebrow above the title. */
  kicker?: string;
  /** Optional icon shown before the kicker. */
  kickerIcon?: ReactNode;
  /** Tile title. */
  title: string;
  /** One-line description below the title. */
  description?: string;
  /** Right-pointing CTA text shown at the bottom (e.g. "Open"). */
  cta?: string;
  /** Anchor target. If set, renders as `<a>`. */
  href?: string;
  /** Click handler. Used when `href` is not provided. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** Optional extra content rendered between description and CTA. */
  children?: ReactNode;
  className?: string;
}

export function Tile({
  kicker,
  kickerIcon,
  title,
  description,
  cta = "Open",
  href,
  onClick,
  children,
  className,
}: TileProps) {
  const cls = `akira-tile${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      {(kicker || kickerIcon) ? (
        <span className="akira-tile-kicker">
          {kickerIcon}
          {kicker}
        </span>
      ) : null}
      <h3 className="akira-tile-title">{title}</h3>
      {description ? <p className="akira-tile-desc">{description}</p> : null}
      {children}
      {cta ? (
        <span className="akira-tile-cta">
          {cta} <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
  }
  if (onClick) {
    return <button type="button" className={cls} onClick={onClick}>{inner}</button>;
  }
  return <div className={cls}>{inner}</div>;
}
