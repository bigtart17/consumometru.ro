import { ResultTile } from "@/components/calculator/calculator-fields";
import { formatCurrency, formatNumber } from "@/lib/energy";
import type { CalculatorResult } from "@/types/calculator";

type ResultsSummaryProps = {
  result: CalculatorResult | null;
};

export function ResultsSummary({ result }: ResultsSummaryProps) {
  return (
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
  );
}
