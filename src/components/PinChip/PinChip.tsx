/**
 * PinChip · pill-shaped clickable chip used in the "Pinned" strip.
 *
 * Apps wrap a list of these in `<div className="akira-pinstrip">` to get
 * the horizontal scroll + correct padding for shadows. (See components.css
 * — overflow-x: auto implicitly clips on Y too, so the strip needs vertical
 * padding for the chip shadow to render. Brand-skill lesson 2026-04-23.)
 */
import type { MouseEventHandler, ReactNode } from "react";

export interface PinChipProps {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

export function PinChip({ label, icon, href, onClick, className }: PinChipProps) {
  const cls = `akira-pin-chip${className ? ` ${className}` : ""}`;
  const inner = (
    <>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{label}</span>
    </>
  );
  if (href) return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}

/** Horizontal-scroll strip container for PinChips. */
export function PinStrip({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`akira-pinstrip${className ? ` ${className}` : ""}`}>{children}</div>;
}
