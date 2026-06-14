import { formatCurrency, formatNumber } from "@/lib/energy";
import type { AnnualTopConsumer } from "@/types/annual-home-consumption";

type AnnualTopConsumersProps = {
  consumers: AnnualTopConsumer[];
};

export function AnnualTopConsumers({ consumers }: AnnualTopConsumersProps) {
  const topConsumers = consumers.slice(0, 5);

  return (
    <section
      aria-labelledby="annual-top-consumers-title"
      className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5"
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Top consumatori
      </p>
      <h2 id="annual-top-consumers-title" className="mt-2 text-2xl font-semibold text-slate-950">
        Aparatele care cântăresc cel mai mult anual
      </h2>

      {topConsumers.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {topConsumers.map((consumer) => (
            <article
              key={consumer.slug}
              className="rounded-lg border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-950">{consumer.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatNumber(consumer.annualKwh)} kWh/an
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-950">
                    {formatCurrency(consumer.annualCost)}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatNumber(consumer.percentOfTotal, 0)}% din total
                  </p>
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{ width: `${Math.min(consumer.percentOfTotal, 100)}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Nu există aparate active în calcul. Bifează cel puțin un aparat pentru
          a vedea topul consumatorilor.
        </p>
      )}
    </section>
  );
}
