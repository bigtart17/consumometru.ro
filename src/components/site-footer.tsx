import Link from "next/link";
import { MobileFooterAccordion } from "@/components/mobile-footer-accordion";
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
    title: "Calculatoare",
    links: [
      { href: "/#calculator", label: "Calculator consum" },
      { href: "/#navigare-rapida", label: "Navigare rapida" },
      { href: "/#simulator-factura", label: "Simulator factura" },
      { href: "/comparatii", label: "Comparatii consum" },
      { href: "/#top-consumatori", label: "Top consumatori" },
      { href: "/#faq", label: "FAQ" }
    ]
  },
  {
    title: "Categorii consum",
    links: [
      { href: "/climatizare", label: "Climatizare" },
      { href: "/incalzire-electrica", label: "Incalzire electrica" },
      { href: "/electrocasnice", label: "Electrocasnice" },
      { href: "/electronice", label: "Electronice" },
      { href: "/iluminat", label: "Iluminat" },
      { href: "/eficienta-energetica", label: "Eficienta energetica" }
    ]
  },
  {
    title: "Ghiduri",
    links: [
      { href: "/cat-costa/1-kwh", label: "Cat costa 1 kWh" },
      { href: "/ghiduri/cum-citesti-factura-la-curent", label: "Cum citesti factura" },
      { href: "/consum-locuinta/apartament-2-camere", label: "Consum apartament 2 camere" },
      { href: "/consum-locuinta/casa", label: "Consum casa" },
      { href: "/cat-consuma/aer-conditionat-12000-btu", label: "Consum aer conditionat" },
      { href: "/cat-consuma/boiler-electric-80l", label: "Consum boiler" },
      { href: "/cat-consuma/calorifer-electric", label: "Consum calorifer electric" },
      { href: "/cat-consuma/frigider", label: "Consum frigider" },
      { href: "/cat-consuma/uscator-rufe", label: "Consum uscator rufe" },
      { href: "/cat-consuma/cuptor-electric", label: "Consum cuptor electric" },
      { href: "/cat-consuma/televizor", label: "Consum televizor" },
      { href: "/cat-consuma/masina-de-spalat", label: "Consum masina de spalat" }
    ]
  },
  {
    title: "Despre",
    links: [
      { href: "/despre", label: "Despre proiect" },
      { href: "/metodologie", label: "Metodologie" },
      { href: "/surse", label: "Surse" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { href: "/confidentialitate", label: "Confidentialitate" },
      { href: "/cookies", label: "Cookies" },
      { href: "/termeni", label: "Termeni" },
      { href: "/gdpr", label: "GDPR" }
    ]
  }
];

const desktopFooterSections: FooterSection[] = [
  footerSections[0],
  footerSections[1],
  {
    title: "Aparate mari",
    links: footerSections[2].links.slice(4, 10)
  },
  {
    title: "Ghiduri utile",
    links: footerSections[2].links.slice(0, 4).concat(footerSections[2].links.slice(10))
  },
  {
    title: "Site",
    links: footerSections[3].links.concat(footerSections[4].links)
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
            al aparatelor din casa. Valorile sunt orientative si te ajuta sa
            compari scenarii, nu inlocuiesc factura.
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
            al aparatelor din casa. Valorile sunt orientative si te ajuta sa
            compari scenarii, nu inlocuiesc factura.
          </p>
        </div>

        {desktopFooterSections.map((section) => (
          <FooterColumn
            key={section.title}
            title={section.title}
            links={section.links}
          />
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-emerald-100 pt-4 text-xs leading-5 text-slate-500">
        © {new Date().getFullYear()} {siteConfig.name}.
        Estimarile sunt informative si pot varia in functie de aparat, setari,
        instalatie si pretul real al energiei.
      </div>
    </footer>
  );
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
