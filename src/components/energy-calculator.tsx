"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bolt,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Gauge,
  Link as LinkIcon,
  Moon,
  Package,
  Percent,
  Power,
  Scale,
  Share2,
  Sun,
  WalletCards
} from "lucide-react";
import { EnergyChart } from "@/components/energy-chart";
import { calculateEnergyCost, formatCurrency, formatNumber } from "@/lib/energy";
import type { AppliancePreset } from "@/types/energy";

type EnergyCalculatorProps = {
  presets: AppliancePreset[];
  initialValues?: Partial<CalculatorState>;
  initialPresetSlug?: string;
};

type CalculatorState = {
  watts: string;
  hoursPerDay: string;
  daysPerMonth: string;
  pricePerKwh: string;
};

type AdvancedState = {
  standbyWatts: string;
  seasonalMonths: string;
  dayPricePerKwh: string;
  nightPricePerKwh: string;
  dayUsagePercent: string;
  efficiencyPercent: string;
  quantity: string;
};

const defaultState: CalculatorState = {
  watts: "1000",
  hoursPerDay: "2",
  daysPerMonth: "30",
  pricePerKwh: "1,30"
};

const defaultAdvancedState: AdvancedState = {
  standbyWatts: "0",
  seasonalMonths: "12",
  dayPricePerKwh: "1,30",
  nightPricePerKwh: "0,90",
  dayUsagePercent: "70",
  efficiencyPercent: "100",
  quantity: "1"
};

type FieldError = Partial<Record<keyof CalculatorState | keyof AdvancedState, string>>;

export function EnergyCalculator({
  presets,
  initialValues,
  initialPresetSlug = ""
}: EnergyCalculatorProps) {
  const [values, setValues] = useState<CalculatorState>({
    ...defaultState,
    ...initialValues
  });
  const [advancedValues, setAdvancedValues] = useState(defaultAdvancedState);
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [selectedPresetSlug, setSelectedPresetSlug] = useState(initialPresetSlug);
  const [liveResultKey, setLiveResultKey] = useState(0);
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const sharedValues = getValuesFromUrl(searchParams);

    if (sharedValues.values) {
      setValues((current) => ({
        ...current,
        ...sharedValues.values
      }));
    }

    if (sharedValues.advancedValues) {
      setAdvancedValues((current) => ({
        ...current,
        ...sharedValues.advancedValues
      }));
    }

    if (sharedValues.presetSlug) {
      setSelectedPresetSlug(sharedValues.presetSlug);
    }

    if (sharedValues.isAdvancedMode) {
      setIsAdvancedMode(true);
    }
  }, []);

  const selectedPreset = useMemo(
    () => presets.find((item) => item.slug === selectedPresetSlug),
    [presets, selectedPresetSlug]
  );

  const { errors, parsedValues, parsedAdvancedValues, result } = useMemo(() => {
    const nextErrors: FieldError = {};
    const parsed = {
      watts: parseInputValue(values.watts),
      hoursPerDay: parseInputValue(values.hoursPerDay),
      daysPerMonth: parseInputValue(values.daysPerMonth),
      pricePerKwh: parseInputValue(values.pricePerKwh)
    };
    const parsedAdvanced = {
      standbyWatts: parseInputValue(advancedValues.standbyWatts),
      seasonalMonths: parseInputValue(advancedValues.seasonalMonths),
      dayPricePerKwh: parseInputValue(advancedValues.dayPricePerKwh),
      nightPricePerKwh: parseInputValue(advancedValues.nightPricePerKwh),
      dayUsagePercent: parseInputValue(advancedValues.dayUsagePercent),
      efficiencyPercent: parseInputValue(advancedValues.efficiencyPercent),
      quantity: parseInputValue(advancedValues.quantity)
    };

    if (parsed.watts === null) {
      nextErrors.watts = "Introdu puterea aparatului.";
    } else if (parsed.watts < 0) {
      nextErrors.watts = "Puterea nu poate fi negativa.";
    }

    if (parsed.hoursPerDay === null) {
      nextErrors.hoursPerDay = "Introdu cate ore il folosesti pe zi.";
    } else if (parsed.hoursPerDay < 0) {
      nextErrors.hoursPerDay = "Orele nu pot fi negative.";
    } else if (parsed.hoursPerDay > 24) {
      nextErrors.hoursPerDay = "O zi are maximum 24 de ore.";
    }

    if (parsed.daysPerMonth === null) {
      nextErrors.daysPerMonth = "Introdu numarul de zile pe luna.";
    } else if (parsed.daysPerMonth < 0) {
      nextErrors.daysPerMonth = "Zilele nu pot fi negative.";
    } else if (parsed.daysPerMonth > 31) {
      nextErrors.daysPerMonth = "O luna are maximum 31 de zile.";
    }

    if (parsed.pricePerKwh === null) {
      nextErrors.pricePerKwh = "Introdu pretul energiei.";
    } else if (parsed.pricePerKwh < 0) {
      nextErrors.pricePerKwh = "Pretul nu poate fi negativ.";
    }

    if (isAdvancedMode) {
      if (parsedAdvanced.standbyWatts === null) {
        nextErrors.standbyWatts = "Introdu consumul stand-by sau 0.";
      } else if (parsedAdvanced.standbyWatts < 0) {
        nextErrors.standbyWatts = "Stand-by nu poate fi negativ.";
      }

      if (parsedAdvanced.seasonalMonths === null) {
        nextErrors.seasonalMonths = "Introdu cate luni pe an folosesti aparatul.";
      } else if (parsedAdvanced.seasonalMonths < 0 || parsedAdvanced.seasonalMonths > 12) {
        nextErrors.seasonalMonths = "Alege o valoare intre 0 si 12 luni.";
      }

      if (parsedAdvanced.dayPricePerKwh === null) {
        nextErrors.dayPricePerKwh = "Introdu tariful de zi.";
      } else if (parsedAdvanced.dayPricePerKwh < 0) {
        nextErrors.dayPricePerKwh = "Tariful de zi nu poate fi negativ.";
      }

      if (parsedAdvanced.nightPricePerKwh === null) {
        nextErrors.nightPricePerKwh = "Introdu tariful de noapte.";
      } else if (parsedAdvanced.nightPricePerKwh < 0) {
        nextErrors.nightPricePerKwh = "Tariful de noapte nu poate fi negativ.";
      }

      if (parsedAdvanced.dayUsagePercent === null) {
        nextErrors.dayUsagePercent = "Introdu cat la suta folosesti ziua.";
      } else if (parsedAdvanced.dayUsagePercent < 0 || parsedAdvanced.dayUsagePercent > 100) {
        nextErrors.dayUsagePercent = "Procentul trebuie sa fie intre 0 si 100.";
      }

      if (parsedAdvanced.efficiencyPercent === null) {
        nextErrors.efficiencyPercent = "Introdu eficienta estimata.";
      } else if (
        parsedAdvanced.efficiencyPercent < 10 ||
        parsedAdvanced.efficiencyPercent > 200
      ) {
        nextErrors.efficiencyPercent = "Foloseste o valoare intre 10% si 200%.";
      }

      if (parsedAdvanced.quantity === null) {
        nextErrors.quantity = "Introdu numarul de aparate.";
      } else if (parsedAdvanced.quantity < 1) {
        nextErrors.quantity = "Trebuie sa fie cel putin 1 aparat.";
      }
    }

    const hasErrors = Object.keys(nextErrors).length > 0;

    const validInput =
      hasErrors ||
      parsed.watts === null ||
      parsed.hoursPerDay === null ||
      parsed.daysPerMonth === null ||
      parsed.pricePerKwh === null
        ? null
        : {
            watts: parsed.watts,
            hoursPerDay: parsed.hoursPerDay,
            daysPerMonth: parsed.daysPerMonth,
            pricePerKwh: parsed.pricePerKwh
          };

    return {
      errors: nextErrors,
      parsedValues: parsed,
      parsedAdvancedValues: parsedAdvanced,
      result: validInput
        ? isAdvancedMode
          ? calculateAdvancedEnergyCost(validInput, {
              standbyWatts: parsedAdvanced.standbyWatts ?? 0,
              seasonalMonths: parsedAdvanced.seasonalMonths ?? 12,
              dayPricePerKwh: parsedAdvanced.dayPricePerKwh ?? validInput.pricePerKwh,
              nightPricePerKwh: parsedAdvanced.nightPricePerKwh ?? validInput.pricePerKwh,
              dayUsagePercent: parsedAdvanced.dayUsagePercent ?? 100,
              efficiencyPercent: parsedAdvanced.efficiencyPercent ?? 100,
              quantity: parsedAdvanced.quantity ?? 1
            })
          : calculateEnergyCost(validInput)
        : null
    };
  }, [advancedValues, isAdvancedMode, values]);

  const hasErrors = Object.keys(errors).length > 0;
  const shareMessage = result
    ? `Am calculat ca acest aparat consuma aproximativ ${formatNumber(
        result.monthlyKwh
      )} kWh/luna si costa aproximativ ${formatCurrency(result.monthlyCost)}/luna.`
    : "";

  async function copyShareLink() {
    if (!result) {
      setShareStatus("Completeaza valorile corect pentru a crea linkul.");
      return;
    }

    const url = createShareUrl({
      values,
      advancedValues,
      selectedPresetSlug,
      isAdvancedMode
    });

    try {
      await copyToClipboard(url);
      setShareStatus("Linkul cu valorile tale a fost copiat.");
    } catch {
      setShareStatus("Nu am putut copia linkul. Incearca din nou.");
    }
  }

  async function copyResultText() {
    if (!result) {
      setShareStatus("Completeaza valorile corect pentru a copia rezultatul.");
      return;
    }

    try {
      await copyToClipboard(shareMessage);
      setShareStatus("Rezultatul a fost copiat.");
    } catch {
      setShareStatus("Nu am putut copia rezultatul. Incearca din nou.");
    }
  }

  async function shareResult() {
    if (!result) {
      setShareStatus("Completeaza valorile corect pentru distribuire.");
      return;
    }

    const url = createShareUrl({
      values,
      advancedValues,
      selectedPresetSlug,
      isAdvancedMode
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Calculator consum electric",
          text: shareMessage,
          url
        });
        setShareStatus("Rezultatul este gata de distribuit.");
        return;
      } catch {
        return;
      }
    }

    try {
      await copyToClipboard(`${shareMessage}\n${url}`);
      setShareStatus("Textul si linkul au fost copiate.");
    } catch {
      setShareStatus("Nu am putut copia textul. Incearca din nou.");
    }
  }

  function updateValue(key: keyof CalculatorState, value: string) {
    setValues((current) => ({
      ...current,
      [key]: value
    }));

    if (key === "hoursPerDay" || key === "pricePerKwh") {
      setLiveResultKey((current) => current + 1);
    }
  }

  function updateAdvancedValue(key: keyof AdvancedState, value: string) {
    setAdvancedValues((current) => ({
      ...current,
      [key]: value
    }));
  }

  function applyPreset(slug: string) {
    const preset = presets.find((item) => item.slug === slug);

    if (!preset) {
      setSelectedPresetSlug("");
      return;
    }

    setSelectedPresetSlug(slug);
    setValues((current) => ({
      ...current,
      watts: String(preset.watts),
      hoursPerDay: String(preset.hoursPerDay).replace(".", ",")
    }));
  }

  return (
    <section
      id="calculator"
      aria-label="Calculator consum electric"
      className="rounded-lg border border-emerald-100 bg-white p-4 shadow-soft sm:p-6"
    >
      <div className="flex flex-col gap-2 border-b border-emerald-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Calculator
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">
            Afla consumul si costul
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Modifica valorile si vezi instant estimarea pentru aparatul tau.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          <Bolt size={17} aria-hidden="true" />
          Calcul instant
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="rounded-lg border border-emerald-100 bg-emerald-50/55 p-3">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">
              Alege un aparat popular
            </span>
            <select
              className="h-12 rounded-lg border border-slate-200 bg-white px-3 text-base text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
              value={selectedPresetSlug}
              onChange={(event) => applyPreset(event.target.value)}
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

        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField
            icon={Gauge}
            label="Puterea aparatului"
            suffix="W"
            hint="Exemplu: 1000 pentru un aparat de 1000 W"
            value={values.watts}
            error={errors.watts}
            onChange={(value) => updateValue("watts", value)}
          />
          <NumberField
            icon={Clock}
            label="Ore utilizare pe zi"
            suffix="h"
            hint="Poate fi si cu virgula, de exemplu 1,5"
            value={values.hoursPerDay}
            error={errors.hoursPerDay}
            onChange={(value) => updateValue("hoursPerDay", value)}
          />
          <NumberField
            icon={CalendarDays}
            label="Zile utilizare pe luna"
            suffix="zile"
            hint="Alege cate zile folosesti aparatul intr-o luna"
            value={values.daysPerMonth}
            error={errors.daysPerMonth}
            onChange={(value) => updateValue("daysPerMonth", value)}
          />
          <NumberField
            icon={WalletCards}
            label="Pret kWh"
            suffix="lei/kWh"
            hint="Gasesti valoarea in factura de energie"
            value={values.pricePerKwh}
            error={errors.pricePerKwh}
            onChange={(value) => updateValue("pricePerKwh", value)}
          />
        </div>
      </div>

      {hasErrors ? (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Completeaza campurile marcate ca sa vezi calculul corect. Valorile nu
          pot fi negative.
        </div>
      ) : null}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <ResultTile
          label="Consum zilnic"
          costLabel="Cost zilnic"
          cost={result ? formatCurrency(result.dailyCost) : "—"}
          consumption={result ? `${formatNumber(result.dailyKwh)} kWh` : "—"}
        />
        <ResultTile
          label="Consum lunar"
          costLabel="Cost lunar"
          cost={result ? formatCurrency(result.monthlyCost) : "—"}
          consumption={result ? `${formatNumber(result.monthlyKwh)} kWh` : "—"}
          highlighted
        />
        <ResultTile
          label="Consum anual"
          costLabel="Cost anual"
          cost={result ? formatCurrency(result.yearlyCost) : "—"}
          consumption={result ? `${formatNumber(result.yearlyKwh)} kWh` : "—"}
        />
      </div>

      <ShareResultsPanel
        canShare={result !== null}
        message={shareMessage}
        status={shareStatus}
        onCopyLink={copyShareLink}
        onCopyText={copyResultText}
        onShare={shareResult}
      />

      <LiveCostPanel
        hoursValue={values.hoursPerDay}
        priceValue={values.pricePerKwh}
        monthlyCost={result?.monthlyCost ?? null}
        liveResultKey={liveResultKey}
        onHoursChange={(value) => updateValue("hoursPerDay", value)}
        onPriceChange={(value) => updateValue("pricePerKwh", value)}
      />

      <AdvancedModePanel
        values={advancedValues}
        errors={errors}
        isOpen={isAdvancedMode}
        weightedPrice={
          isAdvancedMode
            ? getWeightedPrice({
                dayPricePerKwh: parsedAdvancedValues.dayPricePerKwh ?? 0,
                nightPricePerKwh: parsedAdvancedValues.nightPricePerKwh ?? 0,
                dayUsagePercent: parsedAdvancedValues.dayUsagePercent ?? 0
              })
            : null
        }
        onToggle={() => setIsAdvancedMode((current) => !current)}
        onChange={updateAdvancedValue}
      />

      <div className="mt-5 grid gap-3">
        <ExpandableTool
          title="Recomandari de economisire"
          description="Vezi rapid ce se schimba daca reduci utilizarea sau alegi un aparat mai eficient."
        >
          <SavingsRecommendations
            watts={parsedValues.watts}
            hoursPerDay={parsedValues.hoursPerDay}
            daysPerMonth={parsedValues.daysPerMonth}
            pricePerKwh={parsedValues.pricePerKwh}
            result={result}
          />
        </ExpandableTool>

        <ExpandableTool
          title="Grafic consum si cost"
          description="Deschide graficul cand vrei sa compari estimarea pe zi, luna si an."
        >
          <EnergyChart result={result} />
        </ExpandableTool>

        <ExpandableTool
          title="Compara doua aparate"
          description="Alege doua aparate si vezi diferenta lunara si anuala."
        >
          <ComparisonTool
            presets={presets}
            daysPerMonth={parsedValues.daysPerMonth ?? 30}
            pricePerKwh={parsedValues.pricePerKwh ?? 1.3}
          />
        </ExpandableTool>
      </div>

      <div className="mt-5 rounded-lg border border-dashed border-emerald-200 bg-emerald-50/70 p-4 text-sm leading-6 text-emerald-950">
        Pentru luna folosim formula{" "}
        <strong>W / 1000 × ore pe zi × zile pe luna</strong>. Pentru zi folosim
        o singura zi, iar pentru an estimam 365 de zile la acelasi ritm.
        {isAdvancedMode ? (
          <span>
            {" "}
            In modul avansat includem stand-by, tarif zi/noapte, eficienta
            estimata, sezonalitate si numarul de aparate.
          </span>
        ) : null}
        {result ? (
          <span>
            {" "}
            In acest moment, calculul foloseste {formatNumber(parsedValues.watts ?? 0, 0)} W
            si {formatNumber(parsedValues.pricePerKwh ?? 0)} lei/kWh.
          </span>
        ) : null}
      </div>
    </section>
  );
}

type SavingsRecommendationsProps = {
  watts: number | null;
  hoursPerDay: number | null;
  daysPerMonth: number | null;
  pricePerKwh: number | null;
  result: ReturnType<typeof calculateEnergyCost> | null;
};

type ExpandableToolProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function ExpandableTool({ title, description, children }: ExpandableToolProps) {
  return (
    <details className="group rounded-lg border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-4 py-4 transition hover:bg-slate-50">
        <span>
          <span className="block text-base font-semibold text-slate-950">
            {title}
          </span>
          <span className="mt-1 block text-sm leading-6 text-slate-600">
            {description}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          <span className="group-open:hidden">Arata</span>
          <span className="hidden group-open:inline">Ascunde</span>
          <ChevronDown
            className="transition group-open:rotate-180"
            size={16}
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-slate-100 p-4 pt-0">{children}</div>
    </details>
  );
}

type ShareResultsPanelProps = {
  canShare: boolean;
  message: string;
  status: string | null;
  onCopyLink: () => void;
  onCopyText: () => void;
  onShare: () => void;
};

function ShareResultsPanel({
  canShare,
  message,
  status,
  onCopyLink,
  onCopyText,
  onShare
}: ShareResultsPanelProps) {
  return (
    <section className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50/60 p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-emerald-800">
            Salveaza sau trimite rezultatul
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Copiaza un link cu valorile introduse sau trimite estimarea catre
            cineva.
          </p>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:min-w-[28rem] xl:max-w-[32rem]">
          <ActionButton
            icon={LinkIcon}
            label="Copiaza link"
            disabled={!canShare}
            onClick={onCopyLink}
          />
          <ActionButton
            icon={Copy}
            label="Copiaza rezultat"
            disabled={!canShare}
            onClick={onCopyText}
          />
          <ActionButton
            icon={Share2}
            label="Distribuie"
            disabled={!canShare}
            onClick={onShare}
          />
        </div>
      </div>

      {message ? (
        <p className="mt-3 rounded-lg bg-white p-3 text-sm leading-6 text-slate-700">
          {message}
        </p>
      ) : null}

      <p
        className="mt-3 flex min-h-5 items-center gap-2 text-sm font-medium text-emerald-800"
        aria-live="polite"
      >
        {status ? (
          <>
            <Check size={16} aria-hidden="true" />
            {status}
          </>
        ) : (
          <span className="text-slate-500">
            Linkul share-uit pastreaza puterea, orele, zilele si pretul kWh.
          </span>
        )}
      </p>
    </section>
  );
}

type ActionButtonProps = {
  icon: typeof LinkIcon;
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function ActionButton({
  icon: Icon,
  label,
  disabled = false,
  onClick
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 text-sm font-semibold text-emerald-900 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size={17} aria-hidden="true" />
      {label}
    </button>
  );
}

function SavingsRecommendations({
  watts,
  hoursPerDay,
  daysPerMonth,
  pricePerKwh,
  result
}: SavingsRecommendationsProps) {
  if (
    !result ||
    watts === null ||
    hoursPerDay === null ||
    daysPerMonth === null ||
    pricePerKwh === null ||
    watts < 0 ||
    hoursPerDay < 0 ||
    daysPerMonth < 0 ||
    pricePerKwh < 0
  ) {
    return (
      <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-4 sm:p-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Recomandari de economisire
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Completeaza valori valide ca sa vezi sugestii calculate pentru aparatul tau.
        </p>
      </section>
    );
  }

  const oneHourSaving = calculateReducedHoursSaving({
    watts,
    hoursPerDay,
    pricePerKwh,
    reducedHours: 1
  });
  const twoHourSaving = calculateReducedHoursSaving({
    watts,
    hoursPerDay,
    pricePerKwh,
    reducedHours: 2
  });
  const efficientYearlySaving = result.yearlyCost * 0.2;
  const halfMonthCost = calculateEnergyCost({
    watts,
    hoursPerDay,
    daysPerMonth: Math.min(15, daysPerMonth),
    pricePerKwh
  }).monthlyCost;
  const halfMonthSaving = Math.max(result.monthlyCost - halfMonthCost, 0);

  const recommendations = [
    {
      title: "Reduci folosirea cu 1 ora pe zi",
      value: formatCurrency(oneHourSaving),
      detail: "economisire estimata pe an"
    },
    {
      title: "Reduci folosirea cu 2 ore pe zi",
      value: formatCurrency(twoHourSaving),
      detail: "economisire estimata pe an"
    },
    {
      title: "Aparatul consuma cu 20% mai putin",
      value: formatCurrency(efficientYearlySaving),
      detail: "economisire estimata pe an"
    },
    {
      title: "Il folosesti 15 zile/luna",
      value: formatCurrency(halfMonthSaving),
      detail: "economisire estimata pe luna fata de ritmul introdus"
    }
  ];

  return (
    <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Recomandari de economisire
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Ce se schimba daca folosesti aparatul mai eficient
          </h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {recommendations.map((item) => (
          <article
            key={item.title}
            className="rounded-lg border border-emerald-100 bg-emerald-50/55 p-4"
          >
            <h4 className="text-base font-semibold text-slate-950">{item.title}</h4>
            <p className="mt-3 text-2xl font-semibold text-emerald-800">
              {item.value}
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 rounded-lg border border-dashed border-emerald-200 bg-white p-3 text-sm leading-6 text-slate-600">
        Valorile sunt estimative. Economia reala depinde de modelul aparatului,
        setari, pretul exact din contract si modul in care il folosesti.
      </p>
    </section>
  );
}

function calculateReducedHoursSaving({
  watts,
  hoursPerDay,
  pricePerKwh,
  reducedHours
}: {
  watts: number;
  hoursPerDay: number;
  pricePerKwh: number;
  reducedHours: number;
}) {
  const savedHoursPerDay = Math.min(reducedHours, hoursPerDay);
  return (watts / 1000) * savedHoursPerDay * 365 * pricePerKwh;
}

type LiveCostPanelProps = {
  hoursValue: string;
  priceValue: string;
  monthlyCost: number | null;
  liveResultKey: number;
  onHoursChange: (value: string) => void;
  onPriceChange: (value: string) => void;
};

function LiveCostPanel({
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

type AdvancedModePanelProps = {
  values: AdvancedState;
  errors: FieldError;
  isOpen: boolean;
  weightedPrice: number | null;
  onToggle: () => void;
  onChange: (key: keyof AdvancedState, value: string) => void;
};

function AdvancedModePanel({
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

type ComparisonDevice = {
  name: string;
  presetSlug: string;
  watts: string;
  hoursPerDay: string;
};

type ComparisonToolProps = {
  presets: AppliancePreset[];
  daysPerMonth: number;
  pricePerKwh: number;
};

function ComparisonTool({
  presets,
  daysPerMonth,
  pricePerKwh
}: ComparisonToolProps) {
  const [firstDevice, setFirstDevice] = useState<ComparisonDevice>(() =>
    createComparisonDevice(
      presets.find((preset) => preset.slug === "calorifer-electric") ?? presets[0]
    )
  );
  const [secondDevice, setSecondDevice] = useState<ComparisonDevice>(() =>
    createComparisonDevice(
      presets.find((preset) => preset.slug === "aer-conditionat") ?? presets[1] ?? presets[0]
    )
  );

  const firstResult = getComparisonResult(firstDevice, daysPerMonth, pricePerKwh);
  const secondResult = getComparisonResult(secondDevice, daysPerMonth, pricePerKwh);
  const canCompare = firstResult !== null && secondResult !== null;
  const differenceMonthly = canCompare
    ? Math.abs(firstResult.monthlyCost - secondResult.monthlyCost)
    : 0;
  const differenceYearly = differenceMonthly * 12;
  const firstIsCheaper = canCompare
    ? firstResult.monthlyCost <= secondResult.monthlyCost
    : false;
  const expensiveDevice = canCompare
    ? firstIsCheaper
      ? secondDevice.name
      : firstDevice.name
    : "";
  const efficientDevice = canCompare
    ? firstIsCheaper
      ? firstDevice.name
      : secondDevice.name
    : "";

  function applyComparisonPreset(side: "first" | "second", slug: string) {
    const preset = presets.find((item) => item.slug === slug);

    if (!preset) {
      const clearPreset = (current: ComparisonDevice): ComparisonDevice => ({
        ...current,
        presetSlug: ""
      });

      if (side === "first") {
        setFirstDevice(clearPreset);
      } else {
        setSecondDevice(clearPreset);
      }
      return;
    }

    const nextDevice = createComparisonDevice(preset);
    if (side === "first") {
      setFirstDevice(nextDevice);
    } else {
      setSecondDevice(nextDevice);
    }
  }

  function updateComparisonDevice(
    side: "first" | "second",
    key: keyof ComparisonDevice,
    value: string
  ) {
    const update = (current: ComparisonDevice): ComparisonDevice => ({
      ...current,
      presetSlug: key === "presetSlug" ? value : "",
      [key]: value
    });

    if (side === "first") {
      setFirstDevice(update);
    } else {
      setSecondDevice(update);
    }
  }

  return (
    <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
            <Scale size={16} aria-hidden="true" />
            Compara doua aparate
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Vezi care te costa mai putin
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Alege doua preset-uri sau scrie manual puterea si orele de utilizare.
            Comparatia foloseste zilele pe luna si pretul kWh din calculatorul
            principal.
          </p>
        </div>
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          {formatNumber(daysPerMonth, 0)} zile • {formatNumber(pricePerKwh)} lei/kWh
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <ComparisonCard
          title="Aparatul A"
          device={firstDevice}
          presets={presets}
          result={firstResult}
          isEfficient={canCompare && firstIsCheaper}
          onPresetChange={(slug) => applyComparisonPreset("first", slug)}
          onChange={(key, value) => updateComparisonDevice("first", key, value)}
        />
        <ComparisonCard
          title="Aparatul B"
          device={secondDevice}
          presets={presets}
          result={secondResult}
          isEfficient={canCompare && !firstIsCheaper}
          onPresetChange={(slug) => applyComparisonPreset("second", slug)}
          onChange={(key, value) => updateComparisonDevice("second", key, value)}
        />
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
        {canCompare ? (
          <>
            <p className="text-sm font-medium text-slate-600">Diferenta estimata</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Lunar
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">
                  {formatCurrency(differenceMonthly)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Anual
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">
                  {formatCurrency(differenceYearly)}
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-white p-3 text-base font-semibold leading-7 text-slate-950">
              {expensiveDevice} te costa cu {formatCurrency(differenceMonthly)} mai mult
              pe luna. Varianta mai eficienta este {efficientDevice}.
            </p>
          </>
        ) : (
          <p className="text-sm leading-6 text-slate-600">
            Completeaza valori pozitive pentru ambele aparate ca sa vezi
            diferenta de cost.
          </p>
        )}
      </div>
    </section>
  );
}

type ComparisonCardProps = {
  title: string;
  device: ComparisonDevice;
  presets: AppliancePreset[];
  result: EnergyComparisonResult | null;
  isEfficient: boolean;
  onPresetChange: (slug: string) => void;
  onChange: (key: keyof ComparisonDevice, value: string) => void;
};

function ComparisonCard({
  title,
  device,
  presets,
  result,
  isEfficient,
  onPresetChange,
  onChange
}: ComparisonCardProps) {
  return (
    <article
      className={
        isEfficient
          ? "rounded-lg border border-emerald-300 bg-emerald-50 p-4"
          : "rounded-lg border border-slate-200 bg-white p-4"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-semibold text-slate-950">{title}</h4>
        {isEfficient ? (
          <span className="rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
            Mai eficient
          </span>
        ) : null}
      </div>

      <label className="mt-4 grid gap-2">
        <span className="text-sm font-medium text-slate-700">Preset aparat</span>
        <select
          className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
          value={device.presetSlug}
          onChange={(event) => onPresetChange(event.target.value)}
        >
          <option value="">Valori manuale</option>
          {presets.map((preset) => (
            <option key={preset.slug} value={preset.slug}>
              {preset.name}
            </option>
          ))}
        </select>
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Nume</span>
          <input
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
            value={device.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Putere</span>
          <div className="flex items-center gap-2">
            <input
              className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
              inputMode="decimal"
              value={device.watts}
              onChange={(event) => onChange("watts", event.target.value)}
            />
            <span className="text-sm font-medium text-slate-500">W</span>
          </div>
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Ore de utilizare pe zi
          </span>
          <div className="flex items-center gap-2">
            <input
              className="h-11 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
              inputMode="decimal"
              value={device.hoursPerDay}
              onChange={(event) => onChange("hoursPerDay", event.target.value)}
            />
            <span className="text-sm font-medium text-slate-500">h/zi</span>
          </div>
        </label>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-3">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Consum lunar
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-950">
            {result ? `${formatNumber(result.monthlyKwh)} kWh` : "—"}
          </p>
        </div>
        <div className="rounded-lg bg-white p-3">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Cost lunar
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-950">
            {result ? formatCurrency(result.monthlyCost) : "—"}
          </p>
        </div>
      </div>
    </article>
  );
}

type EnergyComparisonResult = {
  monthlyKwh: number;
  monthlyCost: number;
};

function createComparisonDevice(preset: AppliancePreset): ComparisonDevice {
  return {
    name: preset.name,
    presetSlug: preset.slug,
    watts: String(preset.watts),
    hoursPerDay: String(preset.hoursPerDay).replace(".", ",")
  };
}

function getComparisonResult(
  device: ComparisonDevice,
  daysPerMonth: number,
  pricePerKwh: number
): EnergyComparisonResult | null {
  const watts = parseInputValue(device.watts);
  const hoursPerDay = parseInputValue(device.hoursPerDay);

  if (
    watts === null ||
    hoursPerDay === null ||
    watts < 0 ||
    hoursPerDay < 0 ||
    daysPerMonth < 0 ||
    pricePerKwh < 0
  ) {
    return null;
  }

  const monthlyKwh = (watts / 1000) * hoursPerDay * daysPerMonth;

  return {
    monthlyKwh,
    monthlyCost: monthlyKwh * pricePerKwh
  };
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

function parseInputValue(value: string) {
  const normalizedValue = value.trim().replace(",", ".");

  if (!normalizedValue) {
    return null;
  }

  const parsed = Number(normalizedValue);
  return Number.isFinite(parsed) ? parsed : null;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatSliderValue(value: number) {
  return String(Number(value.toFixed(2))).replace(".", ",");
}

type ShareUrlInput = {
  values: CalculatorState;
  advancedValues: AdvancedState;
  selectedPresetSlug: string;
  isAdvancedMode: boolean;
};

function createShareUrl({
  values,
  advancedValues,
  selectedPresetSlug,
  isAdvancedMode
}: ShareUrlInput) {
  const url = new URL(window.location.href);

  url.hash = "calculator";
  url.searchParams.set("w", values.watts);
  url.searchParams.set("ore", values.hoursPerDay);
  url.searchParams.set("zile", values.daysPerMonth);
  url.searchParams.set("pret", values.pricePerKwh);

  if (selectedPresetSlug) {
    url.searchParams.set("aparat", selectedPresetSlug);
  } else {
    url.searchParams.delete("aparat");
  }

  if (isAdvancedMode) {
    url.searchParams.set("mod", "avansat");
    url.searchParams.set("standby", advancedValues.standbyWatts);
    url.searchParams.set("luni", advancedValues.seasonalMonths);
    url.searchParams.set("tarifZi", advancedValues.dayPricePerKwh);
    url.searchParams.set("tarifNoapte", advancedValues.nightPricePerKwh);
    url.searchParams.set("utilizareZi", advancedValues.dayUsagePercent);
    url.searchParams.set("eficienta", advancedValues.efficiencyPercent);
    url.searchParams.set("numar", advancedValues.quantity);
  } else {
    [
      "mod",
      "standby",
      "luni",
      "tarifZi",
      "tarifNoapte",
      "utilizareZi",
      "eficienta",
      "numar"
    ].forEach((key) => url.searchParams.delete(key));
  }

  return url.toString();
}

function getValuesFromUrl(searchParams: URLSearchParams) {
  const values: Partial<CalculatorState> = {};
  const advancedValues: Partial<AdvancedState> = {};
  const watts = searchParams.get("w");
  const hoursPerDay = searchParams.get("ore");
  const daysPerMonth = searchParams.get("zile");
  const pricePerKwh = searchParams.get("pret");
  const presetSlug = searchParams.get("aparat") ?? "";

  if (watts) values.watts = watts;
  if (hoursPerDay) values.hoursPerDay = hoursPerDay;
  if (daysPerMonth) values.daysPerMonth = daysPerMonth;
  if (pricePerKwh) values.pricePerKwh = pricePerKwh;

  const advancedMap: Array<[keyof AdvancedState, string]> = [
    ["standbyWatts", "standby"],
    ["seasonalMonths", "luni"],
    ["dayPricePerKwh", "tarifZi"],
    ["nightPricePerKwh", "tarifNoapte"],
    ["dayUsagePercent", "utilizareZi"],
    ["efficiencyPercent", "eficienta"],
    ["quantity", "numar"]
  ];

  advancedMap.forEach(([stateKey, paramKey]) => {
    const value = searchParams.get(paramKey);
    if (value) {
      advancedValues[stateKey] = value;
    }
  });

  return {
    values: Object.keys(values).length > 0 ? values : null,
    advancedValues: Object.keys(advancedValues).length > 0 ? advancedValues : null,
    presetSlug,
    isAdvancedMode: searchParams.get("mod") === "avansat"
  };
}

async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

type ValidCalculatorInput = {
  watts: number;
  hoursPerDay: number;
  daysPerMonth: number;
  pricePerKwh: number;
};

type ValidAdvancedInput = {
  standbyWatts: number;
  seasonalMonths: number;
  dayPricePerKwh: number;
  nightPricePerKwh: number;
  dayUsagePercent: number;
  efficiencyPercent: number;
  quantity: number;
};

function calculateAdvancedEnergyCost(
  input: ValidCalculatorInput,
  advanced: ValidAdvancedInput
) {
  const weightedPrice = getWeightedPrice(advanced);
  const efficiencyFactor = advanced.efficiencyPercent / 100;
  const quantity = advanced.quantity;
  const activeDailyKwh =
    ((input.watts * input.hoursPerDay) / 1000) * efficiencyFactor * quantity;
  const standbyHours = Math.max(24 - input.hoursPerDay, 0);
  const standbyDailyKwh = (advanced.standbyWatts * standbyHours * quantity) / 1000;
  const dailyKwh = activeDailyKwh + standbyDailyKwh;
  const monthlyKwh = dailyKwh * input.daysPerMonth;
  const yearlyKwh = monthlyKwh * advanced.seasonalMonths;

  return {
    dailyKwh,
    monthlyKwh,
    yearlyKwh,
    dailyCost: dailyKwh * weightedPrice,
    monthlyCost: monthlyKwh * weightedPrice,
    yearlyCost: yearlyKwh * weightedPrice
  };
}

function getWeightedPrice({
  dayPricePerKwh,
  nightPricePerKwh,
  dayUsagePercent
}: Pick<
  ValidAdvancedInput,
  "dayPricePerKwh" | "nightPricePerKwh" | "dayUsagePercent"
>) {
  const dayShare = clamp(dayUsagePercent, 0, 100) / 100;
  return dayPricePerKwh * dayShare + nightPricePerKwh * (1 - dayShare);
}


type NumberFieldProps = {
  icon: typeof Gauge;
  label: string;
  suffix: string;
  hint: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

function NumberField({
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

function ResultTile({
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
