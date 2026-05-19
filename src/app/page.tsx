import Link from "next/link";
import { BillSimulator } from "@/components/bill-simulator";
import { EnergyCalculator } from "@/components/energy-calculator";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TopConsumers } from "@/components/top-consumers";
import { appliancePresets } from "@/data/appliancePresets";
import { faqItems } from "@/data/faq";

const formulaSteps = [
  {
    title: "1. Pornesti de la puterea aparatului",
    body: "Puterea este trecuta de obicei pe eticheta, in manual sau pe incarcator. Un calorifer poate avea 2000 W, un laptop 45-90 W, iar un bec LED 8-12 W."
  },
  {
    title: "2. O transformi in kWh",
    body: "Formula folosita pe factura este simpla: W / 1000 × ore de folosire × zile. De exemplu, 1000 W folosit 2 ore inseamna 2 kWh pe zi."
  },
  {
    title: "3. Inmultesti cu pretul energiei",
    body: "Pretul final depinde de contractul tau. Daca folosesti 60 kWh pe luna si platesti 1,30 lei/kWh, costul estimativ este 78 lei pe luna."
  }
];

const calculationExamples = [
  {
    title: "Bec LED folosit seara in sufragerie",
    values: "10 W × 5 ore/zi × 30 zile",
    result: "1,5 kWh/luna",
    cost: "aproximativ 1,95 lei/luna la 1,30 lei/kWh",
    note: "Diferenta devine importanta cand ai mai multe becuri aprinse zilnic."
  },
  {
    title: "Boiler electric folosit zilnic",
    values: "2000 W × 2 ore/zi × 30 zile",
    result: "120 kWh/luna",
    cost: "aproximativ 156 lei/luna la 1,30 lei/kWh",
    note: "Temperatura setata si izolarea boilerului pot schimba mult consumul real."
  },
  {
    title: "PC gaming folosit dupa munca",
    values: "550 W × 4 ore/zi × 30 zile",
    result: "66 kWh/luna",
    cost: "aproximativ 85,8 lei/luna la 1,30 lei/kWh",
    note: "In jocuri solicitante consumul poate fi mai mare decat in browsing sau filme."
  }
];

const commonAppliances = [
  {
    name: "Boiler electric",
    href: "/cat-consuma/boiler-electric-80l",
    usage: "2000 W, 2 ore/zi",
    monthly: "120 kWh/luna",
    cost: "156 lei/luna",
    insight: "Unul dintre aparatele care poate ridica rapid factura daca functioneaza zilnic."
  },
  {
    name: "Aer conditionat 12000 BTU",
    href: "/cat-consuma/aer-conditionat-12000-btu",
    usage: "1200 W, 5 ore/zi",
    monthly: "180 kWh/luna",
    cost: "234 lei/luna",
    insight: "Costul depinde mult de temperatura setata, izolatia camerei si modul inverter."
  },
  {
    name: "Frigider",
    href: "/cat-consuma/frigider",
    usage: "120 W, functionare intermitenta",
    monthly: "28,8 kWh/luna",
    cost: "37,4 lei/luna",
    insight: "Merge permanent, dar compresorul nu consuma la putere maxima tot timpul."
  },
  {
    name: "Calorifer electric",
    href: "/cat-consuma/calorifer-electric",
    usage: "2000 W, 4 ore/zi",
    monthly: "240 kWh/luna",
    cost: "312 lei/luna",
    insight: "Poate fi scump pentru incalzire zilnica, mai ales in camere slab izolate."
  },
  {
    name: "Masina de spalat",
    href: "/cat-consuma/masina-de-spalat",
    usage: "700 W, 1 ora/zi",
    monthly: "21 kWh/luna",
    cost: "27,3 lei/luna",
    insight: "Programele cu apa calda consuma mai mult decat cele eco sau la temperatura mica."
  },
  {
    name: "Bec LED",
    href: "/cat-consuma/bec-led",
    usage: "10 W, 6 ore/zi",
    monthly: "1,8 kWh/luna",
    cost: "2,3 lei/luna",
    insight: "Cost mic pe bec, dar conteaza daca inlocuieste multe becuri incandescente."
  }
];

const savingTips = [
  {
    title: "Uita-te intai la aparatele mari",
    body: "Boilerul, caloriferul electric, aerul conditionat, uscatorul de rufe si plita pot consuma intr-o luna cat zeci de becuri LED. Acolo apar cele mai mari diferente."
  },
  {
    title: "Redu timpul, nu doar puterea",
    body: "Un aparat de 2000 W folosit cu o ora mai putin pe zi poate economisi aproximativ 60 kWh pe luna, adica 78 lei la 1,30 lei/kWh."
  },
  {
    title: "Foloseste programele eco cand au sens",
    body: "La masina de spalat sau uscator, programele potrivite pot reduce incalzirea apei sau durata de functionare intensa. Diferenta se vede mai ales la folosire frecventa."
  },
  {
    title: "Verifica stand-by-ul aparatelor vechi",
    body: "Un consum mic, dar permanent, se aduna. Routerul, televizorul, boxele, consolele si incarcatoarele pot conta daca raman pornite tot timpul."
  }
];

const dedicatedGuides = [
  { href: "/cat-consuma/aer-conditionat-12000-btu", label: "Cat consuma un aer conditionat 12000 BTU" },
  { href: "/cat-consuma/pc-gaming", label: "Cat consuma un PC gaming" },
  { href: "/cat-consuma/boiler-electric-80l", label: "Cat consuma un boiler electric de 80 l" },
  { href: "/cat-consuma/frigider", label: "Cat consuma un frigider" },
  { href: "/cat-consuma/calorifer-electric", label: "Cat consuma un calorifer electric" },
  { href: "/cat-consuma/televizor", label: "Cat consuma un televizor" },
  { href: "/cat-consuma/masina-de-spalat", label: "Cat consuma o masina de spalat" },
  { href: "/cat-consuma/uscator-rufe", label: "Cat consuma un uscator de rufe" },
  { href: "/cat-consuma/cuptor-electric", label: "Cat consuma un cuptor electric" },
  { href: "/cat-consuma/bec-led", label: "Cat consuma un bec LED" }
];

const popularCalculators = [
  {
    href: "/#calculator",
    title: "Calculator consum aparat",
    body: "Calculeaza rapid consumul si costul pentru un singur aparat electric."
  },
  {
    href: "/#simulator-factura",
    title: "Simulator factura lunara",
    body: "Adauga mai multe aparate si vezi consumul total estimat al locuintei."
  },
  {
    href: "/#top-consumatori",
    title: "Top consumatori din casa",
    body: "Vezi aparatele care pot influenta cel mai mult factura de energie."
  },
  {
    href: "/cat-consuma/boiler-electric-80l",
    title: "Calculator boiler electric",
    body: "Porneste de la un scenariu precompletat pentru apa calda."
  },
  {
    href: "/cat-consuma/aer-conditionat-12000-btu",
    title: "Calculator aer conditionat",
    body: "Estimeaza costul lunar pentru racire sau folosire intensa vara."
  },
  {
    href: "/cat-consuma/calorifer-electric",
    title: "Calculator calorifer electric",
    body: "Compara rapid costul incalzirii electrice directe."
  }
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section className="px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-16 lg:pt-8">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="order-2 max-w-2xl lg:order-1 lg:pt-2">
            <p className="mb-4 inline-flex items-center rounded-full border border-emerald-200 bg-white/75 px-3 py-1 text-sm font-medium text-emerald-800 shadow-sm">
              Romania • lei/kWh • estimari instant
            </p>
            <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Consumometru: calculator consum electric si cost energie
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8">
              Afla cat consuma un aparat electric, cat te costa pe luna si ce
              schimbari pot reduce factura. Calculatorul foloseste puterea in W,
              orele de utilizare, zilele pe luna si pretul real din factura ta.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
              Este util cand vrei sa verifici un boiler, un aer conditionat, un
              frigider vechi, un PC gaming sau mai multe aparate din locuinta.
              Rezultatele sunt estimative, dar te ajuta sa compari scenarii
              concrete inainte sa iei o decizie.
            </p>
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

      <section id="calculatoare-populare" className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Calculatoare populare
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Incepe cu estimarea de care ai nevoie
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Linkurile de mai jos duc catre instrumentele si paginile cele mai
              folosite. Sunt gandite ca puncte rapide de intrare pentru consumul
              unui aparat, factura lunara sau aparatele mari din casa.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularCalculators.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Formula de calcul
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Cum se calculeaza consumul electric al unui aparat
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Pentru factura nu conteaza doar puterea aparatului, ci si cat timp
              functioneaza. De aceea un aparat puternic folosit rar poate costa
              mai putin decat unul mai mic lasat pornit zilnic.
            </p>
            <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-950">
              kWh = W / 1000 × ore pe zi × zile pe luna
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {formulaSteps.map((card) => (
              <article
                key={card.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Exemple reale de calcul
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Exemple concrete de consum si cost lunar
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Exemplele de mai jos folosesc pretul orientativ de 1,30 lei/kWh.
              Pentru o estimare mai apropiata de factura ta, introdu pretul din
              contract in calculatorul de sus.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {calculationExamples.map((example) => (
              <article
                key={example.title}
                className="rounded-lg border border-emerald-100 bg-white/82 p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {example.title}
                </h3>
                <p className="mt-3 rounded-lg bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
                  {example.values}
                </p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">
                  {example.result}
                </p>
                <p className="mt-2 text-sm font-semibold text-emerald-800">
                  {example.cost}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {example.note}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="aparate" className="border-y border-emerald-100 bg-white/72 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Aparate comune
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Cele mai comune aparate si consumul lor
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Valorile sunt estimative si pornesc de la scenarii des intalnite
              in locuinte din Romania. Foloseste-le ca punct de plecare, apoi
              ajusteaza puterea si orele dupa aparatul tau.
            </p>
          </div>

          <div className="mt-7 overflow-hidden rounded-lg border border-emerald-100 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.1fr_0.9fr_0.8fr_0.8fr_1.4fr] gap-4 border-b border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-emerald-900 lg:grid">
              <span>Aparat</span>
              <span>Scenariu</span>
              <span>Consum lunar</span>
              <span>Cost lunar</span>
              <span>Observatie utila</span>
            </div>
            <div className="divide-y divide-emerald-50">
              {commonAppliances.map((appliance) => (
                <article
                  key={appliance.name}
                  className="grid gap-3 p-4 text-sm lg:grid-cols-[1.1fr_0.9fr_0.8fr_0.8fr_1.4fr] lg:items-center"
                >
                  <Link
                    href={appliance.href}
                    className="text-base font-semibold text-slate-950 hover:text-emerald-700"
                  >
                    {appliance.name}
                  </Link>
                  <p className="text-slate-600">{appliance.usage}</p>
                  <p className="font-semibold text-slate-950">{appliance.monthly}</p>
                  <p className="font-semibold text-emerald-800">{appliance.cost}</p>
                  <p className="leading-6 text-slate-600">{appliance.insight}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BillSimulator />

      <TopConsumers />

      <section className="bg-white/72 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Economie
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Cum reduci factura la curent fara calcule complicate
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Nu toate economiile vin din schimbarea furnizorului. De multe ori,
              cele mai rapide imbunatatiri apar cand intelegi care aparat consuma
              mult si cat timp functioneaza.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {savingTips.map((tip) => (
              <article
                key={tip.title}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-slate-950">
                  {tip.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {tip.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="ghiduri-utile" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Linkuri interne
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Ghiduri dedicate pentru aparatele cautate cel mai des
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Fiecare pagina include calculator precompletat, explicatii,
              estimari lunare si intrebari frecvente pentru aparatul respectiv.
            </p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {dedicatedGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="rounded-lg border border-emerald-100 bg-white/82 p-5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
              >
                {guide.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq items={faqItems} />
      <SiteFooter />
    </main>
  );
}
