import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type ExpandableToolProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function ExpandableTool({ title, description, children }: ExpandableToolProps) {
  return (
    <details className="group rounded-lg border border-slate-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg px-4 py-4 transition hover:bg-slate-50">
        <span>
          <span className="block text-base font-semibold text-slate-950">
            {title}
          </span>
          <span className="mt-1 block text-sm leading-6 text-slate-600">
            {description}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">
          <span className="group-open:hidden">Arata</span>
          <span className="hidden group-open:inline">Ascunde</span>
          <ChevronDown
            className="transition group-open:rotate-180"
            size={16}
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="border-t border-slate-100 p-4 pt-0">{children}</div>
    </details>
  );
}
