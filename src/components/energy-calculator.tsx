"use client";

import { useEffect, useMemo, useState } from "react";
import { Bolt } from "lucide-react";
import { AdvancedModePanel } from "@/components/calculator/advanced-mode-panel";
import { CalculatorForm } from "@/components/calculator/calculator-form";
import { ComparisonTool } from "@/components/calculator/comparison-tool";
import { ExpandableTool } from "@/components/calculator/expandable-tool";
import { LiveCostPanel } from "@/components/calculator/live-cost-panel";
import { ResultsSummary } from "@/components/calculator/results-summary";
import { SavingsRecommendations } from "@/components/calculator/savings-recommendations";
import { ShareResultsPanel } from "@/components/calculator/share-panel";
import {
  copyToClipboard,
  createShareUrl,
  defaultAdvancedState,
  defaultCalculatorState,
  getValuesFromUrl,
  getWeightedPrice,
  validateAndCalculateEnergy
} from "@/lib/calculator";
import { formatCurrency, formatNumber } from "@/lib/energy";
import type { AdvancedState, CalculatorState } from "@/types/calculator";
import type { AppliancePreset } from "@/types/energy";

type EnergyCalculatorProps = {
  presets: AppliancePreset[];
  initialValues?: Partial<CalculatorState>;
  initialPresetSlug?: string;
};

export function EnergyCalculator({
  presets,
  initialValues,
  initialPresetSlug = ""
}: EnergyCalculatorProps) {
  const [values, setValues] = useState<CalculatorState>({
    ...defaultCalculatorState,
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

  const { errors, parsedValues, parsedAdvancedValues, result } = useMemo(
    () =>
      validateAndCalculateEnergy({
        values,
        advancedValues,
        isAdvancedMode
      }),
    [advancedValues, isAdvancedMode, values]
  );

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

    const url = createCurrentShareUrl();

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

    const url = createCurrentShareUrl();

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

  function createCurrentShareUrl() {
    return createShareUrl({
      values,
      advancedValues,
      selectedPresetSlug,
      isAdvancedMode
    });
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
      <CalculatorHeader />

      <CalculatorForm
        values={values}
        errors={errors}
        presets={presets}
        selectedPresetSlug={selectedPresetSlug}
        selectedPreset={selectedPreset}
        onPresetSelect={applyPreset}
        onChange={updateValue}
      />

      {hasErrors ? (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Completeaza campurile marcate ca sa vezi calculul corect. Valorile nu
          pot fi negative.
        </div>
      ) : null}

      <ResultsSummary result={result} />

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

      <CalculatorMethodNote
        isAdvancedMode={isAdvancedMode}
        hasResult={Boolean(result)}
        watts={parsedValues.watts}
        pricePerKwh={parsedValues.pricePerKwh}
      />
    </section>
  );
}

function CalculatorHeader() {
  return (
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
  );
}

type CalculatorMethodNoteProps = {
  isAdvancedMode: boolean;
  hasResult: boolean;
  watts: number | null;
  pricePerKwh: number | null;
};

function CalculatorMethodNote({
  isAdvancedMode,
  hasResult,
  watts,
  pricePerKwh
}: CalculatorMethodNoteProps) {
  return (
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
      {hasResult ? (
        <span>
          {" "}
          In acest moment, calculul foloseste {formatNumber(watts ?? 0, 0)} W
          si {formatNumber(pricePerKwh ?? 0)} lei/kWh.
        </span>
      ) : null}
      <span>
        {" "}
        Vezi si{" "}
        <a className="font-semibold underline underline-offset-4" href="/metodologie">
          metodologia de calcul
        </a>{" "}
        sau{" "}
        <a className="font-semibold underline underline-offset-4" href="/surse">
          sursele valorilor orientative
        </a>
        .
      </span>
    </div>
  );
}
