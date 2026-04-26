/**
 * SettingsMenu · cog-icon button that opens a sectioned dropdown.
 *
 * Apps pass their own item definitions; this component renders the popover
 * shell + handles open/close. Sections are optional — pass a flat
 * `items` array if you don't need group headings.
 */
import { Cog } from "lucide-react";
import type { ReactNode } from "react";
import { usePopover } from "../../hooks/usePopover";

export interface SettingsMenuItem {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface SettingsMenuSection {
  title?: string;
  items: SettingsMenuItem[];
}

export interface SettingsMenuProps {
  /** Either a flat list of items or a list of sections. */
  sections?: SettingsMenuSection[];
  items?: SettingsMenuItem[];
  ariaLabel?: string;
  className?: string;
}

function MenuItemRow({ item, onAfter }: { item: SettingsMenuItem; onAfter: () => void }) {
  const inner = (
    <>
      {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
      <span>{item.label}</span>
    </>
  );
  if (item.href) {
    return (
      <a className="akira-menu-item" href={item.href} onClick={onAfter}>
        {inner}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="akira-menu-item"
      onClick={() => {
        item.onClick?.();
        onAfter();
      }}
    >
      {inner}
    </button>
  );
}

export function SettingsMenu({
  sections,
  items,
  ariaLabel = "Settings",
  className,
}: SettingsMenuProps) {
  const { open, toggle, close, triggerRef, menuRef, position } = usePopover({ menuWidth: 240 });

  // Normalize: prefer sections, fall back to flat items.
  const groups: SettingsMenuSection[] = sections ?? (items ? [{ items }] : []);

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
        <Cog size={16} aria-hidden="true" />
      </button>
      {open && position ? (
        <div
          ref={menuRef}
          className="akira-menu"
          role="menu"
          style={{ top: position.top, left: position.left, width: 240 }}
        >
          {groups.map((group, gi) => (
            <div key={gi}>
              {group.title ? (
                <div className="akira-menu-section-title">{group.title}</div>
              ) : null}
              {group.items.map((item, ii) => (
                <MenuItemRow key={ii} item={item} onAfter={close} />
              ))}
              {gi < groups.length - 1 ? <div className="akira-menu-sep" aria-hidden="true" /> : null}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
