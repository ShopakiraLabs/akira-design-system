/**
 * ThemePicker · gear-button + popover for selecting theme + structural style.
 *
 * Wraps `useAkiraTheme` (state) + `usePopover` (positioning). Renders the
 * trigger button itself; if you want a custom trigger, set `triggerless`
 * and render the menu via the imperative API.
 */
import { Settings2, X } from "lucide-react";
import { useAkiraTheme } from "../../hooks/useAkiraTheme";
import { usePopover } from "../../hooks/usePopover";
import { THEMES, STYLES } from "../../tokens/tokens";

export interface ThemePickerProps {
  /** Optional custom label for the trigger's a11y name. */
  ariaLabel?: string;
  /** Optional className for the trigger button. */
  className?: string;
}

export function ThemePicker({
  ariaLabel = "Appearance",
  className,
}: ThemePickerProps) {
  const { theme, style, setTheme, setStyle } = useAkiraTheme();
  const { open, toggle, close, triggerRef, menuRef, position } = usePopover({ menuWidth: 300 });

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`akira-icon-btn${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={toggle}
      >
        <Settings2 size={16} aria-hidden="true" />
      </button>
      {open && position ? (
        <div
          ref={menuRef}
          className="akira-menu"
          role="dialog"
          aria-label="Appearance settings"
          style={{ top: position.top, left: position.left, width: 300 }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <strong style={{ letterSpacing: "0.02em" }}>Appearance</strong>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              style={{ background: "transparent", border: 0, cursor: "pointer", color: "var(--color-text-muted)", fontSize: 18 }}
            >
              <X size={16} />
            </button>
          </div>

          <div className="akira-menu-section-title">Color</div>
          <div className="akira-swatch-grid">
            {THEMES.map((t) => (
              <button
                key={t.slug}
                type="button"
                className={`akira-swatch${theme === t.slug ? " is-active" : ""}`}
                title={t.label}
                onClick={() => setTheme(t.slug)}
              >
                <span className="akira-swatch-dot" style={{ color: t.accent, background: t.accent }} aria-hidden="true" />
                <span className="akira-swatch-label">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="akira-menu-section-title">Style</div>
          <div className="akira-style-list">
            {STYLES.map((s) => (
              <button
                key={s.slug}
                type="button"
                className={`akira-style-row${style === s.slug ? " is-active" : ""}`}
                onClick={() => setStyle(s.slug)}
              >
                <span style={{ fontWeight: 600 }}>{s.label}</span>
                <span className="hint">{s.hint}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
