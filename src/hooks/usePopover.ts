/**
 * usePopover — shared open/close + outside-click + Escape + positioning logic
 * for ThemePicker / SettingsMenu / ProfileMenu.
 *
 * Positioning note: the menu uses `position: fixed`, so we use
 * `getBoundingClientRect()` directly (already viewport-relative) — do NOT add
 * scrollY/scrollX. (Brand-skill lesson 2026-04-26.)
 */
import { useCallback, useEffect, useRef, useState } from "react";

export interface UsePopoverReturn {
  open: boolean;
  toggle: () => void;
  close: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  menuRef: React.RefObject<HTMLDivElement>;
  position: { top: number; left: number } | null;
}

export interface UsePopoverOptions {
  /** Approximate menu width so we can right-align without overflowing the viewport. */
  menuWidth?: number;
  /** Pixels between the trigger's bottom edge and the menu's top edge. */
  gap?: number;
}

export function usePopover(opts: UsePopoverOptions = {}): UsePopoverReturn {
  const { menuWidth = 260, gap = 8 } = opts;
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next && triggerRef.current) {
        const r = triggerRef.current.getBoundingClientRect();
        const top = r.bottom + gap;
        let left = r.right - menuWidth;
        if (left < 8) left = 8;
        setPosition({ top, left });
      }
      return next;
    });
  }, [gap, menuWidth]);

  // Outside click
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      const t = e.target as Node;
      if (menuRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  // Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return { open, toggle, close, triggerRef, menuRef, position };
}
