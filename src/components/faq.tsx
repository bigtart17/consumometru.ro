import type { FaqItem } from "@/data/faq";

type FaqProps = {
  items: FaqItem[];
};

export function Faq({ items }: FaqProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section id="faq" className="bg-emerald-950 px-4 py-14 text-white sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-200">
            FAQ
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            Intrebari frecvente despre consumul electric
          </h2>
        </div>
        <div className="grid gap-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="rounded-lg border border-white/12 bg-white/8 p-5 open:bg-white/12"
            >
              <summary className="cursor-pointer text-base font-semibold">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-emerald-50">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
