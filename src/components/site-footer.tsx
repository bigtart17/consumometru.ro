import Link from "next/link";
import { MobileFooterAccordion } from "@/components/mobile-footer-accordion";
import { siteNavigationPillars } from "@/data/siteNavigation";
import { siteConfig } from "@/lib/site";

export type FooterLink = {
  href: string;
  label: string;
};

export type FooterSection = {
  title: string;
  links: FooterLink[];
};

const footerSections: FooterSection[] = [
  {
    title: "Calculeaza",
    links: [
      { href: "/#calculator", label: "Calculator consum electric" },
      { href: getPillarHref("calculeaza"), label: "Calculatoare consum electric" },
      { href: "/calculeaza/consum-anual-locuinta", label: "Consum anual locuință" },
      { href: "/#simulator-factura", label: "Simulator factura" },
      { href: "/cat-costa/1-kwh", label: "Cost 1 kWh" },
      { href: "/consum-locuinta/apartament-2-camere", label: "Consum locuinta" }
    ]
  },
  {
    title: "Aparate",
    links: [
      { href: getPillarHref("aparate"), label: "Aparate" },
      { href: "/climatizare", label: "Climatizare" },
      { href: "/incalzire-electrica", label: "Incalzire electrica" },
      { href: "/electrocasnice", label: "Electrocasnice" },
      { href: "/electronice", label: "Electronice" },
      { href: "/iluminat", label: "Iluminat" }
    ]
  },
  {
    title: "Comparatii",
    links: [
      { href: getPillarHref("comparatii"), label: "Comparatii consum" },
      {
        href: "/comparatii/calorifer-electric-vs-aer-conditionat",
        label: "Aer conditionat vs calorifer electric"
      },
      { href: "/comparatii/laptop-vs-desktop", label: "Laptop vs desktop" },
      {
        href: "/comparatii/boiler-electric-vs-instant",
        label: "Boiler electric vs instant"
      },
      {
        href: "/comparatii/bec-led-vs-bec-incandescent",
        label: "Bec LED vs bec incandescent"
      }
    ]
  },
  {
    title: "Ghiduri",
    links: [
      { href: getPillarHref("ghiduri"), label: "Ghiduri" },
      { href: "/ghiduri/cum-citesti-factura-la-curent", label: "Cum citesti factura" },
      { href: "/eficienta-energetica", label: "Eficienta energetica" },
      { href: "/metodologie", label: "Metodologie" },
      { href: "/surse", label: "Surse" },
      { href: "/despre", label: "Despre" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/confidentialitate", label: "Confidentialitate" },
      { href: "/cookies", label: "Cookies" },
      { href: "/termeni", label: "Termeni" },
      { href: "/gdpr", label: "GDPR" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 text-sm text-slate-600 lg:hidden">
        <div>
          <p className="text-base font-semibold text-slate-950">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm leading-6">
            Calculator si ghiduri in romana pentru estimarea consumului electric
            al aparatelor din casa. Te ajuta sa compari scenarii si sa intelegi
            mai bine factura, fara sa inlocuiasca datele furnizorului.
          </p>
        </div>
        <MobileFooterAccordion sections={footerSections} />
      </div>

      <div className="mx-auto hidden max-w-7xl gap-8 text-sm text-slate-600 lg:grid lg:grid-cols-[1.2fr_repeat(5,0.8fr)]">
        <div>
          <p className="text-base font-semibold text-slate-950">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-sm leading-6">
            Calculator si ghiduri in romana pentru estimarea consumului electric
            al aparatelor din casa. Te ajuta sa compari scenarii si sa intelegi
            mai bine factura, fara sa inlocuiasca datele furnizorului.
          </p>
        </div>

        {footerSections.map((section) => (
          <FooterColumn
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-emerald-100 pt-4 text-xs leading-5 text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}.
        Calculele sunt informative; rezultatul final tine de aparat, setari,
        instalatie si pretul real al energiei.
      </div>
    </footer>
  );
}

function getPillarHref(key: "calculeaza" | "aparate" | "comparatii" | "ghiduri") {
  return siteNavigationPillars.find((pillar) => pillar.key === key)?.href ?? "/";
}

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h2 className="font-semibold text-slate-950">{title}</h2>
      <div className="mt-3 grid gap-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-emerald-700">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
