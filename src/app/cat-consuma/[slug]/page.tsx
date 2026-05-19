import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnergyCalculator } from "@/components/energy-calculator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { appliancePresets } from "@/data/appliancePresets";
import { seoAppliancePages } from "@/data/seoAppliancePages";
import { calculateEnergyCost, formatCurrency, formatNumber } from "@/lib/energy";
import { absoluteUrl } from "@/lib/site";

type ConsumptionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const similarApplianceSlugs: Record<string, string[]> = {
  "aer-conditionat-12000-btu": ["calorifer-electric", "boiler-electric-80l", "televizor"],
  frigider: ["televizor", "masina-de-spalat", "bec-led"],
  "boiler-electric-80l": ["calorifer-electric", "aer-conditionat-12000-btu", "masina-de-spalat"],
  "calorifer-electric": ["aer-conditionat-12000-btu", "boiler-electric-80l", "cuptor-electric"],
  "pc-gaming": ["televizor", "bec-led", "frigider"],
  televizor: ["pc-gaming", "bec-led", "frigider"],
  "masina-de-spalat": ["uscator-rufe", "boiler-electric-80l", "frigider"],
  "uscator-rufe": ["masina-de-spalat", "cuptor-electric", "boiler-electric-80l"],
  "cuptor-electric": ["calorifer-electric", "uscator-rufe", "boiler-electric-80l"],
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
  const popularGuides = getPagesBySlug(popularGuideSlugs)
    .filter((item) => item.slug !== page.slug)
    .slice(0, 5);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
      }))
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasa",
        item: absoluteUrl("/")
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Ghiduri consum aparate",
        item: absoluteUrl("/#ghiduri-utile")
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.h1,
        item: absoluteUrl(`/cat-consuma/${page.slug}`)
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SiteHeader />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <article>
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500"
            >
              <Link href="/" className="hover:text-emerald-700">
                Acasa
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/#ghiduri-utile" className="hover:text-emerald-700">
                Ghiduri consum
              </Link>
              <span aria-hidden="true">/</span>
              <span className="font-medium text-slate-700">{page.shortName}</span>
            </nav>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Ghid consum electric
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950">
              {page.h1}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">{page.intro}</p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <InfoTile label="Putere estimativa" value={`${page.watts} W`} />
              <InfoTile
                label="Cost lunar estimativ"
                value={formatCurrency(mainResult.monthlyCost)}
              />
              <InfoTile
                label="Consum lunar estimativ"
                value={`${formatNumber(mainResult.monthlyKwh)} kWh`}
              />
              <InfoTile
                label="Pret folosit"
                value={`${formatNumber(page.pricePerKwh)} lei/kWh`}
              />
            </dl>
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
                  <Metric label="Consum lunar" value={`${formatNumber(result.monthlyKwh)} kWh`} />
                  <Metric label="Cost lunar" value={formatCurrency(result.monthlyCost)} />
                  <Metric label="Cost anual" value={formatCurrency(result.yearlyCost)} />
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

      <section className="bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              FAQ
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Intrebari frecvente
            </h2>
          </div>
          <div className="grid gap-3">
            {page.faq.map((item) => (
              <details
                key={item.question}
                className="rounded-lg border border-emerald-100 bg-white p-5"
              >
                <summary className="cursor-pointer text-base font-semibold text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

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
              <div className="mt-6 grid gap-3">
                {similarPages.map((item) => (
                  <GuideLink key={item.slug} item={item} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Ghiduri utile
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Calculatoare populare pentru consum electric
              </h2>
              <div className="mt-6 grid gap-3">
                {popularGuides.map((item) => (
                  <GuideLink key={item.slug} item={item} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-emerald-100 bg-white/80 p-5">
            <h2 className="text-xl font-semibold text-slate-950">
              Toate ghidurile pentru aparate
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {allGuidePages.map((item) => (
                <Link
                  key={item.slug}
                  href={`/cat-consuma/${item.slug}`}
                  className="text-sm font-semibold text-slate-700 hover:text-emerald-700"
                >
                  {item.h1}
                </Link>
              ))}
            </div>
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

type GuideLinkProps = {
  item: (typeof seoAppliancePages)[number];
};

function GuideLink({ item }: GuideLinkProps) {
  return (
    <Link
      href={`/cat-consuma/${item.slug}`}
      className="rounded-lg border border-emerald-100 bg-white p-4 text-slate-950 shadow-sm transition hover:border-emerald-300"
    >
      <span className="text-sm font-medium text-emerald-700">
        Calculator precompletat
      </span>
      <span className="mt-2 block font-semibold">{item.h1}</span>
      <span className="mt-2 block text-sm leading-6 text-slate-600">
        {item.metaDescription}
      </span>
    </Link>
  );
}

type InfoTileProps = {
  label: string;
  value: string;
};

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <div className="rounded-lg border border-emerald-100 bg-white/80 p-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

function Metric({ label, value }: InfoTileProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}
