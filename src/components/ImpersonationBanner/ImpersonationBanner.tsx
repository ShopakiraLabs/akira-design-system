/**
 * ImpersonationBanner · yellow strip rendered above the TopBar when an admin
 * is acting as another user.
 *
 * **Default behavior is to render nothing.** Pass `visible` (or use the
 * shorthand of just rendering the banner conditionally) to show it. Most
 * AKIRA apps never render this; it's primarily for AKIRA OS admin tooling.
 */
import { Shield } from "lucide-react";

export interface ImpersonationBannerProps {
  /** When false (default) the banner returns null. */
  visible?: boolean;
  /** Name of the user being impersonated. */
  targetName: string;
  /** Optional explanation rendered next to the name. */
  reason?: string;
  /** Click handler for the "Stop impersonating" button. */
  onExit?: () => void;
  /** Custom label for the exit button. */
  exitLabel?: string;
}

export function ImpersonationBanner({
  visible = false,
  targetName,
  reason,
  onExit,
  exitLabel = "Stop impersonating",
}: ImpersonationBannerProps) {
  if (!visible) return null;
  return (
    <div className="akira-impersonation" role="status">
      <Shield size={16} aria-hidden="true" />
      <span>
        Viewing as <strong>{targetName}</strong>
        {reason ? <span style={{ opacity: 0.75 }}> · {reason}</span> : null}
      </span>
      <span className="akira-impersonation-spacer" />
      {onExit ? (
        <button type="button" onClick={onExit}>
          {exitLabel}
        </button>
      ) : null}
    </div>
  );
}
