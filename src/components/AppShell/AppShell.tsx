/**
 * AppShell · the canonical AKIRA layout.
 *
 * Two-column grid on desktop: a fixed-width LeftRail on the left, a main
 * column on the right. Below the --bp-mobile breakpoint (768px) the rail
 * collapses to an off-canvas drawer and AppShell takes over its open/closed
 * lifecycle (state, backdrop, Esc-to-close, body scroll-lock).
 *
 * Slots are accepted as ReactNode props rather than children-only so the
 * structure is unambiguous when read by an LLM agent (no guessing which
 * child belongs where).
 *
 * Mobile drawer wiring (2026-05-14):
 *   - AppShell renders an AkiraShellContext.Provider exposing
 *     { railOpen, toggleRail, isMobile, railId } so nested children
 *     (typically a `<MenuButton>` inside TopBar.start) can drive the
 *     drawer without prop-drilling.
 *   - `<LeftRail>` consumes the context, applies `.is-open` and the id.
 *   - Apps that want to control the drawer themselves can pass the
 *     controlled `railOpen` + `onRailOpenChange` props.
 */
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { AkiraShellContext, type AkiraShellContextValue } from "./AkiraShellContext";

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
  /** Controlled drawer open state. Omit to let AppShell manage its own. */
  railOpen?: boolean;
  /** Notification when the drawer wants to open/close. */
  onRailOpenChange?: (open: boolean) => void;
}

const MOBILE_QUERY = "(max-width: 767px)";

export function AppShell({
  rail,
  topBar,
  impersonation,
  children,
  className,
  railOpen: railOpenProp,
  onRailOpenChange,
}: AppShellProps) {
  // Open state — controlled-or-uncontrolled pattern.
  const isControlled = railOpenProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const railOpen = isControlled ? Boolean(railOpenProp) : internalOpen;

  const setRailOpen = useCallback(
    (open: boolean) => {
      if (!isControlled) setInternalOpen(open);
      onRailOpenChange?.(open);
    },
    [isControlled, onRailOpenChange],
  );

  // Mobile detection via matchMedia. SSR-safe (no window during init).
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    // Safari < 14 only supports addListener; modern browsers support addEventListener.
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  // Auto-close the drawer when the viewport grows past mobile, so a user
  // who rotates a phone or resizes a window doesn't end up with a hidden-
  // but-flagged-open drawer when they next shrink it back down.
  useEffect(() => {
    if (!isMobile && railOpen) setRailOpen(false);
  }, [isMobile, railOpen, setRailOpen]);

  // Esc closes the drawer.
  useEffect(() => {
    if (!railOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setRailOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [railOpen, setRailOpen]);

  // Lock body scroll while the drawer is open on mobile. Saves & restores
  // whatever the host page had set so we don't clobber app-level styles.
  useEffect(() => {
    if (!railOpen || !isMobile || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [railOpen, isMobile]);

  const railId = useId();
  const ctxValue = useMemo<AkiraShellContextValue>(
    () => ({
      isMobile,
      railOpen,
      setRailOpen,
      toggleRail: () => setRailOpen(!railOpen),
      railId,
    }),
    [isMobile, railOpen, setRailOpen, railId],
  );

  const rootCls =
    `akira-app akira-shell` +
    (railOpen ? " akira-shell-rail-open" : "") +
    (className ? ` ${className}` : "");

  return (
    <AkiraShellContext.Provider value={ctxValue}>
      <div className={rootCls}>
        {rail}
        <div className="akira-shell-main">
          {impersonation}
          {topBar}
          <main className="akira-shell-content">{children}</main>
        </div>
        {/* Backdrop is always in the DOM — CSS hides it on desktop and
            fades it in when .akira-shell-rail-open is set. Click closes. */}
        <div
          className="akira-shell-backdrop"
          aria-hidden="true"
          onClick={() => setRailOpen(false)}
        />
      </div>
    </AkiraShellContext.Provider>
  );
}
