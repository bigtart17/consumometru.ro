import type { Metadata } from "next";
import { InternalLinksGrid, type InternalLinkCard } from "@/components/seo/internal-links-grid";
import {
  createBreadcrumbSchema,
  JsonLdScript
} from "@/components/seo/json-ld-script";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allScenarioPages } from "@/data/seoScenarioPages";
import { siteNavigationPillars } from "@/data/siteNavigation";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ghiduri consum electric si facturi energie",
  description:
    "Ghiduri utile despre consum electric, facturi energie, cost kWh, consumul locuintei, economisire si metodologia de calcul.",
  alternates: {
    canonical: "/ghiduri"
  },
  openGraph: {
    title: "Ghiduri consum electric si facturi energie",
    description:
      "Explicatii utile despre consum electric, facturi, cost kWh, scenarii de locuinta si metodologia Consumometru.",
    url: "/ghiduri",
    type: "website",
    locale: "ro_RO"
  }
};

type GuideGroup = {
  title: string;
  description: string;
  links: InternalLinkCard[];
};

const guidePillar = siteNavigationPillars.find((pillar) => pillar.key === "ghiduri");

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Homepage", item: absoluteUrl("/") },
  { name: "Ghiduri", item: absoluteUrl("/ghiduri") }
]);

const scenarioPageByPath = new Map<string, InternalLinkCard>(
  allScenarioPages.map((page) => [
    `/${page.basePath}/${page.slug}`,
    {
      href: `/${page.basePath}/${page.slug}`,
      title: page.h1,
      eyebrow: page.eyebrow,
      description: page.metaDescription
    }
  ])
);

const guideGroups: GuideGroup[] = [
  {
    title: "Facturi energie",
    description:
      "Ghiduri care te ajuta sa intelegi pretul kWh, consumul facturat si modul in care transformi kWh in cost lunar.",
    links: getScenarioLinks([
      "/ghiduri/cum-citesti-factura-la-curent",
      "/cat-costa/1-kwh"
    ])
  },
  {
    title: "Consum locuinta",
    description:
      "Scenarii utile pentru apartamente, case si familii, cu repere pe categorii de aparate.",
    links: getScenarioLinks([
      "/consum-locuinta/apartament-2-camere",
      "/consum-locuinta/apartament-3-camere",
      "/consum-locuinta/casa",
      "/consum-locuinta/familie-2-persoane",
      "/consum-locuinta/familie-4-persoane"
    ])
  },
  {
    title: "Economisire energie",
    description:
      "Explicatii pentru reducerea consumului lunar fara promisiuni exagerate sau valori fixe.",
    links: [
      {
        href: "/eficienta-energetica",
        title: "Ghid de eficienta energetica",
        eyebrow: "Economisire",
        description:
          "Cum reduci consumul electric, cum citesti factura, cat costa 1 kWh si ce aparate merita verificate primele."
      }
    ]
  },
  {
    title: "Incredere si metodologie",
    description:
      "Pagini despre cum sunt facute estimarile, ce limite au calculele si cine este Consumometru.",
    links: [
      {
        href: "/metodologie",
        title: "Metodologie calcul consum electric",
        eyebrow: "Calcul transparent",
        description:
          "Formula folosita, rolul pretului kWh, limitele estimarilor si factorii care pot schimba consumul real."
      },
      {
        href: "/surse",
        title: "Surse pentru valorile de consum",
        eyebrow: "Date folosite",
        description:
          "Tipurile de informatii folosite pentru preset-uri si cum trebuie citite valorile din ghiduri."
      },
      {
        href: "/despre",
        title: "Despre Consumometru",
        eyebrow: "Proiect",
        description:
          "De ce exista calculatorul, cui ii este util si cum trebuie interpretate rezultatele."
      }
    ]
  }
];

const pillarLinks = [
  {
    href: "/calculeaza",
    title: "Calculeaza",
    description: "Alege calculatorul potrivit pentru aparat, factura sau locuinta."
  },
  {
    href: "/aparate",
    title: "Aparate",
    description: "Vezi ghidurile dedicate pentru aparate electrice din casa."
  },
  {
    href: "/comparatii",
    title: "Comparatii",
    description: "Compara doua aparate si vezi diferentele de consum si cost."
  }
];

export default function GuidesIndexPage() {
  const displayedGuideCount = guideGroups.reduce(
    (total, group) => total + group.links.length,
    0
  );

  return (
    <main>
      <JsonLdScript data={breadcrumbSchema} />
      <SiteHeader />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:col-span-2">
            <SeoBreadcrumbs
              items={[
                { label: "Homepage", href: "/" },
                { label: "Ghiduri" }
              ]}
            />
          </div>
          <article>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              {guidePillar?.label ?? "Ghiduri"}
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Ghiduri despre consum electric si facturi energie
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-700">
              Aici gasesti explicatii despre consum electric, facturi energie,
              costul unui kWh, scenarii de locuinta, economisire si metodologia
              de calcul. Continutul este gandit ca reper practic pentru decizii
              de zi cu zi, nu ca promisiune de factura fixa.
            </p>
          </article>

          <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
            <h2 className="text-2xl font-semibold text-slate-950">
              {displayedGuideCount} ghiduri si pagini utile
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Porneste cu factura sau costul kWh daca vrei sa intelegi suma de
              plata, apoi treci la scenarii de locuinta si ghiduri de economie.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8">
          {guideGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
            >
              <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <h2 className="text-3xl font-semibold text-slate-950">
                    {group.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {group.description}
                  </p>
                </div>
                <InternalLinksGrid links={group.links} columns="two" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Navigare
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Continua cu instrumente si pagini de aparate
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Dupa ce intelegi factura sau scenariul locuintei, poti calcula
              aparate individuale ori compara doua variante.
            </p>
          </div>
          <InternalLinksGrid links={pillarLinks} columns="three" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function getScenarioLinks(paths: string[]) {
  return paths
    .map((path) => scenarioPageByPath.get(path))
    .filter((link): link is InternalLinkCard => Boolean(link));
}
