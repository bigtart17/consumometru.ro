import { calculateEnergyCost, formatCurrency } from "@/lib/energy";
import { calculateReducedHoursSaving } from "@/lib/calculator";
import type { CalculatorResult } from "@/types/calculator";

type SavingsRecommendationsProps = {
  watts: number | null;
  hoursPerDay: number | null;
  daysPerMonth: number | null;
  pricePerKwh: number | null;
  result: CalculatorResult | null;
};

export function SavingsRecommendations({
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
