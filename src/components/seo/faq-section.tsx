import type { FaqItem } from "@/components/seo/json-ld-script";

type FaqSectionProps = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  className?: string;
};

export function FaqSection({
  items,
  eyebrow = "FAQ",
  title = "Intrebari frecvente",
  className = "bg-white/72"
}: FaqSectionProps) {
  return (
    <section className={`${className} px-4 py-12 sm:px-6 lg:px-8`}>
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">
            {title}
          </h2>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
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
  );
}
