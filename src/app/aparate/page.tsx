import type { Metadata } from "next";
import Link from "next/link";
import { InternalLinksGrid } from "@/components/seo/internal-links-grid";
import {
  createBreadcrumbSchema,
  JsonLdScript
} from "@/components/seo/json-ld-script";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seoAppliancePages, type SeoAppliancePage } from "@/data/seoAppliancePages";
import { siteNavigationPillars } from "@/data/siteNavigation";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consum electric aparate - calcule si costuri estimative",
  description:
    "Afla cat consuma aparatele electrice din casa si estimeaza costul lunar pentru frigider, boiler, aer conditionat, PC, televizor si alte aparate.",
  alternates: {
    canonical: "/aparate"
  },
  openGraph: {
    title: "Consum electric aparate - calcule si costuri estimative",
    description:
      "Ghiduri pentru consumul aparatelor electrice din casa, grupate pe categorii utile.",
    url: "/aparate",
    type: "website",
    locale: "ro_RO"
  }
};

type ApplianceCategory = {
  title: string;
  description: string;
  hubHref: string;
  hubLabel: string;
  slugs: string[];
};

const appliancePageBySlug = new Map(
  seoAppliancePages.map((page) => [page.slug, page])
);

const appliancePillar = siteNavigationPillars.find(
  (pillar) => pillar.key === "aparate"
);

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Homepage", item: absoluteUrl("/") },
  { name: "Aparate", item: absoluteUrl("/aparate") }
]);

const applianceCategories: ApplianceCategory[] = [
  {
    title: "Climatizare",
    description:
      "Aparate folosite pentru racire, circularea aerului si controlul umiditatii.",
    hubHref: "/climatizare",
    hubLabel: "Hub climatizare",
    slugs: [
      "aer-conditionat-9000-btu",
      "aer-conditionat-12000-btu",
      "aer-conditionat-18000-btu",
      "ventilator",
      "dezumidificator"
    ]
  },
  {
    title: "Incalzire electrica",
    description:
      "Aparate cu putere mare, unde orele de utilizare pot schimba rapid factura.",
    hubHref: "/incalzire-electrica",
    hubLabel: "Hub incalzire",
    slugs: [
      "boiler-electric-80l",
      "calorifer-electric",
      "aeroterma",
      "convector-electric",
      "radiator-ulei",
      "panou-radiant"
    ]
  },
  {
    title: "Electrocasnice",
    description:
      "Aparate folosite zilnic sau saptamanal, de la frigider la spalare si uscare.",
    hubHref: "/electrocasnice",
    hubLabel: "Hub electrocasnice",
    slugs: [
      "frigider",
      "congelator",
      "lada-frigorifica",
      "masina-de-spalat",
      "uscator-rufe",
      "masina-spalat-vase"
    ]
  },
  {
    title: "Bucatarie",
    description:
      "Aparate de gatit si preparare unde durata ciclului conteaza la fel de mult ca puterea.",
    hubHref: "/electrocasnice",
    hubLabel: "Hub electrocasnice",
    slugs: [
      "cuptor-electric",
      "cuptor-microunde",
      "fierbator-electric",
      "espressor",
      "plita-inductie"
    ]
  },
  {
    title: "Electronice si IT",
    description:
      "Electronice pentru lucru, divertisment si gaming, cu diferente mari intre utilizare usoara si intensa.",
    hubHref: "/electronice",
    hubLabel: "Hub electronice",
    slugs: ["pc-gaming", "televizor", "laptop"]
  },
  {
    title: "Iluminat",
    description:
      "Surse de lumina unde puterea este mica, dar numarul de becuri si orele aprinse conteaza.",
    hubHref: "/iluminat",
    hubLabel: "Hub iluminat",
    slugs: ["bec-led"]
  }
];

const pillarLinks = [
  {
    href: "/#calculator",
    title: "Calculator consum electric",
    description: "Introdu manual puterea si orele de utilizare pentru orice aparat."
  },
  {
    href: "/comparatii",
    title: "Comparatii aparate",
    description: "Vezi diferente de cost intre doua variante folosite in locuinta."
  },
  {
    href: "/ghiduri",
    title: "Ghiduri utile",
    description: "Citeste explicatii despre factura, kWh, metodologie si eficienta."
  }
];

const hubLinks =
  appliancePillar?.links
    .filter((link) => link.href !== "/aparate")
    .map((link) => ({
      href: link.href,
      title: link.label,
      description: link.description
    })) ?? [];

export default function AppliancesIndexPage() {
  const categories = applianceCategories
    .map((category) => ({
      ...category,
      pages: getExistingPages(category.slugs)
    }))
    .filter((category) => category.pages.length > 0);
  const displayedApplianceCount = categories.reduce(
    (total, category) => total + category.pages.length,
    0
  );

  return (
    <main>
      <JsonLdScript data={breadcrumbSchema} />
      <SiteHeader />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SeoBreadcrumbs
            className="mb-5"
            items={[
              { label: "Homepage", href: "/" },
              { label: "Aparate" }
            ]}
          />
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <article>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                {appliancePillar?.label ?? "Aparate"}
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
                Consum electric aparate
              </h1>
              <p className="mt-5 text-base leading-8 text-slate-700">
                Verifica rapid cat consuma aparatele electrice din casa si cat
                poate costa utilizarea lor pe luna. Fiecare ghid include exemple
                de calcul si valori pe care le poti ajusta dupa aparatul tau.
              </p>
            </article>

            <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <h2 className="text-2xl font-semibold text-slate-950">
                {displayedApplianceCount} aparate cu ghid dedicat
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Lista include ghidurile publicate acum. Daca nu gasesti un aparat,
                introdu manual puterea in W in calculatorul principal.
              </p>
              <Link
                href="/#calculator"
                className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Calculeaza manual un aparat
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Categorii
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Alege categoria aparatului
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Categoriile te ajuta sa compari aparate apropiate si sa gasesti
              mai repede consumatorii care pot influenta factura.
            </p>
          </div>

          <InternalLinksGrid
            className="mt-6"
            links={hubLinks}
            columns="three"
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8">
          {categories.map((category) => (
            <article
              key={category.title}
              className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
            >
              <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                    {category.hubLabel}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                  <Link
                    href={category.hubHref}
                    className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    Vezi hub-ul categoriei
                  </Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {category.pages.map((page) => (
                    <ApplianceCard key={page.slug} page={page} />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Urmatorul pas
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Calculeaza, compara sau citeste ghiduri
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Dupa ce gasesti aparatul, poti ajusta valorile in calculator,
              compara doua variante sau citi explicatii despre factura si
              eficienta energetica.
            </p>
          </div>
          <InternalLinksGrid links={pillarLinks} columns="three" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function getExistingPages(slugs: string[]) {
  return slugs
    .map((slug) => appliancePageBySlug.get(slug))
    .filter((page): page is SeoAppliancePage => Boolean(page));
}

function ApplianceCard({ page }: { page: SeoAppliancePage }) {
  return (
    <Link
      href={`/cat-consuma/${page.slug}`}
      className="rounded-lg border border-emerald-100 bg-white p-4 text-slate-950 shadow-sm transition hover:border-emerald-300 hover:-translate-y-0.5"
    >
      <span className="text-sm font-semibold text-emerald-700">
        {page.watts} W in scenariul de baza
      </span>
      <span className="mt-2 block text-lg font-semibold">{page.h1}</span>
      <span className="mt-2 block text-sm leading-6 text-slate-600">
        {page.metaDescription}
      </span>
    </Link>
  );
}
