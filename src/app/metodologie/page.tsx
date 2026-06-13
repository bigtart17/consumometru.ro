import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Metodologie calcul consum electric",
  description:
    "Metodologia Consumometru: formula de calcul pentru kWh, rolul pretului energiei, limitele estimarilor si factorii care pot schimba consumul real.",
  alternates: {
    canonical: "/metodologie"
  },
  openGraph: {
    title: "Metodologie calcul consum electric",
    description:
      "Afla cum calculeaza Consumometru consumul in kWh si costul estimativ al aparatelor electrice.",
    url: "/metodologie",
    type: "article",
    locale: "ro_RO"
  }
};

export default function MethodologyPage() {
  return (
    <LegalPage
      breadcrumbPath="/metodologie"
      breadcrumbParent={{ label: "Ghiduri", href: "/ghiduri" }}
      title="Metodologie calcul consum electric"
      intro="Consumometru foloseste o metoda simpla si transparenta pentru calculul consumului electric. Scopul este sa iti arate rapid ordinul de marime al consumului si al costului, fara sa inlocuiasca factura, masuratorile exacte sau datele oficiale ale producatorului."
      sections={[
        {
          title: "Formula folosita",
          body: "Formula de baza este: consum kWh = putere W × ore utilizare × zile / 1000. Puterea aparatului se introduce in W, timpul de utilizare se introduce in ore, iar impartirea la 1000 transforma Wh in kWh, unitatea folosita de obicei pe factura de energie electrica."
        },
        {
          title: "Cum se calculeaza costul",
          body: "Dupa calculul consumului in kWh, costul se obtine inmultind consumul cu pretul introdus pentru 1 kWh. De exemplu, daca un aparat consuma 60 kWh pe luna si pretul introdus este 1,30 lei/kWh, costul este 78 lei pe luna."
        },
        {
          title: "Rolul pretului kWh",
          body: "Pretul kWh este influentat de furnizor, contract, perioada, tarife si componentele incluse in factura. Din acest motiv, calculatorul iti permite sa modifici pretul. Pentru un calcul apropiat de situatia ta, introdu valoarea din factura sau din contractul de energie electrica."
        },
        {
          title: "De ce rezultatele sunt calcule de lucru",
          body: "Rezultatele pornesc direct de la valorile introduse. Daca puterea, numarul de ore, zilele de utilizare sau pretul kWh sunt aproximative, si rezultatul va fi aproximativ. Calculatorul este util pentru comparatii si scenarii rapide, dar nu poate garanta consumul exact al unui aparat intr-o locuinta reala."
        },
        {
          title: "Ce poate schimba consumul real",
          body: "Consumul real este influentat de model, vechime, clasa energetica, temperatura setata, cicluri de functionare, modul de utilizare, incarcare, intretinere si conditiile din locuinta. Un frigider, de exemplu, nu functioneaza permanent la puterea maxima, iar un aparat de aer conditionat inverter isi poate modifica puterea in timpul functionarii."
        },
        {
          title: "Limitarile calculatorului",
          body: "Calculatorul nu masoara consumul direct din priza si nu include toate componentele facturii. Nu tine locul unui wattmetru, al unui audit energetic sau al informatiilor tehnice complete oferite de producator. Pentru decizii importante, foloseste datele oficiale ale aparatului si, cand este nevoie, cere sfatul unui specialist."
        },
        {
          title: "Cum sa folosesti rezultatele corect",
          body: "Foloseste rezultatele ca punct de plecare: compara aparate, testeaza scenarii cu mai putine ore de utilizare, schimba pretul kWh si verifica ce aparate pot influenta cel mai mult factura. Daca ai date exacte de pe eticheta energetica sau din manual, introdu-le manual in calculator."
        }
      ]}
    />
  );
}
