/**
 * Toolbelt · the canonical right-side cluster of the TopBar.
 *
 * Order, decided 2026-04-23 and recorded in the brand skill:
 *   ThemePicker  →  SettingsMenu  →  ProfileMenu
 *
 * Each piece is independently disable-able. If you only want a subset, pass
 * `false` for the part you don't want, or render the underlying components
 * directly inside `<TopBar end={…}>`.
 */
import type { ReactNode } from "react";
import { ThemePicker } from "../ThemePicker/ThemePicker";
import { SettingsMenu, type SettingsMenuSection, type SettingsMenuItem } from "../SettingsMenu/SettingsMenu";
import { ProfileMenu, type ProfileMenuItem } from "../ProfileMenu/ProfileMenu";

export interface ToolbeltProfile {
  name: string;
  email?: string;
  initials?: string;
  items: ProfileMenuItem[];
}

export interface ToolbeltProps {
  /** Pass `false` to hide the appearance gear. Default true. */
  appearance?: boolean;
  /** Settings sections, or `false` to hide. Default: hidden. */
  settings?: SettingsMenuSection[] | SettingsMenuItem[] | false;
  /** Profile menu config. If omitted, no avatar is rendered. */
  profile?: ToolbeltProfile;
  /** Optional extra controls rendered on the far left of the cluster. */
  extras?: ReactNode;
}

export function Toolbelt({
  appearance = true,
  settings,
  profile,
  extras,
}: ToolbeltProps) {
  const settingsArr = Array.isArray(settings) ? settings : null;
  const hasSettings = settingsArr !== null && settingsArr.length > 0;
  // Discriminate sections-vs-items by checking whether the first element has an `items` key.
  const settingsAsSections = hasSettings && (settingsArr![0] as object).hasOwnProperty("items");
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {extras}
      {appearance ? <ThemePicker /> : null}
      {hasSettings ? (
        settingsAsSections
          ? <SettingsMenu sections={settingsArr as SettingsMenuSection[]} />
          : <SettingsMenu items={settingsArr as SettingsMenuItem[]} />
      ) : null}
      {profile ? (
        <ProfileMenu
          name={profile.name}
          email={profile.email}
          initials={profile.initials}
          items={profile.items}
        />
      ) : null}
    </div>
  );
}
