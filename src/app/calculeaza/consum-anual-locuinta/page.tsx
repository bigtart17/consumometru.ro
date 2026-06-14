import type { Metadata } from "next";
import { AnnualHomeConsumptionCalculator } from "@/components/annual-home-consumption/annual-home-consumption-calculator";
import { CalculatorCta } from "@/components/seo/calculator-cta";
import { FaqSection } from "@/components/seo/faq-section";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  JsonLdScript,
  type FaqItem
} from "@/components/seo/json-ld-script";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculator consum anual locuinta – estimare lunara pe tot anul",
  description:
    "Estimeaza consumul electric anual al locuintei pe luni, in functie de tipul locuintei, numarul de persoane, aparatele folosite si pretul energiei.",
  alternates: {
    canonical: "/calculeaza/consum-anual-locuinta"
  },
  openGraph: {
    title: "Calculator consum anual locuinta – estimare lunara pe tot anul",
    description:
      "Calculeaza consumul anual al locuintei, costul lunar, media anuala si aparatele care cantaresc cel mai mult in factura.",
    url: "/calculeaza/consum-anual-locuinta",
    type: "website",
    locale: "ro_RO"
  }
};

const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Homepage", item: absoluteUrl("/") },
  { name: "Calculează", item: absoluteUrl("/calculeaza") },
  {
    name: "Calculator consum anual locuință",
    item: absoluteUrl("/calculeaza/consum-anual-locuinta")
  }
]);

const faqItems: FaqItem[] = [
  {
    question: "Cum estimez consumul anual de energie electrică?",
    answer:
      "Pornești de la aparatele folosite în locuință, puterea lor în W, orele de utilizare și prețul energiei. Calculatorul împarte rezultatul pe luni și adună consumul pentru a obține totalul anual."
  },
  {
    question: "De ce consumul este mai mare vara sau iarna?",
    answer:
      "Vara pot crește orele de funcționare ale aerului condiționat, iar iarna pot crește iluminatul, boilerul sau încălzirea electrică. Din acest motiv, o medie lunară simplă nu arată mereu corect vârfurile din an."
  },
  {
    question: "Pot folosi calculatorul pentru apartament și casă?",
    answer:
      "Da. Alege tipul locuinței și ajustează aparatele folosite. O casă mare poate avea mai mult iluminat, mai multe camere răcite sau încălzite și consumatori suplimentari față de un apartament."
  },
  {
    question: "Cât de exacte sunt rezultatele?",
    answer:
      "Rezultatele sunt estimări de lucru. Consumul real poate fi diferit din cauza modelului aparatului, clasei energetice, temperaturii setate, modului de utilizare și prețului final din contractul de energie."
  },
  {
    question: "Ce preț pe kWh ar trebui să introduc?",
    answer:
      "Cel mai bine este să introduci prețul total pe kWh din factură sau din contract. Dacă nu îl ai la îndemână, poți porni de la valoarea implicită și o poți schimba când verifici factura."
  }
];

const faqSchema = createFaqSchema(faqItems);

export default function AnnualHomeConsumptionPage() {
  return (
    <main>
      <JsonLdScript data={breadcrumbSchema} />
      <JsonLdScript data={faqSchema} />
      <SiteHeader />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SeoBreadcrumbs
            className="mb-5"
            items={[
              { label: "Homepage", href: "/" },
              { label: "Calculează", href: "/calculeaza" },
              { label: "Consum anual locuință" }
            ]}
          />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.45fr)] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Calculator locuință
              </p>
              <h1 className="mt-2 max-w-4xl text-4xl font-semibold text-slate-950 sm:text-5xl">
                Calculator consum anual locuință
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                Estimează consumul electric al locuinței pentru fiecare lună din
                an. Alege tipul locuinței, numărul de persoane, aparatele
                folosite și prețul energiei pentru a vedea totalul anual, media
                lunară și principalii consumatori.
              </p>
            </div>

            <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
              <h2 className="text-xl font-semibold text-slate-950">
                Ce afli din calcul
              </h2>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">
                <li>Consum și cost pentru fiecare lună.</li>
                <li>Total anual și medie lunară.</li>
                <li>Top aparate care consumă cel mai mult.</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <AnnualHomeConsumptionCalculator />

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              Cum se calculează consumul anual al locuinței?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Calculul pornește de la fiecare aparat: puterea în W, orele de
              utilizare pe zi și numărul de aparate. Rezultatul este împărțit pe
              luni, apoi ajustat pentru tipul locuinței, numărul de persoane,
              obiceiurile de consum și sezonalitate.
            </p>
          </article>

          <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              De ce factura diferă de la o lună la alta?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Vara se poate adăuga aerul condiționat, iar iarna apar mai multe
              ore de iluminat, apă caldă sau încălzire electrică. De aceea,
              două luni cu aceleași aparate în casă pot avea costuri diferite.
            </p>
          </article>

          <article className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">
              Ce aparate influențează cel mai mult consumul anual?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              În multe locuințe, vârfurile vin de la încălzire electrică,
              boiler, aer condiționat, uscător de rufe, plită sau cuptor. Topul
              anual te ajută să vezi unde merită să verifici prima dată.
            </p>
          </article>
        </div>
      </section>

      <FaqSection
        items={faqItems}
        eyebrow="Întrebări frecvente"
        title="Întrebări despre consumul anual al locuinței"
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Calculatoare recomandate
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            Continuă cu estimări mai detaliate
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            După estimarea anuală, poți verifica un aparat individual, costul
            unui kWh sau metodologia folosita pentru calcule.
          </p>
          <CalculatorCta
            links={[
              { href: "/#calculator", label: "Calculator aparat", variant: "primary" },
              { href: "/cat-costa/1-kwh", label: "Cost 1 kWh" },
              { href: "/metodologie", label: "Metodologie" },
              { href: "/surse", label: "Surse" }
            ]}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
