import { CalendarDays, Clock, Gauge, WalletCards } from "lucide-react";
import { CalculatorPresets } from "@/components/calculator/calculator-presets";
import { NumberField } from "@/components/calculator/calculator-fields";
import type { CalculatorState, FieldError } from "@/types/calculator";
import type { AppliancePreset } from "@/types/energy";

type CalculatorFormProps = {
  values: CalculatorState;
  errors: FieldError;
  presets: AppliancePreset[];
  selectedPresetSlug: string;
  selectedPreset?: AppliancePreset;
  onPresetSelect: (slug: string) => void;
  onChange: (key: keyof CalculatorState, value: string) => void;
};

export function CalculatorForm({
  values,
  errors,
  presets,
  selectedPresetSlug,
  selectedPreset,
  onPresetSelect,
  onChange
}: CalculatorFormProps) {
  return (
    <div className="mt-5 grid gap-4">
      <CalculatorPresets
        presets={presets}
        selectedPresetSlug={selectedPresetSlug}
        selectedPreset={selectedPreset}
        onSelect={onPresetSelect}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          icon={Gauge}
          label="Puterea aparatului"
          suffix="W"
          hint="Exemplu: 1000 pentru un aparat de 1000 W"
          value={values.watts}
          error={errors.watts}
          onChange={(value) => onChange("watts", value)}
        />
        <NumberField
          icon={Clock}
          label="Ore utilizare pe zi"
          suffix="h"
          hint="Poate fi si cu virgula, de exemplu 1,5"
          value={values.hoursPerDay}
          error={errors.hoursPerDay}
          onChange={(value) => onChange("hoursPerDay", value)}
        />
        <NumberField
          icon={CalendarDays}
          label="Zile utilizare pe luna"
          suffix="zile"
          hint="Alege cate zile folosesti aparatul intr-o luna"
          value={values.daysPerMonth}
          error={errors.daysPerMonth}
          onChange={(value) => onChange("daysPerMonth", value)}
        />
        <NumberField
          icon={WalletCards}
          label="Pret kWh"
          suffix="lei/kWh"
          hint="Gasesti valoarea in factura de energie"
          value={values.pricePerKwh}
          error={errors.pricePerKwh}
          onChange={(value) => onChange("pricePerKwh", value)}
        />
      </div>
    </div>
  );
}
