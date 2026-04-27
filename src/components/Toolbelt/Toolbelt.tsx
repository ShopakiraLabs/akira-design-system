/**
 * Toolbelt · the canonical right-side cluster of the TopBar.
 *
 * Order, decided 2026-04-23 and recorded in the brand skill:
 *   ThemePicker  →  SettingsMenu  →  ProfileMenu
 *
 * All three render by DEFAULT. If you only want a subset, pass `false` for
 * the part you don't want. The settings gear renders with sensible default
 * items if you don't supply your own — this keeps the visual layout
 * consistent across every AKIRA app even when an app hasn't designed its
 * settings yet.
 */
import type { ReactNode } from "react";
import { Bell, KeyRound, HelpCircle } from "lucide-react";
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
  /**
   * Settings sections or items, or `false` to hide.
   * Default: a small set of placeholder items so the gear always renders.
   * Override with your own array to customize.
   */
  settings?: SettingsMenuSection[] | SettingsMenuItem[] | false;
  /** Profile menu config. If omitted, no avatar is rendered. */
  profile?: ToolbeltProfile;
  /** Optional extra controls rendered on the far left of the cluster. */
  extras?: ReactNode;
}

const DEFAULT_SETTINGS: SettingsMenuSection[] = [
  {
    title: "Workspace",
    items: [
      { label: "Notifications", icon: <Bell size={14} aria-hidden="true" /> },
      { label: "Keyboard shortcuts", icon: <KeyRound size={14} aria-hidden="true" /> },
    ],
  },
  {
    title: "Help",
    items: [
      { label: "Help & feedback", icon: <HelpCircle size={14} aria-hidden="true" /> },
    ],
  },
];

export function Toolbelt({
  appearance = true,
  settings,
  profile,
  extras,
}: ToolbeltProps) {
  // settings === false → hide. settings === undefined → use defaults.
  // settings === array → use as supplied.
  const resolvedSettings: SettingsMenuSection[] | SettingsMenuItem[] | null =
    settings === false ? null : Array.isArray(settings) ? settings : DEFAULT_SETTINGS;
  const settingsArr = resolvedSettings;
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
