/**
 * SearchBar · text input with a leading icon, sized for the TopBar.
 *
 * Controlled or uncontrolled. Submits on Enter. The input itself is a thin
 * wrapper around a native `<input>` so consumers can ref it, autofocus,
 * etc. without us re-implementing those features.
 */
import { Search } from "lucide-react";
import type { FormEvent } from "react";

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  /** Optional: hides the leading magnifier icon. */
  hideIcon?: boolean;
  /** Optional: applies an aria-label when no visible label is present. */
  ariaLabel?: string;
}

export function SearchBar({
  placeholder = "Search…",
  value,
  defaultValue,
  onChange,
  onSubmit,
  className,
  hideIcon,
  ariaLabel = "Search",
}: SearchBarProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!onSubmit) return;
    const data = new FormData(e.currentTarget);
    const v = String(data.get("q") ?? "");
    onSubmit(v);
  }

  return (
    <form className={`akira-search${className ? ` ${className}` : ""}`} onSubmit={handleSubmit} role="search">
      {!hideIcon ? <Search size={16} aria-hidden="true" /> : null}
      <input
        name="q"
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </form>
  );
}
