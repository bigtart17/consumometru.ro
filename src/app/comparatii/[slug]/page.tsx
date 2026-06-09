import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorCta } from "@/components/seo/calculator-cta";
import { FaqSection } from "@/components/seo/faq-section";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  JsonLdScript
} from "@/components/seo/json-ld-script";
import { MetricCard } from "@/components/seo/metric-card";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seoAppliancePages } from "@/data/seoAppliancePages";
import { comparisonBySlug, seoComparisons, type ComparisonOption } from "@/data/seoComparisons";
import { calculateEnergyCost, formatCurrency, formatNumber } from "@/lib/energy";
import { absoluteUrl } from "@/lib/site";

type ComparisonPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return seoComparisons.map((comparison) => ({
    slug: comparison.slug
  }));
}

export async function generateMetadata({
  params
}: ComparisonPageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisonBySlug.get(slug);

  if (!comparison) {
    return {};
  }

  return {
    title: comparison.title,
    description: comparison.metaDescription,
    alternates: {
      canonical: `/comparatii/${comparison.slug}`
    },
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      url: `/comparatii/${comparison.slug}`,
      type: "article",
      locale: "ro_RO"
    }
  };
}

export default async function ComparisonPage({ params }: ComparisonPageProps) {
  const { slug } = await params;
  const comparison = comparisonBySlug.get(slug);

  if (!comparison) {
    notFound();
  }

  const [firstOption, secondOption] = comparison.options;
  const firstResult = getResult(firstOption, comparison.pricePerKwh);
  const secondResult = getResult(secondOption, comparison.pricePerKwh);
  const cheaperOption =
    firstResult.monthlyCost <= secondResult.monthlyCost ? firstOption : secondOption;
  const monthlyDifference = Math.abs(firstResult.monthlyCost - secondResult.monthlyCost);
  const yearlyDifference = Math.abs(firstResult.yearlyCost - secondResult.yearlyCost);
  const relatedAppliancePages = comparison.relatedApplianceSlugs
    .map((item) => seoAppliancePages.find((page) => page.slug === item))
    .filter((item): item is (typeof seoAppliancePages)[number] => Boolean(item))
    .slice(0, 4);
  const faqSchema = createFaqSchema(comparison.faq);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Acasa", item: absoluteUrl("/") },
    { name: "Comparatii", item: absoluteUrl("/comparatii") },
    { name: comparison.h1, item: absoluteUrl(`/comparatii/${comparison.slug}`) }
  ]);

  return (
    <main>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <SiteHeader />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SeoBreadcrumbs
            items={[
              { label: "Acasa", href: "/" },
              { label: "Comparatii", href: "/comparatii" },
              { label: comparison.h1 }
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <article>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Comparatie consum electric
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
                {comparison.h1}
              </h1>
              <div className="mt-5 grid gap-4 text-base leading-8 text-slate-700">
                {comparison.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <CalculatorCta
                links={[
                  { href: "/#calculator", label: "Deschide calculatorul", variant: "primary" },
                  { href: comparison.hubHref, label: `Hub ${comparison.hubLabel}` },
                  { href: "/metodologie", label: "Metodologie" }
                ]}
              />
            </article>

            <aside className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Diferenta principala pe scurt
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {comparison.shortSummary}
              </p>
              <div className="mt-5 rounded-lg bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-900">
                  In acest scenariu, varianta cu cost lunar mai mic este:
                </p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {cheaperOption.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Diferenta estimata este {formatCurrency(monthlyDifference)} pe
                  luna si {formatCurrency(yearlyDifference)} pe an.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-slate-950">
            Tabel comparativ
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
            {[firstOption, secondOption].map((option) => {
              const result = getResult(option, comparison.pricePerKwh);

              return (
                <article
                  key={option.name}
                  className="grid gap-4 border-b border-emerald-50 p-4 last:border-b-0 md:grid-cols-5 md:items-center"
                >
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-slate-950">
                      {option.name}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {option.description}
                    </p>
                    <Link
                      href={option.href}
                      className="mt-2 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      Vezi pagina sau calculeaza manual
                    </Link>
                  </div>
                  <MetricCard label="Putere" value={`${formatNumber(option.watts, 0)} W`} />
                  <MetricCard
                    label="Consum lunar"
                    value={`${formatNumber(result.monthlyKwh)} kWh`}
                  />
                  <MetricCard label="Cost lunar" value={formatCurrency(result.monthlyCost)} />
                </article>
              );
            })}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Pret folosit in comparatie: {formatNumber(comparison.pricePerKwh)} lei/kWh.
            Rezultatele sunt estimative si depind de durata reala, model si setari.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <ComparisonCostCard
            title="Exemplu de calcul lunar"
            firstOption={firstOption}
            secondOption={secondOption}
            pricePerKwh={comparison.pricePerKwh}
            mode="monthly"
          />
          <ComparisonCostCard
            title="Cost estimat anual"
            firstOption={firstOption}
            secondOption={secondOption}
            pricePerKwh={comparison.pricePerKwh}
            mode="yearly"
          />
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Scenarii de utilizare
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Cand se poate schimba rezultatul comparatiei
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Comparatia porneste de la un scenariu concret, dar in viata reala
              orele, modelul si confortul dorit pot schimba ordinea costurilor.
              Foloseste exemplele ca sa vezi ce merita ajustat in calculator.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {buildComparisonUsageScenarios(firstOption, secondOption, comparison.pricePerKwh).map(
              (scenario) => (
                <article
                  key={scenario.title}
                  className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-slate-950">{scenario.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {scenario.body}
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-emerald-800">
                    {scenario.result}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Factori de variatie
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Ce trebuie verificat inainte sa alegi
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Diferenta in lei nu spune singura toata povestea. Uneori varianta
              mai scumpa ofera confort, viteza sau performanta pe care cealalta
              nu o poate inlocui.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildComparisonFactorCards(firstOption, secondOption).map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          {[firstOption, secondOption].map((option) => (
            <article
              key={option.name}
              className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-950">
                Cand merita {option.name.toLowerCase()}
              </h2>
              <ListBlock title="Avantaje" items={option.advantages} />
              <ListBlock title="Dezavantaje" items={option.disadvantages} />
              <ListBlock title="Merita cand" items={option.bestWhen} />
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Recomandare practica
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Cum reduci consumul
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {comparison.practicalRecommendation}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[firstOption, secondOption].map((option) => (
              <article
                key={option.name}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {option.name}
                </h3>
                <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm leading-6 text-slate-600">
                  {option.reduceTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {relatedAppliancePages.length > 0 ? (
        <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Ghiduri apropiate
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Calculeaza si aparatele individuale
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Daca ai valori exacte de pe eticheta, intra pe pagina aparatului
                si ajusteaza puterea, orele si pretul kWh pentru situatia ta.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedAppliancePages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/cat-consuma/${page.slug}`}
                  className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300"
                >
                  <span className="text-sm font-semibold text-emerald-700">
                    Calculator precompletat
                  </span>
                  <span className="mt-2 block text-lg font-semibold text-slate-950">
                    {page.h1}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {page.metaDescription}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection items={comparison.faq} />

      <SiteFooter />
    </main>
  );
}

function getResult(option: ComparisonOption, pricePerKwh: number) {
  return calculateEnergyCost({
    watts: option.watts,
    hoursPerDay: option.hoursPerDay,
    daysPerMonth: option.daysPerMonth,
    pricePerKwh
  });
}

function ComparisonCostCard({
  title,
  firstOption,
  secondOption,
  pricePerKwh,
  mode
}: {
  title: string;
  firstOption: ComparisonOption;
  secondOption: ComparisonOption;
  pricePerKwh: number;
  mode: "monthly" | "yearly";
}) {
  const firstResult = getResult(firstOption, pricePerKwh);
  const secondResult = getResult(secondOption, pricePerKwh);

  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3">
        {[
          { option: firstOption, result: firstResult },
          { option: secondOption, result: secondResult }
        ].map(({ option, result }) => (
          <div
            key={option.name}
            className="rounded-lg border border-emerald-100 bg-emerald-50/45 p-4"
          >
            <p className="font-semibold text-slate-950">{option.name}</p>
            <p className="mt-2 text-sm text-slate-600">
              {formatNumber(option.watts, 0)} W × {formatNumber(option.hoursPerDay)} h/zi ×{" "}
              {formatNumber(option.daysPerMonth, 0)} zile/luna
            </p>
            <p className="mt-3 text-2xl font-semibold text-emerald-800">
              {formatCurrency(mode === "monthly" ? result.monthlyCost : result.yearlyCost)}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {mode === "monthly"
                ? `${formatNumber(result.monthlyKwh)} kWh/luna`
                : `${formatNumber(result.yearlyKwh)} kWh/an`}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        {title}
      </h3>
      <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function buildComparisonUsageScenarios(
  firstOption: ComparisonOption,
  secondOption: ComparisonOption,
  pricePerKwh: number
) {
  const firstHalf = getResult(
    { ...firstOption, hoursPerDay: Math.max(0.25, firstOption.hoursPerDay / 2) },
    pricePerKwh
  );
  const secondHalf = getResult(
    { ...secondOption, hoursPerDay: Math.max(0.25, secondOption.hoursPerDay / 2) },
    pricePerKwh
  );
  const sharedHours = Math.max(firstOption.hoursPerDay, secondOption.hoursPerDay);
  const firstShared = getResult({ ...firstOption, hoursPerDay: sharedHours }, pricePerKwh);
  const secondShared = getResult({ ...secondOption, hoursPerDay: sharedHours }, pricePerKwh);

  return [
    {
      title: "Folosire ocazionala",
      body: `Daca folosesti fiecare varianta doar jumatate din timpul estimat, diferenta lunara se reduce. ${firstOption.name} ajunge la ${formatCurrency(firstHalf.monthlyCost)}, iar ${secondOption.name} la ${formatCurrency(secondHalf.monthlyCost)}.`,
      result: `${formatCurrency(Math.abs(firstHalf.monthlyCost - secondHalf.monthlyCost))} diferenta/luna`
    },
    {
      title: "Acelasi numar de ore",
      body: `Daca ambele sunt folosite ${formatNumber(sharedHours)} ore pe zi, comparatia izoleaza mai bine diferenta de putere si eficienta.`,
      result: `${formatCurrency(Math.abs(firstShared.monthlyCost - secondShared.monthlyCost))} diferenta/luna`
    },
    {
      title: "Utilizare zilnica intensa",
      body: "La aparatele folosite zilnic, diferenta anuala conteaza mai mult decat diferenta pe o singura zi. Verifica scenariul anual inainte de cumparare.",
      result: `${formatCurrency(Math.abs(firstShared.yearlyCost - secondShared.yearlyCost))} diferenta/an`
    }
  ];
}

function buildComparisonFactorCards(
  firstOption: ComparisonOption,
  secondOption: ComparisonOption
) {
  return [
    {
      title: "Puterea reala a modelului",
      body: `${firstOption.name} este calculat aici la ${formatNumber(firstOption.watts, 0)} W, iar ${secondOption.name} la ${formatNumber(secondOption.watts, 0)} W. Eticheta sau manualul aparatului pot arata valori diferite.`
    },
    {
      title: "Durata de utilizare",
      body: "Orele pe zi schimba rezultatul direct. O varianta cu putere mare poate costa rezonabil daca functioneaza putin, iar una mai mica poate deveni scumpa daca ramane pornita continuu."
    },
    {
      title: "Confortul obtinut",
      body: "Compara costul cu rezultatul practic: racire reala, caldura, timp economisit, lumina sau performanta. Cel mai ieftin aparat nu este mereu echivalent functional."
    },
    {
      title: "Pretul energiei",
      body: "Daca pretul tau kWh este peste sau sub valoarea orientativa folosita aici, costurile in lei se modifica proportional, chiar daca diferenta in kWh ramane aceeasi."
    }
  ];
}
