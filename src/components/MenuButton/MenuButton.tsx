/**
 * MenuButton · the canonical mobile hamburger.
 *
 * Drop into `<TopBar start={<MenuButton />} />` and you get a button that:
 *   - Is hidden on desktop (CSS: `.akira-menu-btn { display: none }` then
 *     `display: inline-flex` below --bp-mobile / 768px).
 *   - Toggles the AppShell's drawer state (consumed via AkiraShellContext).
 *   - Wires the right aria attributes for screen-reader users
 *     (`aria-expanded`, `aria-controls`).
 *
 * Apps that don't use `<AppShell>` get a non-functional button (the hook
 * returns no-op defaults) — that way nothing crashes mid-migration; the
 * app can wire its own state and ignore this component.
 */
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useAkiraShell } from "../AppShell/AkiraShellContext";

export interface MenuButtonProps {
  /** Accessible label. Default: "Open navigation menu". */
  ariaLabel?: string;
  /** Override the icon. Default: lucide `Menu` / `X` depending on open state. */
  icon?: ReactNode;
  /** Extra className appended to `akira-menu-btn`. */
  className?: string;
}

export function MenuButton({
  ariaLabel = "Open navigation menu",
  icon,
  className,
}: MenuButtonProps) {
  const { railOpen, toggleRail, railId } = useAkiraShell();
  return (
    <button
      type="button"
      className={`akira-menu-btn${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
      aria-expanded={railOpen}
      aria-controls={railId}
      onClick={toggleRail}
    >
      {icon ?? (railOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />)}
    </button>
  );
}
