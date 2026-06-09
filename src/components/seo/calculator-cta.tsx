import Link from "next/link";

type CalculatorCtaLink = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type CalculatorCtaProps = {
  links?: CalculatorCtaLink[];
};

const defaultLinks: CalculatorCtaLink[] = [
  { href: "/#calculator", label: "Deschide calculatorul", variant: "primary" },
  { href: "/metodologie", label: "Metodologie" },
  { href: "/surse", label: "Surse" }
];

export function CalculatorCta({ links = defaultLinks }: CalculatorCtaProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className={
            link.variant === "primary"
              ? "inline-flex min-h-12 items-center rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800"
              : "inline-flex min-h-12 items-center rounded-lg border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
          }
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
