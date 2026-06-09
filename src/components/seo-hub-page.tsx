import Link from "next/link";
import { CalculatorCta } from "@/components/seo/calculator-cta";
import { FaqSection } from "@/components/seo/faq-section";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  JsonLdScript
} from "@/components/seo/json-ld-script";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { seoComparisons } from "@/data/seoComparisons";
import { hubBySlug, type SeoHub } from "@/data/seoHubs";
import { absoluteUrl } from "@/lib/site";

type SeoHubPageProps = {
  hub: SeoHub;
};

export function SeoHubPage({ hub }: SeoHubPageProps) {
  const relatedHubs = hub.relatedHubSlugs
    .map((slug) => hubBySlug.get(slug))
    .filter((item): item is SeoHub => Boolean(item));
  const relatedComparisons = seoComparisons.filter(
    (comparison) => comparison.hubHref === `/${hub.slug}`
  );
  const faqSchema = createFaqSchema(hub.faq);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Acasa", item: absoluteUrl("/") },
    { name: hub.h1, item: absoluteUrl(`/${hub.slug}`) }
  ]);

  return (
    <main>
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <SiteHeader />

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SeoBreadcrumbs items={[{ label: "Acasa", href: "/" }, { label: hub.h1 }]} />

          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <article>
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                {hub.eyebrow}
              </p>
              <h1 className="mt-2 text-4xl font-semibold text-slate-950 sm:text-5xl">
                {hub.h1}
              </h1>
              <div className="mt-5 grid gap-4 text-base leading-8 text-slate-700">
                {hub.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <CalculatorCta
                links={[
                  { href: "/#calculator", label: "Deschide calculatorul principal", variant: "primary" },
                  { href: "/metodologie", label: "Metodologie" },
                  { href: "/surse", label: "Surse" }
                ]}
              />
            </article>

            <aside className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-950">
                Pagini si calcule utile
              </h2>
              <div className="mt-5 grid gap-3">
                {hub.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href ?? "/#calculator"}
                    className="rounded-lg border border-emerald-100 bg-emerald-50/45 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    <span className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-semibold text-slate-950">
                        {item.name}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800">
                        {item.status === "guide" ? "Ghid dedicat" : "Calculeaza manual"}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-600">
                      {item.description}
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white/72 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Sfaturi practice
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              {hub.tipsTitle}
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {hub.tips.map((tip) => (
              <article
                key={tip}
                className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <p className="text-sm leading-7 text-slate-700">{tip}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Cum folosesti hub-ul
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950">
              Ce merita verificat prima data
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Nu toate aparatele merita aceeasi atentie. Prioritizeaza calculele
              dupa putere, ore de utilizare si frecventa. Asa gasesti mai repede
              consumatorii care pot influenta factura lunara.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {buildHubPriorityCards(hub).map((item) => (
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

      {relatedComparisons.length > 0 ? (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Comparatii utile
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Compara aparate din aceeasi zona
              </h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {relatedComparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={`/comparatii/${comparison.slug}`}
                  className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300"
                >
                  <span className="text-sm font-semibold text-emerald-700">
                    Comparatie consum
                  </span>
                  <span className="mt-2 block text-xl font-semibold text-slate-950">
                    {comparison.h1}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {comparison.metaDescription}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedHubs.length > 0 ? (
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
                Ghiduri apropiate
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">
                Continua cu hub-uri relevante
              </h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedHubs.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="rounded-lg border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300"
                >
                  <span className="text-sm font-semibold text-emerald-700">
                    {item.eyebrow}
                  </span>
                  <span className="mt-2 block text-xl font-semibold text-slate-950">
                    {item.h1}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">
                    {item.metaDescription}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection items={hub.faq} />

      <SiteFooter />
    </main>
  );
}

function buildHubPriorityCards(hub: SeoHub) {
  const firstGuide = hub.items.find((item) => item.status === "guide") ?? hub.items[0];
  const manualItem = hub.items.find((item) => item.status === "calculator");

  return [
    {
      title: "Aparate cu putere mare",
      body: `Incepe cu aparatele din categoria ${hub.h1.toLowerCase()} care au putere ridicata sau incalzesc/racesc activ. Chiar si cateva ore pe zi pot adauga multi kWh lunar.`
    },
    {
      title: "Aparate folosite multe ore",
      body: "Un aparat cu putere moderata poate deveni important daca functioneaza zilnic. Noteaza orele reale, nu doar puterea de pe eticheta."
    },
    {
      title: "Ghiduri dedicate",
      body: firstGuide?.href
        ? `Pentru un punct de pornire rapid, intra pe pagina ${firstGuide.name.toLowerCase()} si ajusteaza calculatorul dupa modelul tau.`
        : "Foloseste calculatorul principal cu valorile de pe eticheta sau din manualul aparatului."
    },
    {
      title: "Aparate fara pagina dedicata",
      body: manualItem
        ? `Pentru ${manualItem.name.toLowerCase()}, introdu manual puterea in W si orele de utilizare. Rezultatul este mai util decat o medie generala.`
        : "Daca nu gasesti aparatul exact, foloseste un aparat apropiat ca reper si ajusteaza manual puterea, orele si zilele."
    }
  ];
}
