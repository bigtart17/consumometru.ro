import Link from "next/link";
import { DeferredBillSimulator } from "@/components/deferred-bill-simulator";
import { EnergyCalculator } from "@/components/energy-calculator";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { appliancePresets } from "@/data/appliancePresets";
import { faqItems } from "@/data/faq";
import { siteNavigationPillars } from "@/data/siteNavigation";

const pillarCards = siteNavigationPillars.map((pillar) => ({
  href: pillar.href,
  title: pillar.label,
  body: pillar.description,
  cta:
    pillar.key === "calculeaza"
      ? "Alege calculatorul"
      : pillar.key === "aparate"
        ? "Vezi aparatele"
        : pillar.key === "comparatii"
          ? "Vezi comparatiile"
          : "Citeste ghidurile"
}));

const topAppliances = [
  {
    name: "Boiler electric",
    href: "/cat-consuma/boiler-electric-80l",
    usage: "2000 W, 2 ore/zi",
    monthly: "120 kWh/luna",
    cost: "156 lei/luna",
    insight: "Un aparat important de verificat cand apa calda este electrica."
  },
  {
    name: "Aer conditionat 12000 BTU",
    href: "/cat-consuma/aer-conditionat-12000-btu",
    usage: "1200 W, 5 ore/zi",
    monthly: "180 kWh/luna",
    cost: "234 lei/luna",
    insight: "Costul depinde mult de temperatura setata si de izolatia camerei."
  },
  {
    name: "Calorifer electric",
    href: "/cat-consuma/calorifer-electric",
    usage: "2000 W, 4 ore/zi",
    monthly: "240 kWh/luna",
    cost: "312 lei/luna",
    insight: "Poate deveni scump rapid daca este folosit zilnic pentru incalzire."
  },
  {
    name: "Frigider",
    href: "/cat-consuma/frigider",
    usage: "120 W, functionare intermitenta",
    monthly: "28,8 kWh/luna",
    cost: "37,4 lei/luna",
    insight: "Functioneaza permanent, asa ca eficienta si vechimea conteaza."
  },
  {
    name: "PC gaming",
    href: "/cat-consuma/pc-gaming",
    usage: "550 W, 4 ore/zi",
    monthly: "66 kWh/luna",
    cost: "85,8 lei/luna",
    insight: "In jocuri solicitante poate consuma mult mai mult decat un laptop."
  }
];

const popularComparisons = [
  {
    href: "/comparatii/calorifer-electric-vs-aer-conditionat",
    title: "Calorifer electric vs aer conditionat",
    body: "Compara incalzirea electrica directa cu un aparat folosit pe pompa de caldura."
  },
  {
    href: "/comparatii/boiler-electric-vs-instant",
    title: "Boiler electric vs instant",
    body: "Vezi diferenta dintre apa calda stocata si incalzirea la cerere."
  },
  {
    href: "/comparatii/bec-led-vs-bec-incandescent",
    title: "Bec LED vs bec incandescent",
    body: "O comparatie simpla pentru iluminat si costuri mici care se aduna."
  },
  {
    href: "/comparatii/laptop-vs-desktop",
    title: "Laptop vs desktop",
    body: "Afla cand diferenta de consum conteaza pentru lucru sau divertisment."
  },
  {
    href: "/comparatii/consum-aer-conditionat-vs-ventilator",
    title: "Aer conditionat vs ventilator",
    body: "Compara racirea activa cu circularea aerului in zilele calde."
  },
  {
    href: "/comparatii/consum-uscator-rufe-vs-uscare-naturala",
    title: "Uscator rufe vs uscare naturala",
    body: "Estimeaza cat platesti pentru confort si timp castigat."
  }
];

const housingScenarios = [
  {
    href: "/consum-locuinta/apartament-2-camere",
    title: "Apartament 2 camere",
    body: "Repere pentru o locuinta mica sau medie, fara aparate electrice extreme."
  },
  {
    href: "/consum-locuinta/apartament-3-camere",
    title: "Apartament 3 camere",
    body: "Scenarii pentru mai multe camere, electronice si electrocasnice folosite zilnic."
  },
  {
    href: "/consum-locuinta/casa",
    title: "Casa",
    body: "Estimari pentru locuinte cu mai multe camere si consumatori suplimentari."
  },
  {
    href: "/consum-locuinta/familie-4-persoane",
    title: "Familie 4 persoane",
    body: "Repere pentru spalare, gatit, iluminat si electronice folosite intens."
  }
];

const usefulGuides = [
  {
    href: "/ghiduri/cum-citesti-factura-la-curent",
    title: "Cum citesti factura la curent",
    body: "Gaseste consumul in kWh si pretul pe care il poti folosi in calculator."
  },
  {
    href: "/cat-costa/1-kwh",
    title: "Cat costa 1 kWh",
    body: "Afla cum transformi consumul electric in cost lunar."
  },
  {
    href: "/eficienta-energetica",
    title: "Ghid de eficienta energetica",
    body: "Vezi ce aparate merita verificate primele si cum reduci consumul."
  },
  {
    href: "/metodologie",
    title: "Metodologie",
    body: "Intelege formula, limitele calculului si ce factori schimba rezultatul."
  }
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-8">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 max-w-2xl lg:order-1 lg:pt-4">
            <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-white/75 px-3 py-1 text-sm font-medium text-emerald-800 shadow-sm">
              Romania • lei/kWh • calcul instant
            </p>
            <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Consumometru: calculator consum electric si cost energie
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8">
              Afla cat consuma un aparat electric, cat te costa pe luna si ce
              schimbari pot reduce factura. Calculatorul foloseste puterea in W,
              orele de utilizare, zilele pe luna si pretul real din factura ta.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#calculator"
                className="rounded-lg bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Calculeaza acum
              </Link>
              <Link
                href="/calculeaza"
                className="rounded-lg border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-800 transition hover:border-emerald-300"
              >
                Vezi toate calculatoarele
              </Link>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:mt-7 sm:grid-cols-3">
              <span className="rounded-lg border border-emerald-100 bg-white/80 px-3 py-2">
                kWh calculat automat
              </span>
              <span className="rounded-lg border border-emerald-100 bg-white/80 px-3 py-2">
                Cost zilnic, lunar, anual
              </span>
              <span className="rounded-lg border border-emerald-100 bg-white/80 px-3 py-2">
                Preset-uri aparate
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <EnergyCalculator presets={appliancePresets} />
          </div>
        </div>
      </section>

      <section id="navigare-rapida" className="border-y border-emerald-100 bg-white/72 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Navigare rapida
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Alege zona potrivita
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pillarCards.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-40 flex-col rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
                <span className="mt-4 text-sm font-semibold text-emerald-700 group-hover:text-emerald-800">
                  {item.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="top-consumatori" className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Top aparate calculate
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Aparatele care merita verificate primele
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {topAppliances.map((appliance) => (
              <Link
                key={appliance.href}
                href={appliance.href}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {appliance.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{appliance.usage}</p>
                <p className="mt-4 text-xl font-semibold text-slate-950">
                  {appliance.monthly}
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-800">
                  {appliance.cost}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {appliance.insight}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/aparate"
            className="mt-6 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Vezi toate aparatele
          </Link>
        </div>
      </section>

      <DeferredBillSimulator />

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Comparatii populare
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Vezi ce varianta poate costa mai putin
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600 lg:text-right">
              Compara aparate apropiate si vezi diferenta lunara si anuala in
              scenarii de lucru.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularComparisons.map((comparison) => (
              <Link
                key={comparison.href}
                href={comparison.href}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {comparison.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {comparison.body}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/comparatii"
            className="mt-6 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Vezi toate comparatiile
          </Link>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Scenarii locuinta
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Estimeaza consumul pentru casa sau apartament
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Daca vrei o privire de ansamblu, porneste de la un scenariu de
              locuinta si ajusteaza apoi aparatele in simulator.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {housingScenarios.map((scenario) => (
              <Link
                key={scenario.href}
                href={scenario.href}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {scenario.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {scenario.body}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/ghiduri"
            className="mt-6 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Vezi toate ghidurile
          </Link>
        </div>
      </section>

      <section id="ghiduri-utile" className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Ghiduri utile
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Explicatii scurte pentru decizii mai bune
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600 lg:text-right">
              Detaliile despre formule, facturi si economie sunt grupate in
              pagina de ghiduri.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {usefulGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {guide.body}
                </p>
              </Link>
            ))}
          </div>

          <Link
            href="/ghiduri"
            className="mt-6 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Deschide pagina de ghiduri
          </Link>
        </div>
      </section>

      <Faq items={faqItems} />
      <SiteFooter />
    </main>
  );
}
