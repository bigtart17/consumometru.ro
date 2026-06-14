"use client";

import { useMemo, useState } from "react";
import { Plus, RefreshCcw, Trash2 } from "lucide-react";
import { AnnualResultsSummary } from "@/components/annual-home-consumption/annual-results-summary";
import { AnnualTopConsumers } from "@/components/annual-home-consumption/annual-top-consumers";
import { MonthlyConsumptionChart } from "@/components/annual-home-consumption/monthly-consumption-chart";
import { MonthlyBreakdownTable } from "@/components/annual-home-consumption/monthly-breakdown-table";
import { annualHomeConsumptionPresets } from "@/data/annualHomeConsumptionPresets";
import {
  calculateAnnualHomeConsumption,
  DWELLING_TYPE_LABELS,
  getDefaultAnnualConsumptionInput,
  HABIT_PROFILE_LABELS,
  MONTHS
} from "@/lib/annual-home-consumption";
import type {
  AnnualApplianceCategory,
  AnnualAppliancePreset,
  AnnualCalculatorResult,
  ConsumptionHabitProfile,
  DwellingType
} from "@/types/annual-home-consumption";

type AnnualApplianceFormItem = AnnualAppliancePreset & {
  instanceId: string;
  wattsValue: string;
  hoursPerDayValue: string;
  quantityValue: string;
};

type CustomApplianceForm = {
  name: string;
  watts: string;
  hoursPerDay: string;
  quantity: string;
  category: AnnualApplianceCategory;
};

const dwellingOptions = Object.entries(DWELLING_TYPE_LABELS) as [DwellingType, string][];
const habitOptions = Object.entries(HABIT_PROFILE_LABELS) as [
  ConsumptionHabitProfile,
  string
][];

const categoryLabels: Record<AnnualApplianceCategory, string> = {
  climatizare: "Climatizare",
  incalzire: "Încălzire",
  "apa-calda": "Apă caldă",
  frig: "Frigider/congelator",
  spalare: "Spălare",
  bucatarie: "Bucătărie",
  electronice: "Electronice",
  iluminat: "Iluminat",
  standby: "Stand-by"
};

const MAX_APPLIANCE_WATTS = 12000;
const MAX_APPLIANCE_QUANTITY = 20;
let applianceInstanceCounter = 0;

const initialCustomForm: CustomApplianceForm = {
  name: "",
  watts: "",
  hoursPerDay: "",
  quantity: "1",
  category: "electronice"
};

export function AnnualHomeConsumptionCalculator() {
  const [dwellingType, setDwellingType] = useState<DwellingType>("apartament-3-camere");
  const [peopleCount, setPeopleCount] = useState("2");
  const [habitProfile, setHabitProfile] = useState<ConsumptionHabitProfile>("normal");
  const [pricePerKwh, setPricePerKwh] = useState("1,30");
  const [appliances, setAppliances] = useState(() =>
    annualHomeConsumptionPresets
      .filter((preset) => preset.defaultEnabled)
      .map((preset, index) => createFormItem(preset, `${preset.slug}-${index + 1}`))
  );
  const [selectedPresetSlug, setSelectedPresetSlug] = useState("");
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(false);
  const [customForm, setCustomForm] = useState<CustomApplianceForm>(initialCustomForm);
  const [customFormError, setCustomFormError] = useState("");

  const parsedPeopleCount = parseInputValue(peopleCount);
  const parsedPrice = parseInputValue(pricePerKwh);
  const peopleError = validatePeopleCount(peopleCount);
  const priceError = validatePrice(pricePerKwh);

  const activeAppliances = useMemo(
    () => appliances.map((appliance) => formItemToPreset(appliance)),
    [appliances]
  );
  const addPresetValue = selectedPresetSlug || annualHomeConsumptionPresets[0]?.slug || "";

  const result = useMemo(
    () =>
      activeAppliances.length > 0
        ? calculateAnnualHomeConsumption({
            dwellingType,
            peopleCount: parsedPeopleCount ?? 2,
            habitProfile,
            pricePerKwh: parsedPrice ?? 1.3,
            appliances: activeAppliances
          })
        : createEmptyAnnualResult(),
    [activeAppliances, dwellingType, habitProfile, parsedPeopleCount, parsedPrice]
  );

  function resetEstimate() {
    const defaultInput = getDefaultAnnualConsumptionInput();
    setDwellingType(defaultInput.dwellingType);
    setPeopleCount(String(defaultInput.peopleCount));
    setHabitProfile(defaultInput.habitProfile);
    setPricePerKwh(defaultInput.pricePerKwh.toFixed(2).replace(".", ","));
    setAppliances(
      annualHomeConsumptionPresets
        .filter((preset) => preset.defaultEnabled)
        .map((preset, index) => createFormItem(preset, `${preset.slug}-${index + 1}`))
    );
    setSelectedPresetSlug("");
    setIsCustomFormOpen(false);
    setCustomForm(initialCustomForm);
    setCustomFormError("");
  }

  function addPresetAppliance() {
    const preset = annualHomeConsumptionPresets.find((item) => item.slug === addPresetValue);

    if (!preset) {
      return;
    }

    setAppliances((current) => [...current, createFormItem(preset)]);
    setSelectedPresetSlug("");
  }

  function addCustomAppliance() {
    const name = customForm.name.trim();
    const watts = parseInputValue(customForm.watts);
    const hoursPerDay = parseInputValue(customForm.hoursPerDay);
    const quantity = parseInputValue(customForm.quantity);

    if (!name) {
      setCustomFormError("Introdu numele aparatului.");
      return;
    }

    if (watts === null || watts <= 0) {
      setCustomFormError("Puterea aparatului trebuie să fie mai mare decât 0 W.");
      return;
    }

    if (watts > MAX_APPLIANCE_WATTS) {
      setCustomFormError("Puterea pare prea mare pentru un aparat folosit într-o locuință.");
      return;
    }

    if (hoursPerDay === null || hoursPerDay < 0 || hoursPerDay > 24) {
      setCustomFormError("Introdu un număr de ore între 0 și 24.");
      return;
    }

    if (quantity === null || quantity <= 0) {
      setCustomFormError("Numărul de aparate trebuie să fie mai mare decât 0.");
      return;
    }

    if (quantity > MAX_APPLIANCE_QUANTITY) {
      setCustomFormError("Numărul de aparate pare prea mare pentru o locuință.");
      return;
    }

    const customInstanceId = createApplianceInstanceId("custom");
    const customAppliance: AnnualApplianceFormItem = {
      slug: customInstanceId,
      instanceId: customInstanceId,
      name,
      category: customForm.category,
      watts,
      hoursPerDay,
      quantity,
      peopleSensitivity: 0.08,
      dwellingSensitivity: 0.08,
      habitSensitivity: 0.16,
      defaultEnabled: true,
      note: "Aparat adăugat manual.",
      wattsValue: customForm.watts,
      hoursPerDayValue: customForm.hoursPerDay,
      quantityValue: customForm.quantity
    };

    setAppliances((current) => [...current, customAppliance]);
    setCustomForm(initialCustomForm);
    setCustomFormError("");
    setIsCustomFormOpen(false);
  }

  function removeAppliance(instanceId: string) {
    setAppliances((current) =>
      current.filter((appliance) => appliance.instanceId !== instanceId)
    );
  }

  function updateAppliance(instanceId: string, update: Partial<AnnualApplianceFormItem>) {
    setAppliances((current) =>
      current.map((appliance) =>
        appliance.instanceId === instanceId ? { ...appliance, ...update } : appliance
      )
    );
  }

  return (
    <section id="calculator-anual-locuinta" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6">
        <div className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Configurare rapidă
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Pornește de la profilul locuinței
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Alege locuința, numărul de persoane și prețul energiei. Estimarea
                se actualizează imediat.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              onClick={resetEstimate}
            >
              <RefreshCcw size={16} aria-hidden="true" />
              Resetează estimarea
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <SelectField
              id="annual-dwelling-type"
              label="Tip locuință"
              value={dwellingType}
              options={dwellingOptions}
              onChange={(value) => setDwellingType(value as DwellingType)}
            />
            <CompactInput
              id="annual-people-count"
              label="Număr persoane"
              suffix="pers."
              value={peopleCount}
              error={peopleError}
              onChange={setPeopleCount}
            />
            <SelectField
              id="annual-habit-profile"
              label="Profil consum"
              value={habitProfile}
              options={habitOptions}
              onChange={(value) => setHabitProfile(value as ConsumptionHabitProfile)}
            />
            <CompactInput
              id="annual-price"
              label="Preț energie"
              suffix="lei/kWh"
              value={pricePerKwh}
              error={priceError}
              onChange={setPricePerKwh}
            />
          </div>
        </div>

        <AnnualResultsSummary result={result} />

        <p className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
          Rezultatele sunt estimative și pot varia în funcție de aparatele reale,
          clasa energetică, obiceiurile de consum și prețul final din contractul
          de energie.
        </p>

        <MonthlyConsumptionChart months={result.monthlyBreakdown} />
        <AnnualTopConsumers consumers={result.summary.topConsumers} />

        <AppliancesSection
          appliances={appliances}
          availablePresets={annualHomeConsumptionPresets}
          selectedPresetSlug={addPresetValue}
          customForm={customForm}
          customFormError={customFormError}
          isCustomFormOpen={isCustomFormOpen}
          onSelectPreset={setSelectedPresetSlug}
          onAddPreset={addPresetAppliance}
          onToggleCustomForm={() => {
            setIsCustomFormOpen((current) => !current);
            setCustomFormError("");
          }}
          onCustomFormChange={(update) => setCustomForm((current) => ({ ...current, ...update }))}
          onAddCustom={addCustomAppliance}
          onRemove={removeAppliance}
          onUpdate={updateAppliance}
        />

        <MonthlyBreakdownTable months={result.monthlyBreakdown} />
      </div>
    </section>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: [string, string][];
  onChange: (value: string) => void;
};

function SelectField({ id, label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="grid min-w-0 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        id={id}
        className="h-12 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-base font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

type CompactInputProps = {
  id: string;
  label: string;
  suffix: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function CompactInput({ id, label, suffix, value, error, onChange }: CompactInputProps) {
  const errorId = `${id}-error`;

  return (
    <label className="grid min-w-0 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3" htmlFor={id}>
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="flex min-w-0 items-center gap-2">
        <input
          id={id}
          className="h-12 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-base font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2 aria-[invalid=true]:border-red-300 aria-[invalid=true]:bg-red-50"
          inputMode="decimal"
          value={value}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        <span className="shrink-0 text-xs font-medium text-slate-500">{suffix}</span>
      </div>
      {error ? (
        <p id={errorId} className="text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </label>
  );
}

type AppliancesSectionProps = {
  appliances: AnnualApplianceFormItem[];
  availablePresets: AnnualAppliancePreset[];
  selectedPresetSlug: string;
  customForm: CustomApplianceForm;
  customFormError: string;
  isCustomFormOpen: boolean;
  onSelectPreset: (slug: string) => void;
  onAddPreset: () => void;
  onToggleCustomForm: () => void;
  onCustomFormChange: (update: Partial<CustomApplianceForm>) => void;
  onAddCustom: () => void;
  onRemove: (slug: string) => void;
  onUpdate: (slug: string, update: Partial<AnnualApplianceFormItem>) => void;
};

function AppliancesSection({
  appliances,
  availablePresets,
  selectedPresetSlug,
  customForm,
  customFormError,
  isCustomFormOpen,
  onSelectPreset,
  onAddPreset,
  onToggleCustomForm,
  onCustomFormChange,
  onAddCustom,
  onRemove,
  onUpdate
}: AppliancesSectionProps) {
  return (
    <section className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(19rem,0.55fr)] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Aparatele locuinței
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Aparatele incluse în estimare
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Adaugă doar aparatele pe care le folosești în locuință. Poți modifica
            puterea, durata de utilizare și numărul de aparate.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <label className="grid gap-2" htmlFor="annual-add-preset">
            <span className="text-sm font-medium text-slate-700">Adaugă aparat</span>
            <select
              id="annual-add-preset"
              className="h-12 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
              value={selectedPresetSlug}
              disabled={availablePresets.length === 0}
              onChange={(event) => onSelectPreset(event.target.value)}
            >
              {availablePresets.length > 0 ? (
                availablePresets.map((preset) => (
                  <option key={preset.slug} value={preset.slug}>
                    {preset.name}
                  </option>
                ))
              ) : (
                <option value="">Toate presetările sunt adăugate</option>
              )}
            </select>
          </label>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={availablePresets.length === 0}
              onClick={onAddPreset}
            >
              <Plus size={16} aria-hidden="true" />
              Adaugă în locuință
            </button>
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
              aria-expanded={isCustomFormOpen}
              onClick={onToggleCustomForm}
            >
              Adaugă aparat personalizat
            </button>
          </div>
        </div>
      </div>

      {isCustomFormOpen ? (
        <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-3 sm:p-4">
          <h3 className="text-lg font-semibold text-slate-950">
            Aparat personalizat
          </h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <label className="grid min-w-0 gap-2 rounded-lg border border-emerald-100 bg-white p-3 xl:col-span-2" htmlFor="annual-custom-name">
              <span className="text-sm font-medium text-slate-700">Nume aparat</span>
              <input
                id="annual-custom-name"
                className="h-12 min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-base font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
                value={customForm.name}
                onChange={(event) => onCustomFormChange({ name: event.target.value })}
              />
            </label>
            <CompactInput
              id="annual-custom-watts"
              label="Putere"
              suffix="W"
              value={customForm.watts}
              onChange={(value) => onCustomFormChange({ watts: value })}
            />
            <CompactInput
              id="annual-custom-hours"
              label="Ore/zi"
              suffix="h"
              value={customForm.hoursPerDay}
              onChange={(value) => onCustomFormChange({ hoursPerDay: value })}
            />
            <CompactInput
              id="annual-custom-quantity"
              label="Număr"
              suffix="buc."
              value={customForm.quantity}
              onChange={(value) => onCustomFormChange({ quantity: value })}
            />
            <SelectField
              id="annual-custom-category"
              label="Categorie"
              value={customForm.category}
              options={Object.entries(categoryLabels)}
              onChange={(value) =>
                onCustomFormChange({ category: value as AnnualApplianceCategory })
              }
            />
          </div>
          {customFormError ? (
            <p className="mt-3 text-sm font-medium text-red-700" role="alert">
              {customFormError}
            </p>
          ) : null}
          <button
            type="button"
            className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
            onClick={onAddCustom}
          >
            Adaugă aparat personalizat
          </button>
        </div>
      ) : null}

      <div className="mt-5">
        {appliances.length > 0 ? (
          <div className="grid gap-3">
            {appliances.map((appliance) => (
              <ApplianceCard
                key={appliance.instanceId}
                appliance={appliance}
                onRemove={() => onRemove(appliance.instanceId)}
                onChange={(update) => onUpdate(appliance.instanceId, update)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-950">
            Nu ai adăugat încă aparate. Adaugă cel puțin un aparat pentru a
            estima consumul anual.
          </div>
        )}
      </div>
    </section>
  );
}

type ApplianceCardProps = {
  appliance: AnnualApplianceFormItem;
  onChange: (update: Partial<AnnualApplianceFormItem>) => void;
  onRemove: () => void;
};

function ApplianceCard({ appliance, onChange, onRemove }: ApplianceCardProps) {
  const errors = validateApplianceFields(appliance);

  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">{appliance.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{categoryLabels[appliance.category]}</p>
        </div>
        <button
          type="button"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-red-100 bg-white px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={onRemove}
        >
          <Trash2 size={15} aria-hidden="true" />
          Șterge
        </button>
      </div>

      <div className="mt-4 grid min-w-0 gap-3 md:grid-cols-3">
        <CompactInput
          id={`${appliance.instanceId}-annual-watts`}
          label="Putere"
          suffix="W"
          value={appliance.wattsValue}
          error={errors.watts}
          onChange={(value) => onChange({ wattsValue: value })}
        />
        <CompactInput
          id={`${appliance.instanceId}-annual-hours`}
          label="Ore/zi"
          suffix="h"
          value={appliance.hoursPerDayValue}
          error={errors.hoursPerDay}
          onChange={(value) => onChange({ hoursPerDayValue: value })}
        />
        <CompactInput
          id={`${appliance.instanceId}-annual-quantity`}
          label="Număr"
          suffix="buc."
          value={appliance.quantityValue}
          error={errors.quantity}
          onChange={(value) => onChange({ quantityValue: value })}
        />
      </div>
    </article>
  );
}

function createFormItem(
  preset: AnnualAppliancePreset,
  instanceId = createApplianceInstanceId(preset.slug)
): AnnualApplianceFormItem {
  return {
    ...preset,
    instanceId,
    wattsValue: String(preset.watts),
    hoursPerDayValue: String(preset.hoursPerDay).replace(".", ","),
    quantityValue: String(preset.quantity)
  };
}

function formItemToPreset(item: AnnualApplianceFormItem): AnnualAppliancePreset {
  return {
    slug: item.slug,
    name: item.name,
    category: item.category,
    watts: parseInputValue(item.wattsValue) ?? 0,
    hoursPerDay: parseInputValue(item.hoursPerDayValue) ?? 0,
    quantity: parseInputValue(item.quantityValue) ?? 1,
    peopleSensitivity: item.peopleSensitivity,
    dwellingSensitivity: item.dwellingSensitivity,
    habitSensitivity: item.habitSensitivity,
    monthlyMultipliers: item.monthlyMultipliers,
    defaultEnabled: item.defaultEnabled,
    note: item.note
  };
}

function createApplianceInstanceId(slug: string) {
  applianceInstanceCounter += 1;
  return `${slug}-${Date.now()}-${applianceInstanceCounter}`;
}

function parseInputValue(value: string) {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
}

function validateApplianceFields(appliance: AnnualApplianceFormItem) {
  const watts = parseInputValue(appliance.wattsValue);
  const hoursPerDay = parseInputValue(appliance.hoursPerDayValue);
  const quantity = parseInputValue(appliance.quantityValue);

  return {
    watts:
      appliance.wattsValue.trim() === "" || watts === null
        ? "Introdu puterea în W."
        : watts <= 0
          ? "Puterea trebuie să fie mai mare decât 0 W."
          : watts > MAX_APPLIANCE_WATTS
            ? "Puterea pare prea mare pentru un aparat casnic."
            : "",
    hoursPerDay:
      appliance.hoursPerDayValue.trim() === "" || hoursPerDay === null
        ? "Introdu orele de utilizare."
        : hoursPerDay < 0
          ? "Orele nu pot fi negative."
          : hoursPerDay > 24
            ? "O zi are maximum 24 de ore."
            : "",
    quantity:
      appliance.quantityValue.trim() === "" || quantity === null
        ? "Introdu numărul de aparate."
        : quantity <= 0
          ? "Numărul trebuie să fie mai mare decât 0."
          : quantity > MAX_APPLIANCE_QUANTITY
            ? "Numărul pare prea mare pentru o locuință."
            : ""
  };
}

function validatePeopleCount(value: string) {
  const parsed = parseInputValue(value);

  if (value.trim() === "" || parsed === null) {
    return "Introdu numărul de persoane.";
  }

  if (parsed <= 0) {
    return "Numărul de persoane trebuie să fie mai mare decât 0.";
  }

  if (parsed > 10) {
    return "Pentru peste 10 persoane, rezultatul devine prea general.";
  }

  return "";
}

function validatePrice(value: string) {
  const parsed = parseInputValue(value);

  if (value.trim() === "" || parsed === null) {
    return "Introdu un preț kWh valid.";
  }

  if (parsed <= 0) {
    return "Prețul kWh trebuie să fie mai mare decât 0.";
  }

  if (parsed > 20) {
    return "Prețul kWh pare prea mare. Verifică valoarea din factură.";
  }

  return "";
}

function createEmptyAnnualResult(): AnnualCalculatorResult {
  const monthlyBreakdown = MONTHS.map((month) => ({
    month: month.key,
    label: month.label,
    days: month.days,
    totalKwh: 0,
    totalCost: 0,
    appliances: []
  }));

  return {
    monthlyBreakdown,
    summary: {
      annualKwh: 0,
      annualCost: 0,
      averageMonthlyKwh: 0,
      averageMonthlyCost: 0,
      highestMonth: monthlyBreakdown[0],
      lowestMonth: monthlyBreakdown[0],
      topConsumers: []
    }
  };
}
