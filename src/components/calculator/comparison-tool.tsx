"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import {
  createComparisonDevice,
  getComparisonResult
} from "@/lib/calculator";
import { formatCurrency, formatNumber } from "@/lib/energy";
import type {
  ComparisonDevice,
  EnergyComparisonResult
} from "@/types/calculator";
import type { AppliancePreset } from "@/types/energy";

type ComparisonToolProps = {
  presets: AppliancePreset[];
  daysPerMonth: number;
  pricePerKwh: number;
};

export function ComparisonTool({
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

      <div className="mt-5 grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
          ? "min-w-0 overflow-hidden rounded-lg border border-emerald-300 bg-emerald-50 p-4"
          : "min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white p-4"
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

      <label className="mt-4 grid min-w-0 gap-2">
        <span className="text-sm font-medium text-slate-700">Preset aparat</span>
        <select
          className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
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

      <div className="mt-3 grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_minmax(8rem,0.62fr)]">
        <label className="grid min-w-0 gap-2">
          <span className="text-sm font-medium text-slate-700">Nume</span>
          <input
            className="h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
            value={device.name}
            onChange={(event) => onChange("name", event.target.value)}
          />
        </label>
        <label className="grid min-w-0 gap-2">
          <span className="text-sm font-medium text-slate-700">Putere</span>
          <div className="flex min-w-0 items-center gap-2">
            <input
              className="h-11 w-full min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
              inputMode="decimal"
              value={device.watts}
              onChange={(event) => onChange("watts", event.target.value)}
            />
            <span className="text-sm font-medium text-slate-500">W</span>
          </div>
        </label>
        <label className="grid min-w-0 gap-2 md:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Ore de utilizare pe zi
          </span>
          <div className="flex min-w-0 items-center gap-2">
            <input
              className="h-11 w-full min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-950 outline-none ring-emerald-500 transition focus:ring-2"
              inputMode="decimal"
              value={device.hoursPerDay}
              onChange={(event) => onChange("hoursPerDay", event.target.value)}
            />
            <span className="text-sm font-medium text-slate-500">h/zi</span>
          </div>
        </label>
      </div>

      <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
        <div className="min-w-0 rounded-lg bg-white p-3">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Consum lunar
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-950">
            {result ? `${formatNumber(result.monthlyKwh)} kWh` : "—"}
          </p>
        </div>
        <div className="min-w-0 rounded-lg bg-white p-3">
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
