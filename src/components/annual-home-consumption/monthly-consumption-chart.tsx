import { formatCurrency, formatNumber } from "@/lib/energy";
import type { AnnualMonthlyBreakdown } from "@/types/annual-home-consumption";

type MonthlyConsumptionChartProps = {
  months: AnnualMonthlyBreakdown[];
};

const monthLabels = ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const chartWidth = 720;
const chartHeight = 260;
const padding = {
  top: 28,
  right: 28,
  bottom: 48,
  left: 48
};

export function MonthlyConsumptionChart({ months }: MonthlyConsumptionChartProps) {
  const validMonths = months.filter((month) => Number.isFinite(month.totalKwh));

  if (validMonths.length === 0 || validMonths.every((month) => month.totalKwh <= 0)) {
    return (
      <section className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-2xl font-semibold text-slate-950">
          Evoluția consumului pe luni
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Nu există suficiente date pentru afișarea graficului.
        </p>
      </section>
    );
  }

  const values = validMonths.map((month) => month.totalKwh);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  const highestMonth = validMonths.reduce((highest, month) =>
    month.totalKwh > highest.totalKwh ? month : highest
  );
  const lowestMonth = validMonths.reduce((lowest, month) =>
    month.totalKwh < lowest.totalKwh ? month : lowest
  );
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const points = validMonths.map((month, index) => {
    const x =
      padding.left +
      (validMonths.length === 1 ? innerWidth / 2 : (index / (validMonths.length - 1)) * innerWidth);
    const normalizedValue = (month.totalKwh - minValue) / valueRange;
    const y = padding.top + innerHeight - normalizedValue * innerHeight;

    return {
      month,
      x,
      y,
      label: monthLabels[index] ?? month.label.slice(0, 3)
    };
  });
  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + innerHeight} L ${points[0].x} ${padding.top + innerHeight} Z`;
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((ratio) => {
    const y = padding.top + innerHeight - ratio * innerHeight;
    const value = minValue + ratio * valueRange;

    return { y, value };
  });

  return (
    <section
      aria-labelledby="monthly-consumption-chart-title"
      className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Grafic lunar
        </p>
        <h2
          id="monthly-consumption-chart-title"
          className="mt-2 text-2xl font-semibold text-slate-950"
        >
          Evoluția consumului pe luni
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Estimare lunară bazată pe profilul locuinței și sezonalitate.
        </p>
      </div>

      <div className="mt-5 w-full overflow-hidden rounded-lg bg-slate-50 p-2 sm:p-4">
        <svg
          role="img"
          aria-label="Grafic cu estimarea consumului lunar în kWh"
          className="h-auto w-full"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <rect width={chartWidth} height={chartHeight} rx="16" fill="#f8fafc" />
          {gridLines.map((line) => (
            <g key={line.y}>
              <line
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={line.y}
                y2={line.y}
                stroke="#d1fae5"
                strokeDasharray="5 7"
              />
              <text
                x={padding.left - 10}
                y={line.y + 4}
                textAnchor="end"
                className="fill-slate-500 text-[11px]"
              >
                {formatNumber(line.value, 0)}
              </text>
            </g>
          ))}

          <path d={areaPath} fill="#10b981" opacity="0.12" />
          <path
            d={linePath}
            fill="none"
            stroke="#047857"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
          />

          {points.map((point) => {
            const isHighest = point.month.month === highestMonth.month;
            const isLowest = point.month.month === lowestMonth.month;
            const isHighlighted = isHighest || isLowest;

            return (
              <g key={point.month.month}>
                <line
                  x1={point.x}
                  x2={point.x}
                  y1={padding.top + innerHeight}
                  y2={padding.top + innerHeight + 6}
                  stroke="#94a3b8"
                />
                <text
                  x={point.x}
                  y={chartHeight - 18}
                  textAnchor="middle"
                  className="fill-slate-600 text-[12px] font-medium"
                >
                  {point.label}
                </text>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isHighlighted ? 7 : 5}
                  fill={isHighest ? "#065f46" : isLowest ? "#0f766e" : "#10b981"}
                  stroke="#ffffff"
                  strokeWidth="3"
                >
                  <title>
                    {`${point.month.label}: ${formatNumber(point.month.totalKwh)} kWh, ${formatCurrency(point.month.totalCost)}`}
                  </title>
                </circle>
                {isHighlighted ? (
                  <g>
                    <rect
                      x={Math.max(8, Math.min(point.x - 48, chartWidth - 108))}
                      y={Math.max(8, point.y - 42)}
                      width="100"
                      height="28"
                      rx="8"
                      fill={isHighest ? "#064e3b" : "#ffffff"}
                      stroke="#a7f3d0"
                    />
                    <text
                      x={Math.max(58, Math.min(point.x + 2, chartWidth - 58))}
                      y={Math.max(26, point.y - 24)}
                      textAnchor="middle"
                      className={
                        isHighest
                          ? "fill-white text-[11px] font-semibold"
                          : "fill-slate-800 text-[11px] font-semibold"
                      }
                    >
                      {isHighest ? "Max" : "Min"} {formatNumber(point.month.totalKwh, 0)} kWh
                    </text>
                  </g>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        Variațiile lunare sunt estimative și reflectă sezonalitatea aparatelor
        precum aerul condiționat, încălzirea electrică și iluminatul.
      </p>
    </section>
  );
}
