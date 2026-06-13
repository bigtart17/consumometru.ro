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
import { siteNavigationPillars } from "@/data/siteNavigation";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculatoare consum electric - estimeaza costul energiei",
  description:
    "Foloseste calculatoarele Consumometru pentru a estima consumul electric, costul lunar, factura de energie si consumul locuintei.",
  alternates: {
    canonical: "/calculeaza"
  },
  openGraph: {
    title: "Calculatoare consum electric - estimeaza costul energiei",
    description:
      "Instrumente utile pentru estimarea consumului electric, a costului lunar, a facturii si a consumului locuintei.",
    url: "/calculeaza",
    type: "website",
    locale: "ro_RO"
  }
};

const calculatePillar = siteNavigationPillars.find(
  (pillar) => pillar.key === "calculeaza"
);

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Homepage", item: absoluteUrl("/") },
  { name: "Calculeaza", item: absoluteUrl("/calculeaza") }
]);

const mainCalculatorLinks = [
  {
    href: "/#calculator",
    title: "Calculator consum electric",
    eyebrow: "Aparat individual",
    description:
      "Introdu puterea in W, orele de utilizare, zilele pe luna si pretul kWh pentru o estimare rapida."
  },
  {
    href: "/#simulator-factura",
    title: "Simulator factura energie",
    eyebrow: "Mai multe aparate",
    description:
      "Adauga aparatele din locuinta si vezi consumul total lunar, costul estimat si principalii consumatori."
  },
  {
    href: "/cat-costa/1-kwh",
    title: "Costul unui kWh",
    eyebrow: "Pret energie",
    description:
      "Afla cum se transforma consumul in lei si de ce este important sa folosesti pretul din factura ta."
  },
  {
    href: "/#top-consumatori",
    title: "Top consumatori",
    eyebrow: "Prioritizare",
    description:
      "Vezi aparatele care pot influenta cel mai mult factura si merita verificate primele."
  }
];

const housingLinks = [
  {
    href: "/consum-locuinta/apartament-2-camere",
    title: "Apartament 2 camere",
    description: "Scenarii lunare pentru o locuinta mica sau medie."
  },
  {
    href: "/consum-locuinta/apartament-3-camere",
    title: "Apartament 3 camere",
    description: "Estimari pentru mai multe camere si aparate folosite zilnic."
  },
  {
    href: "/consum-locuinta/casa",
    title: "Casa",
    description: "Repere pentru consumul unei case, cu categorii de aparate."
  },
  {
    href: "/consum-locuinta/familie-2-persoane",
    title: "Familie 2 persoane",
    description: "Repere pentru o locuinta folosita moderat."
  },
  {
    href: "/consum-locuinta/familie-4-persoane",
    title: "Familie 4 persoane",
    description: "Scenarii pentru consum mai intens, spalat, gatit si electronice."
  }
];

const pillarLinks = [
  {
    href: "/aparate",
    title: "Aparate",
    description: "Ghiduri dedicate pentru aparate electrice si categorii de consum."
  },
  {
    href: "/comparatii",
    title: "Comparatii",
    description: "Compara doua aparate si vezi diferenta lunara si anuala."
  },
  {
    href: "/ghiduri",
    title: "Ghiduri",
    description: "Explicatii despre factura, eficienta energetica, metodologie si surse."
  }
];

export default function CalculatorsIndexPage() {
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
              { label: "Calculeaza" }
            ]}
          />
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              {calculatePillar?.label ?? "Calculeaza"}
            </p>
            <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
              Calculatoare consum electric
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-700">
              Foloseste instrumentele Consumometru pentru a estima consumul
              aparatelor electrice, costul lunar, factura de energie si consumul
              unei locuinte. Alege calculatorul potrivit, introdu valorile reale
              cand le ai la indemana si compara scenarii fara pasi complicati.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Instrumente principale
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Porneste cu un aparat individual, apoi treci la simulatorul de
                factura daca vrei sa vezi imaginea completa a locuintei.
              </p>
              <InternalLinksGrid
                className="mt-5"
                links={mainCalculatorLinks}
                columns="two"
              />
            </article>

            <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <h2 className="text-2xl font-semibold text-slate-950">
                Cum alegi rapid
              </h2>
              <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-700">
                <p>
                  Pentru un singur aparat, mergi direct la calculatorul de consum.
                  Pentru toata locuinta, foloseste simulatorul de factura.
                </p>
                <p>
                  Daca nu stii ce pret sa introduci, incepe cu pagina despre
                  costul unui kWh si verifica apoi valoarea din contract sau
                  factura.
                </p>
              </div>
              <Link
                href="/#calculator"
                className="mt-5 inline-flex rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Deschide calculatorul principal
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Consum locuinta
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Estimeaza consumul pentru apartament, casa sau familie
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Paginile de locuinta te ajuta sa pornesti de la scenarii realiste:
              numar de camere, numar de persoane si categorii de aparate folosite
              frecvent.
            </p>
          </div>
          <InternalLinksGrid
            className="mt-6"
            links={housingLinks}
            columns="three"
          />
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Continua navigarea
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Exploreaza si celelalte zone ale site-ului
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Dupa ce ai o estimare de cost, poti verifica aparate individuale,
              comparatii intre variante sau ghiduri despre factura si eficienta.
            </p>
          </div>
          <InternalLinksGrid links={pillarLinks} columns="three" />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
