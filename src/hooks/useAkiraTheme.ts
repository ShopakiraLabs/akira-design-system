/**
 * useAkiraTheme — React hook for the AKIRA theme/style system.
 *
 * Mirrors the imperative window.AkiraTheme API from the vanilla version, but
 * gives React components a reactive value they can render against. The hook
 * also restores the saved theme/style from localStorage on first render so
 * there's no flash of unstyled content.
 *
 * Storage keys are intentionally the same as the vanilla version — apps can
 * mix and match the picker and the hook without losing settings.
 */
import { useCallback, useEffect, useState } from "react";

const STORAGE_THEME = "akira:theme";
const STORAGE_STYLE = "akira:style";

const DEFAULT_THEME = "default";
const DEFAULT_STYLE = "modern";

function read(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, val: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, val);
  } catch {
    /* localStorage may be blocked — fail silently */
  }
}

function applyTheme(slug: string): void {
  if (typeof document === "undefined") return;
  if (slug === DEFAULT_THEME) document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", slug);
}

function applyStyle(slug: string): void {
  if (typeof document === "undefined") return;
  if (slug === DEFAULT_STYLE) document.documentElement.removeAttribute("data-style");
  else document.documentElement.setAttribute("data-style", slug);
}

export interface UseAkiraThemeReturn {
  theme: string;
  style: string;
  setTheme: (slug: string) => void;
  setStyle: (slug: string) => void;
}

export function useAkiraTheme(): UseAkiraThemeReturn {
  const [theme, setThemeState] = useState<string>(() => read(STORAGE_THEME, DEFAULT_THEME));
  const [style, setStyleState] = useState<string>(() => read(STORAGE_STYLE, DEFAULT_STYLE));

  // Apply once on mount + every change — keeps DOM attributes in sync with state.
  useEffect(() => { applyTheme(theme); }, [theme]);
  useEffect(() => { applyStyle(style); }, [style]);

  // Listen for cross-tab / cross-component changes to localStorage.
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_THEME && e.newValue) setThemeState(e.newValue);
      if (e.key === STORAGE_STYLE && e.newValue) setStyleState(e.newValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((slug: string) => {
    setThemeState(slug);
    write(STORAGE_THEME, slug);
  }, []);

  const setStyle = useCallback((slug: string) => {
    setStyleState(slug);
    write(STORAGE_STYLE, slug);
  }, []);

  return { theme, style, setTheme, setStyle };
}
