import type { AppliancePreset } from "@/types/energy";

type CalculatorPresetsProps = {
  presets: AppliancePreset[];
  selectedPresetSlug: string;
  selectedPreset?: AppliancePreset;
  onSelect: (slug: string) => void;
};

export function CalculatorPresets({
  presets,
  selectedPresetSlug,
  selectedPreset,
  onSelect
}: CalculatorPresetsProps) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50/55 p-3">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">
          Alege un aparat popular
        </span>
        <select
          className="h-12 rounded-lg border border-slate-200 bg-white px-3 text-base text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
          value={selectedPresetSlug}
          onChange={(event) => onSelect(event.target.value)}
        >
          <option value="">Selecteaza un aparat</option>
          {presets.map((preset) => (
            <option key={preset.slug} value={preset.slug}>
              {preset.name} - {preset.watts} W
            </option>
          ))}
        </select>
      </label>
      {selectedPreset ? (
        <div className="mt-3 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700">
          <p className="font-semibold text-slate-950">
            {selectedPreset.name}: {selectedPreset.watts} W estimativ
          </p>
          <p className="mt-1">
            Valoare estimativa, poate varia in functie de model. Poti edita
            manual puterea si orele daca ai datele de pe eticheta aparatului.
          </p>
          <p className="mt-1 text-slate-600">{selectedPreset.summary}</p>
        </div>
      ) : (
        <p className="mt-2 text-sm leading-6 text-emerald-900">
          Alege un preset pentru completare rapida sau introdu manual datele
          aparatului tau.
        </p>
      )}
    </div>
  );
}
