import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
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

        <FooterColumn
          title="Instrumente"
          links={[
            { href: "/#calculator", label: "Calculator consum" },
            { href: "/#calculatoare-populare", label: "Calculatoare populare" },
            { href: "/#simulator-factura", label: "Simulator factura" },
            { href: "/#top-consumatori", label: "Top consumatori" },
            { href: "/#faq", label: "FAQ" }
          ]}
        />
        <FooterColumn
          title="Aparate mari"
          links={[
            { href: "/cat-consuma/aer-conditionat-12000-btu", label: "Consum aer conditionat" },
            { href: "/cat-consuma/boiler-electric-80l", label: "Consum boiler" },
            { href: "/cat-consuma/calorifer-electric", label: "Consum calorifer electric" },
            { href: "/cat-consuma/uscator-rufe", label: "Consum uscator rufe" },
            { href: "/cat-consuma/cuptor-electric", label: "Consum cuptor electric" }
          ]}
        />
        <FooterColumn
          title="Ghiduri utile"
          links={[
            { href: "/cat-consuma/frigider", label: "Consum frigider" },
            { href: "/cat-consuma/televizor", label: "Consum televizor" },
            { href: "/cat-consuma/masina-de-spalat", label: "Consum masina de spalat" },
            { href: "/cat-consuma/pc-gaming", label: "Consum PC gaming" },
            { href: "/cat-consuma/bec-led", label: "Consum bec LED" }
          ]}
        />
        <FooterColumn
          title="Site"
          links={[
            { href: "/despre", label: "Despre proiect" },
            { href: "/contact", label: "Contact" },
            { href: "/confidentialitate", label: "Confidentialitate" },
            { href: "/cookies", label: "Cookies" },
            { href: "/termeni", label: "Termeni" }
          ]}
        />
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
  links: Array<{
    href: string;
    label: string;
  }>;
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
