import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type LegalSection = {
  title: string;
  body: string;
};

type LegalPageProps = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
  return (
    <main>
      <SiteHeader />
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
          <p className="mt-4 leading-7 text-slate-700">{intro}</p>
          <div className="mt-8 grid gap-6">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-semibold text-slate-950">
                  {section.title}
                </h2>
                <p className="mt-2 leading-7 text-slate-700">{section.body}</p>
              </section>
            ))}
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
