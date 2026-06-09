import { clamp, formatSliderValue, parseInputValue } from "@/lib/calculator";
import { formatCurrency, formatNumber } from "@/lib/energy";

type LiveCostPanelProps = {
  hoursValue: string;
  priceValue: string;
  monthlyCost: number | null;
  liveResultKey: number;
  onHoursChange: (value: string) => void;
  onPriceChange: (value: string) => void;
};

export function LiveCostPanel({
  hoursValue,
  priceValue,
  monthlyCost,
  liveResultKey,
  onHoursChange,
  onPriceChange
}: LiveCostPanelProps) {
  const hours = clamp(parseInputValue(hoursValue) ?? 0, 0, 24);
  const price = clamp(parseInputValue(priceValue) ?? 0, 0, 5);

  return (
    <section
      aria-label="Cost in timp real"
      className="mt-5 rounded-lg border border-emerald-200 bg-emerald-950 p-4 text-white sm:p-5"
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
            Cost in timp real
          </p>
          <h3 className="mt-2 text-2xl font-semibold">
            Ajusteaza rapid scenariul lunar
          </h3>
          <p className="mt-2 text-sm leading-6 text-emerald-50">
            Misca slider-ele pentru orele de utilizare si pretul energiei.
            Estimarea se actualizeaza imediat, fara reload.
          </p>
        </div>

        <div
          key={liveResultKey}
          className="animate-result-pop rounded-lg bg-white p-4 text-slate-950"
          aria-live="polite"
        >
          <p className="text-sm font-medium text-slate-500">Te costa aproximativ</p>
          <p className="mt-2 text-3xl font-semibold sm:text-4xl">
            {monthlyCost === null ? "—" : formatCurrency(monthlyCost)}
          </p>
          <p className="mt-1 text-sm text-slate-600">pe luna</p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <RangeControl
          label="Ore utilizare/zi"
          value={hours}
          min={0}
          max={24}
          step={0.25}
          suffix="h"
          onChange={(value) => onHoursChange(formatSliderValue(value))}
        />
        <RangeControl
          label="Pret energie/kWh"
          value={price}
          min={0}
          max={5}
          step={0.01}
          suffix="lei"
          onChange={(value) => onPriceChange(formatSliderValue(value))}
        />
      </div>
    </section>
  );
}

type RangeControlProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix: string;
  onChange: (value: number) => void;
};

function RangeControl({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange
}: RangeControlProps) {
  return (
    <label className="grid gap-3 rounded-lg bg-white/10 p-4">
      <span className="flex items-center justify-between gap-3 text-sm font-medium text-emerald-50">
        {label}
        <strong className="text-base text-white">
          {formatNumber(value)} {suffix}
        </strong>
      </span>
      <input
        className="h-8 w-full accent-emerald-300"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(event) => onChange(Number(event.currentTarget.value))}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}
