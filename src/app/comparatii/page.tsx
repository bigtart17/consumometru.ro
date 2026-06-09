import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seoComparisons } from "@/data/seoComparisons";

export const metadata: Metadata = {
  title: "Comparatii consum aparate electrice",
  description:
    "Compara consumul si costul estimativ pentru aparate electrice populare: calorifer vs aer conditionat, laptop vs desktop, boiler vs instant si altele.",
  alternates: {
    canonical: "/comparatii"
  },
  openGraph: {
    title: "Comparatii consum aparate electrice",
    description:
      "Vezi comparatii practice intre aparate electrice si afla ce varianta poate avea cost mai mic in scenarii orientative.",
    url: "/comparatii",
    type: "website",
    locale: "ro_RO"
  }
};

export default function ComparisonsIndexPage() {
  return (
    <main>
      <SiteHeader />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Comparatii
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
            Comparatii consum aparate electrice
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
            Alege o comparatie si vezi consumul estimativ, costul lunar, costul
            anual, avantajele si limitarile fiecarei variante. Valorile sunt
            orientative si depind de putere, durata de utilizare si pretul kWh.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {seoComparisons.map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/comparatii/${comparison.slug}`}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300"
              >
                <span className="text-sm font-semibold text-emerald-700">
                  {comparison.hubLabel}
                </span>
                <span className="mt-2 block text-xl font-semibold text-slate-950">
                  {comparison.h1}
                </span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  {comparison.metaDescription}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
