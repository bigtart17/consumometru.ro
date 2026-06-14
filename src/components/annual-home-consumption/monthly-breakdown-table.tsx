import { formatCurrency, formatNumber } from "@/lib/energy";
import type { AnnualMonthlyBreakdown } from "@/types/annual-home-consumption";

type MonthlyBreakdownTableProps = {
  months: AnnualMonthlyBreakdown[];
};

export function MonthlyBreakdownTable({ months }: MonthlyBreakdownTableProps) {
  return (
    <section
      aria-labelledby="monthly-breakdown-title"
      className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Pe luni
        </p>
        <h2 id="monthly-breakdown-title" className="mt-2 text-2xl font-semibold text-slate-950">
          Consum și cost lunar
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tabelul arată cum se mută consumul pe parcursul anului, mai ales când
          apar răcirea vara, încălzirea iarna sau mai multe ore de iluminat.
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-slate-500">
              <th className="border-b border-slate-200 pb-3 pr-4 font-semibold">Luna</th>
              <th className="border-b border-slate-200 px-4 pb-3 font-semibold">
                Consum kWh
              </th>
              <th className="border-b border-slate-200 px-4 pb-3 font-semibold">
                Cost estimat
              </th>
            </tr>
          </thead>
          <tbody>
            {months.map((month) => (
              <tr key={month.month}>
                <th className="border-b border-slate-100 py-3 pr-4 font-semibold text-slate-900">
                  {month.label}
                </th>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-700">
                  {formatNumber(month.totalKwh)} kWh
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-slate-700">
                  {formatCurrency(month.totalCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
