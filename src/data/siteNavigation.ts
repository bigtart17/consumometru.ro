export type SiteNavigationLink = {
  label: string;
  href: string;
  description?: string;
};

export type SiteNavigationPillar = {
  key: "calculeaza" | "aparate" | "comparatii" | "ghiduri";
  label: string;
  description: string;
  href: string;
  links: SiteNavigationLink[];
};

export const siteNavigationPillars: SiteNavigationPillar[] = [
  {
    key: "calculeaza",
    label: "Calculează",
    description:
      "Instrumente pentru estimarea consumului unui aparat, a facturii lunare si a costului pentru 1 kWh.",
    href: "/calculeaza",
    links: [
      {
        label: "Pagina principala",
        href: "/",
        description: "Calculatorul principal si explicatiile de baza despre consum."
      },
      {
        label: "Calculează consumul",
        href: "/calculeaza",
        description: "Pagina hub pentru instrumentele de calcul."
      },
      {
        label: "Calculator consum electric",
        href: "/#calculator",
        description: "Introdu puterea, orele de utilizare si pretul kWh."
      },
      {
        label: "Consum anual locuință",
        href: "/calculeaza/consum-anual-locuinta",
        description: "Estimează consumul și costul locuinței pentru fiecare lună din an."
      },
      {
        label: "Simulator factura lunara",
        href: "/#simulator-factura",
        description: "Adauga mai multe aparate si vezi consumul total."
      },
      {
        label: "Cat costa 1 kWh",
        href: "/cat-costa/1-kwh",
        description: "Explicatie practica pentru pretul kWh si costul energiei."
      }
    ]
  },
  {
    key: "aparate",
    label: "Aparate",
    description:
      "Ghiduri si categorii pentru aparatele electrice folosite frecvent in locuinta.",
    href: "/aparate",
    links: [
      {
        label: "Toate aparatele",
        href: "/aparate",
        description: "Indexul ghidurilor dedicate pentru aparate electrice."
      },
      {
        label: "Climatizare",
        href: "/climatizare",
        description: "Aer conditionat, ventilator, dezumidificator si aparate similare."
      },
      {
        label: "Incalzire electrica",
        href: "/incalzire-electrica",
        description: "Boiler, calorifer, convector, aeroterma si radiator."
      },
      {
        label: "Electrocasnice",
        href: "/electrocasnice",
        description: "Frigider, masina de spalat, uscator, cuptor si aparate de bucatarie."
      },
      {
        label: "Electronice",
        href: "/electronice",
        description: "Laptop, PC gaming, televizor, monitor si electronice de zi cu zi."
      },
      {
        label: "Iluminat",
        href: "/iluminat",
        description: "Becuri LED, halogen, incandescent si consum pentru iluminat."
      }
    ]
  },
  {
    key: "comparatii",
    label: "Comparații",
    description:
      "Pagini care compara consumul si costul estimativ intre doua variante de aparate.",
    href: "/comparatii",
    links: [
      {
        label: "Comparatii consum",
        href: "/comparatii",
        description: "Lista comparatiilor intre aparate electrice populare."
      }
    ]
  },
  {
    key: "ghiduri",
    label: "Ghiduri",
    description:
      "Explicatii despre factura, eficienta energetica, metodologia de calcul si sursele estimarilor.",
    href: "/ghiduri",
    links: [
      {
        label: "Toate ghidurile",
        href: "/ghiduri",
        description: "Indexul ghidurilor informative despre consum electric."
      },
      {
        label: "Cum citesti factura la curent",
        href: "/ghiduri/cum-citesti-factura-la-curent",
        description: "Explicatii pentru consum, pret kWh si componentele facturii."
      },
      {
        label: "Ghid de eficienta energetica",
        href: "/eficienta-energetica",
        description: "Metode realiste pentru reducerea consumului lunar."
      },
      {
        label: "Metodologie",
        href: "/metodologie",
        description: "Formula de calcul, limitele estimarilor si rolul pretului kWh."
      },
      {
        label: "Surse",
        href: "/surse",
        description: "Tipurile de date folosite pentru valorile orientative."
      }
    ]
  }
];

export const primaryNavigationLinks = siteNavigationPillars.map(
  ({ label, href }) => ({
    label,
    href
  })
);
