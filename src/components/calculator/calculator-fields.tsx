import type { LucideIcon } from "lucide-react";

export type NumberFieldProps = {
  icon: LucideIcon;
  label: string;
  suffix: string;
  hint: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function NumberField({
  icon: Icon,
  label,
  suffix,
  hint,
  value,
  error,
  onChange
}: NumberFieldProps) {
  const inputId = `calculator-${label.toLowerCase().replaceAll(" ", "-")}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <label
      className={
        error
          ? "grid min-w-0 gap-2 overflow-hidden rounded-lg border border-amber-300 bg-amber-50 p-3"
          : "grid min-w-0 gap-2 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-3"
      }
      htmlFor={inputId}
    >
      <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-700">
        <Icon size={16} aria-hidden="true" />
        <span className="min-w-0 break-words">{label}</span>
      </span>
      <div className="relative min-w-0">
        <input
          id={inputId}
          aria-label={label}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hintId}
          className="h-12 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 pr-20 text-lg font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 w-16 -translate-y-1/2 truncate text-right text-sm font-medium text-slate-500">
          {suffix}
        </span>
      </div>
      {error ? (
        <span id={errorId} className="min-w-0 break-words text-sm font-medium text-amber-800">
          {error}
        </span>
      ) : (
        <span id={hintId} className="min-w-0 break-words text-xs leading-5 text-slate-500">
          {hint}
        </span>
      )}
    </label>
  );
}

type ResultTileProps = {
  label: string;
  costLabel: string;
  cost: string;
  consumption: string;
  highlighted?: boolean;
};

export function ResultTile({
  label,
  costLabel,
  cost,
  consumption,
  highlighted
}: ResultTileProps) {
  return (
    <article
      className={
        highlighted
          ? "rounded-lg bg-emerald-700 p-4 text-white"
          : "rounded-lg border border-emerald-100 bg-white p-4 text-slate-950"
      }
    >
      <p className={highlighted ? "text-sm text-emerald-50" : "text-sm text-slate-500"}>
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{consumption}</p>
      <p
        className={
          highlighted
            ? "mt-4 text-sm font-medium text-emerald-50"
            : "mt-4 text-sm font-medium text-slate-500"
        }
      >
        {costLabel}
      </p>
      <p className="mt-1 text-xl font-semibold">{cost}</p>
      <p className={highlighted ? "mt-2 text-xs text-emerald-50" : "mt-2 text-xs text-slate-500"}>
        Estimare orientativa
      </p>
    </article>
  );
}
