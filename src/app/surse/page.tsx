import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Surse si valori orientative",
  description:
    "Cum foloseste Consumometru etichete energetice, manuale de produs, valori medii si date introduse de utilizator pentru estimari de consum electric.",
  alternates: {
    canonical: "/surse"
  },
  openGraph: {
    title: "Surse si valori orientative",
    description:
      "Vezi ce tipuri de informatii pot sta la baza estimarilor de consum electric din Consumometru.",
    url: "/surse",
    type: "article",
    locale: "ro_RO"
  }
};

export default function SourcesPage() {
  return (
    <LegalPage
      breadcrumbPath="/surse"
      breadcrumbParent={{ label: "Ghiduri", href: "/ghiduri" }}
      title="Surse pentru valorile de consum"
      intro="Aici explicam ce tipuri de informatii pot sta la baza calculelor din Consumometru. Preset-urile sunt repere pentru aparate comune si merita ajustate atunci cand ai date exacte pentru aparatul tau."
      sections={[
        {
          title: "Etichete energetice",
          body: "Pentru unele aparate, eticheta energetica poate indica un consum anual, un consum pe ciclu sau informatii despre eficienta. Aceste valori sunt utile mai ales la frigidere, masini de spalat, uscatoare de rufe sau aparate folosite in cicluri."
        },
        {
          title: "Manuale si specificatii de produs",
          body: "Manualele de produs si fisele tehnice pot include puterea nominala, consumul mediu sau conditii de testare. Cand ai aceste informatii, este recomandat sa le folosesti in locul valorilor presetate, deoarece pot descrie mai bine modelul tau concret."
        },
        {
          title: "Valori medii pentru aparate comune",
          body: "Preset-urile din site folosesc valori medii pentru aparate comune. Ele sunt gandite pentru calcule rapide si comparatii, nu pentru a descrie perfect fiecare model existent pe piata. Doua aparate cu acelasi nume pot avea consum diferit in functie de producator, vechime si eficienta."
        },
        {
          title: "Date introduse de utilizator",
          body: "Cele mai importante valori din calculator sunt cele introduse manual: puterea in W, orele de utilizare, zilele pe luna si pretul kWh. Cu cat aceste date sunt mai apropiate de rutina ta, cu atat rezultatul te ajuta mai mult."
        },
        {
          title: "Calcule pe baza puterii in W",
          body: "Atunci cand nu exista un consum anual sau pe ciclu, calculul se face pe baza puterii aparatului in W. Formula transforma puterea si timpul de utilizare in kWh. Metoda este simpla si usor de verificat, dar poate supraestima sau subestima aparatele care nu functioneaza constant la puterea nominala."
        },
        {
          title: "De ce nu listam surse externe false",
          body: "Nu atribuim valori unor institutii, producatori sau documente externe daca nu exista o sursa clara folosita in proiect. Cand o valoare este doar un reper de calcul, o tratam ca atare. Pentru un rezultat masurat, verifica eticheta aparatului, manualul, factura sau masoara consumul cu un wattmetru."
        },
        {
          title: "Cum actualizam valorile",
          body: "Valorile pot fi ajustate in timp pentru a reflecta mai bine aparatele uzuale si scenariile reale de utilizare. Daca observi o valoare care pare nepotrivita, poti trimite o sugestie prin pagina Contact, ideal cu modelul aparatului si informatia tehnica disponibila."
        }
      ]}
    />
  );
}
