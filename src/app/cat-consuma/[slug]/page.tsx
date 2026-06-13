import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnergyCalculator } from "@/components/energy-calculator";
import { FaqSection } from "@/components/seo/faq-section";
import { InternalLinksGrid, SimpleLinksGrid } from "@/components/seo/internal-links-grid";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  JsonLdScript
} from "@/components/seo/json-ld-script";
import { MetricCard } from "@/components/seo/metric-card";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { appliancePresets } from "@/data/appliancePresets";
import { seoAppliancePages } from "@/data/seoAppliancePages";
import { seoComparisons } from "@/data/seoComparisons";
import { applianceHubMap, hubBySlug } from "@/data/seoHubs";
import { calculateEnergyCost, formatCurrency, formatNumber } from "@/lib/energy";
import { absoluteUrl } from "@/lib/site";

type ConsumptionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const similarApplianceSlugs: Record<string, string[]> = {
  "aer-conditionat-9000-btu": ["aer-conditionat-12000-btu", "aer-conditionat-18000-btu", "ventilator", "dezumidificator"],
  "aer-conditionat-12000-btu": ["aer-conditionat-9000-btu", "aer-conditionat-18000-btu", "ventilator", "calorifer-electric"],
  "aer-conditionat-18000-btu": ["aer-conditionat-12000-btu", "aer-conditionat-9000-btu", "dezumidificator", "convector-electric"],
  ventilator: ["aer-conditionat-9000-btu", "aer-conditionat-12000-btu", "dezumidificator", "purificator-aer"],
  dezumidificator: ["aer-conditionat-12000-btu", "ventilator", "congelator", "frigider"],
  frigider: ["congelator", "lada-frigorifica", "masina-de-spalat", "bec-led"],
  congelator: ["frigider", "lada-frigorifica", "masina-spalat-vase", "cuptor-electric"],
  "lada-frigorifica": ["congelator", "frigider", "masina-spalat-vase", "cuptor-electric"],
  "boiler-electric-80l": ["calorifer-electric", "aeroterma", "convector-electric", "masina-de-spalat"],
  "calorifer-electric": ["convector-electric", "radiator-ulei", "aeroterma", "boiler-electric-80l"],
  aeroterma: ["convector-electric", "calorifer-electric", "radiator-ulei", "panou-radiant"],
  "convector-electric": ["calorifer-electric", "aeroterma", "radiator-ulei", "panou-radiant"],
  "radiator-ulei": ["calorifer-electric", "convector-electric", "aeroterma", "panou-radiant"],
  "panou-radiant": ["convector-electric", "calorifer-electric", "radiator-ulei", "aeroterma"],
  "pc-gaming": ["televizor", "bec-led", "frigider"],
  televizor: ["pc-gaming", "bec-led", "frigider"],
  "masina-de-spalat": ["uscator-rufe", "masina-spalat-vase", "boiler-electric-80l", "frigider"],
  "uscator-rufe": ["masina-de-spalat", "masina-spalat-vase", "cuptor-electric", "boiler-electric-80l"],
  "masina-spalat-vase": ["masina-de-spalat", "uscator-rufe", "cuptor-electric", "fierbator-electric"],
  "cuptor-electric": ["cuptor-microunde", "fierbator-electric", "espressor", "masina-spalat-vase"],
  "cuptor-microunde": ["cuptor-electric", "fierbator-electric", "espressor", "masina-spalat-vase"],
  "fierbator-electric": ["espressor", "cuptor-microunde", "cuptor-electric", "masina-spalat-vase"],
  espressor: ["fierbator-electric", "cuptor-microunde", "masina-spalat-vase", "cuptor-electric"],
  "bec-led": ["televizor", "pc-gaming", "frigider"]
};

const popularGuideSlugs = [
  "boiler-electric-80l",
  "aer-conditionat-12000-btu",
  "calorifer-electric",
  "frigider",
  "pc-gaming",
  "bec-led"
];

export function generateStaticParams() {
  return seoAppliancePages.map((page) => ({
    slug: page.slug
  }));
}

export async function generateMetadata({
  params
}: ConsumptionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = seoAppliancePages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/cat-consuma/${page.slug}`
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `/cat-consuma/${page.slug}`,
      type: "article",
      locale: "ro_RO"
    }
  };
}

export default async function ConsumptionPage({ params }: ConsumptionPageProps) {
  const { slug } = await params;
  const page = seoAppliancePages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  const mainResult = calculateEnergyCost({
    watts: page.watts,
    hoursPerDay: page.hoursPerDay,
    daysPerMonth: page.daysPerMonth,
    pricePerKwh: page.pricePerKwh
  });
  const allGuidePages = seoAppliancePages.filter((item) => item.slug !== page.slug);
  const similarPages = getPagesBySlug(similarApplianceSlugs[page.slug] ?? [])
    .filter((item) => item.slug !== page.slug);
  const relatedComparisons = seoComparisons.filter((comparison) =>
    comparison.relatedApplianceSlugs.includes(page.slug)
  );
  const parentHub = hubBySlug.get(applianceHubMap[page.slug]);
  const popularGuides = getPagesBySlug(popularGuideSlugs)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 5);
  const faqSchema = createFaqSchema(page.faq);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Acasa", item: absoluteUrl("/") },
    { name: "Aparate", item: absoluteUrl("/aparate") },
    { name: page.h1, item: absoluteUrl(`/cat-consuma/${page.slug}`) }
  ]);

  return (
    <main>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <SiteHeader />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <article>
            <SeoBreadcrumbs
              className="mb-5"
              items={[
                { label: "Acasa", href: "/" },
                { label: "Aparate", href: "/aparate" },
                { label: page.shortName }
              ]}
            />
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Ghid consum electric
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">{page.intro}</p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <MetricCard as="dl" label="Putere estimativa" value={`${page.watts} W`} />
              {page.consumptionRange ? (
                <MetricCard as="dl" label="Interval realist" value={page.consumptionRange} />
              ) : null}
              <MetricCard
                as="dl"
                label="Cost lunar estimativ"
                value={formatCurrency(mainResult.monthlyCost)}
              />
              <MetricCard
                as="dl"
                label="Consum lunar estimativ"
                value={`${formatNumber(mainResult.monthlyKwh)} kWh`}
              />
              <MetricCard
                as="dl"
                label="Pret folosit"
                value={`${formatNumber(page.pricePerKwh)} lei/kWh`}
              />
            </dl>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Estimarea foloseste valori orientative. Citeste{" "}
              <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/metodologie">
                metodologia de calcul
              </Link>{" "}
              si pagina despre{" "}
              <Link className="font-semibold text-emerald-700 hover:text-emerald-800" href="/surse">
                sursele folosite
              </Link>{" "}
              ca sa intelegi limitele rezultatului.
              {parentHub ? (
                <>
                  {" "}
                  Pentru context mai larg, vezi hub-ul{" "}
                  <Link
                    className="font-semibold text-emerald-700 hover:text-emerald-800"
                    href={`/${parentHub.slug}`}
                  >
                    {parentHub.h1.toLowerCase()}
                  </Link>
                  .
                </>
              ) : null}
            </p>
          </article>

          <EnergyCalculator
            presets={appliancePresets}
            initialPresetSlug={page.presetSlug}
            initialValues={{
              watts: String(page.watts),
              hoursPerDay: String(page.hoursPerDay).replace(".", ","),
              daysPerMonth: String(page.daysPerMonth),
              pricePerKwh: String(page.pricePerKwh).replace(".", ",")
            }}
          />
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold text-slate-950">
              Tabel consum estimativ pentru {page.shortName}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Tabelul foloseste aceeasi putere estimativa si pretul de{" "}
              {formatNumber(page.pricePerKwh)} lei/kWh. Ajusteaza calculatorul
              daca ai valori exacte de pe eticheta aparatului sau din contract.
            </p>
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
            {page.tableRows.map((row) => {
              const result = calculateEnergyCost({
                watts: page.watts,
                hoursPerDay: row.hoursPerDay,
                daysPerMonth: row.daysPerMonth,
                pricePerKwh: page.pricePerKwh
              });

              return (
                <article
                  key={row.scenario}
                  className="grid gap-4 border-b border-emerald-50 p-4 last:border-b-0 md:grid-cols-4 md:items-center"
                >
                  <div>
                    <h3 className="font-semibold text-slate-950">
                      {row.scenario}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {row.hoursPerDay} h/zi • {row.daysPerMonth} zile/luna
                    </p>
                  </div>
                  <MetricCard label="Consum lunar" value={`${formatNumber(result.monthlyKwh)} kWh`} />
                  <MetricCard label="Cost lunar" value={formatCurrency(result.monthlyCost)} />
                  <MetricCard label="Cost anual" value={formatCurrency(result.yearlyCost)} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Explicatii utile
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Ce trebuie sa stii inainte sa interpretezi costul
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Estimarea porneste de la putere, timp de utilizare si pret kWh.
              In practica, consumul poate varia in functie de model, setari,
              temperatura, vechime si felul in care folosesti aparatul.
            </p>
          </aside>

          <div className="grid gap-5">
            {page.contentSections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h2 className="text-2xl font-semibold text-slate-950">
                  {section.title}
                </h2>
                <div className="mt-3 grid gap-3 text-sm leading-7 text-slate-600">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Exemple de cost
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Exemple de cost lunar pentru scenarii obisnuite
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Exemplele folosesc pretul de {formatNumber(page.pricePerKwh)}{" "}
              lei/kWh. Daca pretul tau este diferit, calculatorul precompletat
              de sus iti arata imediat noua estimare.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {page.costExamples.map((example) => {
              const result = calculateEnergyCost({
                watts: example.watts ?? page.watts,
                hoursPerDay: example.hoursPerDay,
                daysPerMonth: example.daysPerMonth,
                pricePerKwh: page.pricePerKwh
              });

              return (
                <article
                  key={example.title}
                  className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {example.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {example.description}
                  </p>
                  <div className="mt-4 rounded-lg bg-emerald-50 p-4">
                    <p className="text-sm font-semibold text-emerald-900">
                      {formatNumber(result.monthlyKwh)} kWh/luna
                    </p>
                    <p className="mt-1 text-2xl font-semibold text-slate-950">
                      {formatCurrency(result.monthlyCost)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Scenarii reale
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Exemple de utilizare zilnica si intr-o familie
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Aceeasi putere poate duce la costuri foarte diferite daca aparatul
              este folosit ocazional, zilnic sau de mai multe persoane. Exemplele
              de mai jos pornesc de la datele paginii si te ajuta sa alegi un
              scenariu apropiat de locuinta ta.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {buildApplianceUsageScenarios(page).map((scenario) => {
              const result = calculateEnergyCost({
                watts: page.watts,
                hoursPerDay: scenario.hoursPerDay,
                daysPerMonth: scenario.daysPerMonth,
                pricePerKwh: page.pricePerKwh
              });

              return (
                <article
                  key={scenario.title}
                  className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-950">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {scenario.description}
                  </p>
                  <dl className="mt-4 grid gap-3">
                    <MetricCard
                      as="dl"
                      label="Consum lunar"
                      value={`${formatNumber(result.monthlyKwh)} kWh`}
                    />
                    <MetricCard
                      as="dl"
                      label="Cost lunar"
                      value={formatCurrency(result.monthlyCost)}
                    />
                  </dl>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Variatii
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Factori care pot schimba estimarea
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Daca rezultatul din calculator pare diferit de factura reala,
              verifica mai intai aceste puncte. Sunt cele mai frecvente motive
              pentru care consumul unui {page.shortName} variaza de la o
              locuinta la alta.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildApplianceVariationCards(page.shortName).map((item) => (
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Economisire
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Cum poti reduce consumul pentru {page.shortName}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {page.savingTips.map((tip) => (
              <article
                key={tip.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-slate-950">{tip.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {tip.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={page.faq} />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Aparate similare
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Compara cu aparate apropiate
              </h2>
              <InternalLinksGrid
                className="mt-6"
                links={similarPages.map((item) => guideToLinkCard(item))}
                columns="two"
              />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Ghiduri utile
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Calculatoare populare pentru consum electric
              </h2>
              {parentHub ? (
                <Link
                  href={`/${parentHub.slug}`}
                  className="mt-6 block rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-slate-950 transition hover:border-emerald-300"
                >
                  <span className="text-sm font-medium text-emerald-700">
                    Hub tematic
                  </span>
                  <span className="mt-2 block font-semibold">{parentHub.h1}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    Vezi aparate apropiate, sfaturi de reducere a consumului si
                    linkuri catre calcule din aceeasi categorie.
                  </span>
                </Link>
              ) : null}
              <InternalLinksGrid
                className="mt-6"
                links={popularGuides.map((item) => guideToLinkCard(item))}
                columns="two"
              />
            </div>
          </div>

          {relatedComparisons.length > 0 ? (
            <div className="mt-8 rounded-lg border border-emerald-100 bg-white/80 p-5">
              <h2 className="text-xl font-semibold text-slate-950">
                Comparatii utile pentru {page.shortName}
              </h2>
              <InternalLinksGrid
                className="mt-4"
                links={relatedComparisons.map((comparison) => ({
                  href: `/comparatii/${comparison.slug}`,
                  eyebrow: "Comparatie consum",
                  title: comparison.h1,
                  description: comparison.metaDescription
                }))}
                columns="two"
              />
            </div>
          ) : null}

          <div className="mt-8 rounded-lg border border-emerald-100 bg-white/80 p-5">
            <h2 className="text-xl font-semibold text-slate-950">
              Toate ghidurile pentru aparate
            </h2>
            <SimpleLinksGrid
              className="mt-4"
              links={allGuidePages.map((item) => ({
                href: `/cat-consuma/${item.slug}`,
                label: item.h1
              }))}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function getPagesBySlug(slugs: string[]) {
  return slugs
    .map((slug) => seoAppliancePages.find((item) => item.slug === slug))
    .filter((item): item is (typeof seoAppliancePages)[number] => Boolean(item));
}

function guideToLinkCard(item: (typeof seoAppliancePages)[number]) {
  return {
    href: `/cat-consuma/${item.slug}`,
    eyebrow: "Calculator precompletat",
    title: item.h1,
    description: item.metaDescription
  };
}

function buildApplianceUsageScenarios(page: (typeof seoAppliancePages)[number]) {
  const firstRow = page.tableRows[0] ?? {
    scenario: "Folosire ocazionala",
    hoursPerDay: Math.max(1, page.hoursPerDay / 2),
    daysPerMonth: Math.min(20, page.daysPerMonth)
  };
  const lastRow = page.tableRows.at(-1) ?? {
    scenario: "Folosire intensa",
    hoursPerDay: page.hoursPerDay,
    daysPerMonth: page.daysPerMonth
  };

  return [
    {
      title: "Utilizare ocazionala",
      description: `${firstRow.scenario}: un scenariu potrivit cand ${page.shortName} nu functioneaza in fiecare zi sau este folosit doar in anumite intervale.`,
      hoursPerDay: firstRow.hoursPerDay,
      daysPerMonth: firstRow.daysPerMonth
    },
    {
      title: "Utilizare zilnica",
      description: `Scenariul principal al paginii: ${formatNumber(page.hoursPerDay)} ore pe zi, ${formatNumber(page.daysPerMonth, 0)} zile pe luna, cu pretul kWh introdus in calculator.`,
      hoursPerDay: page.hoursPerDay,
      daysPerMonth: page.daysPerMonth
    },
    {
      title: "Locuinta sau familie",
      description: `${lastRow.scenario}: util cand aparatul este folosit mai des, de mai multe persoane sau in perioade cu cerere mai mare.`,
      hoursPerDay: lastRow.hoursPerDay,
      daysPerMonth: lastRow.daysPerMonth
    }
  ];
}

function buildApplianceVariationCards(shortName: string) {
  return [
    {
      title: "Modelul si vechimea",
      body: `Doua aparate numite la fel pot avea consum diferit. Un ${shortName} mai vechi, murdar sau slab dimensionat poate functiona mai mult decat unul eficient.`
    },
    {
      title: "Orele reale de folosire",
      body: "Cea mai mare diferenta apare de obicei din durata. O ora in plus pe zi se aduna rapid pe luna, mai ales la aparatele de putere mare."
    },
    {
      title: "Pretul kWh din contract",
      body: "Calculatorul transforma kWh in lei folosind pretul introdus. Daca pretul de pe factura este diferit, costul lunar se schimba proportional."
    },
    {
      title: "Numarul de aparate",
      body: "Daca ai doua aparate similare, calculeaza-le separat sau inmulteste rezultatul. Diferenta devine importanta la becuri, televizoare, frigidere secundare sau incalzitoare."
    }
  ];
}
