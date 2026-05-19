"use client";

import dynamic from "next/dynamic";
import type { EnergyResult } from "@/types/energy";

type EnergyChartProps = {
  result: EnergyResult | null;
};

const ResponsiveEnergyBars = dynamic(
  () => import("@/components/energy-chart-bars").then((mod) => mod.EnergyBars),
  {
    ssr: false,
    loading: () => (
      <div className="mt-5 h-72 w-full rounded-lg bg-slate-50 sm:h-80" />
    )
  }
);

type ChartRow = {
  label: string;
  consum: number;
  cost: number;
};

export function EnergyChart({ result }: EnergyChartProps) {
  const data: ChartRow[] = result
    ? [
        {
          label: "Zi",
          consum: result.dailyKwh,
          cost: result.dailyCost
        },
        {
          label: "Luna",
          consum: result.monthlyKwh,
          cost: result.monthlyCost
        },
        {
          label: "An",
          consum: result.yearlyKwh,
          cost: result.yearlyCost
        }
      ]
    : [];

  return (
    <section className="mt-6 rounded-lg border border-emerald-100 bg-white p-4 sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Grafic consum si cost
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-950">
            Evolutia estimarii
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Compara rapid consumul si costul estimat pe zi, luna si an.
          </p>
        </div>
      </div>

      {result ? (
        <ResponsiveEnergyBars data={data} />
      ) : (
        <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Completeaza valorile corect pentru a vedea graficul.
        </div>
      )}
    </section>
  );
}
