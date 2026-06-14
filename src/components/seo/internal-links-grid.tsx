import Link from "next/link";

export type InternalLinkCard = {
  href: string;
  title: string;
  eyebrow?: string;
  description?: string;
  badge?: string;
  featured?: boolean;
};

type InternalLinksGridProps = {
  links: InternalLinkCard[];
  columns?: "two" | "three";
  className?: string;
};

export function InternalLinksGrid({
  links,
  columns = "two",
  className = ""
}: InternalLinksGridProps) {
  const gridClass =
    columns === "three"
      ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      : "grid gap-3 md:grid-cols-2";

  return (
    <div className={`${className} ${gridClass}`.trim()}>
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.title}`}
          href={link.href}
          className={
            link.featured
              ? "rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400"
              : "rounded-lg border border-emerald-100 bg-white p-4 text-slate-950 shadow-sm transition hover:border-emerald-300"
          }
        >
          <span className="flex flex-wrap items-center gap-2">
            {link.eyebrow ? (
              <span className="text-sm font-medium text-emerald-700">
                {link.eyebrow}
              </span>
            ) : null}
            {link.badge ? (
              <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                {link.badge}
              </span>
            ) : null}
          </span>
          <span className="mt-2 block font-semibold">{link.title}</span>
          {link.description ? (
            <span className="mt-2 block text-sm leading-6 text-slate-600">
              {link.description}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

export type TextLink = {
  href: string;
  label: string;
};

type SimpleLinksGridProps = {
  links: TextLink[];
  className?: string;
};

export function SimpleLinksGrid({ links, className = "" }: SimpleLinksGridProps) {
  return (
    <div className={`${className} grid gap-3 sm:grid-cols-2 lg:grid-cols-3`.trim()}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-semibold text-slate-700 hover:text-emerald-700"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
