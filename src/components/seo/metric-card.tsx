type MetricCardProps = {
  label: string;
  value: string;
  as?: "div" | "dl";
};

export function MetricCard({ label, value, as = "div" }: MetricCardProps) {
  if (as === "dl") {
    return (
      <div className="rounded-lg border border-emerald-100 bg-white/80 p-4">
        <dt className="text-sm text-slate-500">{label}</dt>
        <dd className="mt-1 text-2xl font-semibold text-slate-950">{value}</dd>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}
