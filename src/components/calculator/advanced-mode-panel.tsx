import {
  CalendarDays,
  ChevronDown,
  Moon,
  Package,
  Percent,
  Power,
  Sun
} from "lucide-react";
import { NumberField } from "@/components/calculator/calculator-fields";
import { formatNumber } from "@/lib/energy";
import type { AdvancedState, FieldError } from "@/types/calculator";

type AdvancedModePanelProps = {
  values: AdvancedState;
  errors: FieldError;
  isOpen: boolean;
  weightedPrice: number | null;
  onToggle: () => void;
  onChange: (key: keyof AdvancedState, value: string) => void;
};

export function AdvancedModePanel({
  values,
  errors,
  isOpen,
  weightedPrice,
  onToggle,
  onChange
}: AdvancedModePanelProps) {
  return (
    <section className="mt-5 rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 rounded-lg px-4 py-4 text-left transition hover:bg-slate-50"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>
          <span className="block text-base font-semibold text-slate-950">
            Mod avansat
          </span>
          <span className="mt-1 block text-sm leading-6 text-slate-600">
            Pentru stand-by, sezonalitate, tarif zi/noapte si mai multe aparate.
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          {isOpen ? "Ascunde" : "Arata"}
          <ChevronDown
            className={isOpen ? "rotate-180 transition" : "transition"}
            size={16}
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen ? (
        <div className="grid gap-4 border-t border-slate-100 p-4">
          <div className="rounded-lg bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
            Modul simplu ramane baza. Campurile de mai jos ajusteaza estimarea
            cand ai informatii mai precise despre aparat sau contractul de energie.
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              icon={Power}
              label="Consum stand-by"
              suffix="W"
              hint="Cat consuma aparatul cand sta in priza, dar nu este folosit."
              value={values.standbyWatts}
              error={errors.standbyWatts}
              onChange={(value) => onChange("standbyWatts", value)}
            />
            <NumberField
              icon={CalendarDays}
              label="Utilizare sezoniera"
              suffix="luni/an"
              hint="Cate luni pe an folosesti aparatul. Pentru frigider poti lasa 12."
              value={values.seasonalMonths}
              error={errors.seasonalMonths}
              onChange={(value) => onChange("seasonalMonths", value)}
            />
            <NumberField
              icon={Sun}
              label="Tarif zi"
              suffix="lei/kWh"
              hint="Pretul energiei pentru consumul din timpul zilei."
              value={values.dayPricePerKwh}
              error={errors.dayPricePerKwh}
              onChange={(value) => onChange("dayPricePerKwh", value)}
            />
            <NumberField
              icon={Moon}
              label="Tarif noapte"
              suffix="lei/kWh"
              hint="Pretul energiei pentru consumul din timpul noptii."
              value={values.nightPricePerKwh}
              error={errors.nightPricePerKwh}
              onChange={(value) => onChange("nightPricePerKwh", value)}
            />
            <NumberField
              icon={Percent}
              label="Utilizare zi"
              suffix="%"
              hint="Cat din utilizare are loc ziua. Restul este calculat la tarif de noapte."
              value={values.dayUsagePercent}
              error={errors.dayUsagePercent}
              onChange={(value) => onChange("dayUsagePercent", value)}
            />
            <NumberField
              icon={Percent}
              label="Eficienta estimativa"
              suffix="%"
              hint="100% inseamna consum normal. 80% inseamna un aparat mai eficient."
              value={values.efficiencyPercent}
              error={errors.efficiencyPercent}
              onChange={(value) => onChange("efficiencyPercent", value)}
            />
            <NumberField
              icon={Package}
              label="Aparate identice"
              suffix="buc."
              hint="Foloseste 2 sau mai mult cand calculezi mai multe aparate la fel."
              value={values.quantity}
              error={errors.quantity}
              onChange={(value) => onChange("quantity", value)}
            />
          </div>

          {weightedPrice !== null ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
              Tariful mediu folosit in modul avansat este{" "}
              <strong>{formatNumber(weightedPrice)} lei/kWh</strong>, calculat
              din ponderea zi/noapte.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
