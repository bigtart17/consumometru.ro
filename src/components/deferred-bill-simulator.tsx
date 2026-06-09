"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LazyBillSimulator = dynamic(
  () => import("@/components/bill-simulator").then((mod) => mod.BillSimulator),
  {
    ssr: false,
    loading: () => <BillSimulatorFallback />
  }
);

export function DeferredBillSimulator() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const container = containerRef.current;

    if (!container || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "650px 0px" }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [shouldLoad]);

  if (shouldLoad) {
    return <LazyBillSimulator />;
  }

  return <BillSimulatorFallback ref={containerRef} />;
}

const BillSimulatorFallback = forwardRef<HTMLElement>(function BillSimulatorFallback(_, ref) {
  return (
    <section
      id="simulator-factura"
      ref={ref}
      className="px-4 py-14 sm:px-6 lg:px-8"
      aria-label="Simulator factura lunara"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.75fr)] xl:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Simulator factura lunara
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Calculeaza consumul total al locuintei
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Pregatim campurile pentru lista ta de aparate. In cateva momente
              vei putea estima consumul total si costul lunar al locuintei.
            </p>
          </div>

          <div className="h-32 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="h-4 w-56 rounded-full bg-slate-100" />
            <div className="mt-5 h-12 rounded-lg bg-slate-100" />
          </div>
        </div>

        <div className="mt-6 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.55fr)]">
          <div className="min-h-80 rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <div className="grid gap-3">
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="h-5 w-28 rounded-full bg-slate-100" />
                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {[0, 1, 2, 3, 4].map((field) => (
                      <div key={field} className="h-12 rounded-lg bg-slate-100" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="grid gap-4">
            <div className="min-h-48 rounded-lg bg-emerald-950 p-5 shadow-soft">
              <div className="h-4 w-32 rounded-full bg-emerald-800" />
              <div className="mt-7 h-9 w-44 rounded-full bg-emerald-800" />
              <div className="mt-7 h-9 w-36 rounded-full bg-emerald-800" />
            </div>
            <div className="min-h-48 rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="h-5 w-40 rounded-full bg-slate-100" />
              <div className="mt-5 grid gap-3">
                {[0, 1, 2].map((item) => (
                  <div key={item} className="h-9 rounded-lg bg-slate-100" />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
});
