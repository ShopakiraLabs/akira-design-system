/**
 * SectionHeader · row above a tile grid or list. Title + optional subtitle
 * on the left, optional actions on the right.
 */
import type { ReactNode } from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Right-side slot — typically a "View all" link or filter chips. */
  actions?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, actions, className }: SectionHeaderProps) {
  return (
    <div className={`akira-section-header${className ? ` ${className}` : ""}`}>
      <div>
        <h2 className="akira-section-title">{title}</h2>
        {subtitle ? <p className="akira-section-subtitle">{subtitle}</p> : null}
      </div>
      {actions}
    </div>
  );
}
