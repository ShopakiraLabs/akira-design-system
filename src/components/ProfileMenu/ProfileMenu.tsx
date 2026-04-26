/**
 * ProfileMenu · circular-avatar trigger that opens an account dropdown.
 *
 * Header shows avatar + name + email; body is a list of items the app
 * passes in (Profile, Preferences, Sign out, etc.). The component computes
 * default initials from the name when `initials` is not provided.
 */
import type { ReactNode } from "react";
import { usePopover } from "../../hooks/usePopover";

export interface ProfileMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  /** When true, item is rendered with a divider above. */
  divider?: boolean;
}

export interface ProfileMenuProps {
  /** Display name shown in the header. */
  name: string;
  /** Email shown under the name. */
  email?: string;
  /** Override the auto-generated initials. */
  initials?: string;
  /** Account-menu rows. */
  items: ProfileMenuItem[];
  ariaLabel?: string;
  className?: string;
}

function defaultInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function ProfileMenu({
  name,
  email,
  initials,
  items,
  ariaLabel = "Account",
  className,
}: ProfileMenuProps) {
  const { open, toggle, close, triggerRef, menuRef, position } = usePopover({ menuWidth: 240 });
  const initialsText = initials ?? defaultInitials(name);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`akira-avatar-btn${className ? ` ${className}` : ""}`}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={toggle}
      >
        <span className="akira-avatar" aria-hidden="true">
          {initialsText}
        </span>
      </button>
      {open && position ? (
        <div
          ref={menuRef}
          className="akira-menu"
          role="menu"
          style={{ top: position.top, left: position.left, width: 240 }}
        >
          <div className="akira-menu-header" style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <span className="akira-avatar" aria-hidden="true">{initialsText}</span>
            <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
              {email ? (
                <span style={{ fontSize: 11, color: "var(--color-text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {email}
                </span>
              ) : null}
            </span>
          </div>
          {items.map((item, i) => (
            <span key={i}>
              {item.divider ? <div className="akira-menu-sep" aria-hidden="true" /> : null}
              {item.href ? (
                <a className="akira-menu-item" href={item.href} onClick={close}>
                  {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                  <span>{item.label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  className="akira-menu-item"
                  onClick={() => {
                    item.onClick?.();
                    close();
                  }}
                >
                  {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                  <span>{item.label}</span>
                </button>
              )}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );
}
