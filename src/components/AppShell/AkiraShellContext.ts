/**
 * AkiraShellContext · runtime state shared across the AppShell tree.
 *
 * Provided by `<AppShell>`. Consumed by `<LeftRail>` (to apply `.is-open`
 * and the controlled `id`) and `<MenuButton>` (to toggle the drawer).
 *
 * The hook returns a no-op default if it's used outside an AppShell so
 * apps mid-migration don't crash — the button just won't do anything.
 */
import { createContext, useContext } from "react";

export interface AkiraShellContextValue {
  /** True when viewport is below --bp-mobile (768px). Tracked via matchMedia. */
  isMobile: boolean;
  /** True when the mobile drawer is currently open. Always false on desktop. */
  railOpen: boolean;
  /** Imperative setter (e.g. backdrop click sets false). */
  setRailOpen: (open: boolean) => void;
  /** Convenience flip used by the hamburger button. */
  toggleRail: () => void;
  /** Stable id applied to the `<aside>` so the hamburger can `aria-controls` it. */
  railId: string;
}

const NOOP_VALUE: AkiraShellContextValue = {
  isMobile: false,
  railOpen: false,
  setRailOpen: () => {},
  toggleRail: () => {},
  railId: "akira-rail",
};

export const AkiraShellContext = createContext<AkiraShellContextValue | null>(null);

export function useAkiraShell(): AkiraShellContextValue {
  const ctx = useContext(AkiraShellContext);
  return ctx ?? NOOP_VALUE;
}
