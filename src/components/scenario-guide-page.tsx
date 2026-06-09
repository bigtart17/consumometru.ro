import Link from "next/link";
import { CalculatorCta } from "@/components/seo/calculator-cta";
import { FaqSection } from "@/components/seo/faq-section";
import { InternalLinksGrid } from "@/components/seo/internal-links-grid";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  JsonLdScript
} from "@/components/seo/json-ld-script";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultScenarioPricePerKwh, type SeoScenarioPage } from "@/data/seoScenarioPages";
import { formatCurrency, formatNumber } from "@/lib/energy";
import { absoluteUrl } from "@/lib/site";

type ScenarioGuidePageProps = {
  page: SeoScenarioPage;
};

export function ScenarioGuidePage({ page }: ScenarioGuidePageProps) {
  const path = `/${page.basePath}/${page.slug}`;
  const faqSchema = createFaqSchema(page.faq);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Acasa", item: absoluteUrl("/") },
    { name: page.h1, item: absoluteUrl(path) }
  ]);

  return (
    <main>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <SiteHeader />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SeoBreadcrumbs items={[{ label: "Acasa", href: "/" }, { label: page.h1 }]} />

          <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
            <article>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                {page.eyebrow}
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
                {page.h1}
              </h1>
              <div className="mt-5 grid gap-4 text-base leading-8 text-slate-700">
                {page.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <CalculatorCta />
            </article>

            <aside className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Scenarii rapide
              </h2>
              <div className="mt-5 grid gap-3">
                {page.scenarios.map((scenario) => (
                  <div key={scenario.label} className="rounded-lg bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-800">
                      {scenario.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {formatNumber(scenario.monthlyKwh)} kWh/luna
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatCurrency(scenario.monthlyKwh * defaultScenarioPricePerKwh)} la{" "}
                      {formatNumber(defaultScenarioPricePerKwh)} lei/kWh
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {scenario.note}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">
              Explicatii practice
            </h2>
          </div>
          <div className="grid gap-4">
            {page.practicalSections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {section.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-slate-950">
            Exemple de calcul
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {page.examples.map((example) => (
              <article
                key={example.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-950">{example.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {example.formula}
                </p>
                <p className="mt-4 text-2xl font-semibold text-emerald-800">
                  {example.result}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-slate-950">
            Tabel cu categorii de consum
          </h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
            {page.categories.map((category) => (
              <article
                key={category.name}
                className="grid gap-4 border-b border-emerald-50 p-4 last:border-b-0 md:grid-cols-4 md:items-center"
              >
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-slate-950">{category.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {category.detail}
                  </p>
                </div>
                <p className="text-lg font-semibold text-slate-950">
                  {formatNumber(category.monthlyKwh)} kWh/luna
                </p>
                {category.href ? (
                  <Link
                    href={category.href}
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Vezi ghidul
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Adaptare la locuinta ta
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Cum transformi estimarea intr-un calcul mai realist
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Scenariile sunt repere utile, dar factura ta depinde de aparatele
              reale, numarul de persoane si pretul kWh din contract. Foloseste
              aceste verificari ca sa apropii estimarea de situatia ta.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildScenarioAdaptationCards(page).map((item) => (
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

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <InfoList title="De ce poate varia consumul?" items={page.variationReasons} />
          <InfoList title="Cum poti reduce consumul?" items={page.reductionTips} />
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <LinkList title="Pagini de aparate relevante" links={page.applianceLinks} />
          <LinkList title="Hub-uri utile" links={page.hubLinks} />
        </div>
      </section>

      <FaqSection items={page.faq} className="" />

      <SiteFooter />
    </main>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm leading-7 text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function buildScenarioAdaptationCards(page: SeoScenarioPage) {
  const sortedCategories = [...page.categories].sort(
    (first, second) => second.monthlyKwh - first.monthlyKwh
  );
  const topCategory = sortedCategories[0];
  const secondCategory = sortedCategories[1];
  const scenarioValues = page.scenarios.map((scenario) => scenario.monthlyKwh);
  const minScenario = Math.min(...scenarioValues);
  const maxScenario = Math.max(...scenarioValues);

  return [
    {
      title: "Porneste de la consumatorul principal",
      body: topCategory
        ? `In aceasta estimare, ${topCategory.name.toLowerCase()} are cel mai mare impact, cu aproximativ ${formatNumber(topCategory.monthlyKwh)} kWh/luna. Verifica intai acest tip de aparat.`
        : "Identifica aparatul care functioneaza cel mai mult sau are puterea cea mai mare si calculeaza-l separat."
    },
    {
      title: "Verifica al doilea consumator",
      body: secondCategory
        ? `${secondCategory.name} poate schimba totalul daca este folosit des. Chiar si o diferenta mica zilnica devine vizibila pe luna.`
        : "Dupa primul aparat, verifica zona folosita zilnic: iluminat, laptop, televizor, frigider sau apa calda."
    },
    {
      title: "Compara scenariul mic cu cel ridicat",
      body: `Intervalul din aceasta pagina merge de la aproximativ ${formatNumber(minScenario)} la ${formatNumber(maxScenario)} kWh/luna. Diferenta vine de obicei din obiceiuri, sezon si numarul de aparate.`
    },
    {
      title: "Actualizeaza pretul kWh",
      body: `Exemplele folosesc ${formatNumber(defaultScenarioPricePerKwh)} lei/kWh. Daca pe factura ta apare alta valoare, introdu pretul real in calculatorul principal pentru costul in lei.`
    }
  ];
}

function LinkList({
  title,
  links
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
      <InternalLinksGrid
        className="mt-4"
        links={links.map((link) => ({
          href: link.href,
          title: link.label
        }))}
        columns="two"
      />
    </article>
  );
}
