import Link from "next/link";

export type SeoBreadcrumbItem = {
  label: string;
  href?: string;
};

type SeoBreadcrumbsProps = {
  items: SeoBreadcrumbItem[];
  className?: string;
};

export function SeoBreadcrumbs({
  items,
  className = "mb-6"
}: SeoBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`${className} flex flex-wrap items-center gap-2 text-sm text-slate-500`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.label}-${index}`} className="contents">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-emerald-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-700">{item.label}</span>
            )}
            {!isLast ? <span aria-hidden="true">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
