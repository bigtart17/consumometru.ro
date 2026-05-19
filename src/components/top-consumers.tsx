import { TrendingUp } from "lucide-react";
import { appliancePresets } from "@/data/appliancePresets";
import { calculateEnergyCost, formatCurrency, formatNumber } from "@/lib/energy";
import type { AppliancePreset } from "@/types/energy";

const estimatedPricePerKwh = 1.3;
const estimatedDaysPerMonth = 30;

const topConsumerNotes: Record<string, string> = {
  "boiler-electric":
    "Un boiler pornit zilnic poate deveni unul dintre cele mai scumpe aparate din casa.",
  "aer-conditionat":
    "Costul creste rapid vara daca este folosit multe ore si temperatura este setata foarte jos.",
  "uscator-rufe":
    "Un uscator clasic consuma mult pe ciclu; modelele cu pompa de caldura pot reduce costul.",
  "calorifer-electric":
    "Incalzirea electrica directa este comoda, dar poate avea impact mare pe factura.",
  "plita-electrica":
    "Consumul depinde mult de treapta folosita si de cat timp gatesti zilnic.",
  "cuptor-electric":
    "Preincalzirea si gatitul lung pot ridica vizibil costul lunar.",
  "masina-de-spalat":
    "Programele cu temperatura ridicata consuma mai mult decat cele eco sau la rece.",
  frigider:
    "Functioneaza permanent, asa ca eficienta energetica si temperatura setata conteaza mult.",
  "pc-gaming":
    "Un PC performant poate consuma serios in jocuri, mai ales cu placa video solicitata."
};

const topConsumerSlugs = [
  "boiler-electric",
  "aer-conditionat",
  "uscator-rufe",
  "calorifer-electric",
  "plita-electrica",
  "cuptor-electric",
  "masina-de-spalat",
  "frigider",
  "pc-gaming"
];

export function TopConsumers() {
  const items = topConsumerSlugs
    .map((slug) => appliancePresets.find((preset) => preset.slug === slug))
    .filter((preset): preset is AppliancePreset => Boolean(preset))
    .map((preset, index) => {
      const result = calculateEnergyCost({
        watts: preset.watts,
        hoursPerDay: preset.hoursPerDay,
        daysPerMonth: estimatedDaysPerMonth,
        pricePerKwh: estimatedPricePerKwh
      });

      return {
        ...preset,
        rank: index + 1,
        monthlyKwh: result.monthlyKwh,
        monthlyCost: result.monthlyCost,
        note: topConsumerNotes[preset.slug]
      };
    });

  return (
    <section id="top-consumatori" className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              <TrendingUp size={16} aria-hidden="true" />
              Top consumatori din casa
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Aparatele care pot ridica factura la energie
            </h2>
          </div>
          <p className="text-sm leading-6 text-slate-600 lg:text-right">
            Estimari orientative pentru 30 zile/luna si {formatCurrency(estimatedPricePerKwh)}
            /kWh. Valorile pot varia in functie de model, obiceiuri si setari.
          </p>
        </div>

        <div className="mt-7 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
          <div className="grid gap-0">
            {items.map((item) => (
              <article
                key={item.slug}
                className="grid gap-4 border-b border-emerald-50 p-4 last:border-b-0 md:grid-cols-[0.95fr_0.75fr_0.75fr_1.3fr] md:items-center"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-semibold text-emerald-800">
                    {item.rank}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.category}
                    </p>
                  </div>
                </div>

                <Metric label="Putere estimativa" value={`${item.watts} W`} />
                <Metric
                  label="Consum lunar"
                  value={`${formatNumber(item.monthlyKwh)} kWh`}
                />
                <div>
                  <Metric
                    label="Cost lunar estimativ"
                    value={formatCurrency(item.monthlyCost)}
                    strong
                  />
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type MetricProps = {
  label: string;
  value: string;
  strong?: boolean;
};

function Metric({ label, value, strong }: MetricProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p
        className={
          strong
            ? "mt-1 text-xl font-semibold text-emerald-800"
            : "mt-1 text-lg font-semibold text-slate-950"
        }
      >
        {value}
      </p>
    </div>
  );
}
