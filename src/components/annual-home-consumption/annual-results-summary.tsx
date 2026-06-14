import { formatCurrency, formatNumber } from "@/lib/energy";
import type { AnnualCalculatorResult } from "@/types/annual-home-consumption";

type AnnualResultsSummaryProps = {
  result: AnnualCalculatorResult;
};

export function AnnualResultsSummary({ result }: AnnualResultsSummaryProps) {
  const items = [
    {
      label: "Consum anual total",
      value: `${formatNumber(result.summary.annualKwh)} kWh`,
      tone: "primary"
    },
    {
      label: "Cost anual total",
      value: formatCurrency(result.summary.annualCost),
      tone: "primary"
    },
    {
      label: "Consum mediu lunar",
      value: `${formatNumber(result.summary.averageMonthlyKwh)} kWh`
    },
    {
      label: "Cost mediu lunar",
      value: formatCurrency(result.summary.averageMonthlyCost)
    },
    {
      label: "Luna cu cel mai mare consum",
      value: result.summary.highestMonth.label
    },
    {
      label: "Luna cu cel mai mic consum",
      value: result.summary.lowestMonth.label
    }
  ];

  return (
    <section aria-labelledby="annual-results-title" className="grid gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Rezultate
        </p>
        <h2 id="annual-results-title" className="mt-2 text-3xl font-semibold text-slate-950">
          Estimarea pentru tot anul
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.label}
            className={
              item.tone === "primary"
                ? "rounded-lg bg-emerald-700 p-5 text-white shadow-sm"
                : "rounded-lg border border-emerald-100 bg-white p-5 text-slate-950 shadow-sm"
            }
          >
            <p
              className={
                item.tone === "primary"
                  ? "text-sm font-medium text-emerald-50"
                  : "text-sm font-medium text-slate-500"
              }
            >
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-semibold">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
