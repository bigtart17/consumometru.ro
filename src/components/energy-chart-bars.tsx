"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { formatCurrency, formatNumber } from "@/lib/energy";

type ChartRow = {
  label: string;
  consum: number;
  cost: number;
};

type EnergyBarsProps = {
  data: ChartRow[];
};

export function EnergyBars({ data }: EnergyBarsProps) {
  return (
    <div className="mt-5 h-72 min-h-72 w-full min-w-0 sm:h-80">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <BarChart
          data={data}
          margin={{
            top: 8,
            right: 8,
            bottom: 0,
            left: -18
          }}
        >
          <CartesianGrid stroke="#d8e6de" strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12 }}
          />
          <YAxis
            yAxisId="consum"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickFormatter={(value) => formatNumber(Number(value), 0)}
          />
          <YAxis yAxisId="cost" hide orientation="right" />
          <Tooltip
            cursor={{ fill: "rgba(15, 159, 110, 0.08)" }}
            content={<ChartTooltip />}
          />
          <Bar
            yAxisId="consum"
            dataKey="consum"
            fill="#0f9f6e"
            radius={[6, 6, 0, 0]}
            name="Consum"
          />
          <Bar
            yAxisId="cost"
            dataKey="cost"
            fill="#10251c"
            radius={[6, 6, 0, 0]}
            name="Cost"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

type TooltipPayload = {
  dataKey?: string;
  value?: number;
};

type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
};

function ChartTooltip({ active, label, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const consumption = payload.find((item) => item.dataKey === "consum")?.value ?? 0;
  const cost = payload.find((item) => item.dataKey === "cost")?.value ?? 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3 text-sm shadow-soft">
      <p className="font-semibold text-slate-950">{label}</p>
      <p className="mt-1 text-slate-600">{formatNumber(consumption)} kWh</p>
      <p className="text-slate-600">{formatCurrency(cost)}</p>
    </div>
  );
}
